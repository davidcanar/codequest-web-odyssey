# CONTENT-SPEC — CodeQuest level data & explainer pages (READ THIS FULLY FIRST)

You are writing game content for **CodeQuest: Web Odyssey**, a bilingual (EN/ES) space-themed game that teaches web development. Read these three reference files before writing anything:

1. `D:\Projects\htmlcssjs\js\levels\html.js` — **canonical level-data example** (html-01 and html-02). Match its style and field usage EXACTLY.
2. `D:\Projects\htmlcssjs\assets\explainers\html-01.html` — **canonical explainer page example**.
3. `D:\Projects\htmlcssjs\assets\explainers\kit.js` — scene-type builders (see "Explainer scene types" below).

---

## A. Level data files

Classic JS files, no modules. Each defines one global array:

| File | Global | Levels | ids | num |
|---|---|---|---|---|
| `js/levels/html.js` | `window.LEVELS_HTML` | 12 | `html-01`…`html-12` | 1–12 |
| `js/levels/css.js` | `window.LEVELS_CSS` | 15 | `css-01`…`css-15` | 13–27 |
| `js/levels/js.js` | `window.LEVELS_JS` | 18 | `js-01`…`js-18` | 28–45 |
| `js/levels/final.js` | `window.LEVELS_FINAL` | 3 | `final-01`…`final-03` | 46–48 |

`html-01` and `html-02` already exist — when editing `html.js`, KEEP them untouched and append.

### Level object schema (exact)

```js
{
  id: 'css-01', track: 'css', num: 13, icon: '🎨', xp: 100,
  title:    { en: '...', es: '...' },          // short (2-5 words)
  subtitle: { en: '...', es: '...' },
  narration:{ en: '...', es: '...' },          // SPOKEN at level start — see voice rules
  outro:    { en: '...', es: '...' },          // SPOKEN at results — 1-2 sentences
  explainer: 'css-01',                          // same as id
  exercises: [ /* 5-8 items, varied types */ ]
}
```

### Voice rules (narration/outro — this text is fed to TTS!)
- 45–75 words per narration (~35–50 s of audio). Outro: 12–25 words.
- Friendly space-adventure tone for all ages; address the player as "Cadet"/"Cadete"; Cosmo the robot guide is the narrator persona.
- NO code symbols read aloud awkwardly: say "the h-one tag", "angle brackets", not `<h1>`.
- ES must be natural Latin-American-neutral Spanish, NOT a literal word-by-word translation.
- Spell out things like "HTML" as "H T M L" in EN; in ES use "H T M L" too (each letter spoken).

### Exercise types — EXACT fields

All text fields `prompt`, `explain`, `hint`, `target`, mcq `options`, match `a`/`b` are **bilingual {en, es}** and rendered as HTML → literal `<` `>` must be written `&lt;` `&gt;`; you may use `<b>`, `<code>` tags inside.

All CODE fields (`template`, `slots`, `lines`, `code`, `start`, `fixture`, `solution`, `targetCode`, arcade tokens) are **raw code strings** — never escape them, never bilingual (code is code).

