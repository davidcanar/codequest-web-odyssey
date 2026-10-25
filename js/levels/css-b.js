/* ============ CSS Kingdom track — part B, levels 21-27 (css-09…css-15) ============
   Intermediate/advanced CSS: flexbox I & II, grid, transitions & transforms,
   keyframe animations, responsive design, BOSS finale.
   One concept per level, progressively harder. CSS sandboxes use lang:'css'
   with a fixture: the user writes CSS only. Checks read COMPUTED styles
   (colors 'rgb(R, G, B)', display/align/justify keywords, animation-* and
   transition-duration values). Things computed styles can't verify (flex-direction,
   @keyframes, @media, transform matrix, gap shorthand, box-shadow) use {codeIncludes}.
   Same schema as html.js / css-a.js. Arcade appears exactly once in css-11
   and css-14 (mid-level review, never the finale). */
window.LEVELS_CSS_B = [
  {
    id: 'css-09', track: 'css', num: 21, icon: '🧲', xp: 100,
    title: { en: 'Flexbox I', es: 'Flexbox I' },
    subtitle: { en: 'display:flex and justify-content', es: 'display:flex y justify-content' },
    narration: {
      en: "Cadet, meet Flexbox — the magnetic layout engine! Give any container the display property with the value flex, and its children line up in a neat row like rocket cars on a launch track. Then justify-content decides where the row goes: start, center, or spread out with space between. One word of CSS and everything snaps into place. Let's line up!",
      es: "¡Cadete, te presento a Flexbox, el motor de diseño magnético! Dale a cualquier contenedor la propiedad display con el valor flex, y sus hijos se alinean en una fila ordenada como vagones en la pista de lanzamiento. Luego justify-content decide dónde va la fila: al inicio, al centro o repartidos con espacio entre ellos. Una palabra de CSS y todo encaja. ¡Alineémonos!"
    },
    outro: {
      en: "Flex row mastered, Cadet! Justify-content just became your favorite alignment tool in the galaxy.",
      es: "¡Fila flex dominada, Cadete! justify-content se acaba de volver tu herramienta de alineación favorita de la galaxia."
    },
    explainer: 'css-09',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'What does <code>display: flex</code> do to a container?', es: '¿Qué hace <code>display: flex</code> en un contenedor?' },
        options: [
          { en: 'It hides the container', es: 'Oculta el contenedor' },
          { en: 'Its children become flex items, lined up in a row', es: 'Sus hijos se vuelven flex items, alineados en fila' },
          { en: 'It centers the text inside', es: 'Centra el texto de dentro' },
          { en: 'It draws a frame around it', es: 'Dibuja un marco alrededor' }
        ],
        answer: 1,
        explain: { en: '<code>display: flex</code> turns the container into a flex container and its direct children into flex items — in a row by default.', es: '<code>display: flex</code> convierte el contenedor en un flex container y a sus hijos directos en flex items: en fila por defecto.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'What is the <b>default</b> value of <code>justify-content</code>?', es: '¿Cuál es el valor <b>por defecto</b> de <code>justify-content</code>?' },
        options: [
          { en: 'flex-start', es: 'flex-start' },
          { en: 'center', es: 'center' },
          { en: 'space-between', es: 'space-between' },
          { en: 'flex-end', es: 'flex-end' }
        ],
        answer: 0,
        explain: { en: 'By default items pack at the start of the row — that is flex-start. justify-content only moves them if you ask.', es: 'Por defecto los elementos se agrupan al inicio de la fila: ese es flex-start. justify-content solo los mueve si se lo pides.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build a flex row with everything centered.', es: 'Construye una fila flex con todo centrado.' },
        slots: ['.row {', 'display:', 'flex;', 'justify-content:', 'center;', '}'],
        distractors: ['align-items:', 'left;'],
        explain: { en: 'Two declarations do the magic: display: flex makes the row, justify-content: center centers the items along it.', es: 'Dos declaraciones hacen la magia: display: flex crea la fila y justify-content: center centra los elementos a lo largo de ella.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each <code>justify-content</code> value to its move', es: 'Une cada valor de <code>justify-content</code> con su movimiento' },
        lang: 'css',
        pairs: [
          { chip: '1', a: { en: 'justify-content: flex-start', es: 'justify-content: flex-start' }, b: { en: 'items packed at the start — the default', es: 'elementos juntos al inicio: el valor por defecto' } },
          { chip: '2', a: { en: 'justify-content: center', es: 'justify-content: center' }, b: { en: 'items packed in the middle', es: 'elementos juntos en el medio' } },
          { chip: '3', a: { en: 'justify-content: space-between', es: 'justify-content: space-between' }, b: { en: 'first at the start, last at the end, even space between', es: 'el primero al inicio, el último al final, espacio parejo entre ellos' } },
          { chip: '4', a: { en: 'justify-content: flex-end', es: 'justify-content: flex-end' }, b: { en: 'items packed at the end of the row', es: 'elementos juntos al final de la fila' } }
        ],
        hint: { en: 'start = where the row begins; end = where it ends.', es: 'start = donde empieza la fila; end = donde termina.' },
        explain: { en: 'justify-content slides the whole group along the main axis — the row.', es: 'justify-content desliza todo el grupo a lo largo del eje principal: la fila.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Spread the cards: the first should hug the left edge and the last the right edge. Fill in the value.', es: 'Reparte las tarjetas: la primera debe pegarse a la izquierda y la última a la derecha. Completa el valor.' },
        template: '.deck {\n  display: flex;\n  justify-content: ___;\n}',
        answers: [{ accept: ['space-between'] }],
        hint: { en: 'Two words joined by a hyphen: space…', es: 'Dos palabras unidas con guion: space…' },
        explain: { en: 'space-between pushes the first item to the start, the last to the end, and splits the leftover space evenly between them.', es: 'space-between empuja el primer elemento al inicio, el último al final y reparte el espacio sobrante en partes iguales entre ellos.' }
      },
      {
        type: 'bug',
        prompt: { en: 'The buttons refuse to center! Click the broken line.', es: '¡Los botones se niegan a centrarse! Haz clic en la línea rota.' },
        lang: 'css',
        lines: ['.toolbar {', '  display: flex;', '  justify-content: centre;', '}'],
        bugLine: 2,
        fix: { accept: ['  justify-content: center;', 'justify-content: center;'] },
        explain: { en: 'CSS values use the American spelling: <code>center</code>, never <code>centre</code>.', es: 'Los valores de CSS usan la ortografía americana: <code>center</code>, nunca <code>centre</code>.' }
      },
      {
        type: 'sandbox',
        lang: 'css',
        prompt: { en: 'Mission: line up the launch buttons — make <code>.toolbar</code> a <b>flex row</b> with <code>display: flex</code> and <b>center</b> the buttons with <code>justify-content: center</code>. Watch them slide!', es: 'Misión: alinea los botones de lanzamiento — haz de <code>.toolbar</code> una <b>fila flex</b> con <code>display: flex</code> y <b>centra</b> los botones con <code>justify-content: center</code>. ¡Míralos deslizarse!' },
        start: '.toolbar {\n  \n}\n',
        fixture: '<div class="toolbar">\n  <button>🚀 Launch</button>\n  <button>🌙 Land</button>\n  <button>🛑 Abort</button>\n</div>',
        target: { en: 'Toolbar as a flex row with the buttons centered', es: 'Barra como fila flex con los botones centrados' },
        solution: '.toolbar {\n  display: flex;\n  justify-content: center;\n}',
        explain: { en: 'display: flex makes the row; justify-content: center slides the buttons to the middle.', es: 'display: flex crea la fila; justify-content: center desliza los botones al centro.' },
        checks: [
          { style: '.toolbar', prop: 'display', equals: 'flex', label: { en: 'The toolbar is a flex container', es: 'La barra es un contenedor flex' } },
          { style: '.toolbar', prop: 'justify-content', equals: 'center', label: { en: 'The buttons are centered', es: 'Los botones están centrados' } },
          { codeIncludes: 'display:', label: { en: 'You wrote a display declaration', es: 'Escribiste una declaración display' } },
          { codeIncludes: 'justify-content', label: { en: 'You used justify-content', es: 'Usaste justify-content' } }
        ]
      }
    ]
  },
  {
    id: 'css-10', track: 'css', num: 22, icon: '↕️', xp: 100,
    title: { en: 'Flexbox II', es: 'Flexbox II' },
    subtitle: { en: 'align-items, gap, flex-wrap, flex-direction', es: 'align-items, gap, flex-wrap, flex-direction' },
    narration: {
      en: "Flexbox level two, Cadet! Flex-direction rotates the whole row — column makes items stack downward. Align-items works on the cross axis, so center lifts everything to the middle line. And gap drops equal spacing between items — no more margin math. Stack the crew, space the cargo, and wrap it all when the deck runs out of room!",
      es: "¡Flexbox nivel dos, Cadete! Flex-direction gira toda la fila: column hace que los elementos se apilen hacia abajo. Align-items trabaja en el eje cruzado, así que center eleva todo a la línea del medio. Y gap deja un espacio igual entre los elementos: se acabaron los cálculos con margin. ¡Apila a la tripulación, acomoda la carga y pliega todo cuando falte espacio!"
    },
    outro: {
      en: "Rows, columns, gaps and wraps — you steer Flexbox in every direction now!",
      es: "¡Filas, columnas, espacios y pliegues: ahora pilotas Flexbox en todas direcciones!"
    },
    explainer: 'css-10',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'In a flex <b>row</b>, which property aligns items on the <b>cross axis</b> — up and down?', es: 'En una fila flex, ¿qué propiedad alinea los elementos en el <b>eje cruzado</b> — arriba y abajo?' },
        options: [
          { en: 'justify-content', es: 'justify-content' },
          { en: 'align-items', es: 'align-items' },
          { en: 'cross-align', es: 'cross-align' },
          { en: 'vertical-mode', es: 'vertical-mode' }
        ],
        answer: 1,
        explain: { en: 'justify-content works along the main axis; align-items works across it. In a row, that means up and down.', es: 'justify-content trabaja a lo largo del eje principal; align-items lo hace a través de él. En una fila, eso significa arriba y abajo.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'The crew overflows the deck! Which rule lets items jump to a <b>new line</b>?', es: '¡La tripulación se sale de la cubierta! ¿Qué regla permite que los elementos salten a una <b>línea nueva</b>?' },
        options: [
          { en: 'flex-wrap: nowrap;', es: 'flex-wrap: nowrap;' },
          { en: 'flex-direction: wrap;', es: 'flex-direction: wrap;' },
          { en: 'flex-wrap: wrap;', es: 'flex-wrap: wrap;' },
          { en: 'align-items: wrap;', es: 'align-items: wrap;' }
        ],
        answer: 2,
        explain: { en: '<code>flex-wrap: wrap</code> allows items to fold onto new lines when they run out of room. nowrap is the default — items squeeze instead.', es: '<code>flex-wrap: wrap</code> permite que los elementos pasen a líneas nuevas cuando falta espacio. nowrap es el valor por defecto: los elementos se apretujan.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each flex tool to its job', es: 'Une cada herramienta flex con su trabajo' },
        lang: 'css',
        pairs: [
          { chip: '1', a: { en: 'flex-direction: column', es: 'flex-direction: column' }, b: { en: 'stacks items top to bottom', es: 'apila los elementos de arriba abajo' } },
          { chip: '2', a: { en: 'align-items: center', es: 'align-items: center' }, b: { en: 'centers items on the cross axis', es: 'centra los elementos en el eje cruzado' } },
          { chip: '3', a: { en: 'gap: 16px', es: 'gap: 16px' }, b: { en: 'equal space between items — no margin math', es: 'espacio igual entre elementos: sin cálculos de margin' } },
          { chip: '4', a: { en: 'flex-wrap: wrap', es: 'flex-wrap: wrap' }, b: { en: 'items fold onto a new line when out of room', es: 'los elementos pasan a otra línea si no caben' } }
        ],
        hint: { en: 'One rotates the axis, one centers, one spaces, one folds.', es: 'Uno rota el eje, uno centra, uno da espacio y uno pliega.' },
        explain: { en: 'Four dials that steer any flex container: direction, alignment, spacing and wrapping.', es: 'Cuatro diales que gobiernan cualquier contenedor flex: dirección, alineación, espaciado y plegado.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Stack the tools <b>top to bottom</b> instead of in a row.', es: 'Apila las herramientas de <b>arriba abajo</b> en vez de en fila.' },
        template: '.toolbox {\n  display: flex;\n  flex-direction: ___;\n}',
        answers: [{ accept: ['column'] }],
        hint: { en: 'The opposite of row — think of columns in a building.', es: 'Lo contrario de row: piensa en las columnas de un edificio.' },
        explain: { en: '<code>flex-direction: column</code> rotates the main axis: flex items now stack downward.', es: '<code>flex-direction: column</code> gira el eje principal: los flex items ahora se apilan hacia abajo.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build a vertical crew list with even spacing.', es: 'Construye una lista vertical de la tripulación con espaciado parejo.' },
        slots: ['.crew {', 'flex-direction:', 'column;', 'gap:', '16px;', '}'],
        distractors: ['align-items:', 'column-gap-only;'],
        explain: { en: 'flex-direction: column stacks the members; gap: 16px spaces them evenly — margins not required.', es: 'flex-direction: column apila a los miembros; gap: 16px los espacia parejo: sin necesidad de margins.' }
      },
      {
        type: 'bug',
        prompt: { en: 'The stack will not stack! Click the broken line.', es: '¡La pila no se apila! Haz clic en la línea rota.' },
        lang: 'css',
        lines: ['.stack {', '  display: flex;', '  flex-direction: columns;', '}'],
        bugLine: 2,
        fix: { accept: ['  flex-direction: column;', 'flex-direction: column;'] },
        explain: { en: 'The value is <code>column</code> — singular. <code>columns</code> does not exist, so the browser ignores the line.', es: 'El valor es <code>column</code>, en singular. <code>columns</code> no existe, así que el navegador ignora la línea.' }
      },
      {
        type: 'sandbox',
        lang: 'css',
        prompt: { en: 'Mission: orbit the crew — make <code>.crew</code> a flex container, stack it vertically with <code>flex-direction: column</code>, center the members with <code>align-items: center</code>, and give it <code>gap: 16px</code>.', es: 'Misión: pon en órbita a la tripulación — haz de <code>.crew</code> un contenedor flex, apílalo verticalmente con <code>flex-direction: column</code>, centra a los miembros con <code>align-items: center</code> y dale <code>gap: 16px</code>.' },
        start: '.crew {\n  \n}\n',
        fixture: '<div class="crew">\n  <span>👩‍🚀 Nova</span>\n  <span>🤖 Cosmo</span>\n  <span>🐕 Bolt</span>\n</div>',
        target: { en: 'Crew stacked vertically, centered, with a 16px gap', es: 'Tripulación apilada en vertical, centrada y con un gap de 16px' },
        solution: '.crew {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 16px;\n}',
        explain: { en: 'Column stacks them, center aligns them across, gap spaces them — the full flex toolbox in one rule.', es: 'column los apila, center los alinea a través y gap los espacia: la caja de herramientas flex completa en una regla.' },
        checks: [
          { style: '.crew', prop: 'display', equals: 'flex', label: { en: 'The crew is a flex container', es: 'La tripulación es un contenedor flex' } },
          { style: '.crew', prop: 'align-items', equals: 'center', label: { en: 'The members are centered on the cross axis', es: 'Los miembros están centrados en el eje cruzado' } },
          { codeIncludes: 'flex-direction', label: { en: 'You set a flex-direction', es: 'Definiste un flex-direction' } },
          { codeIncludes: 'column', label: { en: 'The direction is column (stacked)', es: 'La dirección es column (apilada)' } },
          { codeIncludes: 'gap', label: { en: 'You added a gap between members', es: 'Agregaste un gap entre los miembros' } }
        ]
      }
    ]
  },
  {
    id: 'css-11', track: 'css', num: 23, icon: '🔲', xp: 100,
    title: { en: 'Grid Layout', es: 'Diseño con Grid' },
    subtitle: { en: 'display:grid, grid-template-columns and gap', es: 'display:grid, grid-template-columns y gap' },
    narration: {
      en: "Flexbox is one-dimensional, Cadet, but today we go two-dimensional with Grid! Turn a container into a grid, then draw its columns with grid-template-columns. The magic word repeat makes equal columns in one go, and one fr means one equal share of the free space. Add a gap and your gallery snaps into perfect rows and columns. Warning: meteors ahead!",
      es: "Flexbox es de una dimensión, Cadete, ¡pero hoy pasamos a dos dimensiones con Grid! Convierte un contenedor en cuadrícula y dibuja sus columnas con grid-template-columns. La palabra mágica repeat crea columnas iguales de una sola vez, y un fr significa una parte igual del espacio libre. Añade un gap y tu galería se acomoda en filas y columnas perfectas. ¡Atención: meteoros a la vista!"
    },
    outro: {
      en: "Grid unlocked, Cadet! Your galleries now snap into perfect rows and columns like magic.",
      es: "¡Grid desbloqueado, Cadete! Tus galerías se acomodan ahora en filas y columnas perfectas, como por arte de magia."
    },
    explainer: 'css-11',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'What makes <b>Grid</b> different from Flexbox?', es: '¿Qué hace diferente a <b>Grid</b> de Flexbox?' },
        options: [
          { en: 'Grid arranges items in rows AND columns — two dimensions', es: 'Grid acomoda los elementos en filas Y columnas: dos dimensiones' },
          { en: 'Grid only works on images', es: 'Grid solo funciona con imágenes' },
          { en: 'Grid is only for text', es: 'Grid es solo para texto' },
          { en: 'Flexbox is the two-dimensional one', es: 'Flexbox es el bidimensional' }
        ],
        answer: 0,
        explain: { en: 'Flexbox is one-dimensional (a row OR a column). Grid is two-dimensional: rows and columns at once.', es: 'Flexbox es unidimensional (una fila O una columna). Grid es bidimensional: filas y columnas a la vez.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'What does <code>grid-template-columns: repeat(3, 1fr)</code> build?', es: '¿Qué construye <code>grid-template-columns: repeat(3, 1fr)</code>?' },
        options: [
          { en: 'Three columns of 1 pixel each', es: 'Tres columnas de 1 píxel cada una' },
          { en: 'One column repeated three times downward', es: 'Una columna repetida tres veces hacia abajo' },
          { en: 'Three equal columns sharing the free space', es: 'Tres columnas iguales que comparten el espacio libre' },
          { en: 'Three separate grids side by side', es: 'Tres cuadrículas separadas lado a lado' }
        ],
        answer: 2,
        explain: { en: 'repeat(3, 1fr) is shorthand for 1fr 1fr 1fr: three equal columns. 1fr = one share of the free space.', es: 'repeat(3, 1fr) es el atajo de 1fr 1fr 1fr: tres columnas iguales. 1fr = una parte del espacio libre.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build a two-column grid gallery.', es: 'Construye una galería de cuadrícula de dos columnas.' },
        slots: ['.gallery {', 'display:', 'grid;', 'grid-template-columns:', '1fr 1fr;', '}'],
        distractors: ['flex-template-columns:', '1fr-grid;'],
        explain: { en: 'display: grid switches on the grid; grid-template-columns draws one track per column — here two equal ones.', es: 'display: grid activa la cuadrícula; grid-template-columns dibuja una pista por columna: aquí, dos iguales.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Make <b>three equal columns</b> — write it the short way with <code>repeat</code>.', es: 'Crea <b>tres columnas iguales</b>: escríbelo de forma corta con <code>repeat</code>.' },
        template: '.gallery {\n  display: grid;\n  grid-template-columns: ___;\n}',
        answers: [{ accept: ['repeat(3, 1fr)', 'repeat(3,1fr)'] }],
        hint: { en: 'repeat( how many , what size ) — with a comma.', es: 'repeat( cuántas , de qué tamaño ) — con coma.' },
        explain: { en: 'repeat(3, 1fr) means "three columns, each one equal share". It equals 1fr 1fr 1fr.', es: 'repeat(3, 1fr) significa "tres columnas, cada una una parte igual". Equivale a 1fr 1fr 1fr.' }
      },
      {
        type: 'arcade',
        prompt: { en: 'Meteor drill! Catch the Grid tokens before they hit the deck.', es: '¡Entrenamiento de meteoros! Atrapa los tokens de Grid antes de que golpeen la cubierta.' },
        rounds: [
          { question: { en: 'Catch the value that turns a container into a GRID', es: 'Atrapa el valor que convierte un contenedor en GRID' }, correct: 'grid', wrongs: ['flex', 'block', 'table'], speed: 1 },
          { question: { en: 'Catch the function that makes 4 equal columns', es: 'Atrapa la función que crea 4 columnas iguales' }, correct: 'repeat(4, 1fr)', wrongs: ['loop(4, 1fr)', 'repeat(1, 4fr)', 'columns(4)'], speed: 0.9 },
          { question: { en: 'Catch the unit that means "one equal share of free space"', es: 'Atrapa la unidad que significa "una parte igual del espacio libre"' }, correct: '1fr', wrongs: ['1px', '1%', '1em'], speed: 1.1 },
          { question: { en: 'Catch the property that adds space between grid items', es: 'Atrapa la propiedad que añade espacio entre los elementos del grid' }, correct: 'gap', wrongs: ['gutter', 'spacing', 'padding'], speed: 1 },
          { question: { en: 'Catch the one-dimensional layout value (Flexbox echo!)', es: 'Atrapa el valor de diseño unidimensional (¡eco de Flexbox!)' }, correct: 'flex', wrongs: ['grid', 'wrap', 'none'], speed: 0.8 }
        ],
        explain: { en: 'Review: grid, repeat, fr, gap — plus a friendly echo of Flexbox.', es: 'Repaso: grid, repeat, fr, gap — más un eco amistoso de Flexbox.' }
      },
      {
        type: 'bug',
        prompt: { en: 'The grid refuses to build! Click the broken line.', es: '¡La cuadrícula no se construye! Haz clic en la línea rota.' },
        lang: 'css',
        lines: ['.gallery {', '  display: grid;', '  grid-template-columns: repeat(3 1fr);', '}'],
        bugLine: 2,
        fix: { accept: ['  grid-template-columns: repeat(3, 1fr);', '  grid-template-columns: repeat(3,1fr);', 'grid-template-columns: repeat(3, 1fr);', 'grid-template-columns: repeat(3,1fr);'] },
        explain: { en: 'repeat( ) needs a comma between the count and the size: <code>repeat(3, 1fr)</code>.', es: 'repeat( ) necesita una coma entre la cantidad y el tamaño: <code>repeat(3, 1fr)</code>.' }
      },
      {
        type: 'sandbox',
        lang: 'css',
        prompt: { en: 'Mission: build the mission-patch gallery — make <code>.gallery</code> a grid with <code>display: grid</code>, three equal columns using <code>grid-template-columns: repeat(3, 1fr)</code>, and <code>gap: 16px</code> between patches.', es: 'Misión: construye la galería de parches — haz de <code>.gallery</code> una cuadrícula con <code>display: grid</code>, tres columnas iguales con <code>grid-template-columns: repeat(3, 1fr)</code> y <code>gap: 16px</code> entre parches.' },
        start: '.gallery {\n  \n}\n',
        fixture: '<div class="gallery">\n  <div>🚀</div>\n  <div>🛰️</div>\n  <div>🌕</div>\n  <div>☄️</div>\n  <div>🌌</div>\n  <div>🪐</div>\n</div>',
        target: { en: 'Gallery as a grid: three equal columns via repeat(3, 1fr) with a 16px gap', es: 'Galería en cuadrícula: tres columnas iguales con repeat(3, 1fr) y un gap de 16px' },
        solution: '.gallery {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n}',
        explain: { en: 'display: grid switches on the grid, repeat(3, 1fr) draws three equal tracks, gap keeps the patches breathing.', es: 'display: grid activa la cuadrícula, repeat(3, 1fr) dibuja tres pistas iguales y gap deja respirar a los parches.' },
        checks: [
          { style: '.gallery', prop: 'display', equals: 'grid', label: { en: 'The gallery is a grid container', es: 'La galería es un contenedor grid' } },
          { codeIncludes: 'grid-template-columns', label: { en: 'You drew the columns with grid-template-columns', es: 'Dibujaste las columnas con grid-template-columns' } },
          { codeIncludes: 'repeat(3', label: { en: 'You used repeat(3, 1fr) for three equal columns', es: 'Usaste repeat(3, 1fr) para tres columnas iguales' } },
          { codeIncludes: 'gap', label: { en: 'You added a gap between patches', es: 'Agregaste un gap entre los parches' } }
        ]
      }
    ]
  },
  {
    id: 'css-12', track: 'css', num: 24, icon: '🌀', xp: 100,
    title: { en: 'Spin & Slide', es: 'Gira y desliza' },
    subtitle: { en: 'transition and transform: rotate, scale, translate', es: 'transition y transform: rotate, scale, translate' },
    narration: {
      en: "Time to bend space, Cadet! The transform property spins elements with rotate, grows them with scale and slides them with translate. And transition? It makes every change glide smoothly instead of snapping. Put them together with hover, and elements come alive when the mouse flies over. Ready to spin your first rocket?",
      es: "¡Hora de doblar el espacio, Cadete! La propiedad transform gira elementos con rotate, los agranda con scale y los desliza con translate. ¿Y transition? Hace que cada cambio se deslice suavemente en vez de dar un salto. Combínalos con hover y los elementos cobran vida cuando el ratón pasa volando. ¿Listo para girar tu primer cohete?"
    },
    outro: {
      en: "Spin, grow, slide — and all of it smooth! Transforms and transitions are under your command.",
      es: "Girar, crecer, deslizar, ¡y todo suave! Transform y transition están bajo tu mando."
    },
    explainer: 'css-12',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'What does <code>transform: rotate(45deg)</code> do?', es: '¿Qué hace <code>transform: rotate(45deg)</code>?' },
        options: [
          { en: 'Spins the element 45 degrees around its center', es: 'Gira el elemento 45 grados alrededor de su centro' },
          { en: 'Tilts the whole screen 45 degrees', es: 'Inclina toda la pantalla 45 grados' },
          { en: 'Rounds the corners by 45 degrees', es: 'Redondea las esquinas 45 grados' },
          { en: 'Spins the element 45 times per second', es: 'Gira el elemento 45 veces por segundo' }
        ],
        answer: 0,
        explain: { en: 'rotate(45deg) turns the element 45 degrees around its center. The screen and the corners stay exactly where they are!', es: 'rotate(45deg) gira el elemento 45 grados alrededor de su centro. ¡La pantalla y las esquinas siguen exactamente donde están!' }
      },
      {
        type: 'mcq',
        prompt: { en: 'Which property makes a style change <b>glide smoothly</b> instead of snapping?', es: '¿Qué propiedad hace que un cambio de estilo se <b>deslice suavemente</b> en vez de dar un salto?' },
        options: [
          { en: 'animation-timer', es: 'animation-timer' },
          { en: 'transition', es: 'transition' },
          { en: 'morphing', es: 'morphing' },
          { en: 'smooth: true;', es: 'smooth: true;' }
        ],
        answer: 1,
        explain: { en: '<code>transition</code> tells the browser to animate between the old and new style over a duration, like 0.3s.', es: '<code>transition</code> le dice al navegador que anime el paso del estilo viejo al nuevo durante un tiempo, como 0.3s.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each value to its move', es: 'Une cada valor con su movimiento' },
        lang: 'css',
        pairs: [
          { chip: '1', a: { en: 'transform: rotate(45deg)', es: 'transform: rotate(45deg)' }, b: { en: 'spins 45 degrees', es: 'gira 45 grados' } },
          { chip: '2', a: { en: 'transform: scale(1.5)', es: 'transform: scale(1.5)' }, b: { en: 'grows to 150% size', es: 'crece al 150% de tamaño' } },
          { chip: '3', a: { en: 'transform: translateX(20px)', es: 'transform: translateX(20px)' }, b: { en: 'slides 20px to the right', es: 'se desliza 20px a la derecha' } },
          { chip: '4', a: { en: 'transition: 0.3s', es: 'transition: 0.3s' }, b: { en: 'makes changes glide smoothly', es: 'hace que los cambios se deslicen suave' } }
        ],
        hint: { en: 'deg = degrees, scale above 1 = bigger, X = horizontal.', es: 'deg = grados, scale mayor que 1 = más grande, X = horizontal.' },
        explain: { en: 'rotate spins, scale resizes, translate slides — and transition smooths every one of them.', es: 'rotate gira, scale cambia el tamaño, translate desliza — y transition suaviza cada movimiento.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Spin the star: complete the transform.', es: 'Gira la estrella: completa el transform.' },
        template: '.star {\n  transform: ___(45deg);\n}',
        answers: [{ accept: ['rotate'] }],
        hint: { en: 'Four letters — it means "turn".', es: 'Cuatro letras: significa "girar".' },
        explain: { en: 'rotate() spins the element. scale() resizes it and translate() slides it — the three transform moves.', es: 'rotate() gira el elemento. scale() le cambia el tamaño y translate() lo desliza: los tres movimientos de transform.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build the hover effect: the logo GROWS when the mouse flies over.', es: 'Construye el efecto hover: el logo CRECE cuando el ratón pasa volando.' },
        slots: ['.logo:hover {', 'transform:', 'scale(1.2);', '}'],
        distractors: ['scale-up(1.2);', 'zoom: 1.2;'],
        explain: { en: ':hover applies styles while the mouse is over the element; scale(1.2) makes it 20% bigger.', es: ':hover aplica estilos mientras el ratón está sobre el elemento; scale(1.2) lo hace 20% más grande.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the recipe for a smooth hover grow', es: 'Ordena la receta de un crecimiento suave al pasar el ratón' },
        lang: 'css',
        lines: ['.logo {', '  transition: transform 0.3s;', '}', '.logo:hover {', '  transform: scale(1.2);', '}'],
        explain: { en: 'The transition lives on the base rule so it animates both directions; the :hover rule sets the destination.', es: 'El transition vive en la regla base para animar en ambas direcciones; la regla :hover fija el destino.' }
      },
      {
        type: 'bug',
        prompt: { en: 'The badge will not spin! Click the broken line.', es: '¡La insignia no gira! Haz clic en la línea rota.' },
        lang: 'css',
        lines: ['.badge {', '  transform: rotate(45);', '  transition: 0.3s;', '}'],
        bugLine: 1,
        fix: { accept: ['  transform: rotate(45deg);', 'transform: rotate(45deg);'] },
        explain: { en: 'Rotation needs a unit: <code>45deg</code>. A bare number like 45 is not an angle.', es: 'La rotación necesita unidad: <code>45deg</code>. Un número solo, como 45, no es un ángulo.' }
      },
      {
        type: 'sandbox',
        lang: 'css',
        prompt: { en: 'Mission: launch the rocket — give <code>.rocket</code> a <code>transition: transform 0.5s</code>, then on <code>.rocket:hover</code> slide it 30px right with <code>transform: translateX(30px)</code>. Hover the preview and watch it go!', es: 'Misión: lanza el cohete — dale a <code>.rocket</code> un <code>transition: transform 0.5s</code> y, en <code>.rocket:hover</code>, deslízalo 30px a la derecha con <code>transform: translateX(30px)</code>. ¡Pasa el ratón por la vista previa y míralo volar!' },
        start: '.rocket {\n  \n}\n\n.rocket:hover {\n  \n}\n',
        fixture: '<div class="pad">\n  <div class="rocket">🚀</div>\n</div>',
        target: { en: 'Rocket with a 0.5s transform transition, sliding 30px right on hover', es: 'Cohete con transition de transform de 0.5s, que se desliza 30px al pasar el ratón' },
        solution: '.rocket {\n  transition: transform 0.5s;\n}\n\n.rocket:hover {\n  transform: translateX(30px);\n}',
        explain: { en: 'The transition on the base rule makes the hover move glide; translateX does the sliding.', es: 'El transition en la regla base hace que el movimiento hover se deslice; translateX hace el deslizamiento.' },
        checks: [
          { style: '.rocket', prop: 'transition-duration', equals: '0.5s', label: { en: 'The transition lasts 0.5s', es: 'La transición dura 0.5s' } },
          { codeIncludes: 'transition', label: { en: 'You wrote a transition', es: 'Escribiste un transition' } },
          { codeIncludes: ':hover', label: { en: 'You used a :hover rule', es: 'Usaste una regla :hover' } },
          { codeIncludes: 'translateX', label: { en: 'You slide the rocket with translateX', es: 'Deslizas el cohete con translateX' } }
        ]
      }
    ]
  },
  {
    id: 'css-13', track: 'css', num: 25, icon: '🎬', xp: 100,
    title: { en: 'Keyframe Animations', es: 'Animaciones keyframe' },
    subtitle: { en: '@keyframes and the animation property', es: '@keyframes y la propiedad animation' },
    narration: {
      en: "Action, Cadet! Keyframe animations are little movies written in CSS. You define the movie with @keyframes — a name and its stages, like from and to — then play it on any element with the animation property. Choose the duration, and add the word infinite to loop it forever. Your UFO is ready to float across the sky. Lights, camera, animate!",
      es: "¡Acción, Cadete! Las animaciones keyframe son pequeñas películas escritas en CSS. Defines la película con @keyframes — un nombre y sus etapas, como from y to — y luego la reproduces en cualquier elemento con la propiedad animation. Elige la duración y agrega la palabra infinite para repetirla para siempre. Tu OVNI está listo para flotar por el cielo. ¡Luces, cámara, a animar!"
    },
    outro: {
      en: "Cut! That's a wrap, Cadet — your pages move like the movies now.",
      es: "¡Corten! Eso es todo, Cadete: tus páginas se mueven como en el cine."
    },
    explainer: 'css-13',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'What does <code>@keyframes</code> define?', es: '¿Qué define <code>@keyframes</code>?' },
        options: [
          { en: 'A new HTML tag', es: 'Una etiqueta HTML nueva' },
          { en: 'The stages of an animation, step by step', es: 'Las etapas de una animación, paso a paso' },
          { en: 'A keyboard shortcut', es: 'Un atajo de teclado' },
          { en: 'The color palette of the page', es: 'La paleta de colores de la página' }
        ],
        answer: 1,
        explain: { en: '@keyframes is the blueprint of an animation: you give it a name and the styles at each stage, like from and to.', es: '@keyframes es el plano de una animación: le das un nombre y los estilos de cada etapa, como from y to.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'In a keyframes rule, what do <code>from</code> and <code>to</code> mean?', es: 'En una regla keyframes, ¿qué significan <code>from</code> y <code>to</code>?' },
        options: [
          { en: 'from = the start (0%), to = the end (100%)', es: 'from = el inicio (0%), to = el final (100%)' },
          { en: 'from = where the element is written in the HTML', es: 'from = dónde está escrito el elemento en el HTML' },
          { en: 'to = the element that receives the animation', es: 'to = el elemento que recibe la animación' },
          { en: 'They are two different animations', es: 'Son dos animaciones distintas' }
        ],
        answer: 0,
        explain: { en: 'from and to are the first and last frames. For more steps you can use percents, like 50%.', es: 'from y to son el primer y el último fotograma. Para más pasos puedes usar porcentajes, como 50%.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Make the comet fly <b>forever</b>: fill in the missing keyword.', es: 'Haz que el cometa vuele <b>para siempre</b>: completa la palabra que falta.' },
        template: '.comet {\n  animation: fly 2s ___;\n}',
        answers: [{ accept: ['infinite'] }],
        hint: { en: 'Eight letters — it never stops.', es: 'Ocho letras: nunca se detiene.' },
        explain: { en: 'The last value of animation is how many times it plays: a number, or infinite to loop forever.', es: 'El último valor de animation es cuántas veces se reproduce: un número, o infinite para repetirla por siempre.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build the blueprint of a "pulse" animation.', es: 'Construye el plano de una animación "pulse".' },
        slots: ['@keyframes', 'pulse {', 'from { transform: scale(1); }', 'to { transform: scale(1.4); }', '}'],
        distractors: ['animation:', 'pulse();'],
        explain: { en: '@keyframes, then the name and braces. from and to hold the first and last frame of the movie.', es: '@keyframes, luego el nombre y las llaves. from y to guardan el primer y el último fotograma de la película.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each animation part to its job', es: 'Une cada parte de la animación con su trabajo' },
        lang: 'css',
        pairs: [
          { chip: '1', a: { en: '@keyframes', es: '@keyframes' }, b: { en: 'defines the animation stages', es: 'define las etapas de la animación' } },
          { chip: '2', a: { en: 'animation: float 2s infinite', es: 'animation: float 2s infinite' }, b: { en: 'plays the float animation on an element', es: 'reproduce la animación float en un elemento' } },
          { chip: '3', a: { en: '2s', es: '2s' }, b: { en: 'duration of one loop', es: 'duración de un ciclo' } },
          { chip: '4', a: { en: 'infinite', es: 'infinite' }, b: { en: 'repeats forever', es: 'se repite para siempre' } }
        ],
        hint: { en: 'One is the blueprint, one presses play, one sets the time, one never stops.', es: 'Una es el plano, una da al play, una fija el tiempo y una nunca para.' },
        explain: { en: 'Define with @keyframes, play with animation — duration and repeat count ride along.', es: 'Define con @keyframes y reproduce con animation: la duración y las repeticiones viajan junto a ellos.' }
      },
      {
        type: 'bug',
        prompt: { en: 'The fan will not spin — the names disagree! Click the broken line.', es: 'El ventilador no gira: ¡los nombres no coinciden! Haz clic en la línea rota.' },
        lang: 'css',
        lines: ['@keyframes spin {', '  to { transform: rotate(360deg); }', '}', '.fan {', '  animation: spins 2s infinite;', '}'],
        bugLine: 4,
        fix: { accept: ['  animation: spin 2s infinite;', 'animation: spin 2s infinite;'] },
        explain: { en: 'The name in <code>animation:</code> must match the @keyframes name exactly — spin, not spins.', es: 'El nombre en <code>animation:</code> debe coincidir exactamente con el nombre de @keyframes: spin, no spins.' }
      },
      {
        type: 'sandbox',
        lang: 'css',
        prompt: { en: 'Mission: the floating UFO — write a <code>@keyframes float</code> blueprint that ends with <code>transform: translateY(-20px)</code> at <code>to</code>, then apply it to <code>.ufo</code> with <code>animation: float 2s infinite</code>.', es: 'Misión: el OVNI flotante — escribe un plano <code>@keyframes float</code> que termine con <code>transform: translateY(-20px)</code> en <code>to</code>, y aplícalo a <code>.ufo</code> con <code>animation: float 2s infinite</code>.' },
        start: '@keyframes float {\n  \n}\n\n.ufo {\n  \n}\n',
        fixture: '<div class="sky">\n  <div class="ufo">🛸</div>\n</div>',
        target: { en: 'A @keyframes float blueprint playing on the UFO: float, 2s per loop, infinite', es: 'Un plano @keyframes float reproduciéndose en el OVNI: float, 2s por ciclo, infinite' },
        solution: '@keyframes float {\n  from { transform: translateY(0); }\n  to { transform: translateY(-20px); }\n}\n\n.ufo {\n  animation: float 2s infinite;\n}',
        explain: { en: 'The blueprint describes the route; animation plays it. 2s per loop, infinite repeats — the UFO never lands!', es: 'El plano describe la ruta y animation la reproduce. 2s por ciclo y repeticiones infinitas: ¡el OVNI nunca aterriza!' },
        checks: [
          { codeIncludes: '@keyframes', label: { en: 'You wrote a @keyframes blueprint', es: 'Escribiste un plano @keyframes' } },
          { style: '.ufo', prop: 'animation-name', equals: 'float', label: { en: 'The UFO plays the float animation', es: 'El OVNI reproduce la animación float' } },
          { style: '.ufo', prop: 'animation-duration', equals: '2s', label: { en: 'Each loop lasts 2s', es: 'Cada ciclo dura 2s' } },
          { style: '.ufo', prop: 'animation-iteration-count', equals: 'infinite', label: { en: 'The animation loops forever', es: 'La animación se repite para siempre' } },
          { codeIncludes: 'translateY', label: { en: 'The keyframes move the UFO with translateY', es: 'Los keyframes mueven el OVNI con translateY' } }
        ]
      }
    ]
  },
  {
    id: 'css-14', track: 'css', num: 26, icon: '📱', xp: 100,
    title: { en: 'Responsive Pages', es: 'Páginas responsivas' },
    subtitle: { en: 'media queries: one page, every screen', es: 'media queries: una página, todas las pantallas' },
    narration: {
      en: "Your page looks great on the bridge screens, Cadet — but what about tiny shuttle phones? Media queries save the day! A media query wraps styles in a condition: only when the screen gets small, stack the menu, widen the panels, shrink the text. One page of HTML, many sizes of style. Radar on — meteors incoming mid-level, then we make things responsive!",
      es: "Tu página se ve genial en las pantallas del puente, Cadete, ¿pero qué hay de los teléfonos diminutos de las lanzaderas? ¡Las media queries salvan el día! Una media query envuelve estilos en una condición: solo cuando la pantalla se hace pequeña, apila el menú, ensancha los paneles y reduce el texto. Un HTML, muchos tamaños de estilo. ¡Radar encendido: meteoros a mitad de camino y luego hacemos todo responsivo!"
    },
    outro: {
      en: "One page, every screen — your CSS now adapts like a true shapeshifter!",
      es: "Una página, todas las pantallas: ¡tu CSS ahora se adapta como un verdadero metamorf!"
    },
    explainer: 'css-14',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'What is a <b>media query</b>?', es: '¿Qué es una <b>media query</b>?' },
        options: [
          { en: 'A question you ask about your music files', es: 'Una pregunta sobre tus archivos de música' },
          { en: 'A CSS rule that applies only when a condition about the screen is true', es: 'Una regla CSS que se aplica solo cuando se cumple una condición sobre la pantalla' },
          { en: 'A JavaScript function for videos', es: 'Una función de JavaScript para videos' },
          { en: 'A comment hidden in the code', es: 'Un comentario escondido en el código' }
        ],
        answer: 1,
        explain: { en: 'A media query wraps CSS in a condition about the device — screen width, most often. Condition matches, styles apply.', es: 'Una media query envuelve CSS en una condición sobre el dispositivo, casi siempre el ancho de pantalla. Si se cumple, se aplican los estilos.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'When do the styles inside <code>@media (max-width: 600px)</code> apply?', es: '¿Cuándo se aplican los estilos de <code>@media (max-width: 600px)</code>?' },
        options: [
          { en: 'Always, on every screen', es: 'Siempre, en todas las pantallas' },
          { en: 'Only when the screen is EXACTLY 600px', es: 'Solo cuando la pantalla mide EXACTAMENTE 600px' },
          { en: 'When the screen is wider than 600px', es: 'Cuando la pantalla mide más de 600px' },
          { en: 'When the screen is 600px or narrower', es: 'Cuando la pantalla mide 600px o menos' }
        ],
        answer: 3,
        explain: { en: 'max-width: 600px means "600px or anything smaller". It is the classic recipe for phone styles.', es: 'max-width: 600px significa "600px o cualquier tamaño menor". Es la receta clásica para estilos de móvil.' }
      },
      {
        type: 'fill',
        prompt: { en: 'These styles are for screens <b>480px or narrower</b>: fill in the condition.', es: 'Estos estilos son para pantallas de <b>480px o menos</b>: completa la condición.' },
        template: '@media (___: 480px) {\n  .card { width: 100%; }\n}',
        answers: [{ accept: ['max-width'] }],
        hint: { en: 'The widest allowed width…', es: 'El ancho máximo permitido…' },
        explain: { en: 'max-width sets the upper limit: the styles apply at 480px and below. min-width would be the opposite.', es: 'max-width pone el límite superior: los estilos se aplican en 480px y menos. min-width sería lo contrario.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build the phone rule: below 600px, the menu stacks.', es: 'Construye la regla de móvil: por debajo de 600px, el menú se apila.' },
        slots: ['@media', '(max-width: 600px) {', '.menu {', 'flex-direction: column;', '}', '}'],
        distractors: ['(min-width: 600px) {', '@screen {'],
        explain: { en: 'The condition opens the query; the normal CSS rules inside only apply when it matches.', es: 'La condición abre la query; las reglas CSS normales de dentro solo se aplican cuando se cumple.' }
      },
      {
        type: 'arcade',
        prompt: { en: 'Meteor drill! Catch the responsive tokens before they hit the deck.', es: '¡Entrenamiento de meteoros! Atrapa los tokens responsivos antes de que golpeen la cubierta.' },
        rounds: [
          { question: { en: 'Catch the at-rule that wraps responsive styles', es: 'Atrapa la at-rule que envuelve los estilos responsivos' }, correct: '@media', wrongs: ['@screen', '@responsive', '@width'], speed: 1 },
          { question: { en: 'Catch the condition that means "600px or narrower"', es: 'Atrapa la condición que significa "600px o menos"' }, correct: '(max-width: 600px)', wrongs: ['(min-width: 600px)', '(width: max 600px)', '(600px: max)'], speed: 0.9 },
          { question: { en: 'Catch the rule that stacks a flex menu vertically', es: 'Atrapa la regla que apila un menú flex en vertical' }, correct: 'flex-direction: column', wrongs: ['flex-direction: row', 'flex-wrap: column', 'align-items: column'], speed: 1.1 },
          { question: { en: 'Catch the width that fills the whole container', es: 'Atrapa el ancho que llena todo el contenedor' }, correct: 'width: 100%', wrongs: ['width: 100px', 'width: full', 'width: max'], speed: 1 },
          { question: { en: 'Catch the unit that scales with the PARENT (old friend!)', es: 'Atrapa la unidad que escala con el PADRE (¡vieja amiga!)' }, correct: '%', wrongs: ['px', 'deg', 'kg'], speed: 0.8 }
        ],
        explain: { en: 'Review: @media, max-width, column stacking — plus old friends from the units level.', es: 'Repaso: @media, max-width, apilado en columna — más viejas amigas del nivel de unidades.' }
      },
      {
        type: 'bug',
        prompt: { en: 'The phone styles never fire! Click the broken line.', es: '¡Los estilos de móvil nunca se activan! Haz clic en la línea rota.' },
        lang: 'css',
        lines: ['.page { color: lightblue; }', 'media (max-width: 400px) {', '  .page { color: gold; }', '}'],
        bugLine: 1,
        fix: { accept: ['@media (max-width: 400px) {'] },
        explain: { en: 'Media queries start with @ — exactly like @keyframes. Without it, the browser sees gibberish.', es: 'Las media queries empiezan con @, igual que @keyframes. Sin él, el navegador ve puro garabato.' }
      },
      {
        type: 'sandbox',
        lang: 'css',
        prompt: { en: 'Mission: shrink-proof the station page — add a media query <code>@media (max-width: 600px)</code> that makes <code>.menu</code> stack with <code>flex-direction: column</code> and <code>.panel</code> take <code>width: 100%</code>. Resize the preview to test it!', es: 'Misión: haz a prueba de encogimiento la página de la estación — agrega una media query <code>@media (max-width: 600px)</code> que apile <code>.menu</code> con <code>flex-direction: column</code> y haga que <code>.panel</code> ocupe <code>width: 100%</code>. ¡Cambia el tamaño de la vista previa para probarla!' },
        start: '.menu {\n  display: flex;\n  justify-content: space-around;\n}\n\n.panel {\n  width: 80%;\n  margin: auto;\n}\n\n/* add your media query below */\n',
        fixture: '<nav class="menu">\n  <a href="#">🏠 Home</a>\n  <a href="#">🚀 Missions</a>\n  <a href="#">🛰️ Crew</a>\n</nav>\n<div class="panel">📡 Station news: the greenhouse is growing!</div>',
        target: { en: 'A max-width: 600px media query stacking the menu and widening the panel', es: 'Una media query de max-width: 600px que apila el menú y ensancha el panel' },
        solution: '.menu {\n  display: flex;\n  justify-content: space-around;\n}\n\n.panel {\n  width: 80%;\n  margin: auto;\n}\n\n@media (max-width: 600px) {\n  .menu {\n    flex-direction: column;\n  }\n\n  .panel {\n    width: 100%;\n  }\n}',
        explain: { en: 'The same HTML serves every screen: wide, the menu is a row; narrow, it stacks and the panel fills the width.', es: 'El mismo HTML sirve para todas las pantallas: en ancho, el menú es una fila; en angosto, se apila y el panel llena el ancho.' },
        checks: [
          { codeIncludes: '@media', label: { en: 'You wrote a media query', es: 'Escribiste una media query' } },
          { codeIncludes: 'max-width', label: { en: 'The condition limits the width (max-width)', es: 'La condición limita el ancho (max-width)' } },
          { codeIncludes: '600px', label: { en: 'The breakpoint is 600px', es: 'El punto de quiebre es 600px' } },
          { codeIncludes: 'column', label: { en: 'The menu stacks with column', es: 'El menú se apila con column' } },
          { codeIncludes: '100%', label: { en: 'The panel fills the width (100%)', es: 'El panel llena el ancho (100%)' } }
        ]
      }
    ]
  },
  {
    id: 'css-15', track: 'css', num: 27, icon: '🏆', xp: 100,
    title: { en: 'BOSS: Station Card', es: 'JEFE: Tarjeta de la estación' },
    subtitle: { en: 'Everything you learned in one final mission', es: 'Todo lo aprendido en una misión final' },
    narration: {
      en: "Attention, Cadet! This is the final boss of the CSS Kingdom: the space station needs a brand-new ID card, and YOU will style it. Everything you trained returns for one mission — colors and padding, rounded corners, flex headers, shadows, and a hover lift from the transforms deck. Eight challenges stand between you and the title of CSS Master. The whole kingdom is watching. Make it shine!",
      es: "¡Atención, Cadete! Este es el jefe final del Reino CSS: la estación espacial necesita una tarjeta de identificación nueva y TÚ la vas a estilizar. Todo tu entrenamiento vuelve en una misión: colores y padding, esquinas redondeadas, encabezados flex, sombras y un levantamiento hover de la cubierta de transformaciones. Ocho desafíos te separan del título de Maestro CSS. Todo el reino te observa. ¡Hazla brillar!"
    },
    outro: {
      en: "BOSS DEFEATED! You are now a certified CSS Master, Cadet. The JavaScript Galaxy awaits!",
      es: "¡JEFE DERROTADO! Ahora eres un Maestro CSS certificado, Cadete. ¡La Galaxia JavaScript te espera!"
    },
    explainer: 'css-15',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Boss warm-up: which pair spreads nav links across the whole row?', es: 'Calentamiento de jefe: ¿qué par reparte los enlaces del nav por toda la fila?' },
        options: [
          { en: '<code>display: grid; grid-template-columns: 2;</code>', es: '<code>display: grid; grid-template-columns: 2;</code>' },
          { en: '<code>display: flex; justify-content: space-between;</code>', es: '<code>display: flex; justify-content: space-between;</code>' },
          { en: '<code>display: block; margin: between;</code>', es: '<code>display: block; margin: between;</code>' },
          { en: '<code>display: inline; padding: edges;</code>', es: '<code>display: inline; padding: edges;</code>' }
        ],
        answer: 1,
        explain: { en: 'Flexbox for the row, space-between to push items to the edges — the classic navbar recipe.', es: 'Flexbox para la fila y space-between para empujar los elementos a los extremos: la receta clásica de navbar.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'Which property gives the card <b>soft, rounded corners</b>?', es: '¿Qué propiedad da a la tarjeta <b>esquinas suaves y redondeadas</b>?' },
        options: [
          { en: '<code>border-shape: curve;</code>', es: '<code>border-shape: curve;</code>' },
          { en: '<code>corner-radius: soft;</code>', es: '<code>corner-radius: soft;</code>' },
          { en: '<code>border-radius</code>', es: '<code>border-radius</code>' },
          { en: '<code>radius-corner: true;</code>', es: '<code>radius-corner: true;</code>' }
        ],
        answer: 2,
        explain: { en: 'border-radius rounds corners: pixels for a gentle curve, 50% for a perfect circle.', es: 'border-radius redondea esquinas: píxeles para una curva suave y 50% para un círculo perfecto.' }
      },
      {
        type: 'match',
        prompt: { en: 'Boss review: match each tool to its job', es: 'Repaso de jefe: une cada herramienta con su trabajo' },
        lang: 'css',
        pairs: [
          { chip: '1', a: { en: 'display: flex', es: 'display: flex' }, b: { en: 'children line up in a row', es: 'los hijos se alinean en fila' } },
          { chip: '2', a: { en: 'gap', es: 'gap' }, b: { en: 'space between items', es: 'espacio entre elementos' } },
          { chip: '3', a: { en: 'border-radius', es: 'border-radius' }, b: { en: 'rounded corners', es: 'esquinas redondeadas' } },
          { chip: '4', a: { en: 'box-shadow', es: 'box-shadow' }, b: { en: 'soft shadow behind the box', es: 'sombra suave detrás de la caja' } }
        ],
        hint: { en: 'One lines up, one spaces, one rounds, one lifts.', es: 'Uno alinea, uno espacia, uno redondea y uno eleva.' },
        explain: { en: 'Four tools you will use in the final build — know them by heart.', es: 'Cuatro herramientas que usarás en la construcción final: conócelas de memoria.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Make the portrait perfectly <b>round</b>.', es: 'Haz que el retrato quede perfectamente <b>redondo</b>.' },
        template: '.avatar {\n  border-radius: ___;\n}',
        answers: [{ accept: ['50%'] }],
        hint: { en: 'Half of the box — in percent.', es: 'La mitad de la caja, en porcentaje.' },
        explain: { en: 'border-radius: 50% bends every corner halfway — any square becomes a circle.', es: 'border-radius: 50% dobla cada esquina hasta la mitad: cualquier cuadrado se vuelve un círculo.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build the rule that lifts the card: rounded corners plus a soft shadow.', es: 'Construye la regla que eleva la tarjeta: esquinas redondeadas más una sombra suave.' },
        slots: ['.card {', 'border-radius: 16px;', 'box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);', '}'],
        distractors: ['border-shadow: 0 8px;', 'shadow-box: dark;'],
        explain: { en: 'box-shadow draws a soft shadow behind the box — here 0 sideways, 8px down, 20px of blur.', es: 'box-shadow dibuja una sombra suave detrás de la caja: aquí 0 lateral, 8px hacia abajo y 20px de difuminado.' }
      },
      {
        type: 'bug',
        prompt: { en: 'The boss corrupted the header! Click the broken line.', es: '¡El jefe corrompió el encabezado! Haz clic en la línea rota.' },
        lang: 'css',
        lines: ['.card-header {', '  display: flex;', '  aline-items: center;', '}'],
        bugLine: 2,
        fix: { accept: ['  align-items: center;', 'align-items: center;'] },
        explain: { en: 'One letter off and the declaration dies silently: it is <code>align-items</code>, with a-l-i-g-n.', es: 'Una letra cambiada y la declaración muere en silencio: es <code>align-items</code>, con a-l-i-g-n.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the lines of a hover lift for the join button', es: 'Ordena las líneas de un levantamiento hover para el botón de unirse' },
        lang: 'css',
        lines: ['.join-btn {', '  transition: transform 0.3s;', '}', '.join-btn:hover {', '  transform: translateY(-4px);', '}'],
        explain: { en: 'Base rule holds the smooth transition; the :hover rule lifts the button 4px up.', es: 'La regla base lleva el transition suave; la regla :hover levanta el botón 4px.' }
      },
      {
        type: 'sandbox',
        lang: 'css',
        prompt: { en: 'FINAL MISSION: style the space station ID card — <code>.card</code>: <code>navy</code> background, <code>padding: 20px</code>, <code>border-radius: 16px</code> and a <code>box-shadow</code> of your choice; <code>.card-header</code>: <code>display: flex</code> with <code>align-items: center</code>; <code>.avatar</code>: <code>border-radius: 50%</code> for a round portrait; <code>.skills</code>: <code>display: flex</code>. Then add one extra touch of your own — the galaxy loves style!', es: 'MISIÓN FINAL: estiliza la tarjeta de identificación de la estación — <code>.card</code>: fondo <code>navy</code>, <code>padding: 20px</code>, <code>border-radius: 16px</code> y un <code>box-shadow</code> a tu elección; <code>.card-header</code>: <code>display: flex</code> con <code>align-items: center</code>; <code>.avatar</code>: <code>border-radius: 50%</code> para un retrato redondo; <code>.skills</code>: <code>display: flex</code>. Luego añade un toque extra tuyo: ¡a la galaxia le encanta el estilo!' },
        start: '.card {\n  \n}\n\n.card-header {\n  \n}\n\n.avatar {\n  \n}\n\n.skills {\n  \n}\n',
        fixture: '<div class="card">\n  <header class="card-header">\n    <img class="avatar" src="cosmo.png" alt="Cosmo the robot">\n    <h2 class="name">Cosmo</h2>\n  </header>\n  <p class="bio">Robot guide of the CSS Kingdom.</p>\n  <ul class="skills">\n    <li>Flexbox pilot</li>\n    <li>Grid navigator</li>\n    <li>Animation engineer</li>\n  </ul>\n</div>',
        target: { en: 'A complete ID card: navy padded rounded shadowed card, flex header, round avatar, flex skills', es: 'Una tarjeta completa: fondo navy con padding, radio y sombra, encabezado flex, avatar redondo y skills en flex' },
        solution: '.card {\n  background-color: navy;\n  padding: 20px;\n  border-radius: 16px;\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);\n}\n\n.card-header {\n  display: flex;\n  align-items: center;\n}\n\n.avatar {\n  border-radius: 50%;\n}\n\n.skills {\n  display: flex;\n  gap: 12px;\n}',
        explain: { en: 'Colors, padding, radius, shadow, flex and hover — the whole CSS Kingdom in one card. You earned the title, Master!', es: 'Colores, padding, radio, sombra, flex y hover: todo el Reino CSS en una tarjeta. ¡Te ganaste el título, Maestro!' },
        checks: [
          { style: '.card', prop: 'background-color', contains: 'rgb(0, 0, 128)', label: { en: 'The card background is navy', es: 'El fondo de la tarjeta es navy' } },
          { style: '.card', prop: 'padding-top', equals: '20px', label: { en: 'The card has 20px padding', es: 'La tarjeta tiene 20px de padding' } },
          { style: '.card', prop: 'border-top-left-radius', equals: '16px', label: { en: 'The card corners are rounded (16px)', es: 'Las esquinas de la tarjeta están redondeadas (16px)' } },
          { codeIncludes: 'box-shadow', label: { en: 'The card lifts with a box-shadow', es: 'La tarjeta se eleva con un box-shadow' } },
          { style: '.card-header', prop: 'display', equals: 'flex', label: { en: 'The header is a flex row', es: 'El encabezado es una fila flex' } },
          { style: '.card-header', prop: 'align-items', equals: 'center', label: { en: 'The header items are vertically centered', es: 'Los elementos del encabezado están centrados en vertical' } },
          { style: '.avatar', prop: 'border-top-left-radius', equals: '50%', label: { en: 'The avatar is perfectly round', es: 'El avatar está perfectamente redondo' } },
          { style: '.skills', prop: 'display', equals: 'flex', label: { en: 'The skills list is a flex row', es: 'La lista de skills es una fila flex' } }
        ]
      }
    ]
  }
];
