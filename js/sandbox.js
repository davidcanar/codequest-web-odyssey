/* ============ Sandbox — live code editor + preview iframe + declarative validation ============ */
(function () {
  var LOOP_GUARD_MAX = 200000;

  // Build the full HTML document written into the preview iframe
  function buildDoc(ex, userCode) {
    var lang = ex.lang || 'html';
    var fixture = ex.fixture || '';
    var inner = '';
    if (lang === 'html') inner = userCode;
    else if (lang === 'css') inner = fixture + '\n<style>\n' + userCode + '\n</style>';
    else if (lang === 'js') {
      var guarded = guardLoops(userCode);
      inner = fixture +
        '\n<script>\n' +
        '(function(){ var __t=0; window.__g=function(){ if(++__t>' + LOOP_GUARD_MAX + ') throw new Error("Too many loop iterations (possible infinite loop)"); }; })();\n' +
        'window.__consoleLines=[]; window.__userErrors=[];\n' +
        'window.onerror=function(m){ window.__userErrors.push(String(m)); };\n' +
        '(function(){ ["log","warn","error","info"].forEach(function(k){ var o=console[k].bind(console); console[k]=function(){ try{ var a=Array.prototype.slice.call(arguments).map(function(x){ try{ return typeof x==="object"?JSON.stringify(x):String(x);}catch(e){return String(x);} }); window.__consoleLines.push({t:a.join(" "),c:(k==="error"?"err":"")}); }catch(e){} o.apply(console,arguments); }; }); })();\n' +
        guarded + '\n' +
        '<\/script>';
    }
    return '<!DOCTYPE html><html><head><meta charset="utf-8"><style>' +
      'body{font-family:Segoe UI,Arial,sans-serif;padding:12px;background:#fff;color:#222;}' +
      '.sandbox-fixture-note{position:fixed;bottom:4px;right:8px;font-size:9px;color:#bbb;}' +
      '</style></head><body>' + inner + '<span class="sandbox-fixture-note">preview</span></body></html>';
  }

  // crude but effective: inject __g() into loop bodies of braced for/while/do loops
  function guardLoops(code) {
    return code.replace(/\b(for|while)\s*\([^)]*\)\s*\{/g, function (m) { return m + '__g();'; })
               .replace(/\bdo\s*\{/g, function (m) { return m + '__g();'; });
  }

  function render(container, ex, ctx) {
    container.innerHTML = '';
    var lang = ex.lang || 'html';
    var wrap = document.createElement('div');
    wrap.className = 'sandbox-wrap';

    // left: editor
    var left = document.createElement('div');
    left.className = 'sandbox-pane';
    left.innerHTML = '<div class="pane-head">' + t('editorPane') + '</div>';
    var ta = document.createElement('textarea');
    ta.className = 'sandbox-editor';
    ta.spellcheck = false;
    ta.value = ex.start || '';
    left.appendChild(ta);

    // right: preview / console
    var right = document.createElement('div');
    right.className = 'sandbox-pane';
    var isJs = lang === 'js';
    right.innerHTML = '<div class="pane-head">' + (isJs ? t('consolePane') + ' + ' + t('previewPane') : t('previewPane')) + '</div>';
    var outWrap = document.createElement('div');
    outWrap.className = 'sandbox-out';
    var iframe = document.createElement('iframe');
    iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-modals');
    var consoleBox = document.createElement('div');
    consoleBox.className = 'sandbox-console';
    consoleBox.style.display = isJs ? 'block' : 'none';
    outWrap.appendChild(iframe);
    outWrap.appendChild(consoleBox);
    right.appendChild(outWrap);

    wrap.appendChild(left); wrap.appendChild(right);
    container.appendChild(wrap);

    // mission target box (what to build)
    if (ex.target) {
      var tg = document.createElement('div');
      tg.className = 'sandbox-target';
      tg.innerHTML = '<b>🎯 ' + t('targetPane') + ':</b> ' + L(ex.target) +
        (ex.targetCode ? '<pre>' + escapeHtml(ex.targetCode) + '</pre>' : '');
      container.insertBefore(tg, wrap);
    }

    var consoleLines = [];
    function logLine(text, cls) {
      consoleLines.push({ t: text, c: cls || '' });
      var d = document.createElement('div');
      d.className = 'cline ' + (cls || '');
      d.textContent = text;
      consoleBox.appendChild(d);
      consoleBox.scrollTop = consoleBox.scrollHeight;
    }

    var pending = null;
    function update() {
      clearTimeout(pending);
      pending = setTimeout(function () {
        if (isJs) {
          consoleBox.innerHTML = ''; consoleLines = [];
          logLine('▶ running...', 'info');
        }
        iframe.srcdoc = buildDoc(ex, ta.value);
        iframe.onload = function () {
          if (!isJs) return;
          // console lines are captured inside the iframe harness (buildDoc) — just show them
          try {
            var win = iframe.contentWindow;
            (win.__consoleLines || []).forEach(function (l) { logLine(l.t, l.c); });
          } catch (e) { }
        };
        if (ctx && typeof ctx.markDirty === 'function') ctx.markDirty();
      }, 420);
    }
    ta.addEventListener('input', update);
    update();

    var api = {
      getValue: function () { return ta.value; },
      refresh: update,
      getConsoleLines: function () { return consoleLines; },
      getIframe: function () { return iframe; },
      focus: function () { ta.focus(); }
    };
    container._sandbox = api;
    return api;
  }

  // ---- check runners ----
  function qsa(iframe, sel) { try { return iframe.contentDocument.querySelectorAll(sel); } catch (e) { return []; } }

  function runChecks(ex, api, value) {
    var results = [];
    var checks = ex.checks || [];
    var iframe = api.getIframe();
    var lines = api.getConsoleLines();

    checks.forEach(function (c) {
      if (c.dom != null) {
        var n = qsa(iframe, c.dom).length;
        var need = c.count != null ? c.count : 1;
        results.push({ ok: n >= need, msg: (c.label ? L(c.label) : 'Found ' + n + ' × <code>' + escapeHtml(c.dom) + '</code> (need ' + need + ')') });
      } else if (c.text != null) {
        var els = qsa(iframe, c.text);
        var hay = '';
        for (var i = 0; i < els.length; i++) hay += ' ' + els[i].textContent;
        var inc = c.includes != null ? c.includes : (c.includesAny || []);
        var ok = typeof inc === 'string' ? hay.toLowerCase().indexOf(String(inc).toLowerCase()) >= 0
          : inc.some(function (s) { return hay.toLowerCase().indexOf(String(s).toLowerCase()) >= 0; });
        results.push({ ok: ok, msg: c.label ? L(c.label) : 'Text check: ' + JSON.stringify(inc) });
      } else if (c.attr != null) {
        var els2 = qsa(iframe, c.attr);
        var ok2 = els2.length > 0;
        var shown = '';
        if (ok2 && c.attrName != null) {
          var vals = [];
          for (var j = 0; j < els2.length; j++) vals.push(els2[j].getAttribute(c.attrName));
          ok2 = vals.some(function (v) {
            if (c.attrValue != null) return (v || '').trim() === c.attrValue;
            if (c.attrRegex != null) { try { return new RegExp(c.attrRegex).test(v || ''); } catch (e) { return false; } }
            if (c.attrIncludes != null) return (v || '').indexOf(c.attrIncludes) >= 0;
            return v != null;
          });
          shown = ' [' + c.attrName + ']';
        }
        results.push({ ok: ok2, msg: c.label ? L(c.label) : 'Attribute check on <code>' + escapeHtml(c.attr) + shown + '</code>' });
      } else if (c.style != null) {
        var el3 = qsa(iframe, c.style)[0];
        var ok3 = false, got = '';
        if (el3) {
          try {
            var cs = iframe.contentWindow.getComputedStyle(el3);
            got = cs.getPropertyValue(c.prop);
            if (c.equals != null) ok3 = normColor(got) === normColor(String(c.equals));
            else if (c.contains != null) ok3 = got.toLowerCase().indexOf(String(c.contains).toLowerCase()) >= 0;
          } catch (e) { }
        }
        results.push({ ok: ok3, msg: c.label ? L(c.label) : ('<code>' + c.style + '</code> → ' + c.prop + ' ' + (got ? '(got: ' + escapeHtml(got) + ')' : '')) });
      } else if (c.console != null) {
        var out = lines.map(function (l) { return l.t; }).join('\n');
        var ok4 = out.toLowerCase().indexOf(String(c.console.includes != null ? c.console.includes : c.console).toLowerCase()) >= 0;
        results.push({ ok: ok4, msg: c.label ? L(c.label) : 'Console should include: ' + JSON.stringify(c.console.includes != null ? c.console.includes : c.console) });
      } else if (c.expr != null) {
        var ok5 = false, got5 = '';
        try {
          var win2 = iframe.contentWindow;
          got5 = win2.eval(c.expr);
          got5 = typeof got5 === 'object' ? JSON.stringify(got5) : String(got5);
          ok5 = c.equals !== undefined ? String(got5) === String(c.equals) : truthy(got5);
        } catch (e) { got5 = String(e && e.message || e); }
        results.push({ ok: ok5, msg: c.label ? L(c.label) : ('<code>' + escapeHtml(c.expr) + '</code> ' + (c.equals !== undefined ? 'should equal ' + c.equals : '') + (got5 ? ' (got: ' + escapeHtml(got5) + ')' : '')) });
      } else if (c.codeIncludes != null) {
        var okc = String(value).toLowerCase().indexOf(String(c.codeIncludes).toLowerCase()) >= 0;
        results.push({ ok: okc, msg: c.label ? L(c.label) : 'Your code should use <code>' + escapeHtml(c.codeIncludes) + '</code>' });
      } else if (c.noError) {
        var errs = lines.filter(function (l) { return l.c === 'err'; });
        var iframeErrs = [];
        try {
          var w = iframe.contentWindow;
          if (w && w.__userErrors) iframeErrs = w.__userErrors;
        } catch (e) { }
        results.push({ ok: errs.length === 0 && iframeErrs.length === 0, msg: c.label ? L(c.label) : 'No errors in your code' });
      }
    });

    return { allOk: results.every(function (r) { return r.ok; }), results: results };
  }

  function truthy(v) { return v !== 'false' && v !== 'undefined' && v !== 'null' && v !== '' && v !== 'NaN'; }
  function normColor(s) {
    var m = String(s).match(/rgba?\(([^)]+)\)/);
    if (!m) return String(s).trim().toLowerCase();
    var parts = m[1].split(',').map(function (x) { return parseInt(x.trim(), 10); });
    return 'rgb(' + parts[0] + ', ' + parts[1] + ', ' + parts[2] + ')';
  }
  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  window.Sandbox = { render: render, runChecks: runChecks, buildDoc: buildDoc, escapeHtml: escapeHtml };
})();
