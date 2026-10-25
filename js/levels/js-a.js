/* ============ JavaScript Galaxy track — part A, levels 28-36 (js-01…js-09) ============
   Beginner JS: first script, variables, operators, strings & template literals,
   conditionals, comparison & logic, loops, functions, arrow functions & scope.
   Same schema as html.js. Sandbox lang 'js' runs in the exercise iframe;
   NEVER use setTimeout here — checks run before timers fire. */
window.LEVELS_JS_A = [
  {
    id: 'js-01', track: 'js', num: 28, icon: '🤖', xp: 100,
    title: { en: 'Hello, JavaScript!', es: '¡Hola, JavaScript!' },
    subtitle: { en: 'Meet the language that makes pages think', es: 'Conoce el lenguaje que hace pensar a las páginas' },
    narration: {
      en: "Welcome to the JavaScript Galaxy, Cadet! I'm Cosmo, your robot guide. JavaScript is the language that makes web pages think and react. It talks to the console, the pilot's screen where code speaks back. Your first move: order the console to print a message with console dot log. Ready to say hello to the galaxy?",
      es: "¡Bienvenido a la Galaxia JavaScript, Cadete! Soy Cosmo, tu guía robot. JavaScript es el lenguaje que hace que las páginas web piensen y reaccionen. Habla con la consola, la pantalla del piloto donde el código responde. Tu primer movimiento: ordena a la consola que muestre un mensaje con console punto log. ¿Listo para saludar a la galaxia?"
    },
    outro: {
      en: "Message received, loud and clear! You just spoke your first words in JavaScript.",
      es: "¡Mensaje recibido, alto y claro! Acabas de decir tus primeras palabras en JavaScript."
    },
    explainer: 'js-01',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'What is <b>JavaScript</b>?', es: '¿Qué es <b>JavaScript</b>?' },
        options: [
          { en: 'A markup language that builds the page skeleton', es: 'Un lenguaje de marcado que arma el esqueleto de la página' },
          { en: 'A style language that paints colors and layouts', es: 'Un lenguaje de estilos que pinta colores y diseños' },
          { en: 'The programming language that makes pages interactive', es: 'El lenguaje de programación que hace interactivas las páginas' },
          { en: 'A database that stores photos of rockets', es: 'Una base de datos que guarda fotos de cohetes' }
        ],
        answer: 2,
        explain: { en: 'HTML is the skeleton, CSS the paint… and JavaScript is the brain: it makes pages react, count and decide.', es: 'HTML es el esqueleto, CSS la pintura… y JavaScript es el cerebro: hace que las páginas reaccionen, cuenten y decidan.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'What does this line do?', es: '¿Qué hace esta línea?' },
        code: "console.log('Hola!');",
        codeLang: 'js',
        options: [
          { en: 'Prints <code>Hola!</code> in the console', es: 'Muestra <code>Hola!</code> en la consola' },
          { en: 'Deletes the console', es: 'Borra la consola' },
          { en: 'Creates a variable named Hola', es: 'Crea una variable llamada Hola' },
          { en: 'Sends Hola! to another planet', es: 'Envía Hola! a otro planeta' }
        ],
        answer: 0,
        explain: { en: '<code>console.log(…)</code> prints whatever you give it into the console — your window into the code.', es: '<code>console.log(…)</code> muestra en la consola lo que le des: tu ventana hacia el código.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Make the console print <code>Rocket</code>: type the missing text.', es: 'Haz que la consola muestre <code>Rocket</code>: escribe el texto que falta.' },
        template: "console.log('___');",
        answers: [{ accept: ['Rocket'] }],
        hint: { en: 'The quotes are already there — just type the word.', es: 'Las comillas ya están puestas: solo escribe la palabra.' },
        explain: { en: "Text inside quotes is called a <b>string</b>. The console prints it exactly as written.", es: 'El texto entre comillas se llama <b>string</b>. La consola lo muestra tal cual.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the launch sequence lines', es: 'Ordena las líneas de la secuencia de lanzamiento' },
        lang: 'js',
        lines: ["let msg = 'Launch in 3...';", 'console.log(msg);', "console.log('Liftoff!');"],
        explain: { en: 'First store the message, then log it, then log the next one. JavaScript reads top to bottom.', es: 'Primero guarda el mensaje, luego muéstralo y después muestra el siguiente. JavaScript lee de arriba abajo.' }
      },
      {
        type: 'bug',
        prompt: { en: 'One line refuses to speak. Click the broken line, then type the fix!', es: 'Una línea se niega a hablar. ¡Haz clic en la línea rota y escribe la corrección!' },
        lang: 'js',
        lines: ["console.log('Fuel check');", 'console.log(All systems go);', "console.log('Bye!');"],
        bugLine: 1,
        fix: { accept: ["console.log('All systems go');", 'console.log("All systems go");'] },
        explain: { en: 'Without quotes, JavaScript looks for variables named All, systems and go — and crashes. Text needs quotes!', es: 'Sin comillas, JavaScript busca variables llamadas All, systems y go… y falla. ¡El texto necesita comillas!' }
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: '<b>Mission:</b> say hello to the universe! Log the message <code>Hello, universe!</code>, then log a second message: <code>Cadet on board!</code>. Watch the console pane react.', es: '<b>Misión:</b> ¡saluda al universo! Muestra el mensaje <code>Hello, universe!</code> y luego un segundo mensaje: <code>Cadet on board!</code>. Observa cómo reacciona la consola.' },
        start: "// Say hello to the universe!\n// 1) Log: Hello, universe!\n\n\n// 2) Log: Cadet on board!\n\n",
        target: { en: 'The console shows "Hello, universe!" and "Cadet on board!"', es: 'La consola muestra "Hello, universe!" y "Cadet on board!"' },
        solution: "console.log('Hello, universe!');\nconsole.log('Cadet on board!');",
        checks: [
          { console: { includes: 'Hello, universe!' }, label: { en: 'The console says "Hello, universe!"', es: 'La consola dice "Hello, universe!"' } },
          { console: { includes: 'Cadet on board!' }, label: { en: 'The console says "Cadet on board!"', es: 'La consola dice "Cadet on board!"' } },
          { codeIncludes: 'console.log', label: { en: 'You used console.log', es: 'Usaste console.log' } },
          { noError: true, label: { en: 'No errors — smooth launch', es: 'Sin errores: despegue suave' } }
        ],
        explain: { en: 'console.log is your radio to the console. Two calls, two messages — first contact made!', es: 'console.log es tu radio hacia la consola. Dos llamadas, dos mensajes: ¡primer contacto logrado!' }
      }
    ]
  },
  {
    id: 'js-02', track: 'js', num: 29, icon: '🏷️', xp: 100,
    title: { en: 'Variable Cargo', es: 'Carga de variables' },
    subtitle: { en: 'let, const and the types of data', es: 'let, const y los tipos de datos' },
    narration: {
      en: "Cadet, every pilot needs storage. Variables are labeled boxes where your program keeps values: numbers like fuel counts, strings of text like names, and booleans that are simply true or false. Use let for values that change and const for values that never do. Let's pack your cargo with data!",
      es: "Cadete, todo piloto necesita almacenamiento. Las variables son cajas etiquetadas donde tu programa guarda valores: números como el combustible, textos como los nombres y booleanos que son simplemente verdadero o falso. Usa let para valores que cambian y const para los que nunca lo harán. ¡Llenemos tu carga de datos!"
    },
    outro: {
      en: "Cargo packed! You can now store numbers, words and true-or-false flags like a pro.",
      es: "¡Carga lista! Ahora guardas números, palabras y banderas de verdadero o falso como un profesional."
    },
    explainer: 'js-02',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'What is a <b>variable</b>?', es: '¿Qué es una <b>variable</b>?' },
        options: [
          { en: 'A robot that fixes your code', es: 'Un robot que arregla tu código' },
          { en: 'A labeled box that stores a value', es: 'Una caja etiquetada que guarda un valor' },
          { en: 'A comment for other programmers', es: 'Un comentario para otros programadores' },
          { en: 'A file inside the browser', es: 'Un archivo dentro del navegador' }
        ],
        answer: 1,
        explain: { en: 'A variable is a box with a name: <code>let fuel = 90;</code> makes a box called fuel holding the number 90.', es: 'Una variable es una caja con nombre: <code>let fuel = 90;</code> crea una caja llamada fuel con el número 90.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'Which value is a <b>string</b>?', es: '¿Cuál de estos valores es un <b>string</b>?' },
        options: [
          { en: '<code>42</code>', es: '<code>42</code>' },
          { en: "<code>'Galaxy'</code>", es: "<code>'Galaxy'</code>" },
          { en: '<code>true</code>', es: '<code>true</code>' },
          { en: '<code>null</code>', es: '<code>null</code>' }
        ],
        answer: 1,
        explain: { en: "Strings are text wrapped in quotes: 'Galaxy'. 42 is a number, true is a boolean.", es: "Los strings son textos entre comillas: 'Galaxy'. 42 es un número y true es un booleano." }
      },
      {
        type: 'match',
        prompt: { en: 'Match each piece of code with its meaning', es: 'Une cada fragmento de código con su significado' },
        lang: 'js',
        pairs: [
          { chip: '1', a: { en: 'let', es: 'let' }, b: { en: 'a variable that can change', es: 'una variable que puede cambiar' } },
          { chip: '2', a: { en: 'const', es: 'const' }, b: { en: 'a variable that never changes', es: 'una variable que nunca cambia' } },
          { chip: '3', a: { en: '42', es: '42' }, b: { en: 'a number', es: 'un número' } },
          { chip: '4', a: { en: "'Vega'", es: "'Vega'" }, b: { en: 'a string (text in quotes)', es: 'un string (texto entre comillas)' } },
          { chip: '5', a: { en: 'true', es: 'true' }, b: { en: 'a boolean (yes or no)', es: 'un booleano (sí o no)' } }
        ],
        hint: { en: 'const = constant. Quotes = text.', es: 'const = constante. Comillas = texto.' },
        explain: { en: 'Three everyday types: number, string, boolean — and two ways to create the box: let and const.', es: 'Tres tipos de siempre: number, string y boolean, y dos formas de crear la caja: let y const.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Give the fuel box the number <code>90</code>.', es: 'Dale a la caja de combustible el número <code>90</code>.' },
        template: 'let fuel = ___;',
        answers: [{ accept: ['90'] }],
        hint: { en: 'Numbers wear no quotes.', es: 'Los números no llevan comillas.' },
        explain: { en: 'No quotes — quotes would make it the text "90". A bare number is a number type.', es: 'Sin comillas: las comillas lo volverían el texto "90". Un número sin comillas es de tipo número.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the lines: create the score, update it, then show it', es: 'Ordena las líneas: crea el puntaje, actualízalo y muéstralo' },
        lang: 'js',
        lines: ['let score = 0;', 'score = 10;', 'console.log(score);'],
        explain: { en: 'let creates the box, a plain assignment changes it, console.log shows the final value: 10.', es: 'let crea la caja, una asignación simple la cambia y console.log muestra el valor final: 10.' }
      },
      {
        type: 'bug',
        prompt: { en: 'One variable name is illegal. Click the broken line, then type the fix!', es: 'Un nombre de variable es ilegal. ¡Haz clic en la línea rota y escribe la corrección!' },
        lang: 'js',
        lines: ['let name = "Nova";', 'const 3wishes = 3;', 'name = "Vega";'],
        bugLine: 1,
        fix: { accept: ['const wishes = 3;'] },
        explain: { en: 'Variable names cannot start with a digit. Wishes may be three, but the name must start with a letter.', es: 'Los nombres de variables no pueden empezar con un dígito. Puede haber tres deseos, pero el nombre debe empezar con letra.' }
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: '<b>Mission:</b> pack the data cargo! Create <code>let x</code> with the number <code>5</code>, a <code>const pilot</code> with the text <code>\'Cosmo\'</code>, and a <code>let ready</code> with the boolean <code>true</code>.', es: '<b>Misión:</b> ¡empaca los datos! Crea <code>let x</code> con el número <code>5</code>, un <code>const pilot</code> con el texto <code>\'Cosmo\'</code> y un <code>let ready</code> con el booleano <code>true</code>.' },
        start: "// Pack the data cargo!\n// 1) let x = the number 5\n\n\n// 2) const pilot = the text 'Cosmo'\n\n\n// 3) let ready = the boolean true\n\n",
        target: { en: 'x is 5, pilot is "Cosmo", ready is true', es: 'x es 5, pilot es "Cosmo", ready es true' },
        solution: "let x = 5;\nconst pilot = 'Cosmo';\nlet ready = true;",
        checks: [
          { expr: 'x', equals: '5', label: { en: 'x holds the number 5', es: 'x guarda el número 5' } },
          { expr: 'pilot', equals: 'Cosmo', label: { en: 'pilot holds the text Cosmo', es: 'pilot guarda el texto Cosmo' } },
          { expr: 'ready', equals: 'true', label: { en: 'ready holds the boolean true', es: 'ready guarda el booleano true' } },
          { codeIncludes: 'const', label: { en: 'You used const for the unchanging pilot', es: 'Usaste const para el piloto que no cambia' } },
          { noError: true, label: { en: 'No errors — cargo secured', es: 'Sin errores: carga asegurada' } }
        ],
        explain: { en: 'Three boxes, three types: a number, a string and a boolean. const keeps Cosmo locked in place.', es: 'Tres cajas, tres tipos: un número, un string y un booleano. const mantiene a Cosmo bien sujeto.' }
      }
    ]
  },
  {
    id: 'js-03', track: 'js', num: 30, icon: '🧮', xp: 100,
    title: { en: 'Math Engine', es: 'Motor matemático' },
    subtitle: { en: 'Operators: + - * / % and ++', es: 'Operadores: + - * / % y ++' },
    narration: {
      en: "Attention, Cadet! The flight computer loves math. JavaScript adds with plus, subtracts, multiplies, divides, and the percent sign gives you the remainder of a division — super useful for spotting even numbers. You can even count faster with double plus. Compute fuel, distance and time: the galaxy runs on numbers!",
      es: "¡Atención, Cadete! A la computadora de vuelo le encantan las matemáticas. JavaScript suma con el signo de más, resta, multiplica, divide, y el signo de porcentaje te da el residuo de una división: súper útil para hallar números pares. ¡Hasta puedes contar más rápido con doble más! Calcula combustible, distancia y tiempo: ¡la galaxia funciona con números!"
    },
    outro: {
      en: "Math mission complete, Cadet! Operators are your flight computer's favorite tools — keep them close.",
      es: "¡Misión matemática completada! Los operadores son las herramientas favoritas de tu computadora de vuelo."
    },
    explainer: 'js-03',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'What does the console print?', es: '¿Qué muestra la consola?' },
        code: 'console.log(2 + 3 * 4);',
        codeLang: 'js',
        options: [
          { en: '<code>20</code>', es: '<code>20</code>' },
          { en: '<code>14</code>', es: '<code>14</code>' },
          { en: '<code>24</code>', es: '<code>24</code>' },
          { en: '<code>10</code>', es: '<code>10</code>' }
        ],
        answer: 1,
        explain: { en: 'Multiplication goes first (like in math class): 3 * 4 = 12, then 2 + 12 = 14.', es: 'La multiplicación va primero (como en la escuela): 3 * 4 = 12, luego 2 + 12 = 14.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each operator with its job', es: 'Une cada operador con su trabajo' },
        lang: 'js',
        pairs: [
          { chip: '1', a: { en: '+', es: '+' }, b: { en: 'adds two values', es: 'suma dos valores' } },
          { chip: '2', a: { en: '*', es: '*' }, b: { en: 'multiplies', es: 'multiplica' } },
          { chip: '3', a: { en: '%', es: '%' }, b: { en: 'remainder of a division', es: 'residuo de una división' } },
          { chip: '4', a: { en: '++', es: '++' }, b: { en: 'adds one to a variable', es: 'le suma uno a una variable' } }
        ],
        hint: { en: '% is not percent — pilots call it "modulo", the leftover.', es: '% no es porcentaje: se llama "módulo", lo que sobra.' },
        explain: { en: '10 % 3 is 1, because 10 divided by 3 leaves 1 over. And x++ is a shortcut for x = x + 1.', es: '10 % 3 es 1, porque al dividir 10 entre 3 sobra 1. Y x++ es un atajo de x = x + 1.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Make <code>area</code> hold <code>12</code>: type the missing operator.', es: 'Haz que <code>area</code> guarde <code>12</code>: escribe el operador que falta.' },
        template: 'let area = 4 ___ 3;',
        answers: [{ accept: ['*'] }],
        hint: { en: 'Multiplication is a tiny star, not the letter x.', es: 'La multiplicación es una estrellita, no la letra x.' },
        explain: { en: 'The star multiplies: 4 * 3 = 12. JavaScript never uses the letter x for multiplying.', es: 'La estrella multiplica: 4 * 3 = 12. JavaScript nunca usa la letra x para multiplicar.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'What is <code>10 % 3</code>?', es: '¿Cuánto es <code>10 % 3</code>?' },
        options: [
          { en: '<code>3</code>', es: '<code>3</code>' },
          { en: '<code>0</code>', es: '<code>0</code>' },
          { en: '<code>1</code>', es: '<code>1</code>' },
          { en: '<code>10</code>', es: '<code>10</code>' }
        ],
        answer: 2,
        explain: { en: '3 fits into 10 three times (that makes 9) and 1 is left over. The % operator returns that leftover.', es: 'El 3 cabe tres veces en 10 (eso hace 9) y sobra 1. El operador % devuelve ese sobrante.' }
      },
      {
        type: 'bug',
        prompt: { en: 'The area calculation is broken. Click the broken line, then type the fix!', es: 'El cálculo del área está roto. ¡Haz clic en la línea rota y escribe la corrección!' },
        lang: 'js',
        lines: ['let fuel = 10;', 'let area = 6 x 4;', 'console.log(area);'],
        bugLine: 1,
        fix: { accept: ['let area = 6 * 4;'] },
        explain: { en: '<code>x</code> is not an operator — JavaScript sees an unknown word. Use the star: <code>6 * 4</code>.', es: '<code>x</code> no es un operador: JavaScript ve una palabra desconocida. Usa la estrella: <code>6 * 4</code>.' }
      },
      {
        type: 'arcade',
        prompt: { en: 'Meteor drill! Catch the math tokens before they hit the deck.', es: '¡Entrenamiento de meteoros! Atrapa los tokens matemáticos antes de que golpeen la cubierta.' },
        rounds: [
          { question: { en: 'Catch the operator that adds', es: 'Atrapa el operador que suma' }, correct: '+', wrongs: ['-', '*', '%'], speed: 1 },
          { question: { en: 'Catch the remainder operator', es: 'Atrapa el operador del residuo' }, correct: '%', wrongs: ['/', '*', '+'], speed: 1.1 },
          { question: { en: 'Catch the operator that multiplies', es: 'Atrapa el operador que multiplica' }, correct: '*', wrongs: ['x', '+', '/'], speed: 0.9 },
          { question: { en: 'Catch the shortcut that adds ONE', es: 'Atrapa el atajo que suma UNO' }, correct: '++', wrongs: ['--', '+', '='], speed: 1 },
          { question: { en: 'Catch the keyword for a variable that can change', es: 'Atrapa la palabra clave de una variable que puede cambiar' }, correct: 'let', wrongs: ['const', 'log', 'num'], speed: 0.8 }
        ],
        explain: { en: 'Quick review — operators plus a friendly echo of the variables level.', es: 'Repaso rápido: operadores más un eco amistoso del nivel de variables.' }
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: "<b>Mission:</b> Cosmo left his calculator on board — keep the <code>area</code> function as it is! 1) Log <code>area(3, 4)</code>. 2) Take <code>fuel</code> from 10 to 11 using <code>++</code>. 3) Set <code>leftover</code> to <code>10 % 3</code>.", es: '<b>Misión:</b> Cosmo dejó su calculadora a bordo: ¡conserva la función <code>area</code> tal cual! 1) Muestra <code>area(3, 4)</code>. 2) Lleva <code>fuel</code> de 10 a 11 usando <code>++</code>. 3) Pon <code>leftover</code> igual a <code>10 % 3</code>.' },
        start: "// Cosmo's trusty calculator (do not delete!):\nfunction area(w, h) {\n  return w * h;\n}\n\n// 1) Log the area of a 3 by 4 panel\n\n\n// 2) Take fuel from 10 to 11 with ++\nlet fuel = 10;\n\n\n// 3) Set leftover to 10 % 3\nlet leftover;\n\n",
        target: { en: 'Console shows 12; fuel becomes 11; leftover is 1', es: 'La consola muestra 12; fuel queda en 11; leftover es 1' },
        solution: "function area(w, h) {\n  return w * h;\n}\nconsole.log(area(3, 4));\nlet fuel = 10;\nfuel++;\nlet leftover = 10 % 3;",
        checks: [
          { expr: 'area(3,4)', equals: '12', label: { en: 'area(3,4) still returns 12', es: 'area(3,4) sigue devolviendo 12' } },
          { console: { includes: '12' }, label: { en: 'You logged the area (12)', es: 'Mostraste el área (12)' } },
          { expr: 'fuel', equals: '11', label: { en: 'fuel is now 11', es: 'fuel ahora es 11' } },
          { codeIncludes: '++', label: { en: 'You used the ++ shortcut', es: 'Usaste el atajo ++' } },
          { expr: 'leftover', equals: '1', label: { en: 'leftover is 1 (the remainder of 10 / 3)', es: 'leftover es 1 (el residuo de 10 / 3)' } },
          { noError: true, label: { en: 'No errors — calculator intact', es: 'Sin errores: calculadora intacta' } }
        ],
        explain: { en: 'The star multiplies, ++ adds one, % keeps the remainder. The flight computer is fully powered!', es: 'La estrella multiplica, ++ suma uno y % conserva el residuo. ¡La computadora de vuelo está a full!' }
      }
    ]
  },
  {
    id: 'js-04', track: 'js', num: 31, icon: '🔤', xp: 100,
    title: { en: 'String Signals', es: 'Señales de texto' },
    subtitle: { en: 'Glue text together and master template literals', es: 'Pega textos y domina los template literals' },
    narration: {
      en: "Words are data too, Cadet. Text in quotes is a string, and strings can glue together with the plus sign. But JavaScript has a superpower called the template literal: backticks let you drop any variable right into the sentence with dollar and curly braces. Compose messages for the whole crew!",
      es: "Las palabras también son datos, Cadete. El texto entre comillas es un string, y los strings se pueden pegar con el signo de más. Pero JavaScript tiene un superpoder llamado template literal: las comillas invertidas te permiten insertar cualquier variable dentro de la frase con signo de dólar y llaves. ¡Redacta mensajes para toda la tripulación!"
    },
    outro: {
      en: "Superb messaging, Cadet! Template literals make every sentence dynamic — the whole crew hears you now.",
      es: "¡Mensajes espectaculares, Cadete! Los template literals hacen cada frase dinámica y toda la tripulación te escucha."
    },
    explainer: 'js-04',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: "What does <code>'Co' + 'smo'</code> give you?", es: "¿Qué te da <code>'Co' + 'smo'</code>?" },
        options: [
          { en: "<code>'Co smo'</code> — with a space", es: "<code>'Co smo'</code> — con espacio" },
          { en: '<code>0</code>', es: '<code>0</code>' },
          { en: "<code>'Cosmo'</code> — glued into one string", es: "<code>'Cosmo'</code> — pegado en un solo string" },
          { en: 'An error', es: 'Un error' }
        ],
        answer: 2,
        explain: { en: 'With strings, + glues them together end to end — no space unless you add one.', es: 'Con strings, el + los pega de punta a punta: sin espacio, a menos que lo agregues.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'Which one is a <b>template literal</b>?', es: '¿Cuál es un <b>template literal</b>?' },
        options: [
          { en: "<code>'Hi name'</code>", es: "<code>'Hi name'</code>" },
          { en: '<code>`Hi ${name}`</code>', es: '<code>`Hi ${name}`</code>' },
          { en: "<code>'Hi + name'</code>", es: "<code>'Hi + name'</code>" },
          { en: '<code>(Hi name)</code>', es: '<code>(Hi name)</code>' }
        ],
        answer: 1,
        explain: { en: 'Backticks ` make a template literal, and ${…} is a window where a variable can jump into the text.', es: 'Las comillas invertidas ` crean un template literal, y ${…} es la ventanita donde la variable salta al texto.' }
      },
      {
        type: 'fill',
        prompt: { en: "Glue the two shouts into <code>'ROCKET LAUNCH!'</code>: type the missing operator.", es: "Pega los dos gritos en <code>'ROCKET LAUNCH!'</code>: escribe el operador que falta." },
        template: "let shout = 'ROCKET' ___ ' LAUNCH!';",
        answers: [{ accept: ['+'] }],
        hint: { en: 'The same sign that adds numbers glues text.', es: 'El mismo signo que suma números pega texto.' },
        explain: { en: 'The space lives inside the second string, so the plus has nothing to add but the pieces.', es: 'El espacio vive dentro del segundo string, así que el plus solo une las piezas.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each expression with its result', es: 'Une cada expresión con su resultado' },
        lang: 'js',
        pairs: [
          { chip: '1', a: { en: "'Rock' + 'et'", es: "'Rock' + 'et'" }, b: { en: "'Rocket' — plus glues strings", es: "'Rocket' — el plus pega strings" } },
          { chip: '2', a: { en: "`Hi ${name}`", es: "`Hi ${name}`" }, b: { en: 'template literal — inserts the variable', es: 'template literal — inserta la variable' } },
          { chip: '3', a: { en: "'age: ' + 9", es: "'age: ' + 9" }, b: { en: "'age: 9' — numbers become text", es: "'age: 9' — los números se vuelven texto" } },
          { chip: '4', a: { en: "'5' + 5", es: "'5' + 5" }, b: { en: "'55' — one string plus a number is text", es: "'55' — string más número da texto" } }
        ],
        hint: { en: 'Once a string joins the party, everything becomes text.', es: 'Cuando un string se une a la fiesta, todo se vuelve texto.' },
        explain: { en: "+ means add for numbers but glue for strings — and the glue wins if a string touches the plus.", es: '+ significa sumar con números, pero pegar con strings — y pegar gana si un string toca el plus.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the lines: introduce the pilot, build the message, send it', es: 'Ordena las líneas: presenta al piloto, arma el mensaje y envíalo' },
        lang: 'js',
        lines: ["let pilot = 'Nova';", 'let msg = `Welcome, ${pilot}!`;', 'console.log(msg);'],
        explain: { en: 'First create pilot, then the template literal reads it, then the console shows "Welcome, Nova!".', es: 'Primero crea pilot, luego el template literal lo lee y la consola muestra "Welcome, Nova!".' }
      },
      {
        type: 'bug',
        prompt: { en: 'The console prints ${name} literally — horror! Click the broken line, then type the fix!', es: 'La consola muestra ${name} tal cual: ¡horror! ¡Haz clic en la línea rota y escribe la corrección!' },
        lang: 'js',
        lines: ["const name = 'Nova';", "let msg = 'Welcome, ${name}!';", 'console.log(msg);'],
        bugLine: 1,
        fix: { accept: ['let msg = `Welcome, ${name}!`;'] },
        explain: { en: 'Single quotes print ${name} literally. Swap them for backticks ` to turn on template powers.', es: 'Las comillas simples muestran ${name} tal cual. Cámbialas por comillas invertidas ` para activar el superpoder.' }
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: "<b>Mission:</b> the ship is waiting! The <code>ship</code> variable is set. Build <code>msg</code> with a template literal so it says <code>The Odyssey is ready!</code> (use <code>${ship}</code> inside backticks), then log it.", es: '<b>Misión:</b> ¡la nave espera! La variable <code>ship</code> ya está lista. Arma <code>msg</code> con un template literal que diga <code>The Odyssey is ready!</code> (usa <code>${ship}</code> dentro de comillas invertidas) y muéstralo.' },
        start: "const ship = 'Odyssey';\n// 1) Build msg with a template literal: The Odyssey is ready!\nlet msg;\n\n\n// 2) Log msg\n\n",
        target: { en: 'msg is "The Odyssey is ready!" and the console shows it', es: 'msg es "The Odyssey is ready!" y la consola lo muestra' },
        solution: "const ship = 'Odyssey';\nlet msg = `The ${ship} is ready!`;\nconsole.log(msg);",
        checks: [
          { codeIncludes: '${', label: { en: 'You used ${…} inside the message', es: 'Usaste ${…} dentro del mensaje' } },
          { codeIncludes: '`', label: { en: 'You used backticks ` for the template literal', es: 'Usaste comillas invertidas ` para el template literal' } },
          { expr: 'msg', equals: 'The Odyssey is ready!', label: { en: 'msg says "The Odyssey is ready!"', es: 'msg dice "The Odyssey is ready!"' } },
          { console: { includes: 'The Odyssey is ready!' }, label: { en: 'The console announces the ship', es: 'La consola anuncia la nave' } },
          { noError: true, label: { en: 'No errors — signal clear', es: 'Sin errores: señal clara' } }
        ],
        explain: { en: 'Backticks open the template, ${ship} drops the variable into the sentence. Dynamic messages, Cadet!', es: 'Las comillas invertidas abren la plantilla y ${ship} suelta la variable dentro de la frase. ¡Mensajes dinámicos, Cadete!' }
      }
    ]
  },
  {
    id: 'js-05', track: 'js', num: 32, icon: '🚦', xp: 100,
    title: { en: 'Decision Deck', es: 'Cubierta de decisiones' },
    subtitle: { en: 'Choose paths with if and else', es: 'Elige caminos con if y else' },
    narration: {
      en: "Pilots make decisions every second, Cadet. Now your code can too. The if statement checks a condition, and only runs its block when the answer is true. Otherwise, the else block steps in. Is there enough fuel? Is the cadet old enough to board? Write your first decisions with if and else!",
      es: "Los pilotos toman decisiones cada segundo, Cadete. Ahora tu código también puede. La sentencia if revisa una condición y solo ejecuta su bloque cuando la respuesta es verdadera. Si no, entra en acción el bloque else. ¿Hay suficiente combustible? ¿El cadete tiene edad para abordar? ¡Escribe tus primeras decisiones con if y else!"
    },
    outro: {
      en: "Decision locked in, Cadet! Your code can now choose its own path.",
      es: "¡Decisión tomada, Cadete! Tu código ahora puede elegir su propio camino en la galaxia."
    },
    explainer: 'js-05',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'What does <code>if</code> do?', es: '¿Qué hace <code>if</code>?' },
        options: [
          { en: 'Repeats a block many times', es: 'Repite un bloque muchas veces' },
          { en: 'Runs its block only when the condition is true', es: 'Ejecuta su bloque solo cuando la condición es verdadera' },
          { en: 'Stores a value in a variable', es: 'Guarda un valor en una variable' },
          { en: 'Prints the condition in the console', es: 'Muestra la condición en la consola' }
        ],
        answer: 1,
        explain: { en: 'if is a gate: the condition decides whether the block inside the braces runs or is skipped.', es: 'if es una compuerta: la condición decide si el bloque entre llaves se ejecuta o se salta.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'What does the console print?', es: '¿Qué muestra la consola?' },
        code: "let fuel = 0;\nif (fuel > 0) {\n  console.log('Go');\n} else {\n  console.log('Wait');\n}",
        codeLang: 'js',
        options: [
          { en: "<code>Go</code>", es: "<code>Go</code>" },
          { en: "<code>Wait</code>", es: "<code>Wait</code>" },
          { en: 'Both Go and Wait', es: 'Tanto Go como Wait' },
          { en: 'Nothing — the code is broken', es: 'Nada: el código está roto' }
        ],
        answer: 1,
        explain: { en: 'fuel > 0 is false when fuel is 0, so the if block is skipped and else speaks: Wait.', es: 'fuel > 0 es falso cuando fuel es 0, así que el bloque if se salta y habla el else: Wait.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each piece with its role', es: 'Une cada pieza con su papel' },
        lang: 'js',
        pairs: [
          { chip: '1', a: { en: 'if (…)', es: 'if (…)' }, b: { en: 'the gate — runs when true', es: 'la compuerta: se abre cuando es verdadero' } },
          { chip: '2', a: { en: 'else', es: 'else' }, b: { en: 'the fallback — runs when false', es: 'el plan B: corre cuando es falso' } },
          { chip: '3', a: { en: 'age >= 18', es: 'age >= 18' }, b: { en: 'a condition: 18 or more', es: 'una condición: 18 o más' } },
          { chip: '4', a: { en: '{ … }', es: '{ … }' }, b: { en: 'the block — code between braces', es: 'el bloque: código entre llaves' } }
        ],
        hint: { en: 'else means "otherwise".', es: 'else significa "si no".' },
        explain: { en: 'Condition in parentheses, action in braces, and else catches every case the gate rejected.', es: 'Condición entre paréntesis, acción entre llaves y else atrapa todo lo que la compuerta rechazó.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Boarding is allowed at 18 or older: type the missing comparison.', es: 'Se aborda desde los 18 años: escribe la comparación que falta.' },
        template: 'if (age ___ 18) {',
        answers: [{ accept: ['>='] }],
        hint: { en: 'Older OR exactly 18 — two symbols together.', es: 'Mayor O exactamente 18: dos símbolos juntos.' },
        explain: { en: '>= means "greater than or equal to". A single > would sadly lock out the 18-year-olds.', es: '>= significa "mayor o igual". Un solo > dejaría tristemente afuera a los de 18.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the lines of a fuel decision', es: 'Ordena las líneas de una decisión de combustible' },
        lang: 'js',
        lines: ['let fuel = 50;', 'if (fuel > 100) {', "  console.log('Full burn');", '} else {', "  console.log('Save fuel');", '}'],
        explain: { en: 'Create the data, ask the question, answer one way or the other — and close every brace.', es: 'Crea el dato, haz la pregunta y responde de una forma o la otra: y cierra cada llave.' }
      },
      {
        type: 'bug',
        prompt: { en: 'The gate never opens. Click the broken line, then type the fix!', es: 'La compuerta nunca se abre. ¡Haz clic en la línea rota y escribe la corrección!' },
        lang: 'js',
        lines: ['let fuel = 120;', 'if fuel == 100 {', "  console.log('Launch!');", '}'],
        bugLine: 1,
        fix: { accept: ['if (fuel == 100) {', 'if (fuel === 100) {'] },
        explain: { en: 'The condition of an if always wears parentheses: <code>if (fuel == 100)</code>.', es: 'La condición del if siempre lleva paréntesis: <code>if (fuel == 100)</code>.' }
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: "<b>Mission:</b> the airlock checks ages! Inside <code>canBoard(age)</code>, write an <code>if / else</code>: return <code>true</code> when age is 18 or more, and <code>false</code> otherwise.", es: '<b>Misión:</b> ¡la esclusa revisa edades! Dentro de <code>canBoard(age)</code>, escribe un <code>if / else</code>: devuelve <code>true</code> cuando la edad sea 18 o más y <code>false</code> en cualquier otro caso.' },
        start: '// Return true if age is 18 or more. Otherwise return false.\nfunction canBoard(age) {\n  // your if / else here\n\n}\n',
        target: { en: 'canBoard(20) and canBoard(18) return true; canBoard(15) returns false', es: 'canBoard(20) y canBoard(18) devuelven true; canBoard(15) devuelve false' },
        solution: 'function canBoard(age) {\n  if (age >= 18) {\n    return true;\n  } else {\n    return false;\n  }\n}',
        checks: [
          { expr: 'canBoard(20)', equals: 'true', label: { en: 'canBoard(20) is true', es: 'canBoard(20) es true' } },
          { expr: 'canBoard(18)', equals: 'true', label: { en: 'canBoard(18) is true — exactly 18 boards too', es: 'canBoard(18) es true: con 18 exactos también se aborda' } },
          { expr: 'canBoard(15)', equals: 'false', label: { en: 'canBoard(15) is false', es: 'canBoard(15) es false' } },
          { codeIncludes: 'if', label: { en: 'You used if', es: 'Usaste if' } },
          { codeIncludes: 'else', label: { en: 'You used else for the other path', es: 'Usaste else para el otro camino' } },
          { noError: true, label: { en: 'No errors — airlock working', es: 'Sin errores: esclusa funcionando' } }
        ],
        explain: { en: 'The condition opens the gate, return hands back the answer. Age 18 or more boards — everyone else waits.', es: 'La condición abre la compuerta y return entrega la respuesta. Con 18 o más se aborda: los demás esperan.' }
      }
    ]
  },
  {
    id: 'js-06', track: 'js', num: 33, icon: '⚖️', xp: 100,
    title: { en: 'Logic Core', es: 'Núcleo lógico' },
    subtitle: { en: 'Compare and combine with === && || !', es: 'Compara y combina con === && || !' },
    narration: {
      en: "Precision time, Cadet! To compare values, JavaScript uses triple equals — it asks: are these exactly equal, type included? Exclamation equals asks if they are different. And you can chain questions with the logic operators: double ampersand means both must be true, double pipes means at least one, and a lone exclamation flips the answer. Master the logic board!",
      es: "¡Hora de precisión, Cadete! Para comparar valores, JavaScript usa triple igual: pregunta si son exactamente iguales, tipo incluido. El signo de exclamación con igual pregunta si son diferentes. Y puedes encadenar preguntas con los operadores lógicos: el doble ampersand exige que ambas sean verdaderas, las doble barras bastan con una, y una exclamación sola invierte la respuesta. ¡Domina el tablero lógico!"
    },
    outro: {
      en: "Logic mastered, Cadet! Your conditions now think like a real flight computer.",
      es: "¡Lógica dominada! Tus condiciones ahora piensan como una computadora de vuelo real."
    },
    explainer: 'js-06',
    exercises: [
      {
        type: 'match',
        prompt: { en: 'Match each operator with its question', es: 'Une cada operador con su pregunta' },
        lang: 'js',
        pairs: [
          { chip: '1', a: { en: '===', es: '===' }, b: { en: 'exactly equal? (type counts)', es: '¿exactamente iguales? (el tipo cuenta)' } },
          { chip: '2', a: { en: '!==', es: '!==' }, b: { en: 'different?', es: '¿son diferentes?' } },
          { chip: '3', a: { en: '&&', es: '&&' }, b: { en: 'true only if BOTH sides are true', es: 'verdadero solo si AMBOS lados son verdaderos' } },
          { chip: '4', a: { en: '||', es: '||' }, b: { en: 'true if at least ONE side is true', es: 'verdadero si al menos UN lado es verdadero' } },
          { chip: '5', a: { en: '!', es: '!' }, b: { en: 'flips true to false and back', es: 'convierte verdadero en falso y al revés' } }
        ],
        hint: { en: '& = AND (both), | = OR (one is enough).', es: '& = Y (ambos), | = O (uno basta).' },
        explain: { en: 'Five tiny symbols carry the whole logic board of your program.', es: 'Cinco simbolitos cargan con todo el tablero lógico de tu programa.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'What is the result of <code>\'5\' === 5</code>?', es: '¿Cuál es el resultado de <code>\'5\' === 5</code>?' },
        options: [
          { en: '<code>true</code> — the digits match', es: '<code>true</code> — los dígitos coinciden' },
          { en: '<code>false</code> — a string is not a number', es: '<code>false</code> — un string no es un número' },
          { en: '<code>55</code>', es: '<code>55</code>' },
          { en: 'An error', es: 'Un error' }
        ],
        answer: 1,
        explain: { en: 'Triple equals checks the type too: the string \'5\' and the number 5 are different things. Not equal!', es: 'El triple igual revisa también el tipo: el string \'5\' y el número 5 son cosas distintas. ¡No son iguales!' }
      },
      {
        type: 'mcq',
        prompt: { en: 'What is the result of <code>true && false</code>?', es: '¿Cuál es el resultado de <code>true && false</code>?' },
        options: [
          { en: '<code>true</code>', es: '<code>true</code>' },
          { en: '<code>false</code>', es: '<code>false</code>' },
          { en: '<code>null</code>', es: '<code>null</code>' },
          { en: '<code>2</code>', es: '<code>2</code>' }
        ],
        answer: 1,
        explain: { en: '&& is strict: both sides must be true. One false and the whole answer is false. (true || false would be true.)', es: '&& es estricto: ambos lados deben ser verdaderos. Con un falso, todo es falso. (true || false sería true.)' }
      },
      {
        type: 'dnd',
        prompt: { en: "Build the gate: board only when there IS fuel <b>and</b> the pilot is Nova.", es: 'Arma la compuerta: aborda solo si HAY combustible <b>y</b> el piloto es Nova.' },
        before: 'if (',
        after: ") {\n  console.log('Board!');\n}",
        slots: ['fuel > 0', '&&', "pilot === 'Nova'"],
        distractors: ['||', 'fuel = 0'],
        explain: { en: '&& demands both conditions. With ||, anyone out of fuel could board — scary!', es: '&& exige ambas condiciones. Con ||, alguien sin combustible podría abordar: ¡de miedo!' }
      },
      {
        type: 'fill',
        prompt: { en: '<code>open</code> should be the <b>opposite</b> of <code>locked</code>: type the missing symbol.', es: '<code>open</code> debe ser lo <b>contrario</b> de <code>locked</code>: escribe el símbolo que falta.' },
        template: 'let open = ___locked;',
        answers: [{ accept: ['!'] }],
        hint: { en: 'One tiny symbol flips the value.', es: 'Un solo símbolito invierte el valor.' },
        explain: { en: 'The exclamation mark negates: !locked is true when locked is false. The door logic of the ship!', es: 'La exclamación niega: !locked es true cuando locked es false. ¡La lógica de las puertas de la nave!' }
      },
      {
        type: 'bug',
        prompt: { en: 'One equals sign too few! Click the broken line, then type the fix!', es: '¡Falta un signo de igual! ¡Haz clic en la línea rota y escribe la corrección!' },
        lang: 'js',
        lines: ['let age = 18;', "if (age = 18) {", "  console.log('Adult');", '}'],
        bugLine: 1,
        fix: { accept: ['if (age === 18) {', 'if (age == 18) {'] },
        explain: { en: 'A single = ASSIGNS instead of comparing. Use === (or ==) to ask a question inside if.', es: 'Un solo = ASIGNA en vez de comparar. Usa === (o ==) para hacer una pregunta dentro del if.' }
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: '<b>Mission:</b> launch requires two things at once. Inside <code>canLaunch(fuel, go)</code>, return <code>true</code> only when <code>fuel</code> is 100 or more <b>and</b> <code>go</code> is <code>true</code>. Combine the two checks with <code>&amp;&amp;</code>.', es: '<b>Misión:</b> el lanzamiento exige dos cosas a la vez. Dentro de <code>canLaunch(fuel, go)</code>, devuelve <code>true</code> solo cuando <code>fuel</code> sea 100 o más <b>y</b> <code>go</code> sea <code>true</code>. Combina las dos condiciones con <code>&amp;&amp;</code>.' },
        start: '// Return true only when fuel >= 100 AND go is true.\nfunction canLaunch(fuel, go) {\n  // combine the two checks with &&\n\n}\n',
        target: { en: 'canLaunch(120, true) is true; the other combos are false', es: 'canLaunch(120, true) es true; las otras combinaciones son false' },
        solution: 'function canLaunch(fuel, go) {\n  if (fuel >= 100 && go === true) {\n    return true;\n  } else {\n    return false;\n  }\n}',
        checks: [
          { expr: 'canLaunch(120, true)', equals: 'true', label: { en: 'Full fuel and green light — true', es: 'Tanque lleno y luz verde: true' } },
          { expr: 'canLaunch(50, true)', equals: 'false', label: { en: 'Low fuel — false, even with a green light', es: 'Poco combustible: false, aunque haya luz verde' } },
          { expr: 'canLaunch(120, false)', equals: 'false', label: { en: 'No green light — false, even with full fuel', es: 'Sin luz verde: false, aunque el tanque esté lleno' } },
          { codeIncludes: '&&', label: { en: 'You combined the checks with &&', es: 'Combinaste las condiciones con &&' } },
          { noError: true, label: { en: 'No errors — launch board online', es: 'Sin errores: tablero de lanzamiento en línea' } }
        ],
        explain: { en: '&& makes the mission strict: fuel AND permission, or the rocket stays on the pad.', es: '&& hace la misión estricta: combustible Y permiso, o el cohete se queda en la plataforma.' }
      }
    ]
  },
  {
    id: 'js-07', track: 'js', num: 34, icon: '🔁', xp: 100,
    title: { en: 'Loop Reactor', es: 'Reactor de bucles' },
    subtitle: { en: 'Repeat code with for and while', es: 'Repite código con for y while' },
    narration: {
      en: "Blast off with me, Cadet! Countdown: three, two, one... See how repetition rules the galaxy? Writing the same line ten times is astronaut torture — loops repeat code for you. The for loop counts from a start value, keeps going while its condition is true, and steps forward each round. And while loops spin as long as you say. Automate everything!",
      es: "¡Despeguemos juntos, Cadete! Cuenta regresiva: tres, dos, uno... ¿Ves cómo la repetición gobierna la galaxia? Escribir la misma línea diez veces es tortura de astronauta: los bucles repiten el código por ti. El bucle for cuenta desde un valor inicial, sigue mientras su condición sea verdadera y avanza en cada vuelta. ¡Y los bucles while giran mientras tú lo digas! ¡Automatiza todo!"
    },
    outro: {
      en: "Loops online! You just automated a whole countdown with a few lines.",
      es: "¡Bucles en línea! Acabas de automatizar una cuenta regresiva con pocas líneas."
    },
    explainer: 'js-07',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Why do pilots use <b>loops</b>?', es: '¿Por qué los pilotos usan <b>bucles</b>?' },
        options: [
          { en: 'To make code run backwards', es: 'Para que el código corra al revés' },
          { en: 'To repeat code without writing it again and again', es: 'Para repetir código sin escribirlo una y otra vez' },
          { en: 'To delete variables automatically', es: 'Para borrar variables automáticamente' },
          { en: 'To make the console bigger', es: 'Para hacer la consola más grande' }
        ],
        answer: 1,
        explain: { en: 'A loop runs the same block many times. Write it once, spin it a thousand rounds.', es: 'Un bucle ejecuta el mismo bloque muchas veces. Lo escribes una vez y da mil vueltas.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'What does this loop print?', es: '¿Qué muestra este bucle?' },
        code: 'for (let i = 1; i <= 3; i++) {\n  console.log(i);\n}',
        codeLang: 'js',
        options: [
          { en: 'Just <code>3</code>', es: 'Solo <code>3</code>' },
          { en: '<code>1</code>, <code>2</code>, <code>3</code> — three lines', es: '<code>1</code>, <code>2</code>, <code>3</code> — tres líneas' },
          { en: '<code>0</code>, <code>1</code>, <code>2</code>, <code>3</code>', es: '<code>0</code>, <code>1</code>, <code>2</code>, <code>3</code>' },
          { en: 'It never stops', es: 'Nunca se detiene' }
        ],
        answer: 1,
        explain: { en: 'i starts at 1 and the loop keeps running while i <= 3: logs 1, 2, 3, then i becomes 4 and stops.', es: 'i empieza en 1 y el bucle sigue mientras i <= 3: muestra 1, 2, 3; cuando i llega a 4, se detiene.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each part of the for loop with its job', es: 'Une cada parte del bucle for con su trabajo' },
        lang: 'js',
        pairs: [
          { chip: '1', a: { en: 'let i = 0', es: 'let i = 0' }, b: { en: 'the start — runs once before everything', es: 'el inicio: corre una vez antes de todo' } },
          { chip: '2', a: { en: 'i &lt; 5', es: 'i &lt; 5' }, b: { en: 'the condition — keep going while true', es: 'la condición: sigue mientras sea verdadera' } },
          { chip: '3', a: { en: 'i++', es: 'i++' }, b: { en: 'the step — happens after each round', es: 'el paso: ocurre después de cada vuelta' } },
          { chip: '4', a: { en: 'console.log(i)', es: 'console.log(i)' }, b: { en: 'the body — what repeats', es: 'el cuerpo: lo que se repite' } }
        ],
        hint: { en: 'Start, condition, step — then the body in braces.', es: 'Inicio, condición, paso: y el cuerpo entre llaves.' },
        explain: { en: 'Start once, check the condition, run the body, step forward — and around we go!', es: 'Empieza una vez, revisa la condición, ejecuta el cuerpo, avanza un paso: ¡y otra vuelta!' }
      },
      {
        type: 'fill',
        prompt: { en: 'The loop must fire the engine exactly <b>5 times</b>: type the missing number.', es: 'El bucle debe encender el motor exactamente <b>5 veces</b>: escribe el número que falta.' },
        template: 'for (let i = 0; i < ___; i++) {',
        answers: [{ accept: ['5'] }],
        hint: { en: 'It starts at 0, so the condition must allow 0, 1, 2, 3 and 4.', es: 'Empieza en 0, así que la condición debe permitir 0, 1, 2, 3 y 4.' },
        explain: { en: 'Counting from 0, the rounds are 0, 1, 2, 3, 4 — five rounds — and i < 5 stops it right there.', es: 'Contando desde 0, las vueltas son 0, 1, 2, 3, 4 (cinco vueltas) y i < 5 lo detiene justo ahí.' }
      },
      {
        type: 'bug',
        prompt: { en: 'This loop never lands — an infinite spin! Click the broken line, then type the fix!', es: 'Este bucle nunca aterriza: ¡un giro infinito! ¡Haz clic en la línea rota y escribe la corrección!' },
        lang: 'js',
        lines: ['let total = 0;', 'for (let i = 0; i < 3; i--) {', '  total++;', '}'],
        bugLine: 1,
        fix: { accept: ['for (let i = 0; i < 3; i++) {'] },
        explain: { en: 'i-- counts down: i goes 0, -1, -2… and i < 3 stays true forever. The step must be i++.', es: 'i-- cuenta hacia abajo: i va 0, -1, -2… y i < 3 sigue siendo verdadera para siempre. El paso debe ser i++.' }
      },
      {
        type: 'arcade',
        prompt: { en: 'Meteor shower! Catch the loop tokens mid-flight.', es: '¡Lluvia de meteoros! Atrapa los tokens de bucles en pleno vuelo.' },
        rounds: [
          { question: { en: 'Catch the keyword that repeats code', es: 'Atrapa la palabra clave que repite código' }, correct: 'for', wrongs: ['if', 'let', 'return'], speed: 1 },
          { question: { en: 'Catch the step that adds ONE', es: 'Atrapa el paso que suma UNO' }, correct: 'i++', wrongs: ['i--', 'i = 0', 'i < 5'], speed: 1.1 },
          { question: { en: 'Catch the keyword for "repeat WHILE true"', es: 'Atrapa la palabra clave de "repite MIENTRAS sea verdadero"' }, correct: 'while', wrongs: ['for', 'if', 'loop'], speed: 0.9 },
          { question: { en: 'Catch "less than"', es: 'Atrapa el "menor que"' }, correct: '<', wrongs: ['>', '<=', '==='], speed: 1 },
          { question: { en: 'Catch the keyword that exits a loop early', es: 'Atrapa la palabra clave que sale del bucle antes de tiempo' }, correct: 'break', wrongs: ['return', 'exit', 'stop'], speed: 0.8 }
        ],
        explain: { en: 'Loop review — for, while and friends, plus a meteor or two from earlier levels.', es: 'Repaso de bucles: for, while y amigos, más algún meteoro de niveles anteriores.' }
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: "<b>Mission:</b> launch countdown! Use a <code>for</code> loop to log <code>3</code>, then <code>2</code>, then <code>1</code> — and AFTER the loop, log <code>Liftoff!</code>. No loop, no launch!", es: '<b>Misión:</b> ¡cuenta regresiva de lanzamiento! Usa un bucle <code>for</code> para mostrar <code>3</code>, luego <code>2</code>, luego <code>1</code> — y DESPUÉS del bucle muestra <code>Liftoff!</code>. ¡Sin bucle no hay lanzamiento!' },
        start: '// Mission: countdown!\n// 1) A for loop that logs 3, 2, 1\n\n\n// 2) After the loop: log Liftoff!\n\n',
        target: { en: 'The console shows 3, 2, 1 and Liftoff! — powered by a for loop', es: 'La consola muestra 3, 2, 1 y Liftoff! — impulsado por un bucle for' },
        solution: "for (let i = 3; i >= 1; i--) {\n  console.log(i);\n}\nconsole.log('Liftoff!');",
        checks: [
          { console: { includes: '3' }, label: { en: 'The console shows 3', es: 'La consola muestra 3' } },
          { console: { includes: '2' }, label: { en: 'The console shows 2', es: 'La consola muestra 2' } },
          { console: { includes: '1' }, label: { en: 'The console shows 1', es: 'La consola muestra 1' } },
          { console: { includes: 'Liftoff' }, label: { en: 'The console shouts Liftoff!', es: 'La consola grita Liftoff!' } },
          { codeIncludes: 'for', label: { en: 'You built a for loop', es: 'Construiste un bucle for' } },
          { noError: true, label: { en: 'No errors — reactor stable', es: 'Sin errores: reactor estable' } }
        ],
        explain: { en: 'Start at 3, keep going while i >= 1, step down with i--, and log after the loop for the final shout.', es: 'Empieza en 3, sigue mientras i >= 1, baja con i-- y muestra el grito final después del bucle.' }
      }
    ]
  },
  {
    id: 'js-08', track: 'js', num: 35, icon: '⚙️', xp: 100,
    title: { en: 'Function Factory', es: 'Fábrica de funciones' },
    subtitle: { en: 'Build machines with parameters and return', es: 'Construye máquinas con parámetros y return' },
    narration: {
      en: "Mission briefing, Cadet: a function is a machine with a name. You feed it inputs called parameters, it does its job, and return sends the result back to you. Write it once, call it a thousand times — that's how real programs stay small. Build your own machines, starting with double!",
      es: "Briefing de misión, Cadete: una función es una máquina con nombre. Le entregas entradas llamadas parámetros, hace su trabajo y return te devuelve el resultado. Escríbela una vez y llámala mil veces: así los programas reales se mantienen pequeños. ¡Construye tus propias máquinas, empezando con double!"
    },
    outro: {
      en: "Machines online, Cadet! Functions turn big jobs into small, reusable parts of every program.",
      es: "¡Máquinas en línea! Las funciones convierten trabajos grandes en partes pequeñas y reutilizables."
    },
    explainer: 'js-08',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'What is a <b>function</b>?', es: '¿Qué es una <b>función</b>?' },
        options: [
          { en: 'A named, reusable block of code that can take inputs and return a result', es: 'Un bloque de código con nombre y reutilizable que recibe entradas y devuelve un resultado' },
          { en: 'A way to delete code', es: 'Una forma de borrar código' },
          { en: 'A special kind of variable that only holds numbers', es: 'Un tipo especial de variable que solo guarda números' },
          { en: 'A browser window', es: 'Una ventana del navegador' }
        ],
        answer: 0,
        explain: { en: 'A function is a machine: inputs go in (parameters), work happens, and return sends the result out.', es: 'Una función es una máquina: entran datos (parámetros), ocurre el trabajo y return entrega el resultado.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'What does the console print?', es: '¿Qué muestra la consola?' },
        code: 'function double(n) {\n  return n * 2;\n}\nconsole.log(double(5));',
        codeLang: 'js',
        options: [
          { en: '<code>5</code>', es: '<code>5</code>' },
          { en: '<code>10</code>', es: '<code>10</code>' },
          { en: '<code>n * 2</code>', es: '<code>n * 2</code>' },
          { en: 'Nothing — double is missing', es: 'Nada: falta double' }
        ],
        answer: 1,
        explain: { en: 'Calling double(5) sends 5 into the machine as n, and return hands back 5 * 2 = 10.', es: 'Llamar double(5) mete el 5 en la máquina como n, y return entrega 5 * 2 = 10.' }
      },
      {
        type: 'fill',
        prompt: { en: 'The machine builds the answer but never sends it back: type the missing keyword.', es: 'La máquina fabrica la respuesta pero nunca la envía: escribe la palabra clave que falta.' },
        template: 'function triple(n) {\n  ___ n * 3;\n}',
        answers: [{ accept: ['return'] }],
        hint: { en: 'Six letters — they hand the result back.', es: 'Seis letras que entregan el resultado.' },
        explain: { en: 'return sends the result back to whoever called the function. Without it, the machine answers silence.', es: 'return devuelve el resultado a quien llamó a la función. Sin él, la máquina responde con silencio.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each function idea with its name', es: 'Une cada idea de las funciones con su nombre' },
        lang: 'js',
        pairs: [
          { chip: '1', a: { en: 'function double(n)', es: 'function double(n)' }, b: { en: 'the definition — building the machine', es: 'la definición: construir la máquina' } },
          { chip: '2', a: { en: 'n', es: 'n' }, b: { en: 'the parameter — the input slot', es: 'el parámetro: la ranura de entrada' } },
          { chip: '3', a: { en: 'double(4)', es: 'double(4)' }, b: { en: 'the call — 4 is the argument', es: 'la llamada: 4 es el argumento' } },
          { chip: '4', a: { en: 'return', es: 'return' }, b: { en: 'sends the result back out', es: 'devuelve el resultado hacia afuera' } }
        ],
        hint: { en: 'Parameter = the slot. Argument = the value you drop in.', es: 'Parámetro = la ranura. Argumento = el valor que metes.' },
        explain: { en: 'Define once with parameters, call many times with arguments, and return ships the answer.', es: 'Define una vez con parámetros, llama muchas veces con argumentos y return envía la respuesta.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the lines: build the machine, then use it', es: 'Ordena las líneas: construye la máquina y úsala' },
        lang: 'js',
        lines: ['function double(n) {', '  return n * 2;', '}', 'console.log(double(5));'],
        explain: { en: 'Body between braces with return inside, then call the machine by name and print what comes back.', es: 'El cuerpo entre llaves con return dentro; luego llama a la máquina por su nombre y muestra lo que sale.' }
      },
      {
        type: 'bug',
        prompt: { en: 'half(10) returns undefined instead of 5. Click the broken line, then type the fix!', es: 'half(10) devuelve undefined en vez de 5. ¡Haz clic en la línea rota y escribe la corrección!' },
        lang: 'js',
        lines: ['function half(n) {', '  n / 2;', '}', 'console.log(half(10));'],
        bugLine: 1,
        fix: { accept: ['return n / 2;'] },
        explain: { en: 'The machine calculates n / 2 but never hands it over. return n / 2; completes the delivery.', es: 'La máquina calcula n / 2 pero nunca lo entrega. return n / 2; completa la entrega.' }
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: '<b>Mission:</b> run the factory! 1) Write <code>double(n)</code> that returns <code>n * 2</code>. 2) Write <code>triple(n)</code> that returns <code>n * 3</code>. 3) Log <code>double(4)</code>.', es: '<b>Misión:</b> ¡a operar la fábrica! 1) Escribe <code>double(n)</code> que devuelva <code>n * 2</code>. 2) Escribe <code>triple(n)</code> que devuelva <code>n * 3</code>. 3) Muestra <code>double(4)</code>.' },
        start: '// Build your machines!\n// 1) double(n): return n * 2\n\n\n// 2) triple(n): return n * 3\n\n\n// 3) Log double(4)\n\n',
        target: { en: 'double(4) is 8, triple(3) is 9, and the console shows 8', es: 'double(4) es 8, triple(3) es 9 y la consola muestra 8' },
        solution: 'function double(n) {\n  return n * 2;\n}\nfunction triple(n) {\n  return n * 3;\n}\nconsole.log(double(4));',
        checks: [
          { expr: 'double(4)', equals: '8', label: { en: 'double(4) returns 8', es: 'double(4) devuelve 8' } },
          { expr: 'double(10)', equals: '20', label: { en: 'double(10) returns 20 — it works with any number', es: 'double(10) devuelve 20: funciona con cualquier número' } },
          { expr: 'triple(3)', equals: '9', label: { en: 'triple(3) returns 9', es: 'triple(3) devuelve 9' } },
          { expr: 'double(triple(2))', equals: '12', label: { en: 'Machines chain: double(triple(2)) is 12', es: 'Las máquinas se encadenan: double(triple(2)) es 12' } },
          { codeIncludes: 'return', label: { en: 'You used return to ship results', es: 'Usaste return para enviar resultados' } },
          { console: { includes: '8' }, label: { en: 'The console shows 8', es: 'La consola muestra 8' } },
          { noError: true, label: { en: 'No errors — factory humming', es: 'Sin errores: la fábrica funciona' } }
        ],
        explain: { en: 'Two machines, four lines each — and they can even feed each other. That is the power of functions!', es: 'Dos máquinas de cuatro líneas cada una, ¡y hasta pueden alimentarse entre sí! Ese es el poder de las funciones.' }
      }
    ]
  },
  {
    id: 'js-09', track: 'js', num: 36, icon: '🏹', xp: 100,
    title: { en: 'Arrow Squadron', es: 'Escuadrón de flechas' },
    subtitle: { en: 'Arrow functions and the rules of scope', es: 'Funciones flecha y las reglas del scope' },
    narration: {
      en: "Final approach, Cadet! Arrow functions write machines in one short line: the fat arrow turns a parameter into a result. And scope is the visibility map of your variables: variables made in the big room are global, visible everywhere, while a variable inside a block only exists between its braces. Shorter code, sharper rules. Let's fly!",
      es: "Aproximación final, Cadete. Las funciones flecha escriben máquinas en una sola línea corta: la flecha gorda convierte un parámetro en un resultado. Y el scope es el mapa de visibilidad de tus variables: las creadas en la sala grande son globales y se ven en todas partes, mientras que una variable dentro de un bloque solo existe entre sus llaves. Código más corto, reglas más precisas. ¡A volar!"
    },
    outro: {
      en: "Arrow certified, Cadet! Scope now holds no secrets from you — fly on.",
      es: "¡Certificado en flechas, Cadete! El scope ya no guarda secretos para ti."
    },
    explainer: 'js-09',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Which one is an <b>arrow function</b>?', es: '¿Cuál es una <b>función flecha</b>?' },
        options: [
          { en: '<code>function double(n) { return n * 2; }</code>', es: '<code>function double(n) { return n * 2; }</code>' },
          { en: '<code>const double = (n) =&gt; n * 2;</code>', es: '<code>const double = (n) =&gt; n * 2;</code>' },
          { en: '<code>double(n) = n * 2;</code>', es: '<code>double(n) = n * 2;</code>' },
          { en: '<code>let n = double * 2;</code>', es: '<code>let n = double * 2;</code>' }
        ],
        answer: 1,
        explain: { en: 'The arrow =&gt; points from the parameters to the result, all stored in a const. One line, one machine!', es: 'La flecha =&gt; apunta de los parámetros al resultado, todo guardado en un const. ¡Una línea, una máquina!' }
      },
      {
        type: 'mcq',
        prompt: { en: 'A variable is created <b>inside</b> a block <code>{ let fuel = 5; }</code>. Can code outside the braces use it?', es: 'Una variable se crea <b>dentro</b> de un bloque <code>{ let fuel = 5; }</code>. ¿Puede usarla el código de fuera de las llaves?' },
        options: [
          { en: 'Yes — blocks are just decoration', es: 'Sí: las llaves son solo decoración' },
          { en: 'Yes, but only on weekends', es: 'Sí, pero solo los fines de semana' },
          { en: 'No — it is block-scoped and vanishes outside', es: 'No: es de bloque y desaparece fuera' },
          { en: 'Only if the block runs twice', es: 'Solo si el bloque corre dos veces' }
        ],
        answer: 2,
        explain: { en: 'let and const live in the block where they were born. Outside the braces, fuel does not exist.', es: 'let y const viven en el bloque donde nacieron. Fuera de las llaves, fuel no existe.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Complete the arrow: <code>half</code> takes <code>n</code> and returns <code>n / 2</code>.', es: 'Completa la flecha: <code>half</code> recibe <code>n</code> y devuelve <code>n / 2</code>.' },
        template: 'const half = n ___ n / 2;',
        answers: [{ accept: ['=>'] }],
        hint: { en: 'An equals sign and a greater-than, holding hands.', es: 'Un signo igual y un mayor-que, tomados de la mano.' },
        explain: { en: '=&gt; is the arrow: parameters on the left, the returned result on the right. No braces needed for one-liners.', es: '=&gt; es la flecha: los parámetros a la izquierda y el resultado devuelto a la derecha. Sin llaves en una sola línea.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each idea with its meaning', es: 'Une cada idea con su significado' },
        lang: 'js',
        pairs: [
          { chip: '1', a: { en: '=&gt;', es: '=&gt;' }, b: { en: 'the arrow — makes a tiny function', es: 'la flecha: crea una función diminuta' } },
          { chip: '2', a: { en: 'const f = …', es: 'const f = …' }, b: { en: 'arrow functions ride inside variables', es: 'las funciones flecha viajan dentro de variables' } },
          { chip: '3', a: { en: 'global scope', es: 'scope global' }, b: { en: 'born outside — visible everywhere', es: 'nace afuera: se ve en todas partes' } },
          { chip: '4', a: { en: 'block { }', es: 'bloque { }' }, b: { en: 'a variable born inside exists only inside', es: 'una variable que nace dentro solo existe dentro' } }
        ],
        hint: { en: 'Scope = where a variable is visible.', es: 'Scope = dónde se ve una variable.' },
        explain: { en: 'Arrows shrink your code; scope decides who can see each variable. Two rules, zero confusion.', es: 'Las flechas achican tu código y el scope decide quién ve cada variable. Dos reglas, cero confusión.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the lines of an arrow machine with two parameters', es: 'Ordena las líneas de una máquina flecha con dos parámetros' },
        lang: 'js',
        lines: ['const add = (a, b) => {', '  return a + b;', '};', 'console.log(add(2, 3));'],
        explain: { en: 'Parameters in parentheses, arrow, body in braces, then call it like any machine: add(2, 3) is 5.', es: 'Parámetros entre paréntesis, flecha, cuerpo entre llaves y luego se llama como cualquier máquina: add(2, 3) es 5.' }
      },
      {
        type: 'bug',
        prompt: { en: 'The arrow lost its tip! Click the broken line, then type the fix!', es: '¡La flecha perdió la punta! ¡Haz clic en la línea rota y escribe la corrección!' },
        lang: 'js',
        lines: ['const square = (n) n * n;', 'console.log(square(6));'],
        bugLine: 0,
        fix: { accept: ['const square = (n) => n * n;'] },
        explain: { en: 'Without the arrow =&gt;, JavaScript cannot tell where the parameters end and the result begins.', es: 'Sin la flecha =&gt;, JavaScript no sabe dónde terminan los parámetros ni dónde empieza el resultado.' }
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: "<b>Mission:</b> join the arrow squadron! 1) Make a global <code>const sector</code> equal to <code>7</code>. 2) Build an arrow function <code>shout(word)</code> that returns <code>word + '!'</code>. 3) Inside a block <code>{ … }</code>, create <code>let shield = 'up'</code> and log it <b>inside</b> the block. 4) Log <code>shout('Cosmo')</code>.", es: "<b>Misión:</b> ¡únete al escuadrón de flechas! 1) Crea un <code>const sector</code> global igual a <code>7</code>. 2) Construye una función flecha <code>shout(word)</code> que devuelva <code>word + '!'</code>. 3) Dentro de un bloque <code>{ … }</code>, crea <code>let shield = 'up'</code> y muéstralo <b>dentro</b> del bloque. 4) Muestra <code>shout('Cosmo')</code>." },
        start: "// 1) Global: const sector = 7\n\n\n// 2) Arrow function shout(word): return word + '!'\n\n\n// 3) A block { } with let shield = 'up' — log shield INSIDE it\n\n\n// 4) Log shout('Cosmo')\n\n",
        target: { en: 'sector is 7, shout works, and the console shows "up" and "Cosmo!"', es: 'sector es 7, shout funciona y la consola muestra "up" y "Cosmo!"' },
        solution: "const sector = 7;\nconst shout = (word) => word + '!';\n{\n  let shield = 'up';\n  console.log(shield);\n}\nconsole.log(shout('Cosmo'));",
        checks: [
          { expr: 'sector', equals: '7', label: { en: 'The global sector reads 7 everywhere', es: 'El sector global se lee como 7 en todas partes' } },
          { codeIncludes: '=>', label: { en: 'You used the arrow =>', es: 'Usaste la flecha =>' } },
          { expr: 'shout("Go")', equals: 'Go!', label: { en: 'shout("Go") returns "Go!"', es: 'shout("Go") devuelve "Go!"' } },
          { console: { includes: 'up' }, label: { en: 'The block logged its shield ("up")', es: 'El bloque mostró su escudo ("up")' } },
          { console: { includes: 'Cosmo!' }, label: { en: 'shout(\u0027Cosmo\u0027) reached the console', es: 'shout(\u0027Cosmo\u0027) llegó a la consola' } },
          { noError: true, label: { en: 'No errors — squadron cleared for takeoff', es: 'Sin errores: escuadrón listo para despegar' } }
        ],
        explain: { en: 'Arrows for short machines, a global const everyone can read, and a block-scoped shield that lives between its braces.', es: 'Flechas para máquinas cortas, un const global que todos leen y un escudo de bloque que vive entre sus llaves.' }
      }
    ]
  }
];
