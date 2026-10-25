/* ============ HTML Nebula track — levels 1-12 ============
   Each level: id, track, num, icon, title/subtitle/narration/outro {en,es}, explainer, exercises[5-8].
   Exercise types: mcq | fill | dnd | order | bug | match | sandbox | arcade  */
window.LEVELS_HTML = [
  {
    id: 'html-01', track: 'html', num: 1, icon: '📄', xp: 100,
    title: { en: 'Your First Page', es: 'Tu primera página' },
    subtitle: { en: 'What is HTML and how to say hello to the universe', es: 'Qué es HTML y cómo saludar al universo' },
    narration: {
      en: "Welcome aboard, Cadet! I'm Cosmo, your robot guide. Today you build your very first web page with H T M L, the skeleton of every website. Ready for launch?",
      es: "¡Bienvenido a bordo, Cadete! Soy Cosmo, tu guía robot. Hoy construirás tu primera página web con HTML, el esqueleto de todos los sitios web. ¿Listo para el despegue?"
    },
    outro: {
      en: "Mission complete! You just built your first web page. The universe of code awaits.",
      es: "¡Misión completada! Acabas de construir tu primera página web. El universo del código te espera."
    },
    explainer: 'html-01',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'What does <b>HTML</b> stand for?', es: '¿Qué significa <b>HTML</b>?' },
        options: [
          { en: 'HyperText Markup Language', es: 'HyperText Markup Language' },
          { en: 'High Tech Modern Language', es: 'High Tech Modern Language' },
          { en: 'Home Tool Markup Logic', es: 'Home Tool Markup Logic' },
          { en: 'HyperTransfer Machine Link', es: 'HyperTransfer Machine Link' }
        ],
        answer: 0,
        explain: { en: 'HTML = HyperText Markup Language: it marks up text so browsers know how to show it.', es: 'HTML = HyperText Markup Language: marca el texto para que el navegador sepa mostrarlo.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build the heading <code>hello world</code>. Drag the tokens into order!', es: 'Construye el encabezado <code>hello world</code>. ¡Arrastra las piezas en orden!' },
        slots: ['<h1>', 'hello world', '</h1>'],
        distractors: ['<p>', '</p>'],
        explain: { en: 'An opening tag, the content, and a closing tag with a slash.', es: 'Una etiqueta de apertura, el contenido y una de cierre con barra.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Make a big heading that says <code>Cosmo</code>', es: 'Crea un encabezado grande que diga <code>Cosmo</code>' },
        template: '<h1>___</h1>',
        answers: [{ accept: ['Cosmo'] }],
        hint: { en: 'Type the text between the tags.', es: 'Escribe el texto entre las etiquetas.' },
        explain: { en: '<code>h1</code> means "heading level 1" — the biggest heading.', es: '<code>h1</code> significa "encabezado nivel 1" — el más grande.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'Which tag makes the <b>biggest</b> heading?', es: '¿Qué etiqueta crea el encabezado <b>más grande</b>?' },
        options: [{ en: '<h6>' }, { en: '<h1>' }, { en: '<head>' }, { en: '<big>' }],
        answer: 1,
        explain: { en: 'h1 is the largest, h6 the smallest. head is something else entirely!', es: 'h1 es el más grande, h6 el más pequeño. ¡head es otra cosa!' }
      },
      {
        type: 'sandbox',
        lang: 'html',
        prompt: { en: 'Mission: create <b>two</b> headings: an <code>&lt;h1&gt;</code> with the text <code>My Space Page</code> and an <code>&lt;h2&gt;</code> with <code>Episode 1</code>. Watch the live preview!', es: 'Misión: crea <b>dos</b> encabezados: un <code>&lt;h1&gt;</code> con el texto <code>My Space Page</code> y un <code>&lt;h2&gt;</code> con <code>Episode 1</code>. ¡Mira la vista previa!' },
        start: '<h1>My Space Page</h1>\n',
        target: { en: 'One h1 with "My Space Page" and one h2 with "Episode 1"', es: 'Un h1 con "My Space Page" y un h2 con "Episode 1"' },
        solution: '<h1>My Space Page</h1>\n<h2>Episode 1</h2>',
        checks: [
          { dom: 'h1', count: 1, label: { en: 'There is one h1', es: 'Hay un h1' } },
          { text: 'h1', includes: 'My Space Page', label: { en: 'The h1 says "My Space Page"', es: 'El h1 dice "My Space Page"' } },
          { dom: 'h2', count: 1, label: { en: 'There is one h2', es: 'Hay un h2' } },
          { text: 'h2', includes: 'Episode 1', label: { en: 'The h2 says "Episode 1"', es: 'El h2 dice "Episode 1"' } }
        ]
      }
    ]
  },
  {
    id: 'html-02', track: 'html', num: 2, icon: '🧩', xp: 100,
    title: { en: 'Anatomy of a Tag', es: 'Anatomía de una etiqueta' },
    subtitle: { en: 'Opening tags, closing tags and attributes', es: 'Etiquetas de apertura, cierre y atributos' },
    narration: {
      en: "Every HTML element has an opening tag, content, and a closing tag. Tags can also carry attributes, extra information written inside the opening tag. Let's dissect one!",
      es: "Cada elemento HTML tiene una etiqueta de apertura, contenido y una de cierre. Las etiquetas también pueden llevar atributos: información extra dentro de la etiqueta de apertura. ¡Disequémosla!"
    },
    outro: { en: "You've mastered tag anatomy, Cadet. Structure powers up!", es: "¡Dominaste la anatomía de las etiquetas, Cadete! Estructura potenciada." },
    explainer: 'html-02',
    exercises: [
      {
        type: 'match',
        prompt: { en: 'Match each part of <code>&lt;a href="https://web.dev"&gt;Link&lt;/a&gt;</code> to its name', es: 'Une cada parte de <code>&lt;a href="https://web.dev"&gt;Link&lt;/a&gt;</code> con su nombre' },
        lang: 'html',
        pairs: [
          { chip: '1', a: { en: '<a>', es: '<a>' }, b: { en: 'opening tag', es: 'etiqueta de apertura' } },
          { chip: '2', a: { en: 'href="..."', es: 'href="..."' }, b: { en: 'attribute (name + value)', es: 'atributo (nombre + valor)' } },
          { chip: '3', a: { en: 'Link', es: 'Link' }, b: { en: 'content', es: 'contenido' } },
          { chip: '4', a: { en: '</a>', es: '</a>' }, b: { en: 'closing tag', es: 'etiqueta de cierre' } }
        ],
        hint: { en: 'The slash / always appears in the closing tag.', es: 'La barra / siempre aparece en la etiqueta de cierre.' }
      },
      {
        type: 'bug',
        prompt: { en: 'One line breaks the page. Click the buggy line!', es: 'Una línea rompe la página. ¡Haz clic en la línea con error!' },
        lang: 'html',
        lines: ['<h1>Space News</h1>', '<p>Rockets are cool</p>', '<p>More news soon<</p>', '<h2>Bye</h2>'],
        bugLine: 2,
        fix: { accept: ['<p>More news soon</p>'] },
        explain: { en: 'The closing tag was malformed — it must be <code>&lt;/p&gt;</code>.', es: 'La etiqueta de cierre estaba mal formada — debe ser <code>&lt;/p&gt;</code>.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'Where do attributes live?', es: '¿Dónde viven los atributos?' },
        options: [
          { en: 'Inside the opening tag', es: 'Dentro de la etiqueta de apertura' },
          { en: 'Inside the content', es: 'Dentro del contenido' },
          { en: 'Inside the closing tag', es: 'Dentro de la etiqueta de cierre' },
          { en: 'In a separate file', es: 'En un archivo separado' }
        ],
        answer: 0,
        explain: { en: 'Attributes go in the opening tag, like <code>&lt;img src="cat.png"&gt;</code>.', es: 'Los atributos van en la etiqueta de apertura, como <code>&lt;img src="cat.png"&gt;</code>.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the lines of a valid link', es: 'Ordena las líneas de un enlace válido' },
        lang: 'html',
        lines: ['<a href="https://nasa.gov">', '  Go to space', '</a>'],
        explain: { en: 'Opening tag, content, closing tag — top to bottom.', es: 'Apertura, contenido, cierre — de arriba abajo.' }
      },
      {
        type: 'sandbox',
        lang: 'html',
        prompt: { en: 'Build a link to your favorite site: an <code>&lt;a&gt;</code> tag with an <code>href</code> attribute pointing to <code>https://cosmo.space</code> and any text you like.', es: 'Construye un enlace a tu sitio favorito: una etiqueta <code>&lt;a&gt;</code> con un atributo <code>href</code> que apunte a <code>https://cosmo.space</code> y el texto que quieras.' },
        start: '<!-- write your link here -->\n',
        target: { en: 'An <a> with href="https://cosmo.space"', es: 'Un <a> con href="https://cosmo.space"' },
        solution: '<a href="https://cosmo.space">Visit Cosmo</a>',
        checks: [
          { dom: 'a', count: 1, label: { en: 'There is one link (a)', es: 'Hay un enlace (a)' } },
          { attr: 'a', attrName: 'href', attrValue: 'https://cosmo.space', label: { en: 'The href points to https://cosmo.space', es: 'El href apunta a https://cosmo.space' } },
          { text: 'a', includes: 'cos', label: { en: 'The link has text', es: 'El enlace tiene texto' } }
        ]
      }
    ]
  },
  {
    id: 'html-03', track: 'html', num: 3, icon: '📝', xp: 100,
    title: { en: 'Paragraphs & Breaks', es: 'Párrafos y saltos' },
    subtitle: { en: 'Group text with p, br and hr', es: 'Agrupa texto con p, br y hr' },
    narration: {
      en: "Cadet, pages need more than headings. Meet the paragraph tag — it groups sentences into tidy blocks. Need a line break without starting a new block? There's a small break tag for that. And when one story ends, a divider tag draws a line across the page. Let's write your first ship's log!",
      es: "Cadete, las páginas necesitan más que encabezados. Te presento la etiqueta de párrafo: agrupa frases en bloques ordenados. ¿Necesitas un salto de línea sin empezar otro bloque? Hay una etiqueta pequeña para eso. Y cuando un capítulo termina, una etiqueta separadora dibuja una línea en la página. ¡Escribamos tu primera bitácora de nave!"
    },
    outro: {
      en: "Log saved, Cadet! Paragraphs, breaks and dividers — your pages are getting real structure.",
      es: "¡Bitácora guardada, Cadete! Párrafos, saltos y separadores: tus páginas ganan estructura real."
    },
    explainer: 'html-03',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'What does the <code>&lt;p&gt;</code> tag do?', es: '¿Qué hace la etiqueta <code>&lt;p&gt;</code>?' },
        options: [
          { en: 'It makes text bigger', es: 'Hace el texto más grande' },
          { en: 'It draws a horizontal line', es: 'Dibuja una línea horizontal' },
          { en: 'It groups text into a paragraph block', es: 'Agrupa el texto en un bloque de párrafo' },
          { en: 'It breaks the line without a new block', es: 'Corta la línea sin crear un bloque' }
        ],
        answer: 2,
        explain: { en: '<code>&lt;p&gt;</code> creates a paragraph: a block with space above and below. Text inside flows together.', es: '<code>&lt;p&gt;</code> crea un párrafo: un bloque con espacio arriba y abajo. El texto dentro fluye junto.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each tag to its job', es: 'Une cada etiqueta con su trabajo' },
        lang: 'html',
        pairs: [
          { chip: '1', a: { en: '<p>', es: '<p>' }, b: { en: 'paragraph — a block of text', es: 'párrafo — un bloque de texto' } },
          { chip: '2', a: { en: '<br>', es: '<br>' }, b: { en: 'line break inside a block', es: 'salto de línea dentro de un bloque' } },
          { chip: '3', a: { en: '<hr>', es: '<hr>' }, b: { en: 'horizontal rule — a divider line', es: 'línea horizontal — un separador' } }
        ],
        hint: { en: 'p = paragraph, br = break, hr = horizontal rule.', es: 'p = párrafo, br = salto, hr = línea horizontal.' },
        explain: { en: 'One block tag, one tiny break, one big divider — three ways to shape text.', es: 'Una etiqueta de bloque, un salto pequeño y un gran separador: tres formas de dar forma al texto.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Add a divider between the two log entries: type the divider tag.', es: 'Añade un separador entre las dos entradas de la bitácora: escribe la etiqueta separadora.' },
        template: '<p>Day 12: smooth launch</p>\n___\n<p>Day 13: meteors!</p>',
        answers: [{ accept: ['<hr>', '<hr/>', '<hr />'] }],
        hint: { en: 'A single tag — no closing tag needed. Two letters plus a slash-less h and r.', es: 'Una sola etiqueta — sin cierre. Una h y una r.' },
        explain: { en: '<code>&lt;hr&gt;</code> is a void tag: no closing tag, just a divider line across the page.', es: '<code>&lt;hr&gt;</code> es una etiqueta vacía: sin cierre, solo dibuja una línea separadora.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'Which tag just breaks the line <b>inside</b> the same block?', es: '¿Qué etiqueta corta la línea <b>dentro</b> del mismo bloque?' },
        options: [{ en: '<br>' }, { en: '<hr>' }, { en: '<p>' }, { en: '<break>' }],
        answer: 0,
        explain: { en: '<code>&lt;br&gt;</code> is a tiny break inside the same block; <code>&lt;p&gt;</code> starts a whole new paragraph.', es: '<code>&lt;br&gt;</code> es un salto pequeño dentro del mismo bloque; <code>&lt;p&gt;</code> empieza un párrafo nuevo.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build a two-line address inside ONE paragraph.', es: 'Construye una dirección de dos líneas dentro de UN párrafo.' },
        slots: ['<p>', 'Star Base 7', '<br>', 'Room 42', '</p>'],
        distractors: ['<hr>', '</br>'],
        explain: { en: '<code>&lt;br&gt;</code> pushes "Room 42" to a new line without ending the paragraph.', es: '<code>&lt;br&gt;</code> empuja "Room 42" a una línea nueva sin terminar el párrafo.' }
      },
      {
        type: 'bug',
        prompt: { en: 'One line breaks the log. Click the buggy line!', es: 'Una línea rompe la bitácora. ¡Haz clic en la línea con error!' },
        lang: 'html',
        lines: ['<h1>Ship Log</h1>', '<p>Day 12: still floating', '<p>Day 13: snacks found</p>', '<hr>'],
        bugLine: 1,
        fix: { accept: ['<p>Day 12: still floating</p>'] },
        explain: { en: 'The paragraph was never closed — every <code>&lt;p&gt;</code> needs its <code>&lt;/p&gt;</code>.', es: 'El párrafo nunca se cerró: cada <code>&lt;p&gt;</code> necesita su <code>&lt;/p&gt;</code>.' }
      },
      {
        type: 'sandbox',
        lang: 'html',
        prompt: { en: "Mission: write Cosmo's ship log — <b>two</b> <code>&lt;p&gt;</code> paragraphs that mention <code>Cosmo</code> and <code>stars</code>, one <code>&lt;br&gt;</code> line break inside a paragraph, and one <code>&lt;hr&gt;</code> divider.", es: "Misión: escribe la bitácora de Cosmo — <b>dos</b> párrafos <code>&lt;p&gt;</code> que mencionen a <code>Cosmo</code> y las <code>stars</code>, un salto <code>&lt;br&gt;</code> dentro de un párrafo y un separador <code>&lt;hr&gt;</code>." },
        start: '<!-- Captain\'s log -->\n',
        target: { en: 'Two paragraphs mentioning Cosmo and stars, a br line break and an hr divider', es: 'Dos párrafos que mencionen a Cosmo y las estrellas, un salto br y un separador hr' },
        solution: '<p>Cadet Cosmo reporting:<br>all systems go!</p>\n<p>The stars look amazing tonight.</p>\n<hr>',
        explain: { en: 'p makes blocks, br breaks a line inside one, hr draws the divider. Log complete!', es: 'p crea bloques, br corta la línea dentro de uno y hr dibuja el separador. ¡Bitácora completa!' },
        checks: [
          { dom: 'p', count: 2, label: { en: 'There are two paragraphs', es: 'Hay dos párrafos' } },
          { dom: 'br', count: 1, label: { en: 'There is one br line break', es: 'Hay un salto de línea br' } },
          { dom: 'hr', count: 1, label: { en: 'There is one hr divider', es: 'Hay un separador hr' } },
          { text: 'p', includes: 'cosmo', label: { en: 'The log mentions Cosmo', es: 'La bitácora menciona a Cosmo' } },
          { text: 'p', includes: 'stars', label: { en: 'The log mentions the stars', es: 'La bitácora menciona las estrellas' } }
        ]
      }
    ]
  },
  {
    id: 'html-04', track: 'html', num: 4, icon: '✨', xp: 100,
    title: { en: 'Strong & Emphasis', es: 'Importancia y énfasis' },
    subtitle: { en: 'Bold and italic with real meaning', es: 'Negrita y cursiva con significado' },
    narration: {
      en: "Sometimes a few words matter more than the rest. The strong tag tells browsers, screen readers and search engines: this text is really important. Its cousin, the em tag, adds gentle stress to a word. They look bold and italic — but they carry meaning, and that makes them stronger heroes than their look-alikes.",
      es: "A veces unas palabras importan más que las demás. La etiqueta strong les dice al navegador, a los lectores de pantalla y a los buscadores: este texto es muy importante. Su prima, la etiqueta em, le da un énfasis suave a una palabra. Parecen negrita y cursiva, pero llevan significado, y eso las hace más poderosas que sus parecidas."
    },
    outro: {
      en: "Bold moves, Cadet! Your words now carry real meaning, not just looks.",
      es: "¡Movimientos audaces, Cadete! Tus palabras ahora llevan significado real, no solo apariencia."
    },
    explainer: 'html-04',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Which pair of tags gives text <b>meaning</b> — importance and stress?', es: '¿Qué par de etiquetas da al texto <b>significado</b> — importancia y énfasis?' },
        options: [
          { en: '<bold> and <italic>', es: '<bold> y <italic>' },
          { en: '<u> and <s>', es: '<u> y <s>' },
          { en: '<strong> and <em>', es: '<strong> y <em>' },
          { en: '<important> and <stress>', es: '<important> y <stress>' }
        ],
        answer: 2,
        explain: { en: '<code>&lt;strong&gt;</code> = strong importance (renders bold). <code>&lt;em&gt;</code> = emphasis (renders italic). They mean something.', es: '<code>&lt;strong&gt;</code> = importancia fuerte (se ve en negrita). <code>&lt;em&gt;</code> = énfasis (se ve en cursiva). ¡Significan algo!' }
      },
      {
        type: 'mcq',
        prompt: { en: 'Why do screen readers prefer <code>&lt;strong&gt;</code> over <code>&lt;b&gt;</code>?', es: '¿Por qué los lectores de pantalla prefieren <code>&lt;strong&gt;</code> a <code>&lt;b&gt;</code>?' },
        options: [
          { en: 'It makes text brighter', es: 'Hace el texto más brillante' },
          { en: 'It tells them the text is truly important, not just bold', es: 'Les avisa que el texto es realmente importante, no solo negrita' },
          { en: 'It is shorter to read', es: 'Es más corto de leer' },
          { en: 'It works offline', es: 'Funciona sin internet' }
        ],
        answer: 1,
        explain: { en: 'b and i only change appearance. strong and em add meaning that assistive tech and search engines understand.', es: 'b y i solo cambian la apariencia. strong y em añaden significado que la tecnología de asistencia y los buscadores entienden.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Mark <code>meteor shower</code> as important and <code>tonight</code> with emphasis.', es: 'Marca <code>meteor shower</code> como importante y <code>tonight</code> con énfasis.' },
        template: '<p>Warning: <___>meteor shower</___> happens <___>tonight</___>.</p>',
        answers: [{ accept: ['strong'] }, { accept: ['strong'] }, { accept: ['em'] }, { accept: ['em'] }],
        hint: { en: 'First blank: importance. Second blank: emphasis.', es: 'Primer espacio: importancia. Segundo espacio: énfasis.' },
        explain: { en: '<code>&lt;strong&gt;</code> wraps important text; <code>&lt;em&gt;</code> adds stress. Both live inside the paragraph.', es: '<code>&lt;strong&gt;</code> envuelve texto importante; <code>&lt;em&gt;</code> añade énfasis. Ambos viven dentro del párrafo.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build: <b>Emergency cookies</b> <em>needed</em> right now! — as real HTML.', es: 'Construye: <b>Emergency cookies</b> <em>needed</em> right now! — en HTML de verdad.' },
        before: '<p>',
        after: ' right now!</p>',
        slots: ['<strong>', 'Emergency cookies', '</strong>', '<em>', 'needed', '</em>'],
        distractors: ['<b>', '<i>'],
        explain: { en: 'strong and em can sit inside a paragraph — nesting with meaning.', es: 'strong y em pueden vivir dentro de un párrafo: anidado con significado.' }
      },
      {
        type: 'bug',
        prompt: { en: 'The tags crossed! Click the broken line.', es: '¡Las etiquetas se cruzaron! Haz clic en la línea rota.' },
        lang: 'html',
        lines: ['<h1>Status</h1>', '<p><strong>Red alert</p></strong>', '<p>All calm in sector 7</p>'],
        bugLine: 1,
        fix: { accept: ['<p><strong>Red alert</strong></p>'] },
        explain: { en: 'Tags must close in reverse order: strong opened last, so it closes first.', es: 'Las etiquetas se cierran en orden inverso: strong se abrió al final, así que cierra primero.' }
      },
      {
        type: 'sandbox',
        lang: 'html',
        prompt: { en: "Mission: one paragraph that shouts <code>Red alert</code> inside a <code>&lt;strong&gt;</code> and whispers <code>now</code> inside an <code>&lt;em&gt;</code>.", es: "Misión: un párrafo que grite <code>Red alert</code> dentro de un <code>&lt;strong&gt;</code> y susurre <code>now</code> dentro de un <code>&lt;em&gt;</code>." },
        start: '<p>Red alert: launch now!</p>\n',
        target: { en: 'A paragraph with "Red alert" in strong and "now" in em', es: 'Un párrafo con "Red alert" en strong y "now" en em' },
        solution: '<p><strong>Red alert</strong>: launch <em>now</em>!</p>',
        explain: { en: 'strong and em wrap the words that matter — meaning first, style for free.', es: 'strong y em envuelven las palabras que importan: significado primero, estilo gratis.' },
        checks: [
          { dom: 'p', count: 1, label: { en: 'There is one paragraph', es: 'Hay un párrafo' } },
          { dom: 'strong', count: 1, label: { en: 'There is one strong', es: 'Hay un strong' } },
          { dom: 'em', count: 1, label: { en: 'There is one em', es: 'Hay un em' } },
          { text: 'strong', includes: 'red alert', label: { en: 'The strong says "Red alert"', es: 'El strong dice "Red alert"' } },
          { text: 'em', includes: 'now', label: { en: 'The em says "now"', es: 'El em dice "now"' } }
        ]
      }
    ]
  },
  {
    id: 'html-05', track: 'html', num: 5, icon: '🔗', xp: 100,
    title: { en: 'Link Like a Captain', es: 'Enlaza como capitán' },
    subtitle: { en: 'Relative and absolute URLs, tabs and email', es: 'URLs relativas y absolutas, pestañas y correo' },
    narration: {
      en: "Links can do more than jump to one address. A full web address takes you anywhere in the universe; a short relative address finds a file on your own ship. You can open pages in a new tab, and even launch the visitor's email app with a special mail-to link. Ready to link like a captain?",
      es: "Los enlaces pueden hacer más que saltar a una dirección. Una dirección web completa te lleva a cualquier lugar del universo; una dirección relativa corta busca un archivo en tu propia nave. Puedes abrir páginas en una pestaña nueva e incluso abrir el correo del visitante con un enlace especial. ¿Listo para enlazar como un capitán?"
    },
    outro: {
      en: "Masterful linking! Your pages now connect to the whole universe — and to inboxes too.",
      es: "¡Enlaces magistrales! Tus páginas se conectan con todo el universo… y con los correos también."
    },
    explainer: 'html-05',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Which address is <b>absolute</b>?', es: '¿Qué dirección es <b>absoluta</b>?' },
        options: [
          { en: 'https://cosmo.dev', es: 'https://cosmo.dev' },
          { en: 'about.html', es: 'about.html' },
          { en: 'img/rocket.png', es: 'img/rocket.png' },
          { en: '../blog/post.html', es: '../blog/post.html' }
        ],
        answer: 0,
        explain: { en: 'Absolute = full address with https:// — works from anywhere. Relative = a path inside your own site.', es: 'Absoluta = dirección completa con https:// — funciona desde cualquier lugar. Relativa = una ruta dentro de tu propio sitio.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'What does <code>target="_blank"</code> do?', es: '¿Qué hace <code>target="_blank"</code>?' },
        options: [
          { en: 'Deletes the link', es: 'Borra el enlace' },
          { en: 'Makes the link bold', es: 'Pone el enlace en negrita' },
          { en: 'Opens the link in a new tab', es: 'Abre el enlace en una pestaña nueva' },
          { en: 'Blanks the page text', es: 'Borra el texto de la página' }
        ],
        answer: 2,
        explain: { en: 'target="_blank" tells the browser: open this page in a new tab, keeping yours safe.', es: 'target="_blank" le dice al navegador: abre esta página en una pestaña nueva y conserva la tuya.' }
      },
      {
        type: 'fill',
        prompt: { en: "Make the link open Cosmo's mailbox: the address is <code>cosmo@space.dev</code>.", es: 'Haz que el enlace abra el buzón de Cosmo: la dirección es <code>cosmo@space.dev</code>.' },
        template: '<a href="___">Email Cosmo</a>',
        answers: [{ accept: ['mailto:cosmo@space.dev'] }],
        hint: { en: 'Start with mailto: — no spaces.', es: 'Empieza con mailto: — sin espacios.' },
        explain: { en: 'mailto: inside href opens the visitor\'s email app with the address filled in.', es: 'mailto: dentro de href abre la app de correo del visitante con la dirección lista.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build a link to <code>news.html</code> that opens in a <b>new tab</b>.', es: 'Construye un enlace a <code>news.html</code> que abra en una <b>pestaña nueva</b>.' },
        slots: ['<a href="news.html" target="_blank">', 'Cosmo News', '</a>'],
        distractors: ['target="_top"', '</link>'],
        explain: { en: 'target="_blank" is an attribute of the opening tag — right next to href.', es: 'target="_blank" es un atributo de la etiqueta de apertura — junto a href.' }
      },
      {
        type: 'bug',
        prompt: { en: 'One link is missing something. Click the buggy line!', es: 'A un enlace le falta algo. ¡Haz clic en la línea con error!' },
        lang: 'html',
        lines: ['<h1>My Site</h1>', '<a href=gallery.html>Gallery</a>', '<a href="contact.html">Contact</a>'],
        bugLine: 1,
        fix: { accept: ['<a href="gallery.html">Gallery</a>', "<a href='gallery.html'>Gallery</a>"] },
        explain: { en: 'Attribute values go inside quotes: <code>href="gallery.html"</code>.', es: 'Los valores de los atributos van entre comillas: <code>href="gallery.html"</code>.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each link part to its job', es: 'Une cada parte del enlace con su trabajo' },
        lang: 'html',
        pairs: [
          { chip: '1', a: { en: 'https://nasa.gov', es: 'https://nasa.gov' }, b: { en: 'absolute URL — anywhere on the web', es: 'URL absoluta — a cualquier parte de la web' } },
          { chip: '2', a: { en: 'about.html', es: 'about.html' }, b: { en: 'relative URL — a file on your own site', es: 'URL relativa — un archivo de tu propio sitio' } },
          { chip: '3', a: { en: 'mailto:hi@cosmo.dev', es: 'mailto:hi@cosmo.dev' }, b: { en: 'opens the email app', es: 'abre la app de correo' } },
          { chip: '4', a: { en: 'target="_blank"', es: 'target="_blank"' }, b: { en: 'opens the page in a new tab', es: 'abre la página en una pestaña nueva' } }
        ],
        hint: { en: 'One starts with https://, one opens your inbox.', es: 'Una empieza con https://, otra abre tu buzón.' },
        explain: { en: 'Each part tells the browser where to go and how to get there.', es: 'Cada parte le dice al navegador adónde ir y cómo llegar.' }
      },
      {
        type: 'sandbox',
        lang: 'html',
        prompt: { en: "Mission: build Cosmo's link bar — 3 links: to <code>https://cosmo.space</code> with text <code>Cosmo HQ</code> and <code>target=\"_blank\"</code>; to <code>about.html</code> with text <code>About me</code>; and to <code>mailto:cadet@cosmo.space</code> with any text.", es: "Misión: construye la barra de enlaces de Cosmo — 3 enlaces: a <code>https://cosmo.space</code> con texto <code>Cosmo HQ</code> y <code>target=\"_blank\"</code>; a <code>about.html</code> con texto <code>About me</code>; y a <code>mailto:cadet@cosmo.space</code> con el texto que quieras." },
        start: '<!-- link bar -->\n',
        target: { en: 'Three links: absolute (new tab), relative and mailto', es: 'Tres enlaces: absoluto (pestaña nueva), relativo y mailto' },
        solution: '<a href="https://cosmo.space" target="_blank">Cosmo HQ</a>\n<a href="about.html">About me</a>\n<a href="mailto:cadet@cosmo.space">Email me</a>',
        explain: { en: 'Absolute, relative and mailto — three destinations, one tiny tag.', es: 'Absoluto, relativo y mailto: tres destinos, una sola etiqueta.' },
        checks: [
          { dom: 'a', count: 3, label: { en: 'There are three links', es: 'Hay tres enlaces' } },
          { attr: 'a', attrName: 'href', attrRegex: '^https://', label: { en: 'One link is absolute (starts with https://)', es: 'Un enlace es absoluto (empieza con https://)' } },
          { attr: 'a', attrName: 'href', attrValue: 'about.html', label: { en: 'One link points to about.html', es: 'Un enlace apunta a about.html' } },
          { attr: 'a', attrName: 'href', attrIncludes: 'mailto:', label: { en: 'One link is an email link', es: 'Un enlace es de correo' } },
          { attr: 'a', attrName: 'target', attrValue: '_blank', label: { en: 'One link opens in a new tab', es: 'Un enlace abre en pestaña nueva' } },
          { text: 'a', includes: 'cosmo hq', label: { en: 'The web link says "Cosmo HQ"', es: 'El enlace web dice "Cosmo HQ"' } }
        ]
      }
    ]
  },
  {
    id: 'html-06', track: 'html', num: 6, icon: '🖼️', xp: 100,
    title: { en: 'Images On Board', es: 'Imágenes a bordo' },
    subtitle: { en: 'img, src, width — and why alt matters', es: 'img, src, width y por qué alt importa' },
    narration: {
      en: "Every page needs pictures! The image tag shows a photo from a file. It has no closing tag, but it carries attributes: the source says which file to show, the width sets its size, and the alt text describes the picture for cadets who cannot see it. Alt text is a superpower — never skip it!",
      es: "¡Toda página necesita imágenes! La etiqueta de imagen muestra una foto desde un archivo. No tiene etiqueta de cierre, pero lleva atributos: el origen indica qué archivo mostrar, el ancho define el tamaño y el texto alternativo describe la imagen para quienes no pueden verla. ¡El texto alternativo es un superpoder: nunca lo omitas!"
    },
    outro: {
      en: "Picture perfect, Cadet! Remember: every image on your page deserves a helpful alt description.",
      es: "¡Imagen perfecta, Cadete! Recuerda: cada imagen de tu página merece una descripción alt útil."
    },
    explainer: 'html-06',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Which attribute describes the picture for screen readers?', es: '¿Qué atributo describe la imagen para los lectores de pantalla?' },
        options: [{ en: 'src' }, { en: 'alt' }, { en: 'width' }, { en: 'title' }],
        answer: 1,
        explain: { en: 'alt = alternative text. It describes the image and is read aloud — accessibility!', es: 'alt = texto alternativo. Describe la imagen y se lee en voz alta: ¡accesibilidad!' }
      },
      {
        type: 'mcq',
        prompt: { en: 'What is special about the <code>&lt;img&gt;</code> tag?', es: '¿Qué tiene de especial la etiqueta <code>&lt;img&gt;</code>?' },
        options: [
          { en: 'It has no closing tag', es: 'No tiene etiqueta de cierre' },
          { en: 'It only works with videos', es: 'Solo funciona con videos' },
          { en: 'It needs a paragraph around it', es: 'Necesita un párrafo alrededor' },
          { en: 'It can hold text inside', es: 'Puede contener texto dentro' }
        ],
        answer: 0,
        explain: { en: 'img is a void tag: everything (src, alt, width) lives inside the one opening tag.', es: 'img es una etiqueta vacía: todo (src, alt, width) vive dentro de la única etiqueta de apertura.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Give the image its description: fill in the missing attribute.', es: 'Dale su descripción a la imagen: completa el atributo que falta.' },
        template: '<img src="moon.png" ___="Full moon over the base">',
        answers: [{ accept: ['alt'] }],
        hint: { en: 'Three letters. It means "alternative text".', es: 'Tres letras. Significa "texto alternativo".' },
        explain: { en: 'alt = alternative text. It shows when the image fails and is read aloud by screen readers.', es: 'alt = texto alternativo. Aparece si la imagen falla y los lectores de pantalla lo leen en voz alta.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build the image tag for <code>rocket.png</code>.', es: 'Construye la etiqueta de imagen para <code>rocket.png</code>.' },
        slots: ['<img', ' src="rocket.png"', ' alt="Red rocket"', '>'],
        distractors: ['</img>', '<image>'],
        explain: { en: 'img is a void tag: attributes inside the opening tag, then just <code>&gt;</code>. No closing tag!', es: 'img es una etiqueta vacía: los atributos van dentro de la etiqueta de apertura y luego solo <code>&gt;</code>. ¡Sin cierre!' }
      },
      {
        type: 'bug',
        prompt: { en: 'One image tag has a broken quote. Click the buggy line!', es: 'Una etiqueta de imagen tiene una comilla rota. ¡Haz clic en la línea con error!' },
        lang: 'html',
        lines: ['<h1>Space Gallery</h1>', '<img src="star.png" alt="Star">', '<img src="comet.png alt="Blue comet">', '<p>More soon</p>'],
        bugLine: 2,
        fix: { accept: ['<img src="comet.png" alt="Blue comet">', "<img src='comet.png' alt='Blue comet'>"] },
        explain: { en: 'Each attribute value needs both quotes: <code>src="comet.png"</code>.', es: 'Cada valor de atributo necesita sus dos comillas: <code>src="comet.png"</code>.' }
      },
      {
        type: 'arcade',
        prompt: { en: 'Meteor drill! Catch the right tokens before they hit the deck.', es: '¡Entrenamiento de meteoros! Atrapa los tokens correctos antes de que golpeen la cubierta.' },
        rounds: [
          { question: { en: 'Catch the tag that shows a picture', es: 'Atrapa la etiqueta que muestra una imagen' }, correct: '<img>', wrongs: ['<image>', '<pic>', '<photo>'], speed: 1 },
          { question: { en: 'Catch the attribute with the picture file', es: 'Atrapa el atributo con el archivo de la imagen' }, correct: 'src', wrongs: ['alt', 'width', 'href'], speed: 0.9 },
          { question: { en: 'Catch the attribute that describes the picture', es: 'Atrapa el atributo que describe la imagen' }, correct: 'alt', wrongs: ['src', 'width', 'title'], speed: 1.1 },
          { question: { en: 'Catch the closing tag of a paragraph', es: 'Atrapa la etiqueta de cierre de un párrafo' }, correct: '</p>', wrongs: ['<p>', '</img>', '</br>'], speed: 1 },
          { question: { en: 'Catch the tag that ends a link', es: 'Atrapa la etiqueta que termina un enlace' }, correct: '</a>', wrongs: ['<a>', '</img>', '</link>'], speed: 0.8 }
        ],
        explain: { en: 'Quick review — images, attributes and old friends from earlier levels.', es: 'Repaso rápido: imágenes, atributos y viejos amigos de niveles anteriores.' }
      },
      {
        type: 'sandbox',
        lang: 'html',
        prompt: { en: 'Mission: a mini gallery — two <code>&lt;img&gt;</code> tags. First: <code>src="comet.png"</code> with <code>alt="Blue comet"</code>. Second: any file, but give it alt text too. Make one of them <code>width="150"</code>.', es: 'Misión: una mini galería — dos etiquetas <code>&lt;img&gt;</code>. Primera: <code>src="comet.png"</code> con <code>alt="Blue comet"</code>. Segunda: el archivo que quieras, pero también con texto alt. A una de ellas dale <code>width="150"</code>.' },
        start: '<img src="comet.png" alt="">\n',
        target: { en: 'Two images: comet.png with alt "Blue comet", alt text on both, one with width="150"', es: 'Dos imágenes: comet.png con alt "Blue comet", texto alt en ambas y una con width="150"' },
        solution: '<img src="comet.png" alt="Blue comet" width="150">\n<img src="star.png" alt="A shooting star">',
        explain: { en: 'src loads the file, alt describes it, width sizes it. The gallery is accessible!', es: 'src carga el archivo, alt lo describe y width le da tamaño. ¡La galería es accesible!' },
        checks: [
          { dom: 'img', count: 2, label: { en: 'There are two images', es: 'Hay dos imágenes' } },
          { attr: 'img', attrName: 'src', attrValue: 'comet.png', label: { en: 'One image shows comet.png', es: 'Una imagen muestra comet.png' } },
          { attr: 'img', attrName: 'alt', attrValue: 'Blue comet', label: { en: 'The comet has alt "Blue comet"', es: 'El cometa tiene alt "Blue comet"' } },
          { attr: 'img', attrName: 'width', attrRegex: '^[0-9]+$', label: { en: 'One image has a width in pixels', es: 'Una imagen tiene width en píxeles' } },
          { codeIncludes: 'alt=', label: { en: 'Your code writes alt text for the images', es: 'Tu código escribe texto alt para las imágenes' } }
        ]
      }
    ]
  },
  {
    id: 'html-07', track: 'html', num: 7, icon: '📋', xp: 100,
    title: { en: 'List It All', es: 'Todo en listas' },
    subtitle: { en: 'Bulleted and numbered lists, even nested', es: 'Listas con viñetas, numeradas y anidadas' },
    narration: {
      en: "Lists keep a cadet's life organized. The unordered list makes bullet points, perfect for collections like your space snacks. The ordered list numbers your steps, perfect for launch checklists. Each item inside gets its own list-item tag, and lists can even nest inside each other. Let's make some order in the nebula!",
      es: "Las listas mantienen ordenada la vida de un cadete. La lista sin orden crea viñetas, perfecta para colecciones como tus antojos espaciales. La lista ordenada numera tus pasos, perfecta para una lista de despegue. Cada elemento lleva su propia etiqueta, ¡y las listas pueden anidarse unas dentro de otras! ¡Ordenemos la nebulosa!"
    },
    outro: {
      en: "List-tastic! Bullets, numbers and nested items — you organize the nebula like a pro.",
      es: "¡Listas espectaculares! Viñetas, números y elementos anidados: organizas la nebulosa como un profesional."
    },
    explainer: 'html-07',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Which list shows <b>numbers</b>?', es: '¿Qué lista muestra <b>números</b>?' },
        options: [{ en: '<ul>' }, { en: '<ol>' }, { en: '<li>' }, { en: '<list>' }],
        answer: 1,
        explain: { en: 'ol = ordered list: 1, 2, 3… ul = unordered: bullets. Both hold li items.', es: 'ol = lista ordenada: 1, 2, 3… ul = lista sin orden: viñetas. Ambas guardan elementos li.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each tag to its job', es: 'Une cada etiqueta con su trabajo' },
        lang: 'html',
        pairs: [
          { chip: '1', a: { en: '<ul>', es: '<ul>' }, b: { en: 'bulleted list', es: 'lista con viñetas' } },
          { chip: '2', a: { en: '<ol>', es: '<ol>' }, b: { en: 'numbered list', es: 'lista numerada' } },
          { chip: '3', a: { en: '<li>', es: '<li>' }, b: { en: 'one list item', es: 'un elemento de la lista' } }
        ],
        hint: { en: 'ol = ordered.', es: 'ol = ordenada.' },
        explain: { en: 'Lists are containers plus items: ul or ol wraps many li tags.', es: 'Las listas son contenedores más elementos: ul u ol envuelve muchas etiquetas li.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build a bulleted list of space snacks.', es: 'Construye una lista con viñetas de antojos espaciales.' },
        slots: ['<ul>', '<li>Moon cookies</li>', '<li>Star juice</li>', '</ul>'],
        distractors: ['<ol>', '</li>'],
        explain: { en: 'Every item is wrapped in its own <code>&lt;li&gt;</code>, all inside the <code>&lt;ul&gt;</code>.', es: 'Cada elemento va envuelto en su propio <code>&lt;li&gt;</code>, todos dentro del <code>&lt;ul&gt;</code>.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Add the middle step: a list item that says <code>Fuel the rocket</code>.', es: 'Añade el paso intermedio: un elemento que diga <code>Fuel the rocket</code>.' },
        template: '<ol>\n  <li>Suit up</li>\n  ___\n  <li>Liftoff!</li>\n</ol>',
        answers: [{ accept: ['<li>Fuel the rocket</li>'] }],
        hint: { en: 'Wrap the text in the list-item tag.', es: 'Envuelve el texto en la etiqueta de elemento de lista.' },
        explain: { en: 'Ordered lists number their items automatically — you just add <code>&lt;li&gt;</code>s.', es: 'Las listas ordenadas numeran sus elementos solas — tú solo agregas <code>&lt;li&gt;</code>.' }
      },
      {
        type: 'bug',
        prompt: { en: 'This list has an intruder. Click the broken line!', es: 'Esta lista tiene un intruso. ¡Haz clic en la línea con error!' },
        lang: 'html',
        lines: ['<ul>', '<li>Helmet</li>', '<p>Gloves</p>', '</ul>'],
        bugLine: 2,
        fix: { accept: ['<li>Gloves</li>'] },
        explain: { en: 'Only <code>&lt;li&gt;</code> items may live directly inside a list.', es: 'Solo los elementos <code>&lt;li&gt;</code> pueden vivir directamente dentro de una lista.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the lines of a list with a nested list inside', es: 'Ordena las líneas de una lista con otra lista anidada dentro' },
        lang: 'html',
        lines: ['<ul>', '  <li>Backpack', '    <ul>', '      <li>Rope</li>', '    </ul>', '  </li>', '</ul>'],
        explain: { en: 'A whole new list can live inside one item — open it inside the li, close it before the li closes.', es: 'Una lista nueva puede vivir dentro de un elemento: ábrela dentro del li y ciérrala antes de cerrar el li.' }
      },
      {
        type: 'sandbox',
        lang: 'html',
        prompt: { en: "Mission: the launch checklist — an <code>&lt;ol&gt;</code> with 3 steps: <code>Suit up</code>, <code>Buckle up</code>, <code>Countdown</code>. Then a <code>&lt;ul&gt;</code> with <code>Helmet</code> and <code>Gloves</code> — and inside the <code>Helmet</code> item, nest a second <code>&lt;ul&gt;</code> with <code>Visor</code> and <code>Radio</code>.", es: "Misión: la lista de despegue — una <code>&lt;ol&gt;</code> con 3 pasos: <code>Suit up</code>, <code>Buckle up</code>, <code>Countdown</code>. Luego una <code>&lt;ul&gt;</code> con <code>Helmet</code> y <code>Gloves</code> — y dentro del elemento <code>Helmet</code>, anida otra <code>&lt;ul&gt;</code> con <code>Visor</code> y <code>Radio</code>." },
        start: '<ol>\n  <li>Suit up</li>\n</ol>\n',
        target: { en: 'An ol with 3 steps and a ul with 2 items, one holding a nested ul', es: 'Una ol con 3 pasos y una ul con 2 elementos, uno con una ul anidada' },
        solution: '<ol>\n  <li>Suit up</li>\n  <li>Buckle up</li>\n  <li>Countdown</li>\n</ol>\n<ul>\n  <li>Helmet\n    <ul>\n      <li>Visor</li>\n      <li>Radio</li>\n    </ul>\n  </li>\n  <li>Gloves</li>\n</ul>',
        explain: { en: 'ol for ordered steps, ul for gear — and lists nest inside li like pockets.', es: 'ol para pasos ordenados, ul para el equipo — y las listas se anidan dentro del li como bolsillos.' },
        checks: [
          { dom: 'ol', count: 1, label: { en: 'There is one ordered list', es: 'Hay una lista ordenada' } },
          { dom: 'ul', count: 2, label: { en: 'There are two unordered lists (one nested)', es: 'Hay dos listas sin orden (una anidada)' } },
          { dom: 'li', count: 7, label: { en: 'There are 7 list items in total', es: 'Hay 7 elementos de lista en total' } },
          { text: 'ol', includes: 'countdown', label: { en: 'The ol includes the Countdown step', es: 'La ol incluye el paso Countdown' } },
          { text: 'ul', includes: 'helmet', label: { en: 'The gear list includes Helmet', es: 'La lista de equipo incluye Helmet' } },
          { text: 'ul ul', includes: 'radio', label: { en: 'The nested list includes Radio', es: 'La lista anidada incluye Radio' } }
        ]
      }
    ]
  },
  {
    id: 'html-08', track: 'html', num: 8, icon: '📦', xp: 100,
    title: { en: 'Boxes in Boxes', es: 'Cajas en cajas' },
    subtitle: { en: 'Divs, nesting rules and indentation', es: 'Divs, reglas de anidado e indentación' },
    narration: {
      en: "Big pages are built from boxes inside boxes. The divider tag creates an invisible container that groups related content, so you can move and style whole sections later. But nesting has one golden rule: close tags in the reverse order you opened them. Tags should never cross. Indent your code so every box is easy to see.",
      es: "Las páginas grandes se construyen con cajas dentro de cajas. La etiqueta de división crea un contenedor invisible que agrupa contenido relacionado, para que puedas moverlo y darle estilo más tarde. Pero el anidado tiene una regla de oro: cierra las etiquetas en orden inverso a como las abriste. Las etiquetas nunca deben cruzarse. Indenta tu código para ver cada caja."
    },
    outro: {
      en: "Boxes inside boxes, all in perfect order. Your structure skills just leveled up!",
      es: "¡Cajas dentro de cajas, todo en perfecto orden! Tus habilidades de estructura acaban de subir de nivel."
    },
    explainer: 'html-08',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'What does <code>&lt;div&gt;</code> do?', es: '¿Qué hace <code>&lt;div&gt;</code>?' },
        options: [
          { en: 'Groups other tags into a container box', es: 'Agrupa otras etiquetas en un contenedor' },
          { en: 'Draws a visible box border', es: 'Dibuja un borde visible' },
          { en: 'Divides the page with a line', es: 'Divide la página con una línea' },
          { en: 'Makes text bold', es: 'Pone el texto en negrita' }
        ],
        answer: 0,
        explain: { en: 'A div is an invisible container. Group content now, style it later (with CSS!).', es: 'Un div es un contenedor invisible. Agrupa el contenido ahora, dale estilo después (¡con CSS!).' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each piece to its meaning', es: 'Une cada pieza con su significado' },
        lang: 'html',
        pairs: [
          { chip: '1', a: { en: '<div>', es: '<div>' }, b: { en: 'a container that groups content', es: 'un contenedor que agrupa contenido' } },
          { chip: '2', a: { en: '<div><p>Hi</p></div>', es: '<div><p>Hi</p></div>' }, b: { en: 'correctly nested — like Russian dolls', es: 'anidado correcto — como muñecas rusas' } },
          { chip: '3', a: { en: '<p><div>Hi</p></div>', es: '<p><div>Hi</p></div>' }, b: { en: 'crossed tags — never do this', es: 'etiquetas cruzadas — nunca hagas esto' } },
          { chip: '4', a: { en: 'indentation', es: 'indentación' }, b: { en: 'spaces that show nesting depth', es: 'espacios que muestran la profundidad del anidado' } }
        ],
        hint: { en: 'One of these is a crime scene.', es: 'Una de estas es una escena del crimen.' },
        explain: { en: 'div groups content; correct nesting closes inner tags first; indentation keeps it readable.', es: 'div agrupa contenido; el anidado correcto cierra primero las etiquetas internas; la indentación lo mantiene legible.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Add a paragraph that says <code>Oxygen tanks</code> inside the box.', es: 'Añade un párrafo que diga <code>Oxygen tanks</code> dentro de la caja.' },
        template: '<div>\n  <h2>Cargo bay</h2>\n  ___\n</div>',
        answers: [{ accept: ['<p>Oxygen tanks</p>'] }],
        hint: { en: 'A normal paragraph, indented one level.', es: 'Un párrafo normal, indentado un nivel.' },
        explain: { en: 'The p sits inside the div — the indentation shows it at a glance.', es: 'El p vive dentro del div — la indentación lo muestra de un vistazo.' }
      },
      {
        type: 'bug',
        prompt: { en: 'Crossed tags alert! Click the broken line.', es: '¡Alerta de etiquetas cruzadas! Haz clic en la línea rota.' },
        lang: 'html',
        lines: ['<div>', '<p><em>Space camp</p></em>', '</div>'],
        bugLine: 1,
        fix: { accept: ['<p><em>Space camp</em></p>'] },
        explain: { en: 'Crossed tags confuse the browser. Close em before p — last opened, first closed.', es: 'Las etiquetas cruzadas confunden al navegador. Cierra em antes que p — la última en abrirse, la primera en cerrarse.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the lines of a tidy card', es: 'Ordena las líneas de una tarjeta ordenada' },
        lang: 'html',
        lines: ['<div class="panel">', '  <h2>Engine room</h2>', '  <p>Handle with care</p>', '</div>'],
        explain: { en: 'The card pattern: open the box, put content in (indented), close the box.', es: 'El patrón tarjeta: abre la caja, mete el contenido (indentado), cierra la caja.' }
      },
      {
        type: 'sandbox',
        lang: 'html',
        prompt: { en: "Mission: a space station page — an outer <code>&lt;div&gt;</code> with an <code>&lt;h2&gt;</code> that says <code>My Station</code> and a <code>&lt;p&gt;</code> saying <code>Home in orbit</code>. Inside that div, add another <code>&lt;div&gt;</code> with a <code>&lt;p&gt;</code> that says <code>Engine room</code>.", es: "Misión: una página de estación espacial — un <code>&lt;div&gt;</code> exterior con un <code>&lt;h2&gt;</code> que diga <code>My Station</code> y un <code>&lt;p&gt;</code> que diga <code>Home in orbit</code>. Dentro de ese div, agrega otro <code>&lt;div&gt;</code> con un <code>&lt;p&gt;</code> que diga <code>Engine room</code>." },
        start: '<div>\n  <h2>My Station</h2>\n\n</div>\n',
        target: { en: 'A div with h2 + p, containing another div with a p', es: 'Un div con h2 + p, que contiene otro div con un p' },
        solution: '<div>\n  <h2>My Station</h2>\n  <p>Home in orbit</p>\n  <div>\n    <p>Engine room</p>\n  </div>\n</div>',
        explain: { en: 'Boxes inside boxes: indent each level so the structure reads at a glance.', es: 'Cajas dentro de cajas: indenta cada nivel para que la estructura se lea de un vistazo.' },
        checks: [
          { dom: 'div', count: 2, label: { en: 'There are two divs', es: 'Hay dos divs' } },
          { dom: 'h2', count: 1, label: { en: 'There is one h2', es: 'Hay un h2' } },
          { dom: 'div div', count: 1, label: { en: 'One div lives inside the other', es: 'Un div vive dentro del otro' } },
          { text: 'h2', includes: 'my station', label: { en: 'The h2 says "My Station"', es: 'El h2 dice "My Station"' } },
          { text: 'div p', includes: 'home in orbit', label: { en: 'The outer box holds "Home in orbit"', es: 'La caja exterior guarda "Home in orbit"' } },
          { text: 'div div p', includes: 'engine room', label: { en: 'The inner box holds "Engine room"', es: 'La caja interior guarda "Engine room"' } }
        ]
      }
    ]
  },
  {
    id: 'html-09', track: 'html', num: 9, icon: '📊', xp: 100,
    title: { en: 'Table the Data', es: 'Datos en tablas' },
    subtitle: { en: 'Build tables with rows, headers and cells', es: 'Construye tablas con filas, encabezados y celdas' },
    narration: {
      en: "Data wants order, and tables deliver. The table tag builds the frame; each row tag stacks a new line, and inside rows live the cells. Header cells name your columns with extra importance, and data cells hold the values. Wait — something is blinking on the radar! Meteors incoming: dodge them first, then build your crew table.",
      es: "Los datos quieren orden, y las tablas lo logran. La etiqueta de tabla arma el marco; cada etiqueta de fila apila una línea nueva, y dentro de las filas viven las celdas. Las celdas de encabezado nombran tus columnas con importancia extra, y las celdas de datos guardan los valores. ¡Espera, algo parpadea en el radar! ¡Meteoritos a la vista: esquívalos primero y luego arma tu tabla de tripulación!"
    },
    outro: {
      en: "Table complete and meteors dodged! Your data has never looked this tidy.",
      es: "¡Tabla completa y meteoritos esquivados! Tus datos nunca se vieron tan ordenados."
    },
    explainer: 'html-09',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Which tag makes a table <b>row</b>?', es: '¿Qué etiqueta crea una <b>fila</b> de tabla?' },
        options: [{ en: '<td>' }, { en: '<tr>' }, { en: '<th>' }, { en: '<row>' }],
        answer: 1,
        explain: { en: 'tr = table row. Rows hold cells; the table holds rows.', es: 'tr = fila de tabla. Las filas guardan celdas; la tabla guarda filas.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'What is the difference between <code>&lt;th&gt;</code> and <code>&lt;td&gt;</code>?', es: '¿Cuál es la diferencia entre <code>&lt;th&gt;</code> y <code>&lt;td&gt;</code>?' },
        options: [
          { en: 'They are identical', es: 'Son idénticas' },
          { en: 'td is for tables, th for lists', es: 'td es para tablas, th para listas' },
          { en: 'th must be inside td', es: 'th debe ir dentro de td' },
          { en: 'th is a header cell; td holds data', es: 'th es celda de encabezado; td guarda datos' }
        ],
        answer: 3,
        explain: { en: 'th marks header cells (bold, centered — the column names); td holds the regular data.', es: 'th marca celdas de encabezado (negrita, centradas — los nombres de columna); td guarda los datos normales.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Complete the data cell for Mars.', es: 'Completa la celda de datos para Mars.' },
        template: '<table>\n  <tr><th>Planet</th></tr>\n  <tr><___>Mars</___></tr>\n</table>',
        answers: [{ accept: ['td'] }, { accept: ['td'] }],
        hint: { en: 'Data cells use the two-letter tag.', es: 'Las celdas de datos usan la etiqueta de dos letras.' },
        explain: { en: 'th for headers, td for data. Mars is data!', es: 'th para encabezados, td para datos. ¡Mars es un dato!' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build one row with a header cell and a data cell.', es: 'Construye una fila con una celda de encabezado y una de datos.' },
        slots: ['<tr>', '<th>Name</th>', '<td>Cosmo</td>', '</tr>'],
        distractors: ['<table>', '<td>Name</td>'],
        explain: { en: 'Rows hold cells — header cells and data cells travel together in one row.', es: 'Las filas guardan celdas — las de encabezado y las de datos viajan juntas en una fila.' }
      },
      {
        type: 'bug',
        prompt: { en: 'The header row lost its meaning. Click the buggy line!', es: 'La fila de encabezado perdió su significado. ¡Haz clic en la línea con error!' },
        lang: 'html',
        lines: ['<table>', '<tr><td>Name</td></tr>', '<tr><td>Cosmo</td></tr>', '</table>'],
        bugLine: 1,
        fix: { accept: ['<tr><th>Name</th></tr>'] },
        explain: { en: 'Header cells deserve <code>&lt;th&gt;</code> — it marks them as column headings.', es: 'Las celdas de encabezado merecen <code>&lt;th&gt;</code> — las marca como títulos de columna.' }
      },
      {
        type: 'arcade',
        prompt: { en: 'Meteors again! Catch the table tokens and one blast from the past.', es: '¡Meteoritos otra vez! Atrapa los tokens de tablas y uno del pasado.' },
        rounds: [
          { question: { en: 'Catch the tag for a table row', es: 'Atrapa la etiqueta de una fila de tabla' }, correct: '<tr>', wrongs: ['<td>', '<th>', '<table>'], speed: 1 },
          { question: { en: 'Catch the tag for a header cell', es: 'Atrapa la etiqueta de una celda de encabezado' }, correct: '<th>', wrongs: ['<td>', '<tr>', '<head>'], speed: 0.9 },
          { question: { en: 'Catch the tag for a data cell', es: 'Atrapa la etiqueta de una celda de datos' }, correct: '<td>', wrongs: ['<th>', '<tr>', '<data>'], speed: 1.1 },
          { question: { en: 'Catch the closing tag of a table', es: 'Atrapa la etiqueta de cierre de una tabla' }, correct: '</table>', wrongs: ['<table>', '</tr>', '</td>'], speed: 1 },
          { question: { en: 'Catch the tag that opens a list item', es: 'Atrapa la etiqueta que abre un elemento de lista' }, correct: '<li>', wrongs: ['<ul>', '<list>', '<item>'], speed: 0.8 }
        ],
        explain: { en: 'Meteor review — tables plus a friendly echo of the lists level.', es: 'Repaso de meteoros: tablas más un eco amistoso del nivel de listas.' }
      },
      {
        type: 'sandbox',
        lang: 'html',
        prompt: { en: "Mission: the crew table — a <code>&lt;table&gt;</code> with 3 rows: a header row with <code>&lt;th&gt;</code> cells <code>Cadet</code> and <code>Role</code>, then <code>Cosmo</code>/<code>Pilot</code> and <code>Nova</code>/<code>Engineer</code> as <code>&lt;td&gt;</code> rows.", es: "Misión: la tabla de la tripulación — una <code>&lt;table&gt;</code> con 3 filas: una de encabezado con celdas <code>&lt;th&gt;</code> <code>Cadet</code> y <code>Role</code>, luego <code>Cosmo</code>/<code>Pilot</code> y <code>Nova</code>/<code>Engineer</code> en filas de <code>&lt;td&gt;</code>." },
        start: '<!-- crew table -->\n<table>\n\n</table>\n',
        target: { en: 'A table: header row (Cadet, Role) plus two data rows', es: 'Una tabla: fila de encabezado (Cadet, Role) más dos filas de datos' },
        solution: '<table>\n  <tr><th>Cadet</th><th>Role</th></tr>\n  <tr><td>Cosmo</td><td>Pilot</td></tr>\n  <tr><td>Nova</td><td>Engineer</td></tr>\n</table>',
        explain: { en: 'Table → rows → cells. th names the columns, td carries the crew.', es: 'Tabla → filas → celdas. th nombra las columnas, td lleva a la tripulación.' },
        checks: [
          { dom: 'table', count: 1, label: { en: 'There is one table', es: 'Hay una tabla' } },
          { dom: 'tr', count: 3, label: { en: 'There are three rows', es: 'Hay tres filas' } },
          { dom: 'th', count: 2, label: { en: 'The header row has two th cells', es: 'La fila de encabezado tiene dos celdas th' } },
          { dom: 'td', count: 4, label: { en: 'The data rows have four td cells', es: 'Las filas de datos tienen cuatro celdas td' } },
          { text: 'th', includes: 'cadet', label: { en: 'A header cell says "Cadet"', es: 'Una celda de encabezado dice "Cadet"' } },
          { text: 'td', includes: 'cosmo', label: { en: 'Cosmo is in the data cells', es: 'Cosmo está en las celdas de datos' } },
          { text: 'td', includes: 'nova', label: { en: 'Nova is in the data cells', es: 'Nova está en las celdas de datos' } }
        ]
      }
    ]
  },
  {
    id: 'html-10', track: 'html', num: 10, icon: '🧾', xp: 100,
    title: { en: 'Talk to Me', es: 'Habla conmigo' },
    subtitle: { en: 'Forms, inputs, labels and buttons', es: 'Formularios, inputs, labels y botones' },
    narration: {
      en: "Time to talk with your visitors! The form tag gathers answers like a tractor beam. Each field is an input with a type: text for names, number for digits, and many more. Labels name every field so everyone knows what to type, and a button fires the whole mission. Build a recruitment form for the crew!",
      es: "¡Es hora de hablar con tus visitantes! La etiqueta de formulario recoge respuestas como un rayo tractor. Cada campo es un input con un tipo: texto para nombres, número para dígitos y muchos más. Los labels nombran cada campo para que todos sepan qué escribir, y un botón dispara toda la misión. ¡Construye un formulario de reclutamiento!"
    },
    outro: {
      en: "The crew is signing up already! Forms turn visitors into fellow explorers.",
      es: "¡La tripulación ya se está inscribiendo! Los formularios convierten visitantes en exploradores."
    },
    explainer: 'html-10',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'What does a <code>&lt;label&gt;</code> do?', es: '¿Qué hace un <code>&lt;label&gt;</code>?' },
        options: [
          { en: 'Sends the form', es: 'Envía el formulario' },
          { en: 'Names an input — clicking it focuses the field', es: 'Nombra un input: al hacer clic se selecciona el campo' },
          { en: 'Adds a title to the browser tab', es: 'Pone título a la pestaña del navegador' },
          { en: 'Hides the input', es: 'Oculta el input' }
        ],
        answer: 1,
        explain: { en: 'A label gives a field a name. Click the label and the input focuses — the magic of for + id.', es: 'Un label le pone nombre a un campo. Haz clic en el label y el input se activa: la magia de for + id.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'Which input type accepts only <b>numbers</b>?', es: '¿Qué tipo de input acepta solo <b>números</b>?' },
        options: [
          { en: '<input type="text">', es: '<input type="text">' },
          { en: '<input type="digits">', es: '<input type="digits">' },
          { en: '<input type="count">', es: '<input type="count">' },
          { en: '<input type="number">', es: '<input type="number">' }
        ],
        answer: 3,
        explain: { en: 'type="number" shows a numeric keyboard and blocks letters. There is also email, password and more.', es: 'type="number" muestra un teclado numérico y bloquea letras. También existen email, password y más.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Connect the label: give the input the matching attribute.', es: 'Conecta el label: dale al input el atributo que falta.' },
        template: '<label for="ship">Ship name</label>\n<input type="text" ___="ship">',
        answers: [{ accept: ['id'] }],
        hint: { en: 'for points to the input\'s… what?', es: 'for apunta al… ¿qué del input?' },
        explain: { en: 'for="ship" on the label + id="ship" on the input = a connected pair.', es: 'for="ship" en el label + id="ship" en el input = una pareja conectada.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build an email field with a placeholder hint.', es: 'Construye un campo de correo con una pista placeholder.' },
        slots: ['<input', ' type="email"', ' placeholder="you@space.dev"', '>'],
        distractors: ['</input>', '<inputbox>'],
        explain: { en: 'Inputs are void tags: all attributes live in the opening tag — type, placeholder and friends.', es: 'Los inputs son etiquetas vacías: todos los atributos viven en la etiqueta de apertura — type, placeholder y amigos.' }
      },
      {
        type: 'bug',
        prompt: { en: 'The send button is misspelled. Click the buggy line!', es: 'El botón de enviar está mal escrito. ¡Haz clic en la línea con error!' },
        lang: 'html',
        lines: ['<form>', '<input type="text" placeholder="Name">', '<buton>Send</buton>', '</form>'],
        bugLine: 2,
        fix: { accept: ['<button>Send</button>'] },
        explain: { en: 'Careful spelling: the tag is <code>&lt;button&gt;</code>, with the n!', es: 'Cuidado con la ortografía: la etiqueta es <code>&lt;button&gt;</code>, ¡con la n!' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the lines of a working mini form', es: 'Ordena las líneas de un mini formulario que funciona' },
        lang: 'html',
        lines: ['<form>', '  <label for="city">Base city</label>', '  <input id="city" type="text">', '  <button>Liftoff</button>', '</form>'],
        explain: { en: 'The recipe: form, label, input, button — each pair connected by for and id.', es: 'La receta: form, label, input, button — cada pareja conectada por for e id.' }
      },
      {
        type: 'sandbox',
        lang: 'html',
        prompt: { en: 'Mission: a "Join the crew" form — a <code>&lt;form&gt;</code> with: a <code>&lt;label&gt;</code> <code>Cadet name</code> with <code>for="name"</code>, a text <code>&lt;input&gt;</code> with <code>id="name"</code>, a <code>type="number"</code> input for age, and a <code>&lt;button&gt;</code>.', es: 'Misión: un formulario "Join the crew" — un <code>&lt;form&gt;</code> con: un <code>&lt;label&gt;</code> <code>Cadet name</code> con <code>for="name"</code>, un <code>&lt;input&gt;</code> de texto con <code>id="name"</code>, un input <code>type="number"</code> para la edad y un <code>&lt;button&gt;</code>.' },
        start: '<form>\n\n</form>\n',
        target: { en: 'A form: label for="name" + text input id="name", a number input, and a button', es: 'Un formulario: label for="name" + input de texto id="name", un input number y un botón' },
        solution: '<form>\n  <label for="name">Cadet name</label>\n  <input id="name" type="text">\n  <input type="number" placeholder="Age">\n  <button>Join the crew</button>\n</form>',
        explain: { en: 'label names the field, for + id connect the pair, the button fires it all.', es: 'label nombra el campo, for + id conectan la pareja y el botón lo dispara todo.' },
        checks: [
          { dom: 'form', count: 1, label: { en: 'There is one form', es: 'Hay un formulario' } },
          { dom: 'input', count: 2, label: { en: 'There are two inputs', es: 'Hay dos inputs' } },
          { attr: 'input', attrName: 'type', attrValue: 'text', label: { en: 'One input is type="text"', es: 'Un input es type="text"' } },
          { attr: 'input', attrName: 'type', attrValue: 'number', label: { en: 'One input is type="number"', es: 'Un input es type="number"' } },
          { attr: 'label', attrName: 'for', attrValue: 'name', label: { en: 'The label points to name', es: 'El label apunta a name' } },
          { attr: 'input', attrName: 'id', attrValue: 'name', label: { en: 'The text input has id="name"', es: 'El input de texto tiene id="name"' } },
          { dom: 'button', count: 1, label: { en: 'There is a button', es: 'Hay un botón' } }
        ]
      }
    ]
  },
  {
    id: 'html-11', track: 'html', num: 11, icon: '🏛️', xp: 100,
    title: { en: 'Speak Semantic', es: 'Habla semántico' },
    subtitle: { en: 'header, nav, main, article and footer', es: 'header, nav, main, article y footer' },
    narration: {
      en: "Your toolbox is almost full, Cadet. Now learn to name things like a pro. Semantic tags describe what content means: a header crowns the page, a nav holds the menu, main carries the unique content, articles hold complete stories, and the footer signs off. Browsers, screen readers and search engines all understand these names.",
      es: "Tu caja de herramientas casi está llena, Cadete. Ahora aprende a nombrar las cosas como un profesional. Las etiquetas semánticas describen qué significa el contenido: el header corona la página, el nav guarda el menú, el main lleva el contenido único, los articles sostienen historias completas y el footer se despide. Navegadores, lectores de pantalla y buscadores entienden estos nombres."
    },
    outro: {
      en: "Semantic superstar, Cadet! Your pages now speak a language every browser and screen reader understands.",
      es: "¡Estrella semántica, Cadete! Tus páginas ahora hablan un idioma que todos los navegadores y lectores de pantalla entienden."
    },
    explainer: 'html-11',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'What makes a tag <b>semantic</b>?', es: '¿Qué hace <b>semántica</b> a una etiqueta?' },
        options: [
          { en: 'Its name describes the meaning of its content', es: 'Su nombre describe el significado de su contenido' },
          { en: 'It looks nicer', es: 'Se ve más bonita' },
          { en: 'It is written in Greek', es: 'Está escrita en griego' },
          { en: 'It only works on mobile', es: 'Solo funciona en móviles' }
        ],
        answer: 0,
        explain: { en: 'Semantic = meaningful names. <code>&lt;header&gt;</code> says "this is the top of the page" — a <code>&lt;div&gt;</code> says nothing.', es: 'Semántico = nombres con significado. <code>&lt;header&gt;</code> dice "esta es la parte superior" — un <code>&lt;div&gt;</code> no dice nada.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each region tag to its job', es: 'Une cada etiqueta de región con su trabajo' },
        lang: 'html',
        pairs: [
          { chip: '1', a: { en: '<header>', es: '<header>' }, b: { en: 'top of the page: logo and title', es: 'la parte superior: logo y título' } },
          { chip: '2', a: { en: '<nav>', es: '<nav>' }, b: { en: 'the menu with links', es: 'el menú con enlaces' } },
          { chip: '3', a: { en: '<main>', es: '<main>' }, b: { en: 'the unique content of the page', es: 'el contenido único de la página' } },
          { chip: '4', a: { en: '<article>', es: '<article>' }, b: { en: 'a complete story on its own', es: 'una historia completa por sí sola' } },
          { chip: '5', a: { en: '<footer>', es: '<footer>' }, b: { en: 'the bottom: contact and copyright', es: 'la parte final: contacto y derechos' } }
        ],
        hint: { en: 'Think of a newspaper: masthead, sections, colophon.', es: 'Piensa en un periódico: cabecera, secciones, pie.' },
        explain: { en: 'These five tags map a page like a map: top, menu, center, stories, bottom.', es: 'Estas cinco etiquetas trazan la página como un mapa: arriba, menú, centro, historias y pie.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Wrap the page title in the right semantic tag.', es: 'Envuelve el título de la página en la etiqueta semántica correcta.' },
        template: '<___>\n  <h1>Mission Control</h1>\n</___>',
        answers: [{ accept: ['header'] }, { accept: ['header'] }],
        hint: { en: 'It crowns the page.', es: 'Corona la página.' },
        explain: { en: 'The header usually holds the h1 and the logo — the top of the page.', es: 'El header normalmente guarda el h1 y el logo: la parte superior de la página.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build the page skeleton with semantic tags.', es: 'Construye el esqueleto de la página con etiquetas semánticas.' },
        slots: ['<header>', '<h1>Cosmo HQ</h1>', '</header>', '<main>', '<p>Space news every day</p>', '</main>'],
        distractors: ['<div>', '<footer>'],
        explain: { en: 'header and main name page regions — no anonymous divs needed.', es: 'header y main nombran regiones de la página — sin divs anónimos.' }
      },
      {
        type: 'bug',
        prompt: { en: 'One region is a nameless div. Click the line to fix it!', es: 'Una región es un div sin nombre. ¡Haz clic en la línea para arreglarla!' },
        lang: 'html',
        lines: ['<header><h1>Cosmo Blog</h1></header>', '<main><article><p>Post one</p></article></main>', '<div class="bottom">© 2026 Cosmo</div>'],
        bugLine: 2,
        fix: { accept: ['<footer>© 2026 Cosmo</footer>'] },
        explain: { en: 'A div with class "bottom" carries no meaning. <code>&lt;footer&gt;</code> tells browsers exactly what it is.', es: 'Un div con clase "bottom" no dice nada. <code>&lt;footer&gt;</code> le dice al navegador exactamente qué es.' }
      },
      {
        type: 'sandbox',
        lang: 'html',
        prompt: { en: "Mission: a semantic page — a <code>&lt;header&gt;</code> with <code>&lt;h1&gt;</code> <code>Cosmo HQ</code>, a <code>&lt;nav&gt;</code> with 2 links, a <code>&lt;main&gt;</code> with an <code>&lt;article&gt;</code> (any paragraph inside), and a <code>&lt;footer&gt;</code> that says <code>© 2026 Cosmo</code>.", es: "Misión: una página semántica — un <code>&lt;header&gt;</code> con <code>&lt;h1&gt;</code> <code>Cosmo HQ</code>, un <code>&lt;nav&gt;</code> con 2 enlaces, un <code>&lt;main&gt;</code> con un <code>&lt;article&gt;</code> (cualquier párrafo dentro) y un <code>&lt;footer&gt;</code> que diga <code>© 2026 Cosmo</code>." },
        start: '<header>\n\n</header>\n',
        target: { en: 'header with h1, nav with 2 links, main with article, footer with © 2026 Cosmo', es: 'header con h1, nav con 2 enlaces, main con article y footer con © 2026 Cosmo' },
        solution: '<header>\n  <h1>Cosmo HQ</h1>\n</header>\n<nav>\n  <a href="#">Home</a>\n  <a href="#">News</a>\n</nav>\n<main>\n  <article>\n    <p>Today a new rocket landed on the pad.</p>\n  </article>\n</main>\n<footer>© 2026 Cosmo</footer>',
        explain: { en: 'Named regions: every tag now says what it is. Browsers and humans both win.', es: 'Regiones con nombre: ahora cada etiqueta dice qué es. Navegadores y humanos ganan.' },
        checks: [
          { dom: 'header', count: 1, label: { en: 'There is a header', es: 'Hay un header' } },
          { dom: 'nav', count: 1, label: { en: 'There is a nav', es: 'Hay un nav' } },
          { dom: 'nav a', count: 2, label: { en: 'The nav has two links', es: 'El nav tiene dos enlaces' } },
          { dom: 'main', count: 1, label: { en: 'There is a main', es: 'Hay un main' } },
          { dom: 'article', count: 1, label: { en: 'There is an article inside main', es: 'Hay un article' } },
          { dom: 'footer', count: 1, label: { en: 'There is a footer', es: 'Hay un footer' } },
          { text: 'footer', includes: 'cosmo', label: { en: 'The footer signs off as Cosmo', es: 'El footer se despide como Cosmo' } }
        ]
      }
    ]
  },
  {
    id: 'html-12', track: 'html', num: 12, icon: '🏆', xp: 100,
    title: { en: 'BOSS: Your Profile Page', es: 'JEFE: Tu página de perfil' },
    subtitle: { en: 'Everything you learned in one final mission', es: 'Todo lo aprendido en una misión final' },
    narration: {
      en: "Attention, Cadet! This is it — the final exam of the H T M L Nebula. Everything you learned returns for one last mission: headings and paragraphs, strong words and images, lists, links and containers. Build a complete profile page to graduate from cadet to full web pilot. The whole nebula is watching. Make it shine!",
      es: "¡Atención, Cadete! Llegó el momento: el examen final de la Nebulosa H T M L. Todo lo que aprendiste vuelve para una última misión: encabezados y párrafos, palabras fuertes e imágenes, listas, enlaces y contenedores. Construye una página de perfil completa para graduarte de cadete a piloto web. Toda la nebulosa te observa. ¡Hazla brillar!"
    },
    outro: {
      en: "Congratulations, Cadet! You finished the H T M L Nebula. The CSS Kingdom is waiting for you next!",
      es: "¡Felicidades, Cadete! Terminaste la Nebulosa H T M L. ¡El Reino CSS te espera a continuación!"
    },
    explainer: 'html-12',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Boss warm-up: which tag carries the main title of a page?', es: 'Calentamiento de jefe: ¿qué etiqueta lleva el título principal de una página?' },
        options: [{ en: '<h6>' }, { en: '<header>' }, { en: '<h1>' }, { en: '<title>' }],
        answer: 2,
        explain: { en: '<code>&lt;h1&gt;</code> = biggest heading, once per page. <code>&lt;title&gt;</code> names the browser tab — a different job!', es: '<code>&lt;h1&gt;</code> = el encabezado más grande, uno por página. <code>&lt;title&gt;</code> nombra la pestaña del navegador: ¡otro trabajo!' }
      },
      {
        type: 'mcq',
        prompt: { en: 'Which list for your hobbies?', es: '¿Qué lista para tus pasatiempos?' },
        options: [
          { en: '<ul> — bulleted, order does not matter', es: '<ul> — con viñetas, el orden no importa' },
          { en: '<ol> — numbered steps', es: '<ol> — pasos numerados' },
          { en: '<li> alone, no list around it', es: '<li> solo, sin lista alrededor' },
          { en: '<list>', es: '<list>' }
        ],
        answer: 0,
        explain: { en: 'Hobbies are a collection, not a sequence — a <code>&lt;ul&gt;</code> of <code>&lt;li&gt;</code> items is perfect.', es: 'Los pasatiempos son una colección, no una secuencia: una <code>&lt;ul&gt;</code> de elementos <code>&lt;li&gt;</code> es perfecta.' }
      },
      {
        type: 'bug',
        prompt: { en: 'The boss corrupted one line of the profile. Click the broken line!', es: '¡El jefe corrompió una línea del perfil! ¡Haz clic en la línea rota!' },
        lang: 'html',
        lines: ['<h1>Cadet Cosmo</h1>', '<p>I love <em>nebulas</em>.</p>', '<img src=cosmo.png alt="Cosmo the robot">'],
        bugLine: 2,
        fix: { accept: ['<img src="cosmo.png" alt="Cosmo the robot">', "<img src='cosmo.png' alt='Cosmo the robot'>"] },
        explain: { en: 'Attribute values need quotes: <code>src="cosmo.png"</code>. Even in a boss fight!', es: 'Los valores de los atributos necesitan comillas: <code>src="cosmo.png"</code>. ¡Incluso en una pelea de jefes!' }
      },
      {
        type: 'fill',
        prompt: { en: 'Add a hobby to the list: <code>Building rockets</code>.', es: 'Añade un pasatiempo a la lista: <code>Building rockets</code>.' },
        template: '<ul>\n  <li>Stargazing</li>\n  ___\n</ul>',
        answers: [{ accept: ['<li>Building rockets</li>'] }],
        hint: { en: 'One list item, wrapped in its tag.', es: 'Un elemento de lista, envuelto en su etiqueta.' },
        explain: { en: 'Every hobby gets its own <code>&lt;li&gt;</code> inside the <code>&lt;ul&gt;</code>.', es: 'Cada pasatiempo lleva su propio <code>&lt;li&gt;</code> dentro de la <code>&lt;ul&gt;</code>.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build the contact link — an email link!', es: 'Construye el enlace de contacto — ¡uno de correo!' },
        slots: ['<a href="mailto:cosmo@space.dev">', 'Email me', '</a>'],
        distractors: ['href="mail:cosmo"', '</link>'],
        explain: { en: 'mailto: in the href opens the visitor\'s email app — perfect for a contact section.', es: 'mailto: en el href abre la app de correo del visitante: perfecto para una sección de contacto.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the lines of the "About me" card', es: 'Ordena las líneas de la tarjeta "About me"' },
        lang: 'html',
        lines: ['<article>', '  <h2>About me</h2>', '  <p>I train to be an astronaut</p>', '</article>'],
        explain: { en: 'A card: open the article, heading first, then the text, then close it.', es: 'Una tarjeta: abre el article, primero el encabezado, luego el texto, y ciérralo.' }
      },
      {
        type: 'match',
        prompt: { en: 'Boss review: match each tool to its job', es: 'Repaso de jefe: une cada herramienta con su trabajo' },
        lang: 'html',
        pairs: [
          { chip: '1', a: { en: 'alt', es: 'alt' }, b: { en: 'describes an image for screen readers', es: 'describe una imagen para lectores de pantalla' } },
          { chip: '2', a: { en: '<strong>', es: '<strong>' }, b: { en: 'marks truly important text', es: 'marca texto realmente importante' } },
          { chip: '3', a: { en: 'mailto:', es: 'mailto:' }, b: { en: 'link that opens the email app', es: 'enlace que abre la app de correo' } },
          { chip: '4', a: { en: '<ul>', es: '<ul>' }, b: { en: 'bulleted list for collections', es: 'lista con viñetas para colecciones' } }
        ],
        hint: { en: 'One of them lives inside the img tag.', es: 'Una de ellas vive dentro de la etiqueta img.' },
        explain: { en: 'Four tools you will use in the final build — know them by heart.', es: 'Cuatro herramientas que usarás en la construcción final: conócelas de memoria.' }
      },
      {
        type: 'sandbox',
        lang: 'html',
        prompt: { en: 'FINAL MISSION: build Cosmo\'s profile page — an <code>&lt;h1&gt;</code> that says <code>Cadet Cosmo</code>, an <code>&lt;img&gt;</code> with <code>src="cosmo.png"</code> and real alt text, a <code>&lt;p&gt;</code> bio mentioning <code>nebula</code>, a <code>&lt;ul&gt;</code> with at least 3 <code>&lt;li&gt;</code> hobbies, and a contact <code>&lt;a&gt;</code> with a <code>mailto:</code> link. Make the whole nebula proud!', es: 'MISIÓN FINAL: construye la página de perfil de Cosmo — un <code>&lt;h1&gt;</code> que diga <code>Cadet Cosmo</code>, un <code>&lt;img&gt;</code> con <code>src="cosmo.png"</code> y texto alt real, un <code>&lt;p&gt;</code> de biografía que mencione la <code>nebula</code>, una <code>&lt;ul&gt;</code> con al menos 3 pasatiempos <code>&lt;li&gt;</code> y un <code>&lt;a&gt;</code> de contacto con enlace <code>mailto:</code>. ¡Deja en alto a toda la nebulosa!' },
        start: '<h1>Cadet Cosmo</h1>\n\n<img src="cosmo.png" alt="">\n\n<p>Write your bio here.</p>\n\n<ul>\n  <li>Stargazing</li>\n</ul>\n\n<a href="#">Contact me</a>\n',
        target: { en: 'A full profile: h1, img with alt, bio with "nebula", 3+ hobbies in a ul, and a mailto link', es: 'Un perfil completo: h1, img con alt, bio con "nebula", 3+ pasatiempos en una ul y un enlace mailto' },
        solution: '<h1>Cadet Cosmo</h1>\n<img src="cosmo.png" alt="Cosmo the robot">\n<p>I am a robot cadet exploring the nebula one tag at a time.</p>\n<ul>\n  <li>Stargazing</li>\n  <li>Building rockets</li>\n  <li>Collecting stardust</li>\n</ul>\n<a href="mailto:cosmo@space.dev">Email me</a>',
        explain: { en: 'Title, image, bio, hobbies, contact — a whole page from twelve levels of training. You earned it, Pilot!', es: 'Título, imagen, bio, pasatiempos y contacto: una página entera con doce niveles de entrenamiento. ¡Te lo ganaste, Piloto!' },
        checks: [
          { dom: 'h1', count: 1, label: { en: 'There is a main title (h1)', es: 'Hay un título principal (h1)' } },
          { text: 'h1', includes: 'cadet cosmo', label: { en: 'The h1 says "Cadet Cosmo"', es: 'El h1 dice "Cadet Cosmo"' } },
          { dom: 'img', count: 1, label: { en: 'There is a profile image', es: 'Hay una imagen de perfil' } },
          { attr: 'img', attrName: 'alt', attrRegex: '\\S', label: { en: 'The image has real alt text', es: 'La imagen tiene texto alt real' } },
          { text: 'p', includes: 'nebula', label: { en: 'The bio mentions the nebula', es: 'La biografía menciona la nebulosa' } },
          { dom: 'ul', count: 1, label: { en: 'There is a hobby list', es: 'Hay una lista de pasatiempos' } },
          { dom: 'li', count: 3, label: { en: 'There are at least 3 hobbies', es: 'Hay al menos 3 pasatiempos' } },
          { attr: 'a', attrName: 'href', attrIncludes: 'mailto:', label: { en: 'The contact link uses mailto:', es: 'El enlace de contacto usa mailto:' } }
        ]
      }
    ]
  }
];