```js
// 1. mcq — multiple choice
{ type:'mcq', prompt:{en,es}, code:'<p>raw html shown above</p>', codeLang:'html',   // optional code block
  options:[{en,es},{en,es},{en,es},{en,es}], answer:0,   // index; VARY the correct position
  explain:{en,es} }

// 2. fill — type into blanks ('___' in template)
{ type:'fill', prompt:{en,es}, template:'<h1>___</h1>',
  answers:[{accept:['Cosmo']}],        // one entry per ___; accept list = valid answers
  hint:{en,es}, explain:{en,es} }

// 3. dnd — drag tokens into slots in order
{ type:'dnd', prompt:{en,es}, slots:['<ul>','<li>Moon</li>','</ul>'],
  distractors:['<ol>'],                // optional wrong tokens
  before:'', after:'', separators:[],  // optional fixed text around slots
  explain:{en,es} }

// 4. order — reorder shuffled lines
{ type:'order', prompt:{en,es}, lang:'html', lines:['<ul>','  <li>One</li>','</ul>'], explain:{en,es} }

// 5. bug — click the broken line, then type the fix
{ type:'bug', prompt:{en,es}, lang:'html', lines:['<h1>A</h1>','<p>B<p>','<h2>C</h2>'],
  bugLine:1, fix:{accept:['<p>B</p>']}, explain:{en,es} }

// 6. match — connect pairs
{ type:'match', prompt:{en,es}, lang:'html',
  pairs:[ {chip:'1', a:{en:'<a>',es:'<a>'}, b:{en:'creates a link',es:'crea un enlace'}} ] , hint:{en,es} }

// 7. sandbox — live editor + preview + declarative checks (5-7 checks each)
{ type:'sandbox', lang:'html'|'css'|'js', prompt:{en,es},
  start:'<p>initial code</p>',
  fixture:'<h1 class="title">Hi</h1>',        // css/js only: fixed HTML the user styles/scripts
  target:{en,es}, targetCode:'<h1>Title</h1>',// optional: shows what to build
  solution:'<h1>Title</h1>',                  // used by the hint button
  checks:[...], explain:{en,es} }

// 8. arcade — Meteor Fixer mini-game (data only)
{ type:'arcade', prompt:{en,es},
  rounds:[ { question:{en:'Catch the closing tag of a paragraph',es:'Atrapa la etiqueta de cierre de un párrafo'},
             correct:'</p>', wrongs:['<p>','</div>','</a>'], speed:1 } ] }  // 4-6 rounds, speed 0.8-1.3
```

### Sandbox `checks` — declarative validators (pick 4-7 per exercise)

```js
{ dom:'h1', count:2, label:{en,es} }                          // ≥ count elements match selector
{ text:'h1', includes:'Hello', label:{en,es} }                // element text contains (case-insens.)
{ attr:'a', attrName:'href', attrValue:'https://x.dev', label:{en,es} }  // or attrIncludes / attrRegex
{ style:'h1', prop:'color', contains:'rgb(255, 0, 0)', label:{en,es} }   // computed style substring
{ style:'h1', prop:'font-size', equals:'48px', label:{en,es} }
{ console:{includes:'Hello'}, label:{en,es} }                 // js only: captured console output
{ expr:'double(4)', equals:'8', label:{en,es} }               // js only: evaluate expression after user code
{ codeIncludes:'addEventListener', label:{en,es} }            // user's code contains this substring
{ noError:true, label:{en,es} }                               // js only: no exceptions
```

**JS sandbox rules:** user code runs at page load in the iframe; `console.log` output is captured, and `{expr}` checks evaluate expressions AFTER the user code. Only use `Promise.resolve()` to simulate async data (never `setTimeout` — checks run before timers fire). Variables declared with `let`/`const` at top level ARE visible to `expr` checks.

**CSS color check rule:** browsers compute colors as `rgb(R, G, B)`. Use `contains` with the numeric form. Common ones: red `rgb(255, 0, 0)`, blue `rgb(0, 0, 255)`, green `rgb(0, 128, 0)`, orange `rgb(255, 165, 0)`, purple `rgb(128, 0, 128)`, teal `rgb(0, 128, 128)`, gold `rgb(255, 215, 0)`, hotpink `rgb(255, 105, 180)`, tomato `rgb(255, 99, 71)`, navy `rgb(0, 0, 128)`. font-weight bold computes to `700`. Font sizes compute to px (`2em` on 16px base = `32px`).

### Content quality bar
- 5–8 exercises per level; **at least 4 different types per level**; mix theory (mcq/match) and practice (fill/dnd/order/bug/sandbox).
- Every level ends with a **sandbox** mission (the payoff), except levels where an arcade is the finale.
- Sprinkle exactly one `arcade` exercise in ~every 3rd level of your batch (as mid-level review, not the finale).
- Progressively harder within your batch; each level teaches ONE concept.
- Beginner levels: shorter code; advanced: multi-line realistic snippets.
- Wrong-answer paths must be educational: explains always teach WHY.
- ES text natural and friendly; do not translate code identifiers or tag names.
- In `fill`/`bug` answers, accept sensible variants (quotes: both `"` styles; case where relevant).

