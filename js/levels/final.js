/* ============ Final Frontier track — levels 46-48 ============
   The epic finale: two boss battles (HTML+CSS landing page, JS quiz machine)
   and the graduation ceremony. Same schema as html.js.
   CSS computed-style checks use LONGHAND properties only (padding-top,
   background-color, font-size…) — shorthands compute to ''.
   JS sandboxes: no setTimeout — checks run before timers fire. */
window.LEVELS_FINAL = [
  {
    id: 'final-01', track: 'final', num: 46, icon: '🚀', xp: 200,
    title: { en: 'BOSS 1: Landing Page', es: 'JEFE 1: Landing Page' },
    subtitle: { en: 'HTML + CSS in one epic mission', es: 'HTML y CSS en una misión épica' },
    narration: {
      en: "Cadet, this is it — your first boss battle of the Final Frontier! It wants proof that you are no beginner. Mission one: launch a complete landing page. You will sketch the structure with H T M L, then paint it with C S S: a header up top, a bold hero in the middle, a footer at the bottom. Everything you learned flies together now. Deep breath. Let's build something legendary!",
      es: "¡Cadete, llegó tu primera batalla contra el jefe de la Frontera Final! Quiere pruebas de que ya no eres principiante. Misión uno: lanzar una landing page completa. Dibujarás la estructura con H T M L y luego la pintarás con C S S: un header arriba, un hero imponente en el centro y un footer abajo. Todo lo que aprendiste vuela junto ahora. Respira hondo. ¡Vamos a construir algo legendario!"
    },
    outro: {
      en: "Boss one defeated! Your landing page is live and glorious. The Quiz Machine awaits, Web Builder.",
      es: "¡Primer jefe derrotado! Tu landing page está en línea y es gloriosa. La Máquina de Trivia te espera, Constructor Web."
    },
    explainer: 'final-01',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Boss warm-up: the landing page needs its menu of links at the top. Which tag is the natural home for a menu?', es: 'Calentamiento de jefe: la landing page necesita su menú de enlaces arriba. ¿Qué etiqueta es el hogar natural de un menú?' },
        options: [{ en: '<nav>' }, { en: '<menu>' }, { en: '<links>' }, { en: '<top>' }],
        answer: 0,
        explain: { en: '<code>&lt;nav&gt;</code> is the semantic navigation tag — browsers and screen readers know exactly what lives inside.', es: '<code>&lt;nav&gt;</code> es la etiqueta semántica de navegación: los navegadores y los lectores de pantalla saben exactamente qué vive dentro.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'Which order is correct, from the top of the page to the bottom?', es: '¿Qué orden es correcto, de arriba abajo de la página?' },
        options: [
          { en: 'footer → main → header', es: 'footer → main → header' },
          { en: 'main → header → footer', es: 'main → header → footer' },
          { en: 'header → main → footer', es: 'header → main → footer' },
          { en: 'header → footer → main', es: 'header → footer → main' }
        ],
        answer: 2,
        explain: { en: 'The header crowns the page, main carries the content, the footer signs off — top to bottom, always.', es: 'El header corona la página, el main lleva el contenido y el footer se despide: de arriba abajo, siempre.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the skeleton of the landing page, top to bottom.', es: 'Ordena el esqueleto de la landing page, de arriba abajo.' },
        lang: 'html',
        lines: ['<header>', '  <h1>Cosmo Tours</h1>', '</header>', '<main>', '  <p>Trips to every planet</p>', '</main>', '<footer>© 2026 Cosmo Tours</footer>'],
        explain: { en: 'A landing page is regions in order: header, main, footer. Each one opens, holds its content, closes.', es: 'Una landing page son regiones en orden: header, main, footer. Cada una se abre, guarda su contenido y se cierra.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Assemble the hero: a title and a call-to-action link inside a header.', es: 'Arma el hero: un título y un enlace de acción dentro de un header.' },
        slots: ['<header class="hero">', '<h1>Reach the Stars</h1>', '<a href="#book">Book your trip</a>', '</header>'],
        distractors: ['<footer>', '</nav>'],
        explain: { en: 'A hero is just a header with a big title and a link — assembled from tags you have known since level one.', es: 'Un hero es solo un header con un título grande y un enlace: armado con etiquetas que conoces desde el nivel uno.' }
      },
      {
        type: 'fill',
        prompt: { en: 'The footer needs its "Back to top" link: complete the missing attribute.', es: 'El footer necesita su enlace "Back to top": completa el atributo que falta.' },
        template: '<footer>\n  <p>© 2026 Cosmo Tours</p>\n  <a ___="#top">Back to top</a>\n</footer>',
        answers: [{ accept: ['href'] }],
        hint: { en: 'Four letters. Every link needs it to know where to go.', es: 'Cuatro letras. Todo enlace la necesita para saber adónde ir.' },
        explain: { en: 'href is the attribute that carries the destination — even a shortcut back to your own page needs it.', es: 'href es el atributo que lleva el destino: hasta un atajo a tu propia página lo necesita.' }
      },
      {
        type: 'bug',
        prompt: { en: 'The boss corrupted the hero! Click the broken line, then type the fix.', es: '¡El jefe corrompió el hero! Haz clic en la línea rota y escribe la corrección.' },
        lang: 'html',
        lines: ['<header class="hero">', '  <h1>Reach the Stars<h1>', '  <p>Book your trip today</p>', '</header>'],
        bugLine: 1,
        fix: { accept: ['  <h1>Reach the Stars</h1>', '<h1>Reach the Stars</h1>'] },
        explain: { en: 'The h1 was never really closed — the second tag is missing its slash: <code>&lt;/h1&gt;</code>. Bosses love this trap.', es: 'El h1 nunca se cerró de verdad: a la segunda etiqueta le falta la barra: <code>&lt;/h1&gt;</code>. A los jefes les encanta esta trampa.' }
      },
      {
        type: 'sandbox',
        lang: 'css',
        prompt: { en: '<b>PHASE 2 — paint the hero!</b> Give <code>.hero</code> a <code>navy</code> background, centered text and <code>40px</code> of <code>padding-top</code>. Then make <code>.hero-title</code> <code>white</code> at <code>48px</code>.', es: '<b>FASE 2 — ¡pinta el hero!</b> Dale a <code>.hero</code> un fondo <code>navy</code>, texto centrado y <code>40px</code> de <code>padding-top</code>. Luego pon <code>.hero-title</code> en <code>white</code> a <code>48px</code>.' },
        start: '/* Paint the hero section! */\n',
        fixture: '<nav class="topbar">Cosmo Tours</nav>\n<header class="hero">\n  <h1 class="hero-title">Reach the Stars</h1>\n  <p class="hero-text">Book your trip to any planet.</p>\n</header>\n<footer>© 2026 Cosmo Tours</footer>',
        target: { en: 'A navy hero with centered text and 40px padding-top; a white 48px title', es: 'Un hero azul marino con texto centrado y 40px de padding-top; un título blanco de 48px' },
        solution: '.hero {\n  background-color: navy;\n  text-align: center;\n  padding-top: 40px;\n}\n\n.hero-title {\n  color: white;\n  font-size: 48px;\n}',
        explain: { en: 'Class selectors plus four properties — one rule for the section, one for the title. The hero is alive!', es: 'Selectores de clase más cuatro propiedades: una regla para la sección y otra para el título. ¡El hero cobró vida!' },
        checks: [
          { style: '.hero', prop: 'background-color', contains: 'rgb(0, 0, 128)', label: { en: 'The hero sky is navy', es: 'El cielo del hero es azul marino' } },
          { style: '.hero', prop: 'text-align', equals: 'center', label: { en: 'The hero text is centered', es: 'El texto del hero está centrado' } },
          { style: '.hero', prop: 'padding-top', equals: '40px', label: { en: 'The hero has 40px of padding-top', es: 'El hero tiene 40px de padding-top' } },
          { style: '.hero-title', prop: 'color', contains: 'rgb(255, 255, 255)', label: { en: 'The title is white', es: 'El título es blanco' } },
          { style: '.hero-title', prop: 'font-size', equals: '48px', label: { en: 'The title is 48px tall', es: 'El título mide 48px' } }
        ]
      },
      {
        type: 'sandbox',
        lang: 'html',
        prompt: { en: '<b>FINAL PHASE — launch the whole landing page!</b> Inside <code>&lt;main&gt;</code> add a <code>&lt;p&gt;</code> that mentions <code>planets</code> and an <code>&lt;a&gt;</code> to <code>https://cosmo.space</code> with any text. Then fill the empty <code>&lt;footer&gt;</code> with <code>© 2026 Cosmo Tours</code>. Make the fleet proud!', es: '<b>FASE FINAL — ¡lanza la landing page completa!</b> Dentro de <code>&lt;main&gt;</code> agrega un <code>&lt;p&gt;</code> que mencione los <code>planets</code> y un <code>&lt;a&gt;</code> hacia <code>https://cosmo.space</code> con el texto que quieras. Luego llena el <code>&lt;footer&gt;</code> vacío con <code>© 2026 Cosmo Tours</code>. ¡Deja en alto a la flota!' },
        start: '<header class="hero">\n  <h1>Cosmo Tours</h1>\n</header>\n\n<main>\n\n</main>\n\n<footer></footer>\n',
        target: { en: 'header with h1, main with a paragraph about planets and a link to https://cosmo.space, footer with © 2026 Cosmo Tours', es: 'header con h1, main con un párrafo sobre planetas y un enlace a https://cosmo.space, footer con © 2026 Cosmo Tours' },
        solution: '<header class="hero">\n  <h1>Cosmo Tours</h1>\n</header>\n<main>\n  <p>We fly cadets to the planets and back.</p>\n  <a href="https://cosmo.space">Book your flight</a>\n</main>\n<footer>© 2026 Cosmo Tours</footer>',
        explain: { en: 'Header, main, footer — three regions, six tags, one complete landing page. Boss one is down!', es: 'Header, main, footer: tres regiones, seis etiquetas, una landing page completa. ¡Primer jefe caído!' },
        checks: [
          { dom: 'header', count: 1, label: { en: 'There is a header', es: 'Hay un header' } },
          { text: 'h1', includes: 'cosmo tours', label: { en: 'The h1 says "Cosmo Tours"', es: 'El h1 dice "Cosmo Tours"' } },
          { dom: 'main p', count: 1, label: { en: 'There is a paragraph inside main', es: 'Hay un párrafo dentro de main' } },
          { text: 'p', includes: 'planet', label: { en: 'The paragraph mentions the planets', es: 'El párrafo menciona los planetas' } },
          { attr: 'a', attrName: 'href', attrValue: 'https://cosmo.space', label: { en: 'The link points to https://cosmo.space', es: 'El enlace apunta a https://cosmo.space' } },
          { dom: 'footer', count: 1, label: { en: 'There is a footer', es: 'Hay un footer' } },
          { text: 'footer', includes: '2026', label: { en: 'The footer signs off with the year 2026', es: 'El footer se despide con el año 2026' } }
        ]
      }
    ]
  },
  {
    id: 'final-02', track: 'final', num: 47, icon: '🧠', xp: 250,
    title: { en: 'BOSS 2: The Quiz Machine', es: 'JEFE 2: La máquina de trivia' },
    subtitle: { en: 'Data, logic and events in one build', es: 'Datos, lógica y eventos en una sola construcción' },
    narration: {
      en: "Cadet, the second boss powers up: the Quiz Machine! It grades every web pilot in the galaxy, and today you build one. First a function that judges answers. Then a fleet of questions stored as objects inside an array. Then you wire the buttons so every click counts, and finally the score keeper called start quiz. Logic, data and events — all in one epic build. Power up, Cadet!",
      es: "¡Cadete, el segundo jefe se enciende: la Máquina de Trivia! Ella califica a cada piloto web de la galaxia, y hoy la construirás tú. Primero, una función que juzga respuestas. Luego, una flota de preguntas guardadas como objetos dentro de un arreglo. Después conectarás los botones para que cada clic cuente, y al final el guardián del puntaje llamado start quiz. Lógica, datos y eventos: todo en una construcción épica. ¡Enciéndete, Cadete!"
    },
    outro: {
      en: "Boss two defeated! Your quiz machine runs perfectly. Only one ceremony remains, Quiz Master.",
      es: "¡Segundo jefe derrotado! Tu máquina de trivia funciona a la perfección. Solo queda una ceremonia, Maestro de la Trivia."
    },
    explainer: 'final-02',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Boss warm-up: the quiz must hold MANY questions, in order. Which tool fits best?', es: 'Calentamiento de jefe: la trivia debe guardar MUCHAS preguntas, en orden. ¿Qué herramienta va mejor?' },
        options: [
          { en: 'An array — an ordered list of values', es: 'Un arreglo: una lista ordenada de valores' },
          { en: 'A single string', es: 'Un solo string' },
          { en: 'A comment', es: 'Un comentario' },
          { en: 'A semicolon', es: 'Un punto y coma' }
        ],
        answer: 0,
        explain: { en: 'An array keeps many values in order, and <code>length</code> counts them — perfect for a fleet of questions.', es: 'Un arreglo guarda muchos valores en orden, y <code>length</code> los cuenta: perfecto para una flota de preguntas.' }
      },
      {
        type: 'order',
        prompt: { en: 'PHASE 1 — order the lines: define the judge, then test it.', es: 'FASE 1 — ordena las líneas: define al juez y luego pruébalo.' },
        lang: 'js',
        lines: ['function checkAnswer(guess, correct) {', '  return guess === correct;', '}', 'console.log(checkAnswer("A", "A"));'],
        explain: { en: 'Define the function first, call it after. The call prints <code>true</code> — "A" matches "A".', es: 'Primero define la función, después la llamas. La llamada muestra <code>true</code>: "A" coincide con "A".' }
      },
      {
        type: 'fill',
        prompt: { en: 'Complete the comparison so the judge says <code>true</code> ONLY on an exact match.', es: 'Completa la comparación para que el juez diga <code>true</code> SOLO cuando coincidan exacto.' },
        template: 'function checkAnswer(guess, correct) {\n  return guess ___ correct;\n}',
        answers: [{ accept: ['==='] }],
        hint: { en: 'Three signs in a row: equal, equal, equal.', es: 'Tres signos seguidos: igual, igual, igual.' },
        explain: { en: '<code>==</code> bends the rules by converting types; <code>===</code> is strict — the fair judge a quiz deserves.', es: '<code>==</code> dobla las reglas convirtiendo tipos; <code>===</code> es estricto: el juez justo que merece una trivia.' }
      },
      {
        type: 'dnd',
        prompt: { en: 'Build the judge function, token by token.', es: 'Construye la función juez, pieza por pieza.' },
        slots: ['function checkAnswer(guess, correct) {', '  return guess === correct;', '}'],
        distractors: ['return guess = correct;', 'function checkAnswer() {'],
        explain: { en: 'Two inputs go between the parentheses; <code>return</code> hands back the verdict: <code>true</code> or <code>false</code>.', es: 'Las dos entradas van entre paréntesis; <code>return</code> entrega el veredicto: <code>true</code> o <code>false</code>.' }
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: '<b>PHASE 1 — the judge!</b> Write a function named <code>checkAnswer</code> that takes <code>guess</code> and <code>correct</code>, and returns <code>true</code> when they match and <code>false</code> when they do not.', es: '<b>FASE 1 — ¡el juez!</b> Escribe una función llamada <code>checkAnswer</code> que reciba <code>guess</code> y <code>correct</code>, y devuelva <code>true</code> cuando coincidan y <code>false</code> cuando no.' },
        start: '// THE JUDGE — every answer passes through here.\n// Write checkAnswer(guess, correct): it returns\n// true when the guess matches, false otherwise.\n\n',
        target: { en: 'checkAnswer("A", "A") is true and checkAnswer("B", "A") is false', es: 'checkAnswer("A", "A") es true y checkAnswer("B", "A") es false' },
        solution: 'function checkAnswer(guess, correct) {\n  return guess === correct;\n}',
        explain: { en: 'One strict comparison and a return — the smallest judge in the galaxy, and the most important.', es: 'Una comparación estricta y un return: el juez más pequeño de la galaxia, y el más importante.' },
        checks: [
          { expr: 'typeof checkAnswer', equals: 'function', label: { en: 'checkAnswer is a function', es: 'checkAnswer es una función' } },
          { expr: 'checkAnswer("A", "A")', equals: 'true', label: { en: 'A matching pair returns true', es: 'Una pareja que coincide devuelve true' } },
          { expr: 'checkAnswer("B", "A")', equals: 'false', label: { en: 'A wrong pair returns false', es: 'Una pareja incorrecta devuelve false' } },
          { expr: 'checkAnswer("CSS", "CSS")', equals: 'true', label: { en: 'checkAnswer("CSS", "CSS") is true', es: 'checkAnswer("CSS", "CSS") es true' } },
          { codeIncludes: 'return', label: { en: 'The judge hands back its verdict with return', es: 'El juez entrega su veredicto con return' } },
          { noError: true, label: { en: 'No errors — the judge is fair', es: 'Sin errores: el juez es justo' } }
        ]
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: '<b>PHASE 2 — the question fleet!</b> Create an <b>array</b> named <code>questions</code> with 3 objects; each object has <code>text</code> and <code>answer</code>. The answers, in this order: <code>CSS</code>, <code>HTML</code>, <code>JS</code>.', es: '<b>FASE 2 — ¡la flota de preguntas!</b> Crea un <b>arreglo</b> llamado <code>questions</code> con 3 objetos; cada objeto tiene <code>text</code> y <code>answer</code>. Las respuestas, en este orden: <code>CSS</code>, <code>HTML</code>, <code>JS</code>.' },
        start: "// THE QUESTION FLEET.\n// Build an array named questions with 3 objects:\n//   { text: '...', answer: '...' }\n// Answers in order: 'CSS', 'HTML', 'JS'\n\n",
        target: { en: 'An array of 3 question objects with answers CSS, HTML, JS', es: 'Un arreglo de 3 objetos pregunta con respuestas CSS, HTML, JS' },
        solution: "const questions = [\n  { text: 'What paints the page?', answer: 'CSS' },\n  { text: 'What builds the skeleton?', answer: 'HTML' },\n  { text: 'What makes pages think?', answer: 'JS' }\n];",
        explain: { en: 'Arrays of objects are how real apps store data: one card per question, ready to fly in any order.', es: 'Los arreglos de objetos son como las apps reales guardan datos: una tarjeta por pregunta, listas para volar en cualquier orden.' },
        checks: [
          { expr: 'Array.isArray(questions)', equals: 'true', label: { en: 'questions is an array', es: 'questions es un arreglo' } },
          { expr: 'questions.length', equals: '3', label: { en: 'The fleet has 3 questions', es: 'La flota tiene 3 preguntas' } },
          { expr: 'questions[0].answer', equals: 'CSS', label: { en: 'Question 1 answers CSS', es: 'La pregunta 1 responde CSS' } },
          { expr: 'questions[1].answer', equals: 'HTML', label: { en: 'Question 2 answers HTML', es: 'La pregunta 2 responde HTML' } },
          { expr: 'questions[2].answer', equals: 'JS', label: { en: 'Question 3 answers JS', es: 'La pregunta 3 responde JS' } },
          { noError: true, label: { en: 'No errors — the fleet is loaded', es: 'Sin errores: la flota está cargada' } }
        ]
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: '<b>PHASE 3 — wire the button!</b> Write a function named <code>onAnswer</code> that sets the text of <code>#feedback</code> to <code>Correct!</code>, then add a <code>click</code> listener on <code>#answerBtn</code> that calls it.', es: '<b>FASE 3 — ¡conecta el botón!</b> Escribe una función llamada <code>onAnswer</code> que ponga el texto de <code>#feedback</code> en <code>Correct!</code>, y agrega un listener de <code>click</code> en <code>#answerBtn</code> que la llame.' },
        fixture: '<h2>Round 1: What paints the page?</h2>\n<button id="answerBtn">CSS</button>\n<p id="feedback">Waiting for your answer…</p>',
        start: '// WIRE THE BUTTON.\n// 1) Write a function named onAnswer that sets\n//    the text of #feedback to "Correct!"\n\n// 2) Add a "click" listener on #answerBtn that calls onAnswer\n',
        target: { en: 'Clicking #answerBtn turns #feedback into "Correct!"', es: 'Hacer clic en #answerBtn convierte #feedback en "Correct!"' },
        solution: "function onAnswer() {\n  document.querySelector('#feedback').textContent = 'Correct!';\n}\ndocument.querySelector('#answerBtn').addEventListener('click', onAnswer);",
        explain: { en: 'Handler first, listener second: now every click of the answer button calls onAnswer.', es: 'Primero el manejador, luego el listener: ahora cada clic del botón llama a onAnswer.' },
        checks: [
          { codeIncludes: 'addEventListener', label: { en: 'You wired the listener with addEventListener', es: 'Conectaste el listener con addEventListener' } },
          { codeIncludes: 'click', label: { en: 'You listen for the click event', es: 'Escuchas el evento click' } },
          { expr: 'typeof onAnswer', equals: 'function', label: { en: 'onAnswer is a named function', es: 'onAnswer es una función con nombre' } },
          { expr: '(onAnswer(), document.querySelector("#feedback").textContent)', equals: 'Correct!', label: { en: 'onAnswer sets the feedback text', es: 'onAnswer cambia el texto del feedback' } },
          { dom: '#feedback', count: 1, label: { en: 'The feedback element is on the page', es: 'El elemento feedback está en la página' } },
          { noError: true, label: { en: 'No errors — smooth wiring', es: 'Sin errores: conexión perfecta' } }
        ]
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: '<b>FINAL PHASE — startQuiz()!</b> Loop over <code>questions</code>, compare <code>guesses[i]</code> with <code>questions[i].answer</code> using <code>checkAnswer</code>, count the hits and <code>return</code> the score. Then log the result like <code>Score: 2</code>. The whole machine is counting on you!', es: '<b>FASE FINAL — ¡startQuiz()!</b> Recorre <code>questions</code>, compara <code>guesses[i]</code> con <code>questions[i].answer</code> usando <code>checkAnswer</code>, cuenta los aciertos y haz <code>return</code> del puntaje. Luego muestra el resultado como <code>Score: 2</code>. ¡Toda la máquina depende de ti!' },
        start: "// FINAL PHASE — startQuiz()!\n// Everything below is armed and ready — do not delete:\nfunction checkAnswer(guess, correct) {\n  return guess === correct;\n}\nconst questions = [\n  { answer: 'CSS' },\n  { answer: 'HTML' },\n  { answer: 'JS' }\n];\nconst guesses = ['CSS', 'HTML', 'CSS'];\n\n// Write startQuiz(): loop over the questions, use\n// checkAnswer to compare guesses[i] with questions[i].answer,\n// count the correct ones, RETURN the score,\n// and log the result like: Score: 2\n",
        target: { en: 'startQuiz() returns 2 and the console shows Score: 2', es: 'startQuiz() devuelve 2 y la consola muestra Score: 2' },
        solution: "function startQuiz() {\n  let score = 0;\n  for (let i = 0; i < questions.length; i++) {\n    if (checkAnswer(guesses[i], questions[i].answer)) {\n      score = score + 1;\n    }\n  }\n  return score;\n}\nconsole.log('Score: ' + startQuiz());",
        explain: { en: 'A loop, a judge, a counter and a return — that is a complete program. Boss two is down!', es: 'Un bucle, un juez, un contador y un return: eso es un programa completo. ¡Segundo jefe caído!' },
        checks: [
          { expr: 'typeof startQuiz', equals: 'function', label: { en: 'startQuiz is a function', es: 'startQuiz es una función' } },
          { expr: 'startQuiz()', equals: '2', label: { en: 'startQuiz() returns the score 2', es: 'startQuiz() devuelve el puntaje 2' } },
          { console: { includes: 'Score: 2' }, label: { en: 'The console shows "Score: 2"', es: 'La consola muestra "Score: 2"' } },
          { codeIncludes: 'checkAnswer', label: { en: 'You put the judge to work', es: 'Pusiste al juez a trabajar' } },
          { codeIncludes: 'return', label: { en: 'startQuiz returns the score', es: 'startQuiz devuelve el puntaje' } },
          { noError: true, label: { en: 'No errors — the machine runs', es: 'Sin errores: la máquina funciona' } }
        ]
      }
    ]
  },
  {
    id: 'final-03', track: 'final', num: 48, icon: '🎓', xp: 300,
    title: { en: 'Web Master Ceremony', es: 'Ceremonia Web Master' },
    subtitle: { en: 'Graduation day — the fleet salutes you', es: 'Día de graduación: la flota te saluda' },
    narration: {
      en: "Stars above — you made it, Cadet! From your first hello in H T M L to promises in deep space, you flew every mission. Today the whole fleet gathers to honor you: a ceremony of stars, medals and code. Review everything you mastered one last time, then write your certificate page with your own name on it. Commander Cosmo salutes you. Welcome, Web Master. Your graduation begins now!",
      es: "¡Cielos estrellados, lo lograste, Cadete! Desde tu primer hola en H T M L hasta las promesas del espacio profundo, volaste todas las misiones. Hoy toda la flota se reúne para honrarte: una ceremonia de estrellas, medallas y código. Repasa todo lo que dominaste una última vez y escribe tu página de certificado con tu propio nombre. ¡El Comandante Cosmo te saluda! Bienvenido, Maestro Web. ¡Tu graduación comienza ahora!"
    },
    outro: {
      en: "Congratulations, Web Master! Your certificate is stamped in stardust. Go build the web's future — the whole universe is proud of you!",
      es: "¡Felicidades, Maestro Web! Tu certificado quedó sellado en polvo de estrellas. Ve y construye el futuro de la web: ¡el universo está orgulloso de ti!"
    },
    explainer: 'final-03',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'One last theory check, graduate: what does each language do?', es: 'Última comprobación de teoría, graduado: ¿qué hace cada lenguaje?' },
        options: [
          { en: 'HTML styles, CSS structures, JavaScript paints', es: 'HTML da estilo, CSS estructura, JavaScript pinta' },
          { en: 'HTML structures, CSS styles, JavaScript makes it think', es: 'HTML estructura, CSS da estilo, JavaScript lo hace pensar' },
          { en: 'HTML thinks, CSS structures, JavaScript styles', es: 'HTML piensa, CSS estructura, JavaScript da estilo' },
          { en: 'All three do the same job', es: 'Los tres hacen el mismo trabajo' }
        ],
        answer: 1,
        explain: { en: 'HTML is the skeleton, CSS is the style, JavaScript is the brain. Say it loud — you earned it.', es: 'HTML es el esqueleto, CSS es el estilo y JavaScript es el cerebro. Dícelo en voz alta: te lo ganaste.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each tool to its job — one last review from all three galaxies.', es: 'Une cada herramienta con su trabajo: un último repaso de las tres galaxias.' },
        lang: 'html',
        pairs: [
          { chip: '1', a: { en: '<header>', es: '<header>' }, b: { en: 'HTML: names the top of the page', es: 'HTML: nombra la parte superior de la página' } },
          { chip: '2', a: { en: 'background-color', es: 'background-color' }, b: { en: 'CSS: paints behind the content', es: 'CSS: pinta detrás del contenido' } },
          { chip: '3', a: { en: 'function', es: 'function' }, b: { en: 'JavaScript: a reusable block of code', es: 'JavaScript: un bloque de código reutilizable' } },
          { chip: '4', a: { en: 'console.log', es: 'console.log' }, b: { en: 'JavaScript: prints messages for the pilot', es: 'JavaScript: muestra mensajes al piloto' } }
        ],
        hint: { en: 'Two of them live in the JavaScript galaxy.', es: 'Dos de ellos viven en la galaxia JavaScript.' },
        explain: { en: 'Four old friends from three galaxies — a web master carries them all.', es: 'Cuatro viejos amigos de tres galaxias: un Maestro Web los carga todos.' }
      },
      {
        type: 'arcade',
        prompt: { en: 'The meteor parade in your honor! Catch tokens from every galaxy.', es: '¡El desfile de meteoros en tu honor! Atrapa tokens de todas las galaxias.' },
        rounds: [
          { question: { en: 'Catch the tag that opens the biggest heading', es: 'Atrapa la etiqueta que abre el encabezado más grande' }, correct: '<h1>', wrongs: ['<h6>', '<head>', '</h1>'], speed: 1 },
          { question: { en: 'Catch the CSS property that paints the text', es: 'Atrapa la propiedad CSS que pinta el texto' }, correct: 'color', wrongs: ['font-size', 'text-align', 'border-radius'], speed: 0.9 },
          { question: { en: 'Catch the keyword that declares a function', es: 'Atrapa la palabra clave que declara una función' }, correct: 'function', wrongs: ['let', 'return', 'if'], speed: 1.1 },
          { question: { en: 'Catch the method that listens for clicks', es: 'Atrapa el método que escucha los clics' }, correct: 'addEventListener', wrongs: ['querySelector', 'textContent', 'classList'], speed: 0.8 },
          { question: { en: 'Catch the closing tag of a paragraph', es: 'Atrapa la etiqueta de cierre de un párrafo' }, correct: '</p>', wrongs: ['<p>', '</div>', '</p/>'], speed: 1 }
        ],
        explain: { en: 'A farewell parade: HTML tags, CSS properties and JavaScript tools — you can catch them all now.', es: 'Un desfile de despedida: etiquetas HTML, propiedades CSS y herramientas de JavaScript: ahora puedes atraparlas todas.' }
      },
      {
        type: 'bug',
        prompt: { en: 'A meteor crossed two tags on the certificate wall! Click the broken line, then type the fix.', es: '¡Un meteoro cruzó dos etiquetas en el muro de certificados! Haz clic en la línea rota y escribe la corrección.' },
        lang: 'html',
        lines: ['<h1>Certificate of Bravery</h1>', '<p>Flown by <strong>Cadet Nova</p></strong>', '<blockquote>Stars are steps, not limits.</blockquote>'],
        bugLine: 1,
        fix: { accept: ['<p>Flown by <strong>Cadet Nova</strong></p>'] },
        explain: { en: 'Crossed tags — even on graduation day! strong opened last, so it must close first.', es: '¡Etiquetas cruzadas, hasta el día de graduación! strong se abrió al final, así que debe cerrarse primero.' }
      },
      {
        type: 'fill',
        prompt: { en: 'The ceremony wall needs the quote tag: complete it.', es: 'El muro de la ceremonia necesita la etiqueta de cita: complétala.' },
        template: '<___>\n  One small step for the web, one giant leap for this cadet.\n</___>',
        answers: [{ accept: ['blockquote'] }, { accept: ['blockquote'] }],
        hint: { en: 'The big quote container: block + quote.', es: 'El contenedor de citas grandes: block + quote.' },
        explain: { en: '<code>&lt;blockquote&gt;</code> marks a long quotation — perfect for words worth remembering.', es: '<code>&lt;blockquote&gt;</code> marca una cita larga: perfecto para palabras que vale la pena recordar.' }
      },
      {
        type: 'sandbox',
        lang: 'html',
        prompt: { en: '<b>THE FINAL MISSION — your certificate!</b> Fill the <code>&lt;h1&gt;</code> with your name followed by the words <code>Web Master</code>, write one line about your journey in the <code>&lt;p&gt;</code>, put a quote that mentions <code>stars</code> inside the <code>&lt;blockquote&gt;</code>, and sign the <code>&lt;footer&gt;</code>. Make it shine!', es: '<b>LA MISIÓN FINAL: ¡tu certificado!</b> Llena el <code>&lt;h1&gt;</code> con tu nombre seguido de las palabras <code>Web Master</code>, escribe una línea sobre tu viaje en el <code>&lt;p&gt;</code>, pon una cita que mencione las <code>stars</code> (las estrellas) dentro del <code>&lt;blockquote&gt;</code> y firma el <code>&lt;footer&gt;</code>. ¡Hazlo brillar!' },
        start: '<!-- 🎓 Your certificate — fill every part! -->\n<h1></h1>\n\n<p></p>\n\n<blockquote></blockquote>\n\n<footer></footer>\n',
        target: { en: 'A certificate: h1 with your name + "Web Master", a journey paragraph, a quote about stars in a blockquote, and a signed footer', es: 'Un certificado: h1 con tu nombre + "Web Master", un párrafo de viaje, una cita sobre las estrellas en un blockquote y un footer firmado' },
        solution: '<h1>Cadet Nova, Web Master</h1>\n\n<p>I crossed three galaxies of code and never stopped flying.</p>\n\n<blockquote>Shoot for the stars — then build one.</blockquote>\n\n<footer>Certified by Commander Cosmo, year 3026</footer>',
        explain: { en: 'Your certificate: name, journey, quote and signature — written in the language you now speak. Congratulations, Web Master!', es: 'Tu certificado: nombre, viaje, cita y firma, escritos en el idioma que ahora hablas. ¡Felicidades, Maestro Web!' },
        checks: [
          { dom: 'h1', count: 1, label: { en: 'There is a certificate title (h1)', es: 'Hay un título de certificado (h1)' } },
          { text: 'h1', includes: 'web master', label: { en: 'The h1 crowns you Web Master', es: 'El h1 te corona como Web Master' } },
          { dom: 'p', count: 1, label: { en: 'There is a line about your journey', es: 'Hay una línea sobre tu viaje' } },
          { dom: 'blockquote', count: 1, label: { en: 'There is a quote (blockquote)', es: 'Hay una cita (blockquote)' } },
          { text: 'blockquote', includes: 'stars', label: { en: 'The quote mentions the stars', es: 'La cita menciona las estrellas (stars)' } },
          { dom: 'footer', count: 1, label: { en: 'The certificate is signed in a footer', es: 'El certificado está firmado en un footer' } }
        ]
      }
    ]
  }
];
