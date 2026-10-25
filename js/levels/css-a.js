/* ============ CSS Kingdom track — part A, levels 13-20 (css-01…css-08) ============
   Foundations: syntax, colors, text styling, box model, width/height & units,
   display modes, positioning. One concept per level, progressively harder.
   CSS sandbox levels use lang:'css' with a fixture: the user writes CSS only.
   Checks read COMPUTED styles: colors 'rgb(R, G, B)', font sizes in px,
   font-weight bold = '700'. Box-model/position use longhand props
   (padding-top, border-top-width, position…) — shorthands compute to ''.
   Same schema as html.js. Arcade appears once in css-04 and css-08 (mid-level). */
window.LEVELS_CSS_A = [
  {
    id: 'css-01', track: 'css', num: 13, icon: '🎨', xp: 100,
    title: { en: 'Meet CSS', es: 'Conoce CSS' },
    subtitle: { en: 'Style rules: selector, property, value', es: 'Reglas de estilo: selector, propiedad, valor' },
    narration: {
      en: "Welcome to the CSS Kingdom, Cadet! Cosmo here again. HTML is the skeleton, but CSS is the style: it paints colors, sizes and layouts onto every tag. One rule reads: selector, curly braces, property, colon, value, semicolon. That is the whole spell. Let's cast your first style rule!",
      es: "¡Bienvenido al Reino CSS, Cadete! Aquí Cosmo, otra vez. HTML es el esqueleto, pero CSS es el estilo: pinta colores, tamaños y diseños sobre cada etiqueta. Una regla se lee así: selector, llaves, propiedad, dos puntos, valor y punto y coma. Ese es todo el hechizo. ¡Lancemos tu primera regla de estilo!"
    },
    outro: {
      en: "First rule cast! Selector, braces, property, value — you now speak the language of style.",
      es: "¡Primera regla lanzada! Selector, llaves, propiedad, valor: ya hablas el idioma del estilo."
    },
    explainer: 'css-01',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'What does <b>CSS</b> stand for?', es: '¿Qué significa <b>CSS</b>?' },
        options: [
          { en: 'Computer Style System', es: 'Computer Style System' },
          { en: 'Cascading Style Sheets', es: 'Cascading Style Sheets' },
          { en: 'Colorful Sheet Syntax', es: 'Colorful Sheet Syntax' },
          { en: 'Creative Style Maker', es: 'Creative Style Maker' }
        ],
        answer: 1,
        explain: { en: 'CSS = Cascading Style Sheets. HTML structures the page; CSS styles it — and rules "cascade" onto every matching tag.', es: 'CSS = Cascading Style Sheets (hojas de estilo en cascada). HTML estructura la página; CSS le da estilo, y las reglas "cascadan" sobre cada etiqueta que coincida.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'Which one is a correctly written CSS rule?', es: '¿Cuál es una regla CSS escrita correctamente?' },
        options: [
          { en: '<code>h1 (color: red;)</code>', es: '<code>h1 (color: red;)</code>' },
          { en: '<code>h1 { color red; }</code>', es: '<code>h1 { color red; }</code>' },
          { en: '<code>h1 { color: red; }</code>', es: '<code>h1 { color: red; }</code>' },
          { en: '<code>h1 { color = red; }</code>', es: '<code>h1 { color = red; }</code>' }
        ],
        answer: 2,
        explain: { en: 'Selector first, then a block in curly braces: property, colon, value, semicolon. Parens or equals signs confuse the browser.', es: 'Primero el selector, luego un bloque entre llaves: propiedad, dos puntos, valor y punto y coma. Paréntesis o signos igual confunden al navegador.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each part of <code>h1 { color: gold; }</code> to its name', es: 'Une cada parte de <code>h1 { color: gold; }</code> con su nombre' },
        lang: 'css',
        pairs: [
          { chip: '1', a: { en: 'h1', es: 'h1' }, b: { en: 'selector — which tags get styled', es: 'selector — qué etiquetas reciben estilo' } },
          { chip: '2', a: { en: 'color:', es: 'color:' }, b: { en: 'property — what you change', es: 'propiedad — qué cambias' } },
          { chip: '3', a: { en: 'gold;', es: 'gold;' }, b: { en: 'value — the new setting', es: 'valor — la nueva configuración' } },
          { chip: '4', a: { en: '{ }', es: '{ }' }, b: { en: 'curly braces — they wrap the declarations', es: 'llaves — envuelven las declaraciones' } }
        ],
        hint: { en: 'Who, what, how — all wrapped in braces.', es: 'Quién, qué, cómo — todo envuelto en llaves.' },
        explain: { en: 'Every rule: selector first, then a brace block of property: value; declarations.', es: 'Toda regla: primero el selector, luego un bloque de llaves con declaraciones propiedad: valor;.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build a rule that paints all paragraphs <code>teal</code>.', es: 'Construye una regla que pinte todos los párrafos de <code>teal</code>.' },
        slots: ['p ', '{', 'color: teal;', '}'],
        distractors: ['(p)', 'teal: color;'],
        explain: { en: 'Selector, opening brace, declaration, closing brace — the full skeleton of a rule.', es: 'Selector, llave que abre, declaración, llave que cierra: el esqueleto completo de una regla.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Complete the rule so the <code>h2</code> text is <code>gold</code>: which property paints text?', es: 'Completa la regla para que el texto del <code>h2</code> sea <code>gold</code>: ¿qué propiedad pinta el texto?' },
        template: 'h2 {\n  ___: gold;\n}',
        answers: [{ accept: ['color'] }],
        hint: { en: 'Five letters. It paints the letters themselves.', es: 'Cinco letras. Pinta las letras mismas.' },
        explain: { en: '<code>color</code> sets the text color; <code>gold</code> is the value. Property first, then the colon.', es: '<code>color</code> define el color del texto; <code>gold</code> es el valor. Primero la propiedad, luego los dos puntos.' }
      },
      {
        type: 'bug',
        prompt: { en: 'The browser reads two declarations as one! Click the broken line.', es: '¡El navegador lee dos declaraciones como una! Haz clic en la línea rota.' },
        lang: 'css',
        lines: ['h1 {', '  color: crimson', '  font-size: 28px;', '}'],
        bugLine: 1,
        fix: { accept: ['  color: crimson;', 'color: crimson;'] },
        explain: { en: 'Every declaration ends with a semicolon — without it, the browser swallows the next line too.', es: 'Cada declaración termina con punto y coma; sin él, el navegador también se traga la línea siguiente.' }
      },
      {
        type: 'sandbox',
        lang: 'css',
        prompt: { en: 'Mission: write <b>two rules</b> — make the <code>h1</code> <code>gold</code> and the paragraph text <code>20px</code> tall. Watch the preview change!', es: 'Misión: escribe <b>dos reglas</b> — pon el <code>h1</code> en <code>gold</code> y el texto del párrafo a <code>20px</code> de alto. ¡Mira cambiar la vista previa!' },
        start: '/* your rules here */\n',
        fixture: '<h1>Welcome, Cadet</h1>\n<p>CSS makes every page shine.</p>',
        target: { en: 'h1 in gold, paragraph text at 20px', es: 'h1 en dorado y texto del párrafo a 20px' },
        solution: 'h1 {\n  color: gold;\n}\n\np {\n  font-size: 20px;\n}',
        explain: { en: 'Two selectors, two rules — CSS paints every tag that matches.', es: 'Dos selectores, dos reglas: CSS pinta cada etiqueta que coincide.' },
        checks: [
          { style: 'h1', prop: 'color', contains: 'rgb(255, 215, 0)', label: { en: 'The h1 is gold', es: 'El h1 es dorado' } },
          { style: 'p', prop: 'font-size', equals: '20px', label: { en: 'The paragraph text is 20px', es: 'El texto del párrafo mide 20px' } },
          { codeIncludes: 'color', label: { en: 'You wrote a color declaration', es: 'Escribiste una declaración color' } },
          { codeIncludes: 'font-size', label: { en: 'You wrote a font-size declaration', es: 'Escribiste una declaración font-size' } }
        ]
      }
    ]
  },
  {
    id: 'css-02', track: 'css', num: 14, icon: '🌈', xp: 100,
    title: { en: 'Paint with Colors', es: 'Pinta con colores' },
    subtitle: { en: 'color, background-color — names, hex and rgb', es: 'color y background-color: nombres, hex y rgb' },
    narration: {
      en: "Colors, Cadet! Every pixel on your screen is mixed from red, green and blue light. CSS gives you three ways to name a color: friendly names like tomato, hex codes with a hash sign, and numeric R G B values from zero to two hundred fifty five. Today you paint your pages like a space artist!",
      es: "¡Colores, Cadete! Cada punto de tu pantalla se forma mezclando luz roja, verde y azul. CSS te da tres formas de nombrar un color: nombres amigables como tomato, códigos hex con signo de numeral, y valores numéricos R G B de cero a doscientos cincuenta y cinco. ¡Hoy pintarás tus páginas como un artista espacial!"
    },
    outro: {
      en: "What a colorful mission! You can now paint with names, hex codes and R G B.",
      es: "¡Qué misión tan colorida! Ahora puedes pintar con nombres, códigos hex y R G B."
    },
    explainer: 'css-02',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Which of these is a valid <b>hex</b> color code?', es: '¿Cuál de estos es un código de color <b>hex</b> válido?' },
        options: [
          { en: '<code>hex(red)</code>', es: '<code>hex(red)</code>' },
          { en: '<code>&amp;ff0000</code>', es: '<code>&amp;ff0000</code>' },
          { en: '<code>#ff0000</code>', es: '<code>#ff0000</code>' },
          { en: '<code>$ff0000</code>', es: '<code>$ff0000</code>' }
        ],
        answer: 2,
        explain: { en: 'Hex codes start with # followed by 0-9 and a-f: #ff0000 is full red. ff means 255 in hexadecimal.', es: 'Los códigos hex empiezan con # seguido de 0-9 y a-f: #ff0000 es rojo puro. ff significa 255 en hexadecimal.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'Screens mix <b>red, green and blue</b> light. What color is <code>rgb(0, 0, 255)</code>?', es: 'Las pantallas mezclan luz <b>roja, verde y azul</b>. ¿Qué color es <code>rgb(0, 0, 255)</code>?' },
        options: [
          { en: 'Red', es: 'Rojo' },
          { en: 'White', es: 'Blanco' },
          { en: 'Green', es: 'Verde' },
          { en: 'Blue', es: 'Azul' }
        ],
        answer: 3,
        explain: { en: 'The three numbers are red, green, blue — each from 0 to 255. Only blue is switched on, so the color is pure blue.', es: 'Los tres números son rojo, verde y azul, cada uno de 0 a 255. Solo el azul está encendido: azul puro.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each code to its color', es: 'Une cada código con su color' },
        lang: 'css',
        pairs: [
          { chip: '1', a: { en: 'rgb(255, 0, 0)', es: 'rgb(255, 0, 0)' }, b: { en: 'red', es: 'rojo' } },
          { chip: '2', a: { en: '#0000ff', es: '#0000ff' }, b: { en: 'blue', es: 'azul' } },
          { chip: '3', a: { en: 'rgb(0, 128, 0)', es: 'rgb(0, 128, 0)' }, b: { en: 'green', es: 'verde' } },
          { chip: '4', a: { en: '#ffa500', es: '#ffa500' }, b: { en: 'orange', es: 'naranja' } }
        ],
        hint: { en: 'ff = 255. Hex 80 = 128.', es: 'ff = 255. El 80 hex = 128.' },
        explain: { en: 'Names, hex and rgb are just three spellings of the same colors.', es: 'Nombres, hex y rgb son solo tres escrituras de los mismos colores.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Give the <code>h1</code> a <code>hotpink</code> BACKGROUND. Which property?', es: 'Dale al <code>h1</code> un FONDO <code>hotpink</code>. ¿Qué propiedad?' },
        template: 'h1 {\n  ___: hotpink;\n}',
        answers: [{ accept: ['background-color', 'background'] }],
        hint: { en: 'It starts with background-.', es: 'Empieza con background-.' },
        explain: { en: '<code>background-color</code> paints behind the text; <code>color</code> paints the letters themselves.', es: '<code>background-color</code> pinta detrás del texto; <code>color</code> pinta las letras mismas.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build the alert style: <code>tomato</code> text on a <code>navy</code> background. A dot targets a class!', es: 'Construye el estilo de alerta: texto <code>tomato</code> sobre fondo <code>navy</code>. ¡Un punto apunta a una clase!' },
        slots: ['.alert {', '  color: tomato;', '  background-color: navy;', '}'],
        distractors: ['  text-color: tomato;', '  color-background: navy;'],
        explain: { en: 'A dot selects a class from the HTML. Two declarations, two semicolons — one rule, many styles.', es: 'Un punto selecciona una clase del HTML. Dos declaraciones, dos punto y coma: una regla, muchos estilos.' }
      },
      {
        type: 'bug',
        prompt: { en: 'The colon went missing! Click the broken line.', es: '¡Desaparecieron los dos puntos! Haz clic en la línea rota.' },
        lang: 'css',
        lines: ['h2 {', '  background-color teal;', '  color: white;', '}'],
        bugLine: 1,
        fix: { accept: ['  background-color: teal;', 'background-color: teal;'] },
        explain: { en: 'Property and value are separated by a colon: <code>background-color: teal;</code>.', es: 'Propiedad y valor se separan con dos puntos: <code>background-color: teal;</code>.' }
      },
      {
        type: 'sandbox',
        lang: 'css',
        prompt: { en: 'Mission: paint the news desk! Give <code>.banner</code> an <code>orange</code> background with <code>navy</code> text, and give <code>.alert</code> red text — use a <b>hex code</b> for the red. Remember: a dot targets a class.', es: 'Misión: ¡pinta el escritorio de noticias! Dale a <code>.banner</code> un fondo <code>orange</code> con texto <code>navy</code>, y a <code>.alert</code> texto rojo — usa un <b>código hex</b> para el rojo. Recuerda: un punto apunta a una clase.' },
        start: '.banner {\n  \n}\n\n.alert {\n  \n}\n',
        fixture: '<h1 class="banner">Space News</h1>\n<p class="alert">Meteor shower tonight!</p>',
        target: { en: 'Banner: orange background, navy text — Alert: red text written as a hex code', es: 'Banner: fondo naranja, texto azul marino — Alerta: texto rojo escrito en hex' },
        solution: '.banner {\n  background-color: orange;\n  color: navy;\n}\n\n.alert {\n  color: #ff0000;\n}',
        explain: { en: 'Same color, many spellings: red = #ff0000 = rgb(255, 0, 0). The browser paints them identically.', es: 'El mismo color, muchas escrituras: red = #ff0000 = rgb(255, 0, 0). El navegador los pinta igual.' },
        checks: [
          { style: '.banner', prop: 'background-color', contains: 'rgb(255, 165, 0)', label: { en: 'The banner background is orange', es: 'El fondo del banner es naranja' } },
          { style: '.banner', prop: 'color', contains: 'rgb(0, 0, 128)', label: { en: 'The banner text is navy', es: 'El texto del banner es azul marino' } },
          { style: '.alert', prop: 'color', contains: 'rgb(255, 0, 0)', label: { en: 'The alert text is red', es: 'El texto de la alerta es rojo' } },
          { codeIncludes: '#', label: { en: 'You used a hex code', es: 'Usaste un código hex' } },
          { codeIncludes: 'background-color', label: { en: 'You used background-color', es: 'Usaste background-color' } }
        ]
      }
    ]
  },
  {
    id: 'css-03', track: 'css', num: 15, icon: '🔤', xp: 100,
    title: { en: 'Style Your Text', es: 'Estiliza tu texto' },
    subtitle: { en: 'font-family, font-size, font-weight, text-align', es: 'font-family, font-size, font-weight y text-align' },
    narration: {
      en: "Text is your page's voice, Cadet, and CSS lets it speak with style. Choose the typeface with the font family property, set the size in pixels, make words bold with font weight, and line everything up with text align. The browser even turns words like bold into numbers behind the scenes. Let's give your pages a voice!",
      es: "El texto es la voz de tu página, Cadete, y CSS le permite hablar con estilo. Elige la tipografía con la propiedad font family, define el tamaño en píxeles, pon palabras en negrita con font weight y alinea todo con text align. El navegador hasta convierte palabras como bold en números. ¡Démosle voz a tus páginas!"
    },
    outro: {
      en: "Your pages found their voice — the right fonts, sizes and weight. Beautifully spoken, Cadet!",
      es: "Tus páginas encontraron su voz: las fuentes, tamaños y grosores correctos. ¡Hablas con estilo, Cadete!"
    },
    explainer: 'css-03',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Which property chooses the <b>typeface</b> — the design of the letters?', es: '¿Qué propiedad elige la <b>tipografía</b> — el diseño de las letras?' },
        options: [
          { en: '<code>font-size</code>', es: '<code>font-size</code>' },
          { en: '<code>font-family</code>', es: '<code>font-family</code>' },
          { en: '<code>text-style</code>', es: '<code>text-style</code>' },
          { en: '<code>font-weight</code>', es: '<code>font-weight</code>' }
        ],
        answer: 1,
        explain: { en: 'font-family picks the font, with fallbacks after the commas: <code>Arial, sans-serif</code> means "try Arial, or any sans-serif".', es: 'font-family elige la fuente, con respaldos tras las comas: <code>Arial, sans-serif</code> significa "prueba Arial, o cualquier sans-serif".' }
      },
      {
        type: 'mcq',
        prompt: { en: 'Behind the scenes the browser stores thickness as a NUMBER. What does <code>font-weight: bold</code> compute to?', es: 'Internamente el navegador guarda el grosor como NÚMERO. ¿A qué equivale <code>font-weight: bold</code>?' },
        options: [
          { en: '<code>400</code>', es: '<code>400</code>' },
          { en: '<code>100</code>', es: '<code>100</code>' },
          { en: '<code>700</code>', es: '<code>700</code>' },
          { en: 'It stays the word "bold"', es: 'Se queda como la palabra "bold"' }
        ],
        answer: 2,
        explain: { en: 'Normal = 400, bold = 700. You may write either — the browser understands both.', es: 'Normal = 400, negrita = 700. Puedes escribir cualquiera: el navegador entiende ambos.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Make the heading text exactly <b>32 pixels</b> tall.', es: 'Haz que el texto del encabezado mida exactamente <b>32 píxeles</b>.' },
        template: 'h1 {\n  font-size: ___;\n}',
        answers: [{ accept: ['32px', '2em'] }],
        hint: { en: 'A number, then the unit with no space: 32px.', es: 'Un número y luego la unidad, sin espacio: 32px.' },
        explain: { en: 'font-size takes a number plus a unit. 2em also works here — em scales with the parent font (2 × 16px = 32px).', es: 'font-size recibe un número más una unidad. 2em también funciona aquí: em escala con la fuente del padre (2 × 16px = 32px).' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each text property to its job', es: 'Une cada propiedad de texto con su trabajo' },
        lang: 'css',
        pairs: [
          { chip: '1', a: { en: 'font-family', es: 'font-family' }, b: { en: 'chooses the typeface', es: 'elige la tipografía' } },
          { chip: '2', a: { en: 'font-size', es: 'font-size' }, b: { en: 'sets how tall the letters are', es: 'define la altura de las letras' } },
          { chip: '3', a: { en: 'font-weight', es: 'font-weight' }, b: { en: 'normal or bold thickness', es: 'grosor normal o negrita' } },
          { chip: '4', a: { en: 'text-align', es: 'text-align' }, b: { en: 'left, center or right placement', es: 'alineación izquierda, centro o derecha' } }
        ],
        hint: { en: 'family = who, size = how big, weight = how thick, align = where.', es: 'family = quién, size = qué tan grande, weight = qué tan grueso, align = dónde.' },
        explain: { en: 'Four dials for text: face, size, thickness and alignment.', es: 'Cuatro diales para el texto: tipo, tamaño, grosor y alineación.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the lines of a fully styled headline', es: 'Ordena las líneas de un encabezado totalmente estilizado' },
        lang: 'css',
        lines: ['h1 {', '  font-family: Arial, sans-serif;', '  font-size: 40px;', '  font-weight: bold;', '  text-align: center;', '}'],
        explain: { en: 'Open the block, list the declarations, close the block. The order INSIDE the block is up to you!', es: 'Abre el bloque, enumera las declaraciones y ciérralo. ¡El orden DENTRO del bloque lo eliges tú!' }
      },
      {
        type: 'bug',
        prompt: { en: 'This font name has spaces — and no quotes! Click the broken line.', es: 'Este nombre de fuente tiene espacios… ¡y sin comillas! Haz clic en la línea rota.' },
        lang: 'css',
        lines: ['p {', '  font-family: Comic Sans MS;', '  color: purple;', '}'],
        bugLine: 1,
        fix: { accept: ["  font-family: 'Comic Sans MS';", '  font-family: "Comic Sans MS";', "font-family: 'Comic Sans MS';", 'font-family: "Comic Sans MS";'] },
        explain: { en: 'Font names with spaces go inside quotes: <code>"Comic Sans MS"</code>. Single words like Arial need none.', es: 'Los nombres de fuente con espacios van entre comillas: <code>"Comic Sans MS"</code>. Las palabras sueltas como Arial no las necesitan.' }
      },
      {
        type: 'sandbox',
        lang: 'css',
        prompt: { en: 'Mission: style the gazette — <code>.title</code> in the <code>Arial</code> typeface at <code>48px</code>, <code>bold</code> and centered. <code>.note</code> in a <code>monospace</code> font. Tip: <code>"Courier New", monospace</code>.', es: 'Misión: estiliza la gaceta — <code>.title</code> con tipografía <code>Arial</code> a <code>48px</code>, en <code>bold</code> y centrado. <code>.note</code> con fuente <code>monospace</code>. Tip: <code>"Courier New", monospace</code>.' },
        start: '.title {\n  \n}\n\n.note {\n  \n}\n',
        fixture: '<h1 class="title">Cosmo Gazette</h1>\n<p class="byline">By Cosmo, robot reporter</p>\n<p class="note">Printed in orbit since 3026</p>',
        target: { en: 'Title: Arial, 48px, bold, centered — Note: monospace', es: 'Título: Arial, 48px, negrita, centrado — Nota: monospace' },
        solution: '.title {\n  font-family: Arial, sans-serif;\n  font-size: 48px;\n  font-weight: bold;\n  text-align: center;\n}\n\n.note {\n  font-family: "Courier New", monospace;\n}',
        explain: { en: 'The browser turns bold into 700 and every font size into pixels — the computed style is the truth.', es: 'El navegador convierte bold en 700 y cada tamaño de fuente en píxeles: el estilo computado es la verdad.' },
        checks: [
          { style: '.title', prop: 'font-family', contains: 'Arial', label: { en: 'The title uses Arial', es: 'El título usa Arial' } },
          { style: '.title', prop: 'font-size', equals: '48px', label: { en: 'The title is 48px tall', es: 'El título mide 48px' } },
          { style: '.title', prop: 'font-weight', equals: '700', label: { en: 'The title is bold (700)', es: 'El título está en negrita (700)' } },
          { style: '.title', prop: 'text-align', equals: 'center', label: { en: 'The title is centered', es: 'El título está centrado' } },
          { style: '.note', prop: 'font-family', contains: 'monospace', label: { en: 'The note uses a monospace font', es: 'La nota usa fuente monospace' } }
        ]
      }
    ]
  },
  {
    id: 'css-04', track: 'css', num: 16, icon: '📦', xp: 100,
    title: { en: 'Box Model I', es: 'Modelo de caja I' },
    subtitle: { en: 'padding and border: inside the box', es: 'padding y border: por dentro de la caja' },
    narration: {
      en: "Every element is a box, Cadet, and today you open it. In the middle sits the content, wrapped in padding: the cushion inside. Around that lives the border, the visible edge, and outside waits the margin. Today we train padding and border; margin comes next level. Ready to think inside the box?",
      es: "Cada elemento es una caja, Cadete, y hoy la vas a abrir. En el centro está el contenido, envuelto en el padding: el cojín interior. Alrededor vive el border, el borde visible, y afuera espera el margin. Hoy entrenamos padding y border; el margin viene en el siguiente nivel. ¿Listo para pensar dentro de la caja?"
    },
    outro: {
      en: "Padding in, border around — you see the box now. Next stop: the space between boxes!",
      es: "Padding dentro, border alrededor: ya ves la caja. ¡Próxima parada: el espacio entre cajas!"
    },
    explainer: 'css-04',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'What does <code>padding</code> do?', es: '¿Qué hace <code>padding</code>?' },
        options: [
          { en: 'Space outside the border, between boxes', es: 'Espacio fuera del borde, entre cajas' },
          { en: 'Space inside, between content and border', es: 'Espacio dentro, entre contenido y borde' },
          { en: 'Draws the visible edge line', es: 'Dibuja la línea visible del borde' },
          { en: 'Makes the text bigger', es: 'Hace el texto más grande' }
        ],
        answer: 1,
        explain: { en: 'Padding is the cushion INSIDE the box. The space outside belongs to margin — the next level!', es: 'El padding es el cojín DENTRO de la caja. El espacio de afuera es del margin, ¡el siguiente nivel!' }
      },
      {
        type: 'mcq',
        prompt: { en: 'Which rule draws a <b>3-pixel solid purple frame</b>?', es: '¿Qué regla dibuja un <b>marco sólido morado de 3 píxeles</b>?' },
        options: [
          { en: '<code>border: 3px purple;</code>', es: '<code>border: 3px purple;</code>' },
          { en: '<code>border-style: 3px solid purple;</code>', es: '<code>border-style: 3px solid purple;</code>' },
          { en: '<code>border: 3px solid purple;</code>', es: '<code>border: 3px solid purple;</code>' },
          { en: '<code>padding: 3px solid purple;</code>', es: '<code>padding: 3px solid purple;</code>' }
        ],
        answer: 2,
        explain: { en: 'The border shorthand reads: width, style, color. The style is a keyword like solid, dashed or dotted.', es: 'El atajo border se lee: ancho, estilo, color. El estilo es una palabra como solid, dashed o dotted.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'Box memory: which order goes from the INSIDE out?', es: 'Memoria de caja: ¿qué orden va de ADENTRO hacia afuera?' },
        options: [
          { en: 'margin → border → padding → content', es: 'margin → border → padding → content' },
          { en: 'content → border → padding → margin', es: 'content → border → padding → margin' },
          { en: 'content → padding → border → margin', es: 'content → padding → border → margin' },
          { en: 'padding → content → margin → border', es: 'padding → content → margin → border' }
        ],
        answer: 2,
        explain: { en: 'Content in the middle, then padding, then border, then margin — like a package: item, foam, box, hallway.', es: 'Contenido en el centro, luego padding, luego border y por último margin: como un paquete: objeto, espuma, caja y pasillo.' }
      },
      {
        type: 'fill',
        prompt: { en: "Make the card's border <b>4 pixels</b> thick.", es: 'Haz que el borde de la tarjeta tenga <b>4 píxeles</b> de grosor.' },
        template: '.card {\n  border: ___ solid purple;\n}',
        answers: [{ accept: ['4px'] }],
        hint: { en: 'Number + unit, no space: 4px.', es: 'Número + unidad, sin espacio: 4px.' },
        explain: { en: 'The border shorthand is <code>width style color</code> — you filled in the width.', es: 'El atajo border es <code>ancho estilo color</code> — tú completaste el ancho.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build a chunky, comfortable button style.', es: 'Construye un estilo de botón robusto y cómodo.' },
        slots: ['button {', '  padding: 12px 24px;', '  border: 2px solid navy;', '}'],
        distractors: ['  margin: 12px 24px;', '  border: navy solid;'],
        explain: { en: 'Two padding values: first for top/bottom, second for left/right. Then a classic border: width, style, color.', es: 'Dos valores de padding: primero arriba/abajo, luego izquierda/derecha. Y un border clásico: ancho, estilo, color.' }
      },
      {
        type: 'arcade',
        prompt: { en: 'Meteor drill! Catch the box-model tokens before they hit the deck.', es: '¡Entrenamiento de meteoros! Atrapa los tokens del modelo de caja antes de que golpeen la cubierta.' },
        rounds: [
          { question: { en: 'Catch the property for the cushion INSIDE the box', es: 'Atrapa la propiedad del cojín DENTRO de la caja' }, correct: 'padding', wrongs: ['margin', 'border', 'outline'], speed: 1 },
          { question: { en: 'In border: 3px solid red — catch the thickness', es: 'En border: 3px solid red — atrapa el grosor' }, correct: '3px', wrongs: ['solid', 'red', 'border'], speed: 0.9 },
          { question: { en: 'Catch the computed value of font-weight: bold', es: 'Atrapa el valor computado de font-weight: bold' }, correct: '700', wrongs: ['400', 'boldpx', 'b'], speed: 1.1 },
          { question: { en: 'Catch the property that sets the text color', es: 'Atrapa la propiedad que define el color del texto' }, correct: 'color', wrongs: ['font-color', 'text-color', 'colour'], speed: 1 },
          { question: { en: 'Catch the symbol that OPENS a rule block', es: 'Atrapa el símbolo que ABRE un bloque de regla' }, correct: '{', wrongs: ['}', '[', '('], speed: 0.8 }
        ],
        explain: { en: 'Review: padding, borders — and old friends from the style basics.', es: 'Repaso: padding, bordes y viejos amigos de los básicos del estilo.' }
      },
      {
        type: 'sandbox',
        lang: 'css',
        prompt: { en: 'Mission: dress up the space postcard — give <code>.card</code> a padding of <code>24px</code> on every side and a <code>3px solid purple</code> border.', es: 'Misión: arregla la postal espacial — dale a <code>.card</code> un padding de <code>24px</code> por todos lados y un borde de <code>3px solid purple</code>.' },
        start: '.card {\n  \n}\n',
        fixture: '<div class="card">\n  <h2>Space Postcard</h2>\n  <p>Wish you were here, Cadet!</p>\n</div>',
        target: { en: 'Card with 24px padding all around and a 3px solid purple border', es: 'Tarjeta con 24px de padding por todos lados y borde morado sólido de 3px' },
        solution: '.card {\n  padding: 24px;\n  border: 3px solid purple;\n}',
        explain: { en: 'Padding breathes space inward, border frames it — the box model in action.', es: 'El padding respira espacio hacia adentro y el border lo enmarca: el modelo de caja en acción.' },
        checks: [
          { style: '.card', prop: 'padding-top', equals: '24px', label: { en: 'Top padding is 24px', es: 'El padding superior es 24px' } },
          { style: '.card', prop: 'padding-left', equals: '24px', label: { en: 'Left padding is 24px', es: 'El padding izquierdo es 24px' } },
          { style: '.card', prop: 'border-top-width', equals: '3px', label: { en: 'Border thickness is 3px', es: 'El grosor del borde es 3px' } },
          { style: '.card', prop: 'border-top-style', equals: 'solid', label: { en: 'Border style is solid', es: 'El estilo del borde es solid' } },
          { style: '.card', prop: 'border-top-color', contains: 'rgb(128, 0, 128)', label: { en: 'Border color is purple', es: 'El color del borde es morado' } }
        ]
      }
    ]
  },
  {
    id: 'css-05', track: 'css', num: 17, icon: '↔️', xp: 100,
    title: { en: 'Box Model II', es: 'Modelo de caja II' },
    subtitle: { en: 'margin, centering and box-sizing', es: 'margin, centrado y box-sizing' },
    narration: {
      en: "Outside the border lives the margin, Cadet: the personal space between boxes. Give a box a width and automatic side margins, and it slides to the center of the page like magic. And with box sizing set to border box, the width you write is the width you get — padding and border included!",
      es: "Afuera del borde vive el margin, Cadete: el espacio personal entre cajas. Dale a una caja un ancho y márgenes automáticos en los lados, y se desliza al centro de la página como por arte de magia. Y con box-sizing en border-box, ¡el ancho que escribes es el que obtienes, padding y border incluidos!"
    },
    outro: {
      en: "Margins mastered and boxes perfectly centered, Cadet! Your layouts finally breathe — the CSS Kingdom is taking shape.",
      es: "¡Márgenes dominados y cajas perfectamente centradas, Cadete! Tus diseños por fin respiran: el Reino CSS toma forma."
    },
    explainer: 'css-05',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'What is the difference between <code>margin</code> and <code>padding</code>?', es: '¿Cuál es la diferencia entre <code>margin</code> y <code>padding</code>?' },
        options: [
          { en: 'Margin is outside the border; padding is inside', es: 'El margin está fuera del borde; el padding, dentro' },
          { en: 'Margin is inside; padding is outside', es: 'El margin está dentro; el padding, fuera' },
          { en: 'They are exactly the same', es: 'Son exactamente lo mismo' },
          { en: 'Padding only works on images', es: 'El padding solo funciona en imágenes' }
        ],
        answer: 0,
        explain: { en: 'Padding pushes the content away from the border; margin pushes OTHER boxes away from yours.', es: 'El padding aleja el contenido del borde; el margin aleja a las OTRAS cajas de la tuya.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'A block with a fixed <code>width</code> gets <code>margin: auto</code>. What happens?', es: 'Un bloque con <code>width</code> fijo recibe <code>margin: auto</code>. ¿Qué pasa?' },
        options: [
          { en: 'It disappears', es: 'Desaparece' },
          { en: 'It sticks to the left', es: 'Se pega a la izquierda' },
          { en: 'It centers horizontally', es: 'Se centra horizontalmente' },
          { en: 'It centers vertically', es: 'Se centra verticalmente' }
        ],
        answer: 2,
        explain: { en: 'auto splits the free horizontal space equally — auto left + auto right = centered.', es: 'auto reparte el espacio horizontal libre en partes iguales: auto a la izquierda + auto a la derecha = centrado.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each box-model tool to its job', es: 'Une cada herramienta del modelo de caja con su trabajo' },
        lang: 'css',
        pairs: [
          { chip: '1', a: { en: 'margin', es: 'margin' }, b: { en: 'space outside the border', es: 'espacio fuera del borde' } },
          { chip: '2', a: { en: 'padding', es: 'padding' }, b: { en: 'space inside the border', es: 'espacio dentro del borde' } },
          { chip: '3', a: { en: 'border', es: 'border' }, b: { en: 'the visible edge line', es: 'la línea visible del borde' } },
          { chip: '4', a: { en: 'box-sizing: border-box', es: 'box-sizing: border-box' }, b: { en: 'width includes padding and border', es: 'el width incluye padding y borde' } }
        ],
        hint: { en: 'Two are spaces, one is an edge, one changes the math.', es: 'Dos son espacios, uno es un borde y uno cambia la matemática.' },
        explain: { en: 'border-box makes width mean the TOTAL width — no surprises when you add padding.', es: 'border-box hace que width sea el ancho TOTAL: sin sorpresas al agregar padding.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Center the hero panel: what value goes in the margin?', es: 'Centra el panel héroe: ¿qué valor lleva el margin?' },
        template: '.hero {\n  width: 300px;\n  margin: ___;\n}',
        answers: [{ accept: ['0 auto', 'auto'] }],
        hint: { en: 'The magic word is "auto".', es: 'La palabra mágica es "auto".' },
        explain: { en: 'margin: 0 auto (or just auto) gives both sides equal free space — instant centering.', es: 'margin: 0 auto (o solo auto) da a ambos lados el mismo espacio libre: centrado instantáneo.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build a box whose width INCLUDES its padding.', es: 'Construye una caja cuyo ancho INCLUYA su padding.' },
        slots: ['.box {', '  box-sizing: border-box;', '  width: 200px;', '  padding: 16px;', '}'],
        distractors: ['  box-sizing: content-box;', '  height: 200px;'],
        explain: { en: 'With border-box, 200px is the total: the padding fits inside and nothing grows.', es: 'Con border-box, 200px es el total: el padding cabe dentro y nada crece.' }
      },
      {
        type: 'bug',
        prompt: { en: 'One missing semicolon corrupts the next line! Click the broken line.', es: '¡Un punto y coma faltante corrompe la línea siguiente! Haz clic en la línea rota.' },
        lang: 'css',
        lines: ['.card {', '  margin: 10px', '  padding: 5px;', '}'],
        bugLine: 1,
        fix: { accept: ['  margin: 10px;', 'margin: 10px;'] },
        explain: { en: 'The browser keeps reading "10px padding: 5px" as one broken value. Semicolons separate declarations.', es: 'El navegador sigue leyendo "10px padding: 5px" como un solo valor roto. Los punto y coma separan declaraciones.' }
      },
      {
        type: 'sandbox',
        lang: 'css',
        prompt: { en: 'Mission: lay out the cargo bay — <code>.hero</code>: <code>width: 240px</code>, centered with <code>margin</code> <code>auto</code>. <code>.box</code>: <code>box-sizing: border-box</code>, <code>width: 200px</code>, <code>padding: 10px</code>, <code>margin: 15px</code>.', es: 'Misión: organiza la bodega — <code>.hero</code>: <code>width: 240px</code>, centrado con <code>margin</code> <code>auto</code>. <code>.box</code>: <code>box-sizing: border-box</code>, <code>width: 200px</code>, <code>padding: 10px</code>, <code>margin: 15px</code>.' },
        start: '.hero {\n  width: 240px;\n  \n}\n\n.box {\n  \n}\n',
        fixture: '<div class="wrap">\n  <div class="hero">Hero panel</div>\n  <div class="box">Cargo one</div>\n  <div class="box">Cargo two</div>\n</div>',
        target: { en: 'Hero centered (240px + margin auto) — boxes with border-box, padding 10px, margin 15px', es: 'Hero centrado (240px + margin auto) — cajas con border-box, padding 10px y margin 15px' },
        solution: '.hero {\n  width: 240px;\n  margin: auto;\n}\n\n.box {\n  box-sizing: border-box;\n  width: 200px;\n  padding: 10px;\n  margin: 15px;\n}',
        explain: { en: 'auto centers the hero; border-box keeps every box exactly 200px wide, padding included.', es: 'auto centra el hero; border-box mantiene cada caja en exactamente 200px, padding incluido.' },
        checks: [
          { style: '.hero', prop: 'width', equals: '240px', label: { en: 'The hero is 240px wide', es: 'El hero mide 240px de ancho' } },
          { codeIncludes: 'auto', label: { en: 'You used margin auto to center', es: 'Usaste margin auto para centrar' } },
          { style: '.box', prop: 'box-sizing', equals: 'border-box', label: { en: 'Boxes use border-box', es: 'Las cajas usan border-box' } },
          { style: '.box', prop: 'width', equals: '200px', label: { en: 'Boxes are 200px wide', es: 'Las cajas miden 200px' } },
          { style: '.box', prop: 'padding-top', equals: '10px', label: { en: 'Box padding is 10px', es: 'El padding de las cajas es 10px' } },
          { style: '.box', prop: 'margin-top', equals: '15px', label: { en: 'Box margin is 15px', es: 'El margin de las cajas es 15px' } }
        ]
      }
    ]
  },
  {
    id: 'css-06', track: 'css', num: 18, icon: '📏', xp: 100,
    title: { en: 'Width, Height & Units', es: 'Ancho, alto y unidades' },
    subtitle: { en: 'px, %, em and rem', es: 'px, %, em y rem' },
    narration: {
      en: "How big is big, Cadet? Pixels are fixed: one hundred pixels is one hundred, always. Percentages flex with the parent, the em unit scales with the element's own font size, and rem listens to the root of the page. Pick the right unit and your layouts will survive every screen in the galaxy.",
      es: "¿Qué tan grande es grande, Cadete? Los píxeles son fijos: cien píxeles son cien, siempre. Los porcentajes se adaptan al elemento padre, la unidad em escala con la fuente del propio elemento y el rem obedece a la raíz de la página. Elige la unidad correcta y tus diseños sobrevivirán a cualquier pantalla de la galaxia."
    },
    outro: {
      en: "Pixels, percents, em and rem — you size things like a pro, Cadet.",
      es: "Píxeles, porcentajes, em y rem: ya mides cada cosa como un profesional, Cadete. ¡Sigue así!"
    },
    explainer: 'css-06',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Which unit always shrinks and grows with the <b>parent</b> element?', es: '¿Qué unidad siempre se encoge y crece con el elemento <b>padre</b>?' },
        options: [
          { en: '<code>px</code>', es: '<code>px</code>' },
          { en: '<code>%</code>', es: '<code>%</code>' },
          { en: '<code>pt</code>', es: '<code>pt</code>' },
          { en: '<code>kg</code>', es: '<code>kg</code>' }
        ],
        answer: 1,
        explain: { en: 'Percentages are measured against the parent: <code>width: 50%</code> means half of the parent.', es: 'Los porcentajes se miden contra el padre: <code>width: 50%</code> significa la mitad del padre.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'The root font size is <code>16px</code>. How tall is text with <code>font-size: 2rem</code>?', es: 'La fuente raíz mide <code>16px</code>. ¿Qué alto tiene el texto con <code>font-size: 2rem</code>?' },
        options: [
          { en: '<code>16px</code>', es: '<code>16px</code>' },
          { en: '<code>2px</code>', es: '<code>2px</code>' },
          { en: '<code>18px</code>', es: '<code>18px</code>' },
          { en: '<code>32px</code>', es: '<code>32px</code>' }
        ],
        answer: 3,
        explain: { en: 'rem = root em: 2 × 16px = 32px, no matter what the parent does.', es: 'rem = root em: 2 × 16px = 32px, sin importar lo que haga el padre.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each unit to its personality', es: 'Une cada unidad con su personalidad' },
        lang: 'css',
        pairs: [
          { chip: '1', a: { en: 'px', es: 'px' }, b: { en: 'fixed pixels — never changes', es: 'píxeles fijos: nunca cambia' } },
          { chip: '2', a: { en: '%', es: '%' }, b: { en: 'a percent of the parent', es: 'un porcentaje del padre' } },
          { chip: '3', a: { en: 'em', es: 'em' }, b: { en: "scales with the element's own font size", es: 'escala con la fuente del propio elemento' } },
          { chip: '4', a: { en: 'rem', es: 'rem' }, b: { en: 'scales with the ROOT font size', es: 'escala con la fuente raíz' } }
        ],
        hint: { en: 'One never moves, one watches the parent, two watch fonts.', es: 'Uno nunca se mueve, uno mira al padre y dos miran fuentes.' },
        explain: { en: 'Fixed for precision, % for layout, em and rem for scalable text.', es: 'Fijo para precisión, % para el diseño y em/rem para texto escalable.' }
      },
      {
        type: 'fill',
        prompt: { en: "Make the panel take <b>half</b> of its parent's width.", es: 'Haz que el panel ocupe la <b>mitad</b> del ancho de su padre.' },
        template: '.panel {\n  width: ___;\n}',
        answers: [{ accept: ['50%'] }],
        hint: { en: 'Half = 50 plus the percent sign.', es: 'Mitad = 50 más el signo de porcentaje.' },
        explain: { en: '<code>width: 50%</code> tracks the parent — resize the parent and the panel follows.', es: '<code>width: 50%</code> sigue al padre: cambia el tamaño del padre y el panel lo acompaña.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the lines of the avatar box', es: 'Ordena las líneas de la caja de avatar' },
        lang: 'css',
        lines: ['.avatar {', '  width: 120px;', '  height: 120px;', '  font-size: 1.5rem;', '}'],
        explain: { en: 'Pixels fix the frame; rem scales the caption text inside.', es: 'Los píxeles fijan el marco; rem escala el texto de dentro.' }
      },
      {
        type: 'bug',
        prompt: { en: 'There is an illegal space in a value! Click the broken line.', es: '¡Hay un espacio ilegal en un valor! Haz clic en la línea rota.' },
        lang: 'css',
        lines: ['.panel {', '  width: 50 %;', '  padding: 10px;', '}'],
        bugLine: 1,
        fix: { accept: ['  width: 50%;', 'width: 50%;'] },
        explain: { en: 'Numbers and units hug: <code>50%</code>, <code>10px</code> — never a space between them.', es: 'Números y unidades se pegan: <code>50%</code>, <code>10px</code> — nunca un espacio entre ellos.' }
      },
      {
        type: 'sandbox',
        lang: 'css',
        prompt: { en: 'Mission: size the cargo panel — <code>.panel</code>: <code>320px</code> wide and <code>180px</code> tall. <code>.big</code>: text at <code>2rem</code>. <code>.small</code>: text at <code>0.75em</code>.', es: 'Misión: mide el panel de carga — <code>.panel</code>: <code>320px</code> de ancho y <code>180px</code> de alto. <code>.big</code>: texto a <code>2rem</code>. <code>.small</code>: texto a <code>0.75em</code>.' },
        start: '.panel {\n  \n}\n\n.big {\n  \n}\n\n.small {\n  \n}\n',
        fixture: '<div class="panel">\n  <h2>Cargo panel</h2>\n  <p class="big">Big headline text</p>\n  <p class="small">Tiny footnote text</p>\n</div>',
        target: { en: 'Panel 320×180px, big text 2rem (32px), small text 0.75em (12px)', es: 'Panel de 320×180px, texto grande 2rem (32px), texto pequeño 0.75em (12px)' },
        solution: '.panel {\n  width: 320px;\n  height: 180px;\n}\n\n.big {\n  font-size: 2rem;\n}\n\n.small {\n  font-size: 0.75em;\n}',
        explain: { en: 'The browser converts everything to pixels: 2rem becomes 32px and 0.75em becomes 12px.', es: 'El navegador convierte todo a píxeles: 2rem se vuelve 32px y 0.75em, 12px.' },
        checks: [
          { style: '.panel', prop: 'width', equals: '320px', label: { en: 'Panel width is 320px', es: 'El ancho del panel es 320px' } },
          { style: '.panel', prop: 'height', equals: '180px', label: { en: 'Panel height is 180px', es: 'El alto del panel es 180px' } },
          { style: '.big', prop: 'font-size', equals: '32px', label: { en: 'Big text computes to 32px', es: 'El texto grande equivale a 32px' } },
          { style: '.small', prop: 'font-size', equals: '12px', label: { en: 'Small text computes to 12px', es: 'El texto pequeño equivale a 12px' } },
          { codeIncludes: 'rem', label: { en: 'You used the rem unit', es: 'Usaste la unidad rem' } }
        ]
      }
    ]
  },
  {
    id: 'css-07', track: 'css', num: 19, icon: '🧱', xp: 100,
    title: { en: 'Display Modes', es: 'Modos de display' },
    subtitle: { en: 'block, inline, inline-block and none', es: 'block, inline, inline-block y none' },
    narration: {
      en: "Not all boxes behave the same, Cadet. Block elements take the whole line, like the sections of your ship. Inline elements flow inside text, like words in a sentence. Inline block does both: it flows in a line but accepts width and height. And display none? That is the cloaking device — gone completely!",
      es: "No todas las cajas se comportan igual, Cadete. Los elementos de bloque ocupan toda la línea, como las secciones de tu nave. Los elementos en línea fluyen dentro del texto, como palabras en una frase. El inline-block hace ambas cosas: fluye en línea pero acepta ancho y alto. ¿Y display none? ¡Ese es el dispositivo de camuflaje: desaparece por completo!"
    },
    outro: {
      en: "Blocks, inlines and a cloaked secret — display is under your command!",
      es: "¡Bloques, en línea y un secreto camuflado: display está bajo tu mando!"
    },
    explainer: 'css-07',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Which display value takes a <b>whole line</b> for itself?', es: '¿Qué valor de display toma una <b>línea entera</b> para sí?' },
        options: [
          { en: '<code>inline</code>', es: '<code>inline</code>' },
          { en: '<code>block</code>', es: '<code>block</code>' },
          { en: '<code>inline-block</code>', es: '<code>inline-block</code>' },
          { en: '<code>flow</code>', es: '<code>flow</code>' }
        ],
        answer: 1,
        explain: { en: 'Block boxes stretch across the whole line — headings and paragraphs are block by default.', es: 'Las cajas de bloque ocupan toda la línea: los encabezados y párrafos son de bloque por defecto.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'Which value makes an element vanish <b>completely</b> — even its space?', es: '¿Qué valor hace que un elemento desaparezca <b>por completo</b> — incluso su espacio?' },
        options: [
          { en: '<code>hidden</code>', es: '<code>hidden</code>' },
          { en: '<code>invisible</code>', es: '<code>invisible</code>' },
          { en: '<code>none</code>', es: '<code>none</code>' },
          { en: '<code>ghost</code>', es: '<code>ghost</code>' }
        ],
        answer: 2,
        explain: { en: 'display: none removes the box AND its space, like a cloaking device. hidden and invisible are not display values at all.', es: 'display: none quita la caja Y su espacio, como un dispositivo de camuflaje. hidden e invisible no son valores de display.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each display value to its personality', es: 'Une cada valor de display con su personalidad' },
        lang: 'css',
        pairs: [
          { chip: '1', a: { en: 'block', es: 'block' }, b: { en: 'a full-width box on its own line', es: 'una caja de línea completa, sola en su línea' } },
          { chip: '2', a: { en: 'inline', es: 'inline' }, b: { en: 'flows inside text; width and height ignored', es: 'fluye dentro del texto; ignora ancho y alto' } },
          { chip: '3', a: { en: 'inline-block', es: 'inline-block' }, b: { en: 'flows in a line but accepts width and height', es: 'fluye en línea pero acepta ancho y alto' } },
          { chip: '4', a: { en: 'none', es: 'none' }, b: { en: 'hidden — as if it never existed', es: 'oculto — como si nunca hubiera existido' } }
        ],
        hint: { en: 'Span is inline, div is block — the best of both is inline-block.', es: 'Span es inline, div es block: lo mejor de ambos es inline-block.' },
        explain: { en: 'One property, four personalities: own line, in the text flow, a hybrid, or cloaked.', es: 'Una propiedad, cuatro personalidades: línea propia, flujo del texto, híbrido o camuflado.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Cloak the secret plans: hide <code>.secret</code> completely.', es: 'Camufla los planes secretos: oculta <code>.secret</code> por completo.' },
        template: '.secret {\n  display: ___;\n}',
        answers: [{ accept: ['none'] }],
        hint: { en: 'Four letters: n-o-n-e.', es: 'Cuatro letras: n-o-n-e.' },
        explain: { en: 'display: none is the cloaking device — nothing renders and nothing takes up space.', es: 'display: none es el dispositivo de camuflaje: nada se dibuja y nada ocupa espacio.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build a horizontal menu: list items in a row with breathing room.', es: 'Construye un menú horizontal: elementos de lista en fila con espacio para respirar.' },
        slots: ['.menu li {', '  display: inline-block;', '  padding: 8px 12px;', '}'],
        distractors: ['  display: none;', '  display: block;'],
        explain: { en: 'List items are block by default — inline-block lines them up AND keeps the padding working.', es: 'Los elementos de lista son bloque por defecto: inline-block los alinea Y mantiene funcionando el padding.' }
      },
      {
        type: 'bug',
        prompt: { en: 'That value does not exist! Click the broken line.', es: '¡Ese valor no existe! Haz clic en la línea rota.' },
        lang: 'css',
        lines: ['.ad {', '  display: invisible;', '  color: gray;', '}'],
        bugLine: 1,
        fix: { accept: ['  display: none;', 'display: none;'] },
        explain: { en: 'To hide with display, the value is <code>none</code>. (visibility: hidden exists too — but that is a different property!)', es: 'Para ocultar con display, el valor es <code>none</code>. (visibility: hidden también existe, ¡pero es otra propiedad!)' }
      },
      {
        type: 'sandbox',
        lang: 'css',
        prompt: { en: 'Mission: command the display! Make <code>.menu li</code> sit in a row with <code>inline-block</code>, give <code>.badge</code> <code>inline-block</code> with <code>padding: 4px 10px</code>, and cloak <code>.secret</code> with <code>none</code>.', es: 'Misión: ¡comanda el display! Haz que <code>.menu li</code> se alinee en fila con <code>inline-block</code>, dale a <code>.badge</code> <code>inline-block</code> con <code>padding: 4px 10px</code> y camufla <code>.secret</code> con <code>none</code>.' },
        start: '.menu li {\n  \n}\n\n.badge {\n  \n}\n\n.secret {\n  \n}\n',
        fixture: '<nav class="menu">\n  <ul>\n    <li>Home</li>\n    <li>Missions</li>\n    <li>Contact</li>\n  </ul>\n</nav>\n<p>Rank: <span class="badge">ACE</span> — keep flying!</p>\n<div class="secret">Secret launch codes</div>',
        target: { en: 'Menu items inline-block, badge inline-block with padding, secret hidden', es: 'Menú en inline-block, badge inline-block con padding y secreto oculto' },
        solution: '.menu li {\n  display: inline-block;\n}\n\n.badge {\n  display: inline-block;\n  padding: 4px 10px;\n}\n\n.secret {\n  display: none;\n}',
        explain: { en: 'The menu became a navbar, the badge got comfy padding — and the secret vanished without a trace.', es: 'El menú se volvió barra de navegación, el badge recibió un padding cómodo y el secreto se esfumó sin dejar rastro.' },
        checks: [
          { style: '.menu li', prop: 'display', equals: 'inline-block', label: { en: 'Menu items are inline-block', es: 'Los items del menú son inline-block' } },
          { style: '.badge', prop: 'display', equals: 'inline-block', label: { en: 'The badge is inline-block', es: 'El badge es inline-block' } },
          { style: '.badge', prop: 'padding-top', equals: '4px', label: { en: 'The badge has breathing room (padding 4px)', es: 'El badge tiene espacio para respirar (padding 4px)' } },
          { style: '.secret', prop: 'display', equals: 'none', label: { en: 'The secret is cloaked', es: 'El secreto está camuflado' } }
        ]
      }
    ]
  },
  {
    id: 'css-08', track: 'css', num: 20, icon: '📍', xp: 100,
    title: { en: 'Position It!', es: '¡Posiciónalo!' },
    subtitle: { en: 'relative, absolute and fixed', es: 'relative, absolute y fixed' },
    narration: {
      en: "Time to break the grid, Cadet! Position relative nudges an element away from its home. Absolute pins it inside the nearest positioned ancestor — perfect for badges on a corner. And fixed glues an element to the screen itself, ignoring every scroll. Master these three and nothing will ever be out of place again.",
      es: "¡Hora de romper la cuadrícula, Cadete! Position relative empuja un elemento desde su lugar. Absolute lo fija dentro del ancestro posicionado más cercano: perfecto para insignias en una esquina. Y fixed pega un elemento a la pantalla misma, ignorando cada desplazamiento. Domina estos tres y nada volverá a estar fuera de lugar."
    },
    outro: {
      en: "Relative, absolute, fixed — your elements stay exactly where you want them. Positioning mastered!",
      es: "Relative, absolute y fixed: tus elementos quedan exactamente donde los quieres. ¡Posicionamiento dominado, Cadete!"
    },
    explainer: 'css-08',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Which position value pins an element to the <b>screen</b>, ignoring scrolling?', es: '¿Qué valor de position fija un elemento a la <b>pantalla</b>, ignorando el desplazamiento?' },
        options: [
          { en: '<code>static</code>', es: '<code>static</code>' },
          { en: '<code>relative</code>', es: '<code>relative</code>' },
          { en: '<code>absolute</code>', es: '<code>absolute</code>' },
          { en: '<code>fixed</code>', es: '<code>fixed</code>' }
        ],
        answer: 3,
        explain: { en: 'fixed glues the element to the viewport: perfect for banners and floating buttons.', es: 'fixed pega el elemento a la ventana del navegador: perfecto para banners y botones flotantes.' }
      },
      {
        type: 'mcq',
        prompt: { en: '<code>position: absolute</code> pins an element to…', es: '<code>position: absolute</code> fija un elemento a…' },
        options: [
          { en: 'The top of the page, always', es: 'Siempre la parte superior de la página' },
          { en: 'The nearest positioned ancestor — a parent with position: relative', es: 'El ancestro posicionado más cercano — un padre con position: relative' },
          { en: 'The center of the screen', es: 'El centro de la pantalla' },
          { en: 'The biggest text nearby', es: 'El texto más grande cercano' }
        ],
        answer: 1,
        explain: { en: 'Absolute children measure against the nearest positioned ancestor. No such ancestor anywhere? Then the page itself is the anchor.', es: 'Los hijos absolute se miden contra el ancestro posicionado más cercano. ¿No hay ninguno? Entonces la página misma es el ancla.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each position value to its personality', es: 'Une cada valor de position con su personalidad' },
        lang: 'css',
        pairs: [
          { chip: '1', a: { en: 'static', es: 'static' }, b: { en: 'the default — normal flow', es: 'el valor por defecto: flujo normal' } },
          { chip: '2', a: { en: 'relative', es: 'relative' }, b: { en: 'nudged from its normal spot', es: 'desplazado desde su lugar normal' } },
          { chip: '3', a: { en: 'absolute', es: 'absolute' }, b: { en: 'pinned inside the nearest positioned ancestor', es: 'fijado dentro del ancestro posicionado más cercano' } },
          { chip: '4', a: { en: 'fixed', es: 'fixed' }, b: { en: 'glued to the screen, ignores scrolling', es: 'pegado a la pantalla, ignora el desplazamiento' } }
        ],
        hint: { en: 'One is the default, two are pins, one is a nudge.', es: 'Uno es el por defecto, dos son fijaciones y uno es un empujón.' },
        explain: { en: 'relative is also the anchor that makes a parent ready for absolute children.', es: 'relative también es el ancla que prepara a un padre para recibir hijos absolute.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Pin the badge to the corner of its positioned parent: which position value?', es: 'Fija el badge en la esquina de su padre posicionado: ¿qué valor de position?' },
        template: '.badge {\n  position: ___;\n  top: 0;\n  right: 0;\n}',
        answers: [{ accept: ['absolute'] }],
        hint: { en: 'Not relative — the badge must ESCAPE the flow and pin to the parent.', es: 'No es relative: el badge debe ESCAPAR del flujo y fijarse al padre.' },
        explain: { en: 'absolute + top + right pins the badge to the parent\'s corner — if the parent is relative.', es: 'absolute + top + right fija el badge en la esquina del padre, si el padre es relative.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the recipe: an anchored card and its corner badge', es: 'Ordena la receta: una tarjeta ancla y su badge de esquina' },
        lang: 'css',
        lines: ['.card {', '  position: relative;', '}', '.badge {', '  position: absolute;', '  top: 10px;', '  right: 10px;', '}'],
        explain: { en: 'First the anchor (the relative parent), then the pinned child (absolute) with its coordinates.', es: 'Primero el ancla (el padre relative), luego el hijo fijado (absolute) con sus coordenadas.' }
      },
      {
        type: 'arcade',
        prompt: { en: 'Meteor drill! Catch positioning tokens — and one from the box-model vault.', es: '¡Entrenamiento de meteoros! Atrapa tokens de posicionamiento y uno de la bóveda del modelo de caja.' },
        rounds: [
          { question: { en: 'Catch the value that glues an element to the screen', es: 'Atrapa el valor que pega un elemento a la pantalla' }, correct: 'fixed', wrongs: ['static', 'relative', 'loose'], speed: 1 },
          { question: { en: 'Catch the default position of every element', es: 'Atrapa la posición por defecto de todo elemento' }, correct: 'static', wrongs: ['relative', 'fixed', 'normal'], speed: 0.9 },
          { question: { en: 'Catch the value that turns a parent into an anchor for absolute children', es: 'Atrapa el valor que convierte a un padre en ancla para hijos absolute' }, correct: 'relative', wrongs: ['static', 'anchor', 'parent'], speed: 1.1 },
          { question: { en: 'Catch the property that places a corner badge (together with position)', es: 'Atrapa la propiedad que ubica un badge de esquina (junto con position)' }, correct: 'top', wrongs: ['above', 'corner', 'y'], speed: 0.8 },
          { question: { en: 'Catch the property that makes width include the padding', es: 'Atrapa la propiedad que hace que el width incluya el padding' }, correct: 'box-sizing', wrongs: ['box-model', 'sizing', 'border-width'], speed: 1 }
        ],
        explain: { en: 'Review: static, relative, absolute, fixed — plus a border-box echo.', es: 'Repaso: static, relative, absolute, fixed — más un eco de border-box.' }
      },
      {
        type: 'sandbox',
        lang: 'css',
        prompt: { en: 'FINAL positioning mission: make <code>.card</code> the anchor (<code>relative</code>), pin <code>.badge</code> to its corner with <code>absolute</code> at <code>top: 10px</code>, <code>right: 10px</code>, and glue <code>.banner</code> to the screen with <code>fixed</code> at <code>bottom: 0</code>, <code>left: 0</code>.', es: 'Misión final de posicionamiento: haz de <code>.card</code> el ancla (<code>relative</code>), fija <code>.badge</code> en su esquina con <code>absolute</code> en <code>top: 10px</code> y <code>right: 10px</code>, y pega <code>.banner</code> a la pantalla con <code>fixed</code> en <code>bottom: 0</code> y <code>left: 0</code>.' },
        start: '.card {\n  \n}\n\n.badge {\n  \n}\n\n.banner {\n  \n}\n',
        fixture: '<div class="card">\n  <span class="badge">NEW</span>\n  <h2>Space Station</h2>\n  <p>Home sweet orbit</p>\n</div>\n<div class="banner">Live from orbit!</div>',
        target: { en: 'Card relative — badge absolute at 10px/10px — banner fixed at the bottom', es: 'Card relative — badge absolute a 10px/10px — banner fixed abajo' },
        solution: '.card {\n  position: relative;\n}\n\n.badge {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}\n\n.banner {\n  position: fixed;\n  bottom: 0;\n  left: 0;\n}',
        explain: { en: 'Anchor, pin, glue — relative, absolute and fixed: the three coordinates of layout freedom.', es: 'Ancla, fija y pega: relative, absolute y fixed, las tres coordenadas de la libertad de diseño.' },
        checks: [
          { style: '.card', prop: 'position', equals: 'relative', label: { en: 'The card is the relative anchor', es: 'La card es el ancla relative' } },
          { style: '.badge', prop: 'position', equals: 'absolute', label: { en: 'The badge is absolute', es: 'El badge es absolute' } },
          { style: '.badge', prop: 'top', equals: '10px', label: { en: 'The badge sits 10px from the top', es: 'El badge queda a 10px de arriba' } },
          { style: '.badge', prop: 'right', equals: '10px', label: { en: 'The badge sits 10px from the right', es: 'El badge queda a 10px de la derecha' } },
          { style: '.banner', prop: 'position', equals: 'fixed', label: { en: 'The banner is fixed to the screen', es: 'El banner está fijo a la pantalla' } }
        ]
      }
    ]
  }
];