---

## B. Explainer pages (one per level)

Create `D:\Projects\htmlcssjs\assets\explainers\{level-id}.html` — self-contained page following `html-01.html` EXACTLY:

```html
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><link rel="stylesheet" href="kit.css"><title>...</title></head>
<body>
<div id="stage"></div>
<script>
window.EXPLAINER = {
  title: { en:'...', es:'...' },
  scenes: [ ... ]   // 4-6 scenes, total dur 28-40 seconds
};
</script>
<script src="kit.js"></script>
</body>
</html>
```

### Explainer scene types (from kit.js)
- `{type:'title', emoji:'🎨', dur:5, title:{en,es}, subtitle:{en,es}, chips:[{en,es},...]}` — opener/closer
- `{type:'code', dur:8, code:'raw code', caption:{en,es}, labels:[{token:'<h1>', label:{en,es}}]}` — typing code + callouts
- `{type:'split', dur:8, code:'raw', result:'<b>rendered html</b>', caption:{en,es}}` — code ➜ browser preview
- `{type:'browser', dur:7, url:'https://x.dev', html:'<h1>...</h1>', caption:{en,es}}` — URL + rendered page
- `{type:'tree', dur:8, data:{tag:'html', kids:[{tag:'body', kids:[{tag:'h1'}]}]}, caption:{en,es}}` — DOM tree
- `{type:'quiz', dur:7, question:{en,es}, options:[{en,es},...], answer:0, caption:{en,es}}` — glow answer
- `{type:'console', dur:8, lines:[{t:'let x = 5;'}, {t:'5', out:true}], caption:{en,es}}` — code + output
- `{type:'steps', dur:10, frames:[{html:'<div>...</div>', css:''}, ...], caption:{en,es}}` — arbitrary frames crossfading
- `{type:'boxmodel', dur:10, focus:['content','padding','border','margin'], text:'Hello', caption:{en,es}}`
- `{type:'flex', dur:12, frames:[{css:'justify-content:center', justify:'center', align:'center'}], caption:{en,es}}`
- `{type:'transform', dur:8, emoji:'🚀', frames:[{css:'rotate(45deg)'}, {css:'scale(1.4)'}], caption:{en,es}}`
- `{type:'custom', dur:6, html:{en,es}, css:'...', caption:{en,es}}` — anything you want

Rules: scene captions are short (< 140 chars); code strings RAW (kit escapes them); first scene = `title`, last scene = "your turn" `title` with instructions; teach the same concept the level's exercises practice; captions bilingual.

---

## C. Self-check before you finish (do this!)
1. `node -e "global.window={}; require('D:/Projects/htmlcssjs/js/levels/YOURFILE.js'); const L=window.LEVELS_X; if(L.length!==N) throw 'wrong count'; L.forEach(lv=>{ if(!lv.id||!lv.track||!lv.num||!lv.narration?.en||!lv.narration?.es||!lv.outro?.en||!lv.outro?.es||!lv.explainer) throw 'missing field in '+lv.id; if(lv.exercises.length<5) throw 'too few exercises in '+lv.id; lv.exercises.forEach(ex=>{ if(!ex.type) throw 'no type in '+lv.id; if(ex.type==='mcq'&&(ex.answer==null||ex.options.length!==4)) throw 'bad mcq in '+lv.id; if(ex.type==='sandbox'&&!ex.checks?.length) throw 'no checks in '+lv.id; }); }); console.log('OK', L.length, 'levels');"`
2. Every explainer file loads kit.css BEFORE the EXPLAINER script and kit.js AFTER it.
3. Every id appears exactly once; `num` values match the table; `explainer` equals `id`.
4. Spanish reads naturally (read it aloud in your head).
