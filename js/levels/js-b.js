/* ============ JavaScript Galaxy track — part B, levels 37-45 (js-10…js-18) ============
   Intermediate → advanced JS: arrays, array methods, objects, DOM selection/mutation,
   events, counter boss mini-app, ES6+ tricks, async/await.
   Same schema as html.js. Sandbox lang 'js' runs in the exercise iframe;
   NEVER use setTimeout here — checks run before timers fire. */
window.LEVELS_JS_B = [
  {
    id: 'js-10', track: 'js', num: 37, icon: '📦', xp: 100,
    title: { en: 'Array Cargo Hold', es: 'La bodega de arreglos' },
    subtitle: { en: 'Lists of values: indexing, length and push', es: 'Listas de valores: índices, length y push' },
    narration: {
      en: "Cadet, welcome to the cargo hold! Today we meet arrays, the crates that hold lists of values in one tidy box. You will learn to build an array, grab any item by its index number, count items with dot length, and push new cargo to the end. Stow it all away — launch when ready!",
      es: "¡Cadete, bienvenido a la bodega de carga! Hoy conocemos los arreglos: cajas que guardan listas de valores en un solo lugar. Aprenderás a crear un arreglo, tomar cualquier elemento por su índice, contar elementos con length y empujar carga nueva al final con push. ¡Guarda todo y despega cuando estés listo!"
    },
    outro: { en: "Cargo secured! You can build, index, count and grow arrays like a pro. Onward, Cadet!", es: "¡Carga asegurada! Ya puedes crear, indexar, contar y hacer crecer arreglos como un profesional. ¡Adelante, Cadete!" },
    explainer: 'js-10',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Study this code. What does <code>stars[1]</code> give you?', es: 'Observa este código. ¿Qué te da <code>stars[1]</code>?' },
        code: "let stars = ['Sirius', 'Vega', 'Rigel'];",
        codeLang: 'js',
        options: [
          { en: '<code>Sirius</code>', es: '<code>Sirius</code>' },
          { en: '<code>Vega</code>', es: '<code>Vega</code>' },
          { en: '<code>Rigel</code>', es: '<code>Rigel</code>' },
          { en: '<code>3</code> (the length)', es: '<code>3</code> (la longitud)' }
        ],
        answer: 1,
        explain: { en: 'Arrays count from 0, so index 1 is the SECOND item: Vega.', es: 'Los arreglos cuentan desde 0, así que el índice 1 es el SEGUNDO elemento: Vega.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Complete the array so its first item is <code>red</code>', es: 'Completa el arreglo para que su primer elemento sea <code>red</code>' },
        template: "let colors = [___, 'green', 'blue'];",
        answers: [{ accept: ['"red"', "'red'", 'red'] }],
        hint: { en: 'Type the value with its quotes — the comma is already there.', es: 'Escribe el valor con sus comillas; la coma ya está puesta.' },
        explain: { en: "Text values need quotes: 'red'. The first slot is index 0.", es: "Los valores de texto llevan comillas: 'red'. La primera casilla es el índice 0." }
      },
      {
        type: 'match',
        prompt: { en: 'Match each array tool with what it does', es: 'Une cada herramienta de arreglos con lo que hace' },
        lang: 'js',
        pairs: [
          { chip: '1', a: { en: '[ ]', es: '[ ]' }, b: { en: 'creates an array (a list)', es: 'crea un arreglo (una lista)' } },
          { chip: '2', a: { en: 'arr[0]', es: 'arr[0]' }, b: { en: 'the first item (index 0)', es: 'el primer elemento (índice 0)' } },
          { chip: '3', a: { en: 'arr.length', es: 'arr.length' }, b: { en: 'how many items it has', es: 'cuántos elementos tiene' } },
          { chip: '4', a: { en: 'arr.push(x)', es: 'arr.push(x)' }, b: { en: 'adds x to the end', es: 'agrega x al final' } }
        ],
        hint: { en: 'push grows the array; length only counts.', es: 'push hace crecer el arreglo; length solo cuenta.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the lines: create the probes, add one more, then count them', es: 'Ordena las líneas: crea las sondas, agrega otra y cuéntalas' },
        lang: 'js',
        lines: ["let probes = ['Voyager'];", "probes.push('New Horizons');", 'console.log(probes.length);'],
        explain: { en: 'Create the array, push adds a second item, so the length logged is 2.', es: 'Creas el arreglo, push agrega un segundo elemento, así que la longitud mostrada es 2.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'What does <code>push</code> do to an array?', es: '¿Qué hace <code>push</code> con un arreglo?' },
        options: [
          { en: 'Adds an item to the end', es: 'Agrega un elemento al final' },
          { en: 'Removes the last item', es: 'Quita el último elemento' },
          { en: 'Sorts the items', es: 'Ordena los elementos' },
          { en: 'Counts the items', es: 'Cuenta los elementos' }
        ],
        answer: 0,
        explain: { en: 'push appends to the end and returns the new length. pop is the one that removes.', es: 'push agrega al final y devuelve la nueva longitud. pop es el que quita.' }
      },
      {
        type: 'bug',
        prompt: { en: 'The console should count the gems, but something is off. Click the broken line, then type the fix!', es: 'La consola debería contar las gemas, pero algo falla. ¡Haz clic en la línea rota y escribe la corrección!' },
        lang: 'js',
        lines: ['let gems = ["Topaz", "Opal"];', 'console.log(gems.length());', 'console.log(gems[0]);'],
        bugLine: 1,
        fix: { accept: ['console.log(gems.length);'] },
        explain: { en: 'length is a property, not a method — it takes no parentheses.', es: 'length es una propiedad, no un método: no lleva paréntesis.' }
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: '<b>Mission:</b> pack the cargo hold! <code>nums</code> already holds 3 containers. Push the number <code>40</code> to the end, then log the first item and the length.', es: '<b>Misión:</b> ¡empaca la bodega! <code>nums</code> ya tiene 3 contenedores. Agrega el número <code>40</code> al final con push y muestra en consola el primer elemento y la longitud.' },
        start: '// Pack the cargo hold!\nconst nums = [10, 20, 30];\n\n// 1) Push the number 40 to the end of nums\n\n// 2) Log the FIRST item (index 0)\n\n// 3) Log nums.length\n',
        target: { en: 'nums becomes [10, 20, 30, 40]; the console shows 10 and 4', es: 'nums queda [10, 20, 30, 40]; la consola muestra 10 y 4' },
        solution: 'const nums = [10, 20, 30];\nnums.push(40);\nconsole.log(nums[0]);\nconsole.log(nums.length);',
        checks: [
          { expr: 'nums.length', equals: '4', label: { en: 'nums has 4 items after your push', es: 'nums tiene 4 elementos después del push' } },
          { expr: 'nums[0]', equals: '10', label: { en: 'The first item is still 10', es: 'El primer elemento sigue siendo 10' } },
          { expr: 'nums[3]', equals: '40', label: { en: '40 landed at index 3', es: '40 quedó en el índice 3' } },
          { expr: 'nums[nums.length - 1]', equals: '40', label: { en: 'The last item is 40', es: 'El último elemento es 40' } },
          { console: { includes: '10' }, label: { en: 'The console shows the first item (10)', es: 'La consola muestra el primer elemento (10)' } },
          { noError: true, label: { en: 'No errors — smooth flight', es: 'Sin errores: vuelo suave' } }
        ],
        explain: { en: 'push grows the array, index 0 reads the first item and length counts them all.', es: 'push hace crecer el arreglo, el índice 0 lee el primer elemento y length los cuenta todos.' }
      }
    ]
  },
  {
    id: 'js-11', track: 'js', num: 38, icon: '⚡', xp: 100,
    title: { en: 'Array Superpowers', es: 'Súper poderes de arreglos' },
    subtitle: { en: 'Transform, filter and reduce with map, filter, reduce', es: 'Transforma, filtra y reduce con map, filter, reduce' },
    narration: {
      en: "Your arrays just got superpowers, Cadet! With map you transform every item at once. With filter you keep only the items that pass a test. And with reduce you boil a whole list down to one value, like a total. Three tools, endless combos. Suit up and bend those arrays to your will!",
      es: "¡Tus arreglos acaban de ganar súper poderes, Cadete! Con map transformas todos los elementos de una sola vez. Con filter conservas solo los que pasan una prueba. Y con reduce conviertes una lista entera en un solo valor, como un total. ¡Tres herramientas, combinaciones infinitas! ¡Ponte el traje y domina tus arreglos!"
    },
    outro: { en: "Map, filter, reduce — three superpowers earned. Your arrays will never be plain again!", es: "¡Map, filter, reduce: tres súper poderes conseguidos! Tus arreglos nunca volverán a ser simples." },
    explainer: 'js-11',
    exercises: [
      {
        type: 'match',
        prompt: { en: 'Match each array method with its superpower', es: 'Une cada método de arreglos con su súper poder' },
        lang: 'js',
        pairs: [
          { chip: '1', a: { en: 'map', es: 'map' }, b: { en: 'transforms every item into a NEW array', es: 'transforma cada elemento en un arreglo NUEVO' } },
          { chip: '2', a: { en: 'filter', es: 'filter' }, b: { en: 'keeps only the items that pass a test', es: 'conserva solo los elementos que pasan una prueba' } },
          { chip: '3', a: { en: 'reduce', es: 'reduce' }, b: { en: 'boils the list down to one value', es: 'reduce la lista a un solo valor' } },
          { chip: '4', a: { en: 'forEach', es: 'forEach' }, b: { en: 'visits each item, returns nothing', es: 'visita cada elemento, no devuelve nada' } }
        ],
        hint: { en: 'Only reduce ends with a single value.', es: 'Solo reduce termina en un único valor.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'What is <code>out</code>?', es: '¿Qué es <code>out</code>?' },
        code: 'const nums = [1, 2, 3];\nconst out = nums.map(n => n * 3);',
        codeLang: 'js',
        options: [
          { en: '<code>[3, 6, 9]</code>', es: '<code>[3, 6, 9]</code>' },
          { en: '<code>[1, 2, 3]</code>', es: '<code>[1, 2, 3]</code>' },
          { en: '<code>[3]</code>', es: '<code>[3]</code>' },
          { en: '<code>9</code>', es: '<code>9</code>' }
        ],
        answer: 0,
        explain: { en: 'map runs the little function on every item and collects the results into a new array.', es: 'map aplica la pequeña función a cada elemento y junta los resultados en un arreglo nuevo.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Use <code>filter</code> to keep only the numbers over 10', es: 'Usa <code>filter</code> para conservar solo los números mayores que 10' },
        template: 'const big = [5, 12, 8].filter(n => n ___ 10);',
        answers: [{ accept: ['>', ' >', '>=', ' >='] }],
        hint: { en: 'The test must be true only for 12.', es: 'La prueba debe ser verdadera solo para 12.' },
        explain: { en: 'filter keeps the items where the test is true — 12 is the only one over 10.', es: 'filter conserva los elementos donde la prueba es verdadera: 12 es el único mayor que 10.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the lines: create speeds, transform them, log the result', es: 'Ordena las líneas: crea las velocidades, transfórmalas y muestra el resultado' },
        lang: 'js',
        lines: ['const speeds = [5, 9, 2];', 'const fast = speeds.map(s => s * 10);', 'console.log(fast);'],
        explain: { en: 'speeds stays intact; fast is the new array [50, 90, 20].', es: 'speeds queda intacto; fast es el arreglo nuevo [50, 90, 20].' }
      },
      {
        type: 'bug',
        prompt: { en: 'This should keep the 3-letter words, but it never works. Click the broken line, then type the fix!', es: 'Esto debería conservar las palabras de 3 letras, pero nunca funciona. ¡Haz clic en la línea rota y escribe la corrección!' },
        lang: 'js',
        lines: ["const words = ['ant', 'bee', 'cat'];", 'const two = words.filter[w => w.length === 3];', 'console.log(two);'],
        bugLine: 1,
        fix: { accept: ['const two = words.filter(w => w.length === 3);', 'const two = words.filter(w=>w.length===3);'] },
        explain: { en: 'Methods are called with parentheses ( ) — square brackets [ ] only read positions.', es: 'Los métodos se llaman con paréntesis ( ): los corchetes [ ] solo leen posiciones.' }
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: '<b>Mission:</b> three superpowers in one flight! Write <code>doubles(arr)</code> using <code>map</code>, keep the scores 70 or more in <code>pass</code> using <code>filter</code>, and add up all the scores into <code>total</code> using <code>reduce</code>.', es: '<b>Misión:</b> ¡tres súper poderes en un vuelo! Escribe <code>doubles(arr)</code> con <code>map</code>, guarda los puntajes de 70 o más en <code>pass</code> con <code>filter</code> y suma todos los puntajes en <code>total</code> con <code>reduce</code>.' },
        start: 'const scores = [45, 82, 91, 67, 30];\n\n// 1) Write doubles(arr): returns a NEW array with\n//    every number times 2 (use .map)\nfunction doubles(arr) {\n\n}\n\n// 2) Use .filter to keep the scores 70 or more\n//    (name it pass)\n\n// 3) Use .reduce to add up all the scores\n//    (name it total)\n',
        target: { en: 'doubles([1,2,3]) is [2,4,6]; pass is [82, 91]; total is 315', es: 'doubles([1,2,3]) es [2,4,6]; pass es [82, 91]; total es 315' },
        solution: 'const scores = [45, 82, 91, 67, 30];\n\nfunction doubles(arr) {\n  return arr.map(n => n * 2);\n}\n\nconst pass = scores.filter(s => s >= 70);\nconst total = scores.reduce((a, b) => a + b, 0);\nconsole.log(doubles([1, 2, 3]), pass, total);',
        checks: [
          { expr: 'doubles([1, 2, 3]).join(",")', equals: '2,4,6', label: { en: 'doubles turns [1,2,3] into [2,4,6]', es: 'doubles convierte [1,2,3] en [2,4,6]' } },
          { expr: 'pass.length', equals: '2', label: { en: 'pass kept exactly 2 scores', es: 'pass conservó exactamente 2 puntajes' } },
          { expr: 'pass.join(",")', equals: '82,91', label: { en: 'pass holds 82 and 91', es: 'pass contiene 82 y 91' } },
          { expr: 'total', equals: '315', label: { en: 'total is the sum: 315', es: 'total es la suma: 315' } },
          { codeIncludes: 'map', label: { en: 'You used map', es: 'Usaste map' } },
          { codeIncludes: 'filter', label: { en: 'You used filter', es: 'Usaste filter' } },
          { codeIncludes: 'reduce', label: { en: 'You used reduce', es: 'Usaste reduce' } }
        ],
        explain: { en: 'map transforms, filter selects, reduce accumulates — the holy trinity of arrays.', es: 'map transforma, filter selecciona, reduce acumula: la trinidad de los arreglos.' }
      }
    ]
  },
  {
    id: 'js-12', track: 'js', num: 39, icon: '🗂️', xp: 100,
    title: { en: 'Object Blueprints', es: 'Planos de objetos' },
    subtitle: { en: 'Properties, methods and the keyword this', es: 'Propiedades, métodos y la palabra clave this' },
    narration: {
      en: "Time to organize your data, Cadet! Objects let you pack related information into one thing, using named properties instead of numbered slots. You will build objects, read and change their properties, and even teach them tricks called methods. And meet the special keyword this — how an object refers to itself. Blueprint ready — build!",
      es: "¡Hora de organizar tus datos, Cadete! Los objetos guardan información relacionada en un solo lugar, con propiedades con nombre en vez de casillas numeradas. Construirás objetos, leerás y cambiarás sus propiedades, y hasta les enseñarás trucos llamados métodos. Y conocerás this, la palabra clave con que un objeto se refiere a sí mismo. ¡El plano está listo: construye!"
    },
    outro: { en: "Objects assembled! Properties, methods and this are yours to command. Blueprint complete, Cadet.", es: "¡Objetos ensamblados! Propiedades, métodos y this son tuyos. Plano completado, Cadete." },
    explainer: 'js-12',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Given this ship, which line reads the fuel?', es: 'Dada esta nave, ¿qué línea lee el combustible?' },
        code: "const ship = {\n  name: 'Falcon',\n  fuel: 80\n};",
        codeLang: 'js',
        options: [
          { en: '<code>ship.fuel</code>', es: '<code>ship.fuel</code>' },
          { en: '<code>ship-&gt;fuel</code>', es: '<code>ship-&gt;fuel</code>' },
          { en: '<code>fuel(ship)</code>', es: '<code>fuel(ship)</code>' },
          { en: '<code>ship(fuel)</code>', es: '<code>ship(fuel)</code>' }
        ],
        answer: 0,
        explain: { en: 'A dot reads a property: object.property. That is the whole trick.', es: 'Un punto lee una propiedad: objeto.propiedad. Ese es todo el truco.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Add a new property <code>orbit</code> with the value <code>LEO</code>', es: 'Agrega una nueva propiedad <code>orbit</code> con el valor <code>LEO</code>' },
        template: "const sat = { name: 'Echo' };\nsat.___ = 'LEO';",
        answers: [{ accept: ['orbit'] }],
        hint: { en: 'Use dot notation with the property name.', es: 'Usa notación de punto con el nombre de la propiedad.' },
        explain: { en: "You can add new properties any time: sat.orbit = 'LEO'.", es: "Puedes agregar propiedades nuevas cuando quieras: sat.orbit = 'LEO'." }
      },
      {
        type: 'match',
        prompt: { en: 'Match each object piece with its name', es: 'Une cada pieza de un objeto con su nombre' },
        lang: 'js',
        pairs: [
          { chip: '1', a: { en: '{ }', es: '{ }' }, b: { en: 'an object literal', es: 'un objeto literal' } },
          { chip: '2', a: { en: 'key: value', es: 'key: value' }, b: { en: 'one property', es: 'una propiedad' } },
          { chip: '3', a: { en: 'obj.key', es: 'obj.key' }, b: { en: 'reads a property', es: 'lee una propiedad' } },
          { chip: '4', a: { en: 'obj.method()', es: 'obj.method()' }, b: { en: 'runs one of its functions', es: 'ejecuta una de sus funciones' } }
        ],
        hint: { en: 'Parentheses mean: run the function.', es: 'Los paréntesis significan: ejecuta la función.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the lines: make the alien, teach it to greet, then call it', es: 'Ordena las líneas: crea el alien, enséñale a saludar y llámalo' },
        lang: 'js',
        lines: ["const alien = { species: 'Zog' };", "alien.greet = function () { return 'Hi, ' + this.species; };", 'console.log(alien.greet());'],
        explain: { en: 'A method is just a property holding a function. Inside it, this is the alien itself.', es: 'Un método es solo una propiedad que guarda una función. Dentro de ella, this es el propio alien.' }
      },
      {
        type: 'arcade',
        prompt: { en: 'Meteor shower! Catch the right tokens about arrays and objects.', es: '¡Lluvia de meteoros! Atrapa los tokens correctos sobre arreglos y objetos.' },
        rounds: [
          { question: { en: 'Catch the method that adds an item to the end of an array', es: 'Atrapa el método que agrega un elemento al final de un arreglo' }, correct: 'push', wrongs: ['pop', 'shift', 'slice'], speed: 1 },
          { question: { en: 'Catch the first index of any array', es: 'Atrapa el primer índice de cualquier arreglo' }, correct: '0', wrongs: ['1', '-1', 'length'], speed: 0.9 },
          { question: { en: 'Catch the method that transforms every item', es: 'Atrapa el método que transforma cada elemento' }, correct: 'map', wrongs: ['filter', 'reduce', 'join'], speed: 1 },
          { question: { en: 'Catch the symbol that starts an object literal', es: 'Atrapa el símbolo que abre un objeto literal' }, correct: '{', wrongs: ['[', '(', '<'], speed: 0.8 },
          { question: { en: 'Catch the keyword for "this object" inside a method', es: 'Atrapa la palabra clave para "este objeto" dentro de un método' }, correct: 'this', wrongs: ['self', 'it', 'here'], speed: 1.1 },
          { question: { en: 'Catch the property that counts array items', es: 'Atrapa la propiedad que cuenta los elementos de un arreglo' }, correct: 'length', wrongs: ['size', 'count', 'total'], speed: 1.2 }
        ]
      },
      {
        type: 'bug',
        prompt: { en: 'Reading the name crashes the page. Click the broken line, then type the fix!', es: 'Leer el nombre rompe la página. ¡Haz clic en la línea rota y escribe la corrección!' },
        lang: 'js',
        lines: ['const player = { name: "Bo", score: 10 };', 'console.log(player["name"]);', 'console.log(player[name]);'],
        bugLine: 2,
        fix: { accept: ['console.log(player.name);', 'console.log(player["name"]);', "console.log(player['name']);"] },
        explain: { en: 'Without quotes, name is treated as a variable — and no variable called name exists here.', es: 'Sin comillas, name se trata como una variable, y aquí no existe ninguna variable llamada name.' }
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: '<b>Mission:</b> bring your ship to life! Give <code>ship</code> a method <code>launch</code> that returns <code>this.name + " blasts off!"</code>, refuel it to <code>100</code>, and log the launch message.', es: '<b>Misión:</b> ¡da vida a tu nave! Dale a <code>ship</code> un método <code>launch</code> que devuelva <code>this.name + " blasts off!"</code>, llénala a <code>100</code> de combustible y muestra el mensaje de lanzamiento en consola.' },
        start: "// Build your ship!\nconst ship = {\n  name: 'Star Hopper',\n  fuel: 50\n};\n\n// 1) Add a method launch to ship: it returns\n//    this.name + ' blasts off!'\n\n// 2) Refuel: set ship.fuel to 100\n\n// 3) Log the launch message\n",
        target: { en: 'ship.launch() returns "Star Hopper blasts off!" and fuel is 100', es: 'ship.launch() devuelve "Star Hopper blasts off!" y fuel es 100' },
        solution: "const ship = {\n  name: 'Star Hopper',\n  fuel: 50,\n  launch: function () {\n    return this.name + ' blasts off!';\n  }\n};\nship.fuel = 100;\nconsole.log(ship.launch());",
        checks: [
          { expr: 'typeof ship.launch', equals: 'function', label: { en: 'ship.launch is a function (a method)', es: 'ship.launch es una función (un método)' } },
          { expr: 'ship.launch()', equals: 'Star Hopper blasts off!', label: { en: 'launch() says "Star Hopper blasts off!"', es: 'launch() dice "Star Hopper blasts off!"' } },
          { expr: 'ship.fuel', equals: '100', label: { en: 'The tank is full: fuel is 100', es: 'El tanque está lleno: fuel es 100' } },
          { codeIncludes: 'this.name', label: { en: 'You used this.name inside the method', es: 'Usaste this.name dentro del método' } },
          { console: { includes: 'blasts off' }, label: { en: 'The console shows the launch message', es: 'La consola muestra el mensaje de lanzamiento' } },
          { noError: true, label: { en: 'No errors — smooth flight', es: 'Sin errores: vuelo suave' } }
        ],
        explain: { en: 'Inside a method, this points to the object it belongs to — so this.name is "Star Hopper".', es: 'Dentro de un método, this apunta al objeto al que pertenece, así que this.name es "Star Hopper".' }
      }
    ]
  },
  {
    id: 'js-13', track: 'js', num: 40, icon: '🔭', xp: 100,
    title: { en: 'Finding Elements', es: 'Encontrar elementos' },
    subtitle: { en: 'Select any DOM element with querySelector', es: 'Selecciona cualquier elemento del DOM con querySelector' },
    narration: {
      en: "Your JavaScript can now touch the page, Cadet! The document object model, or D O M, is the live map of every element on the page. With query selector you can find any element by its tag, its class, or its id, like a tractor beam locking onto a target. Find the right element first, and every power after that follows!",
      es: "¡Tu JavaScript ya puede tocar la página, Cadete! El modelo de objetos del documento, el D O M, es el mapa vivo de cada elemento de la página. Con query selector puedes encontrar cualquier elemento por su etiqueta, su clase o su id, como un rayo tractor que fija su objetivo. ¡Encuentra primero el elemento correcto y todos los demás poderes llegarán!"
    },
    outro: { en: "Tractor beam online! You can lock onto any element in the DOM. Target acquired!", es: "¡Rayo tractor en línea! Ya puedes fijar cualquier elemento del DOM. ¡Objetivo adquirido!" },
    explainer: 'js-13',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Which method finds the <b>first</b> matching element?', es: '¿Qué método encuentra el <b>primer</b> elemento que coincida?' },
        options: [
          { en: '<code>document.findAll(...)</code>', es: '<code>document.findAll(...)</code>' },
          { en: '<code>document.querySelectorAll(...)</code>', es: '<code>document.querySelectorAll(...)</code>' },
          { en: '<code>document.querySelector(...)</code>', es: '<code>document.querySelector(...)</code>' },
          { en: '<code>document.search(...)</code>', es: '<code>document.search(...)</code>' }
        ],
        answer: 2,
        explain: { en: 'querySelector returns the first match; querySelectorAll returns every match as a list.', es: 'querySelector devuelve la primera coincidencia; querySelectorAll devuelve todas en una lista.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each selector with what it grabs', es: 'Une cada selector con lo que atrapa' },
        lang: 'js',
        pairs: [
          { chip: '1', a: { en: "'#logo'", es: "'#logo'" }, b: { en: 'the element with id "logo"', es: 'el elemento con id "logo"' } },
          { chip: '2', a: { en: "'.card'", es: "'.card'" }, b: { en: 'all elements with class "card"', es: 'todos los elementos con clase "card"' } },
          { chip: '3', a: { en: "'li'", es: "'li'" }, b: { en: 'every list item on the page', es: 'todos los li de la página' } },
          { chip: '4', a: { en: "'ul li'", es: "'ul li'" }, b: { en: 'list items inside a ul', es: 'los li dentro de un ul' } }
        ],
        hint: { en: 'A dot selects classes, a hash selects ids.', es: 'El punto selecciona clases, el hash selecciona ids.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Find the button with class <code>go</code>', es: 'Encuentra el botón con clase <code>go</code>' },
        template: "const btn = document.___('.go');",
        answers: [{ accept: ['querySelector'] }],
        hint: { en: 'One method, camelCase: query + Selector.', es: 'Un método en camelCase: query + Selector.' },
        explain: { en: 'querySelector walks the DOM and hands you the first element that matches.', es: 'querySelector recorre el DOM y te entrega el primer elemento que coincide.' }
      },
      {
        type: 'bug',
        prompt: { en: 'One of these selections explodes. Click the broken line, then type the fix!', es: 'Una de estas selecciones explota. ¡Haz clic en la línea rota y escribe la corrección!' },
        lang: 'js',
        lines: ['const gear = document.querySelector("#gear");', 'const gear2 = document.querySelector(#gear);', 'console.log(gear2.textContent);'],
        bugLine: 1,
        fix: { accept: ['const gear2 = document.querySelector("#gear");', "const gear2 = document.querySelector('#gear');"] },
        explain: { en: 'A selector is a string — it always needs quotes around it.', es: 'Un selector es una cadena de texto: siempre necesita comillas.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'What does <code>querySelectorAll(".planet")</code> return?', es: '¿Qué devuelve <code>querySelectorAll(".planet")</code>?' },
        options: [
          { en: 'A list of ALL matching elements', es: 'Una lista con TODOS los elementos que coinciden' },
          { en: 'Only the first match', es: 'Solo la primera coincidencia' },
          { en: 'The text of the element', es: 'El texto del elemento' },
          { en: 'true or false', es: 'true o false' }
        ],
        answer: 0,
        explain: { en: 'querySelectorAll hands you every match as an array-like list you can loop over.', es: 'querySelectorAll te entrega todas las coincidencias en una lista tipo arreglo que puedes recorrer.' }
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: '<b>Mission:</b> scan the station! Select the <code>#banner</code> element into <code>heading</code>, all <code>.status</code> elements into <code>statuses</code>, and all <code>.planet</code> elements into <code>planets</code>. Then log the banner text and both lengths.', es: '<b>Misión:</b> ¡escanea la estación! Selecciona el elemento <code>#banner</code> en <code>heading</code>, todos los <code>.status</code> en <code>statuses</code> y todos los <code>.planet</code> en <code>planets</code>. Luego muestra en consola el texto del banner y ambas longitudes.' },
        fixture: '<h1 id="banner">Mission Control</h1>\n<p class="status">All systems go</p>\n<p class="status">Fuel at 80%</p>\n<ul>\n  <li class="planet">Mercury</li>\n  <li class="planet">Venus</li>\n  <li class="planet">Mars</li>\n</ul>',
        start: '// Mission: scan the station!\n// 1) Select the element with id "banner" into a const called heading\n\n// 2) Select ALL ".status" elements into a const called statuses\n\n// 3) Select ALL ".planet" elements into a const called planets\n\n// 4) Log heading.textContent, then statuses.length and planets.length\n',
        target: { en: 'heading = the h1; statuses.length = 2; planets.length = 3', es: 'heading = el h1; statuses.length = 2; planets.length = 3' },
        solution: "const heading = document.querySelector('#banner');\nconst statuses = document.querySelectorAll('.status');\nconst planets = document.querySelectorAll('.planet');\nconsole.log(heading.textContent);\nconsole.log(statuses.length);\nconsole.log(planets.length);",
        checks: [
          { dom: '#banner', count: 1, label: { en: 'The banner exists on the page', es: 'El banner existe en la página' } },
          { text: 'h1', includes: 'Mission Control', label: { en: 'The banner says "Mission Control"', es: 'El banner dice "Mission Control"' } },
          { expr: 'heading.textContent', equals: 'Mission Control', label: { en: 'heading grabbed the banner element', es: 'heading atrapó el elemento del banner' } },
          { expr: 'statuses.length', equals: '2', label: { en: 'statuses found both status lines', es: 'statuses encontró las dos líneas de estado' } },
          { expr: 'planets.length', equals: '3', label: { en: 'planets found all three planets', es: 'planets encontró los tres planetas' } },
          { console: { includes: 'Mission Control' }, label: { en: 'The console shows the banner text', es: 'La consola muestra el texto del banner' } },
          { codeIncludes: 'querySelector', label: { en: 'You used querySelector to scan', es: 'Usaste querySelector para escanear' } }
        ],
        explain: { en: 'querySelector for one, querySelectorAll for many — hash for ids, dot for classes.', es: 'querySelector para uno, querySelectorAll para muchos: hash para ids, punto para clases.' }
      }
    ]
  },
  {
    id: 'js-14', track: 'js', num: 41, icon: '🖌️', xp: 100,
    title: { en: 'Changing the Page', es: 'Cambiar la página' },
    subtitle: { en: 'textContent, style and classList in action', es: 'textContent, style y classList en acción' },
    narration: {
      en: "Finding elements is only half the mission, Cadet. Now we change them! Swap the text with text content, restyle any element through its style property, and toggle classes with class list to switch whole looks at once. With these powers your page stops being a poster and becomes a living dashboard. Let's remix the universe!",
      es: "Encontrar elementos es solo media misión, Cadete. ¡Ahora vamos a cambiarlos! Sustituye el texto con textContent, dale estilo a cualquier elemento con su propiedad style y alterna clases con classList para cambiar todo el aspecto de una vez. Con estos poderes tu página deja de ser un cartel y se convierte en un panel vivo. ¡A remezclar el universo!"
    },
    outro: { en: "The page bends to your will — text, styles and classes updated like magic. Masterful!", es: "¡La página obedece a tu voluntad! Texto, estilos y clases actualizados como por arte de magia. ¡Magistral!" },
    explainer: 'js-14',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Which line puts new text inside <code>msg</code>?', es: '¿Qué línea pone texto nuevo dentro de <code>msg</code>?' },
        options: [
          { en: '<code>msg.textContent = "Hi"</code>', es: '<code>msg.textContent = "Hi"</code>' },
          { en: '<code>msg.text("Hi")</code>', es: '<code>msg.text("Hi")</code>' },
          { en: '<code>msg.value = "Hi"</code>', es: '<code>msg.value = "Hi"</code>' },
          { en: '<code>text(msg, "Hi")</code>', es: '<code>text(msg, "Hi")</code>' }
        ],
        answer: 0,
        explain: { en: 'textContent is a property you assign to. value is for form inputs, not paragraphs.', es: 'textContent es una propiedad a la que asignas. value es para campos de formularios, no para párrafos.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Give the title some new text', es: 'Dale un texto nuevo al título' },
        template: "title.___ = 'Space Facts';",
        answers: [{ accept: ['textContent', 'innerText'] }],
        hint: { en: 'The property that holds the text inside an element.', es: 'La propiedad que guarda el texto dentro de un elemento.' },
        explain: { en: 'Assigning textContent replaces everything inside the element at once.', es: 'Asignar textContent reemplaza todo el contenido del elemento de una vez.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each mutation with what it changes', es: 'Une cada mutación con lo que cambia' },
        lang: 'js',
        pairs: [
          { chip: '1', a: { en: 'el.textContent = "Hi"', es: 'el.textContent = "Hi"' }, b: { en: 'replaces the text', es: 'reemplaza el texto' } },
          { chip: '2', a: { en: 'el.style.color = "red"', es: 'el.style.color = "red"' }, b: { en: 'sets an inline style', es: 'pone un estilo en línea' } },
          { chip: '3', a: { en: 'el.classList.add("hot")', es: 'el.classList.add("hot")' }, b: { en: 'adds a class', es: 'agrega una clase' } },
          { chip: '4', a: { en: 'el.classList.remove("hot")', es: 'el.classList.remove("hot")' }, b: { en: 'removes a class', es: 'quita una clase' } }
        ],
        hint: { en: 'classList manages the class attribute, one class at a time.', es: 'classList maneja el atributo class, una clase a la vez.' }
      },
      {
        type: 'bug',
        prompt: { en: 'This style change breaks the whole script. Click the broken line, then type the fix!', es: 'Este cambio de estilo rompe todo el script. ¡Haz clic en la línea rota y escribe la corrección!' },
        lang: 'js',
        lines: ['const card = document.querySelector(".card");', 'card.style.background-color = "blue";', 'card.style.fontSize = "18px";'],
        bugLine: 1,
        fix: { accept: ['card.style.backgroundColor = "blue";', "card.style.backgroundColor = 'blue';"] },
        explain: { en: 'CSS dashes become camelCase in JavaScript: background-color turns into backgroundColor.', es: 'Los guiones de CSS se vuelven camelCase en JavaScript: background-color pasa a ser backgroundColor.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the lines: find the lamp, light it up, mark it as lit', es: 'Ordena las líneas: encuentra la lámpara, enciéndela y márcala como encendida' },
        lang: 'js',
        lines: ["const lamp = document.querySelector('#lamp');", "lamp.textContent = 'On';", "lamp.classList.add('lit');"],
        explain: { en: 'Select first, then mutate — text and class can change in the same breath.', es: 'Primero selecciona, luego muta: el texto y la clase pueden cambiar al mismo tiempo.' }
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: '<b>Mission:</b> wake up the dashboard! Set <code>#msg</code> text to <code>Engines ready</code>, give <code>#box</code> a <code>tomato</code> background, add the class <code>active</code> to <code>#box</code>, and set <code>#alarm</code> text to <code>LAUNCH!</code>.', es: '<b>Misión:</b> ¡despierta el panel! Pon el texto de <code>#msg</code> en <code>Engines ready</code>, dale fondo <code>tomato</code> a <code>#box</code>, agrégale la clase <code>active</code> y pon el texto de <code>#alarm</code> en <code>LAUNCH!</code>.' },
        fixture: '<p id="msg">System idle</p>\n<div id="box" class="panel" style="padding:14px;border:2px solid #445;border-radius:10px;width:120px">Cargo</div>\n<h2 id="alarm" style="margin:.3em 0">standby</h2>',
        start: '// Mission: wake up the dashboard!\n// 1) Set the text of #msg to "Engines ready"\n\n// 2) Give #box a "tomato" background color\n\n// 3) Add the class "active" to #box\n\n// 4) Set the text of #alarm to "LAUNCH!"\n',
        target: { en: 'New text on #msg and #alarm, a tomato #box carrying the class active', es: 'Texto nuevo en #msg y #alarm, un #box tomate con la clase active' },
        solution: "const msg = document.querySelector('#msg');\nmsg.textContent = 'Engines ready';\nconst box = document.querySelector('#box');\nbox.style.backgroundColor = 'tomato';\nbox.classList.add('active');\nconst alarm = document.querySelector('#alarm');\nalarm.textContent = 'LAUNCH!';",
        checks: [
          { text: '#msg', includes: 'Engines ready', label: { en: '#msg now says "Engines ready"', es: '#msg ahora dice "Engines ready"' } },
          { style: '#box', prop: 'background-color', contains: 'rgb(255, 99, 71)', label: { en: '#box glows tomato', es: '#box brilla color tomate' } },
          { dom: '.active', count: 1, label: { en: '#box carries the class active', es: '#box lleva la clase active' } },
          { text: '#alarm', includes: 'LAUNCH!', label: { en: '#alarm shouts LAUNCH!', es: '#alarm grita LAUNCH!' } },
          { codeIncludes: 'classList.add', label: { en: 'You used classList.add', es: 'Usaste classList.add' } },
          { codeIncludes: 'textContent', label: { en: 'You used textContent', es: 'Usaste textContent' } },
          { noError: true, label: { en: 'No errors — smooth flight', es: 'Sin errores: vuelo suave' } }
        ],
        explain: { en: 'textContent changes words, style changes looks, classList switches whole outfits.', es: 'textContent cambia palabras, style cambia el aspecto y classList cambia el atuendo completo.' }
      }
    ]
  },
  {
    id: 'js-15', track: 'js', num: 42, icon: '🖱️', xp: 100,
    title: { en: 'Click Events', es: 'Eventos de clic' },
    subtitle: { en: 'React to the user with addEventListener', es: 'Reacciona al usuario con addEventListener' },
    narration: {
      en: "A page that never reacts is a silent ship, Cadet. Today we wire up events! You will write a handler function, then hand it to add event listener so it fires on every click. Click a button, launch a rocket, log a message — the page finally answers back. Put on your headset and listen for clicks!",
      es: "Una página que nunca reacciona es una nave en silencio, Cadete. ¡Hoy conectamos eventos! Escribirás una función manejadora y se la entregarás a addEventListener para que se dispare en cada clic. Tocas un botón, lanzas un cohete, escribes un mensaje: la página por fin responde. ¡Ponte los audífonos y ponte a escuchar clics!"
    },
    outro: { en: "Click received, loud and clear! Your pages now listen and respond. Event handler online!", es: "¡Clic recibido, alto y claro! Tus páginas ahora escuchan y responden. ¡Manejador de eventos en línea!" },
    explainer: 'js-15',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'What does <code>btn.addEventListener("click", fn)</code> do?', es: '¿Qué hace <code>btn.addEventListener("click", fn)</code>?' },
        options: [
          { en: 'Runs fn once, right now', es: 'Ejecuta fn una vez, ahora mismo' },
          { en: 'Calls fn every time btn is clicked', es: 'Llama a fn cada vez que hacen clic en btn' },
          { en: 'Creates a new button', es: 'Crea un botón nuevo' },
          { en: 'Blocks all clicks on the page', es: 'Bloquea todos los clics de la página' }
        ],
        answer: 1,
        explain: { en: 'The listener arms the handler: the browser calls fn on every click, forever after.', es: 'El listener arma el manejador: el navegador llama a fn en cada clic, para siempre.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each event word with its role', es: 'Une cada palabra de eventos con su rol' },
        lang: 'js',
        pairs: [
          { chip: '1', a: { en: 'addEventListener', es: 'addEventListener' }, b: { en: 'wires a function to an event', es: 'conecta una función a un evento' } },
          { chip: '2', a: { en: "'click'", es: "'click'" }, b: { en: 'the event: fires when the user presses', es: 'el evento: se dispara al presionar' } },
          { chip: '3', a: { en: 'handler', es: 'handler' }, b: { en: 'the function that runs', es: 'la función que se ejecuta' } },
          { chip: '4', a: { en: 'event object', es: 'objeto event' }, b: { en: 'carries details about what happened', es: 'trae detalles de lo que pasó' } }
        ],
        hint: { en: 'The handler is handed to addEventListener as the second argument.', es: 'El manejador se entrega a addEventListener como segundo argumento.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Wire the button so <code>blastOff</code> runs on click', es: 'Conecta el botón para que <code>blastOff</code> se ejecute al hacer clic' },
        template: "btn.___('click', blastOff);",
        answers: [{ accept: ['addEventListener'] }],
        hint: { en: 'The method that listens: add + Event + Listener.', es: 'El método que escucha: add + Event + Listener.' },
        explain: { en: 'addEventListener(event, handler) is the universal way to react to anything the user does.', es: 'addEventListener(evento, manejador) es la forma universal de reaccionar a lo que haga el usuario.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the lines: define the handler, find the bell, wire the click', es: 'Ordena las líneas: define el manejador, encuentra la campana, conecta el clic' },
        lang: 'js',
        lines: ["function ping() { console.log('ping!'); }", "const bell = document.querySelector('#bell');", "bell.addEventListener('click', ping);"],
        explain: { en: 'Define the handler, select the element, then connect them — that order always works.', es: 'Define el manejador, selecciona el elemento y conéctalos: ese orden siempre funciona.' }
      },
      {
        type: 'bug',
        prompt: { en: 'The button fires before anyone clicks it! Click the broken line, then type the fix.', es: '¡El botón se dispara antes de que nadie haga clic! Haz clic en la línea rota y escribe la corrección.' },
        lang: 'js',
        lines: ['function ping() { return "pong"; }', 'const bell = document.querySelector("#bell");', 'bell.addEventListener("click", ping());'],
        bugLine: 2,
        fix: { accept: ['bell.addEventListener("click", ping);', "bell.addEventListener('click', ping);"] },
        explain: { en: 'With parentheses, ping() runs immediately and passes its result. Pass the function itself — no parentheses.', es: 'Con paréntesis, ping() se ejecuta de inmediato y pasa su resultado. Pasa la función misma, sin paréntesis.' }
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: '<b>Mission:</b> arm the launch button! Write a function named <code>onLaunch</code> that sets the text of <code>#log</code> to <code>We have liftoff!</code>, then add a <code>click</code> listener on <code>#launchBtn</code> that calls it. Name the function exactly <code>onLaunch</code>.', es: '<b>Misión:</b> ¡arma el botón de lanzamiento! Escribe una función llamada <code>onLaunch</code> que ponga el texto de <code>#log</code> en <code>We have liftoff!</code> y agrega un listener de <code>click</code> en <code>#launchBtn</code> que la llame. Nombra la función exactamente <code>onLaunch</code>.' },
        fixture: '<button id="launchBtn" style="padding:10px 22px;font-size:1.1em;border-radius:12px">🚀 Launch</button>\n<p id="log">Waiting for orders…</p>',
        start: "// Mission: arm the launch button!\n// 1) Write a function named onLaunch that sets\n//    the text of #log to \"We have liftoff!\"\n\n// 2) Select #launchBtn and add a \"click\" listener\n//    that calls onLaunch\n",
        target: { en: 'Clicking #launchBtn turns #log into "We have liftoff!"', es: 'Hacer clic en #launchBtn convierte #log en "We have liftoff!"' },
        solution: "function onLaunch() {\n  document.querySelector('#log').textContent = 'We have liftoff!';\n}\nconst btn = document.querySelector('#launchBtn');\nbtn.addEventListener('click', onLaunch);",
        checks: [
          { expr: 'typeof onLaunch', equals: 'function', label: { en: 'onLaunch is a named function', es: 'onLaunch es una función con nombre' } },
          { codeIncludes: 'addEventListener', label: { en: 'You wired a listener with addEventListener', es: 'Conectaste un listener con addEventListener' } },
          { codeIncludes: 'click', label: { en: 'You listen for the click event', es: 'Escuchas el evento click' } },
          { expr: '(onLaunch(), document.querySelector("#log").textContent)', equals: 'We have liftoff!', label: { en: 'onLaunch updates the log text', es: 'onLaunch actualiza el texto del log' } },
          { dom: '#log', count: 1, label: { en: 'The log element is on the page', es: 'El elemento log está en la página' } },
          { noError: true, label: { en: 'No errors — smooth flight', es: 'Sin errores: vuelo suave' } }
        ],
        explain: { en: 'Handler first, listener second: now every click of the button calls onLaunch.', es: 'Primero el manejador, luego el listener: ahora cada clic del botón llama a onLaunch.' }
      }
    ]
  },
  {
    id: 'js-16', track: 'js', num: 43, icon: '🕹️', xp: 100,
    title: { en: 'Boss: Click Counter', es: 'Jefe: Contador de clics' },
    subtitle: { en: 'Boss battle: build a working counter app', es: 'Batalla de jefe: construye una app contador' },
    narration: {
      en: "Boss battle, Cadet! Everything you have learned comes together in one working mini app: a click counter. You will store a score in a variable, write handler functions that update it, and wire each button with an event listener so the screen changes on every click. Defeat the boss and the JavaScript galaxy is almost yours!",
      es: "¡Batalla contra el jefe, Cadete! Todo lo aprendido se une en una mini app funcional: un contador de clics. Guardarás el puntaje en una variable, escribirás funciones que lo actualizan y conectarás cada botón con un event listener para que la pantalla cambie con cada clic. ¡Vence al jefe y la galaxia de JavaScript casi será tuya!"
    },
    outro: { en: "Boss defeated! Your counter runs perfectly. You are becoming a true JavaScript engineer.", es: "¡Jefe derrotado! Tu contador funciona a la perfección. Te estás convirtiendo en un verdadero ingeniero de JavaScript." },
    explainer: 'js-16',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Why does the counter need a variable like <code>total</code>?', es: '¿Por qué el contador necesita una variable como <code>total</code>?' },
        options: [
          { en: 'To remember the score between clicks', es: 'Para recordar el puntaje entre clics' },
          { en: 'To make the buttons appear', es: 'Para que aparezcan los botones' },
          { en: 'To style the number', es: 'Para darle estilo al número' },
          { en: 'Because HTML requires it', es: 'Porque HTML lo exige' }
        ],
        answer: 0,
        explain: { en: 'The state lives in a variable; the screen only shows it. Clicks change the variable, then the display.', es: 'El estado vive en una variable; la pantalla solo lo muestra. Los clics cambian la variable y luego la pantalla.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Paint the new score onto the screen (it lives in <code>total</code>)', es: 'Pinta el puntaje nuevo en la pantalla (vive en <code>total</code>)' },
        template: 'screen.textContent = ___;',
        answers: [{ accept: ['total'] }],
        hint: { en: 'Assign the variable that holds the score.', es: 'Asigna la variable que guarda el puntaje.' },
        explain: { en: 'Read the state, change it, then write it back to the screen — every click.', es: 'Lee el estado, cámbialo y vuelve a escribirlo en la pantalla, en cada clic.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each piece of the counter app with its job', es: 'Une cada pieza de la app contador con su trabajo' },
        lang: 'js',
        pairs: [
          { chip: '1', a: { en: 'state', es: 'estado' }, b: { en: 'data remembered between clicks', es: 'datos que se recuerdan entre clics' } },
          { chip: '2', a: { en: 'listener', es: 'listener' }, b: { en: 'waits for the click', es: 'espera el clic' } },
          { chip: '3', a: { en: 'handler', es: 'handler' }, b: { en: 'updates the state', es: 'actualiza el estado' } },
          { chip: '4', a: { en: 'textContent', es: 'textContent' }, b: { en: 'paints the new value on screen', es: 'pinta el nuevo valor en pantalla' } }
        ],
        hint: { en: 'Click → listener → handler → state → screen.', es: 'Clic → listener → handler → estado → pantalla.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the lines of a tiny counter handler', es: 'Ordena las líneas de un contador mini' },
        lang: 'js',
        lines: ['let clicks = 0;', 'function bump() { clicks = clicks + 1; }', "const btn = document.querySelector('#bump');", "btn.addEventListener('click', bump);"],
        explain: { en: 'State first, then the handler that changes it, then the wiring. The full loop!', es: 'Primero el estado, luego el manejador que lo cambia, luego la conexión. ¡El ciclo completo!' }
      },
      {
        type: 'bug',
        prompt: { en: 'The score grows but the screen never moves. Click the broken line, then type the fix!', es: 'El puntaje crece pero la pantalla nunca cambia. ¡Haz clic en la línea rota y escribe la corrección!' },
        lang: 'js',
        lines: ['let clicks = 0;', 'const screen = document.querySelector("#screen");', 'function bump() {', '  clicks = clicks + 1;', '  screen.textcontent = clicks;', '}'],
        bugLine: 4,
        fix: { accept: ['screen.textContent = clicks;'] },
        explain: { en: 'Property names are case-sensitive: textcontent is a made-up property that does nothing.', es: 'Los nombres de propiedades distinguen mayúsculas: textcontent es una propiedad inventada que no hace nada.' }
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: '<b>BOSS MISSION:</b> build the Click Counter! Write three functions — <code>increase</code> adds 1 to <code>total</code>, <code>decrease</code> subtracts 1, <code>reset</code> sets it back to 0 — and each one updates the text of <code>#count</code>. Then wire <code>#plus</code>, <code>#minus</code> and <code>#reset</code> with <code>addEventListener</code>.', es: '<b>MISIÓN JEFE:</b> ¡construye el Contador de clics! Escribe tres funciones: <code>increase</code> suma 1 a <code>total</code>, <code>decrease</code> resta 1 y <code>reset</code> lo devuelve a 0; cada una actualiza el texto de <code>#count</code>. Luego conecta <code>#plus</code>, <code>#minus</code> y <code>#reset</code> con <code>addEventListener</code>.' },
        fixture: '<div style="text-align:center">\n  <p id="count" style="font-size:2.6em;font-family:monospace;margin:.2em">0</p>\n  <button id="plus">+1</button>\n  <button id="minus">-1</button>\n  <button id="reset">Reset</button>\n</div>',
        start: '// BOSS MISSION: the Click Counter!\n// The score lives in a variable (the state).\nlet total = 0;\nconst count = document.querySelector(\'#count\');\n\n// 1) Write increase(): adds 1 to total, then\n//    updates the text of #count\n\n// 2) Write decrease(): subtracts 1 and updates #count\n\n// 3) Write reset(): sets total back to 0 and updates #count\n\n// 4) Wire the buttons with addEventListener:\n//    #plus -> increase, #minus -> decrease, #reset -> reset\n',
        target: { en: 'Clicking +1, -1 and Reset changes the big number on screen', es: 'Pulsar +1, -1 y Reset cambia el número grande en pantalla' },
        solution: "let total = 0;\nconst count = document.querySelector('#count');\n\nfunction increase() {\n  total = total + 1;\n  count.textContent = total;\n}\nfunction decrease() {\n  total = total - 1;\n  count.textContent = total;\n}\nfunction reset() {\n  total = 0;\n  count.textContent = total;\n}\ndocument.querySelector('#plus').addEventListener('click', increase);\ndocument.querySelector('#minus').addEventListener('click', decrease);\ndocument.querySelector('#reset').addEventListener('click', reset);",
        checks: [
          { codeIncludes: 'addEventListener', label: { en: 'You wired the buttons with addEventListener', es: 'Conectaste los botones con addEventListener' } },
          { expr: 'typeof increase', equals: 'function', label: { en: 'increase is a function', es: 'increase es una función' } },
          { dom: '#count', count: 1, label: { en: 'The #count display is on the page', es: 'La pantalla #count está en la página' } },
          { expr: '(increase(), increase(), document.querySelector("#count").textContent)', equals: '2', label: { en: 'increase twice shows 2', es: 'dos increase muestran 2' } },
          { expr: '(increase(), reset(), document.querySelector("#count").textContent)', equals: '0', label: { en: 'reset brings it back to 0', es: 'reset lo devuelve a 0' } },
          { expr: '(decrease(), document.querySelector("#count").textContent)', equals: '-1', label: { en: 'decrease goes down to -1', es: 'decrease baja hasta -1' } },
          { noError: true, label: { en: 'No errors — boss defeated!', es: 'Sin errores: ¡jefe derrotado!' } }
        ],
        explain: { en: 'State, handlers, wiring — that triangle is the heart of every interactive app you will ever build.', es: 'Estado, manejadores y conexión: ese triángulo es el corazón de toda app interactiva que construirás.' }
      }
    ]
  },
  {
    id: 'js-17', track: 'js', num: 44, icon: '✨', xp: 100,
    title: { en: 'Modern JS Tricks', es: 'Trucos de JS moderno' },
    subtitle: { en: 'Destructuring, spread, template literals, optional chaining', es: 'Destructuring, spread, template literals, optional chaining' },
    narration: {
      en: "Modern JavaScript has shortcut magic, Cadet! Destructuring unpacks objects in one line. The spread operator copies and expands arrays with three little dots. Template literals let text and variables flow together inside backticks. And optional chaining asks for a property safely, even when it might not exist. Write less, do more — the future is now!",
      es: "¡El JavaScript moderno tiene magia de atajos, Cadete! El destructuring desempaca objetos en una sola línea. El operador spread copia y expande arreglos con tres puntitos. Los template literals mezclan texto y variables entre acentos graves. Y el optional chaining pide una propiedad de forma segura, aunque no exista. ¡Escribe menos y haz más: el futuro es ahora!"
    },
    outro: { en: "Modern tricks mastered! Destructuring, spread, template literals and optional chaining. Your code just leveled up.", es: "¡Trucos modernos dominados! Destructuring, spread, template literals y optional chaining. Tu código acaba de subir de nivel." },
    explainer: 'js-17',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'Which one is a <b>template literal</b>?', es: '¿Cuál es un <b>template literal</b>?' },
        options: [
          { en: '<code>"Hi " + name</code>', es: '<code>"Hi " + name</code>' },
          { en: '<code>`Hi ${name}`</code>', es: '<code>`Hi ${name}`</code>' },
          { en: "<code>'Hi ' + name</code>", es: "<code>'Hi ' + name</code>" },
          { en: '<code>Hi {name}</code>', es: '<code>Hi {name}</code>' }
        ],
        answer: 1,
        explain: { en: 'Template literals live between backticks and drop values into ${} slots.', es: 'Los template literals viven entre acentos graves y sueltan valores en huecos ${}.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Finish the template literal so it uses the <code>speed</code> variable', es: 'Termina el template literal para que use la variable <code>speed</code>' },
        template: 'const msg = `Speed: ${___} km/s`;',
        answers: [{ accept: ['speed'] }],
        hint: { en: 'The ${} slot wants a variable name.', es: 'El hueco ${} quiere un nombre de variable.' },
        explain: { en: 'Anything inside ${} is real JavaScript — variables, math, even function calls.', es: 'Todo lo que va dentro de ${} es JavaScript de verdad: variables, cuentas, hasta llamadas a funciones.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each modern trick with what it does', es: 'Une cada truco moderno con lo que hace' },
        lang: 'js',
        pairs: [
          { chip: '1', a: { en: 'const { a } = obj', es: 'const { a } = obj' }, b: { en: 'destructuring — pulls properties into variables', es: 'destructuring: saca propiedades a variables' } },
          { chip: '2', a: { en: '[...arr]', es: '[...arr]' }, b: { en: 'spread — expands or copies a list', es: 'spread: expande o copia una lista' } },
          { chip: '3', a: { en: '`Hi ${n}`', es: '`Hi ${n}`' }, b: { en: 'template literal — text with ${} slots', es: 'template literal: texto con huecos ${}' } },
          { chip: '4', a: { en: 'obj?.prop', es: 'obj?.prop' }, b: { en: 'optional chaining — safe access, no crash', es: 'optional chaining: acceso seguro, sin error' } }
        ],
        hint: { en: 'Three dots spread; question mark protects.', es: 'Tres puntos expanden; el signo de interrogación protege.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the lines: a spread-friendly sum, then use it, then log it', es: 'Ordena las líneas: una suma amiga del spread, úsala y muéstrala' },
        lang: 'js',
        lines: ['function sum(...values) { return values.reduce((a, b) => a + b, 0); }', 'const total = sum(1, 2, 3);', 'console.log(total);'],
        explain: { en: 'Rest (...values) gathers arguments into an array; spread (...nums) does the opposite at the call site.', es: 'El rest (...values) junta argumentos en un arreglo; el spread (...nums) hace lo contrario al llamar.' }
      },
      {
        type: 'arcade',
        prompt: { en: 'Meteor shower, modern edition! Catch the ES6 tokens.', es: '¡Lluvia de meteoros, edición moderna! Atrapa los tokens de ES6.' },
        rounds: [
          { question: { en: 'Catch the operator that spreads an array', es: 'Atrapa el operador que expande un arreglo' }, correct: '...', wrongs: ['..', '.', '++'], speed: 1 },
          { question: { en: 'Catch the quote that starts a template literal', es: 'Atrapa la comilla que abre un template literal' }, correct: '`', wrongs: ["'", '"', '/'], speed: 0.8 },
          { question: { en: 'Catch the symbol for safe optional access', es: 'Atrapa el símbolo del acceso opcional seguro' }, correct: '?.', wrongs: ['!', '::', '->'], speed: 0.9 },
          { question: { en: 'Catch the brackets that destructure an object', es: 'Atrapa los corchetes que hacen destructuring de un objeto' }, correct: '{ }', wrongs: ['[ ]', '( )', '< >'], speed: 1 },
          { question: { en: 'Catch the arrow used in modern functions', es: 'Atrapa la flecha de las funciones modernas' }, correct: '=>', wrongs: ['->', '>=', '<='], speed: 1.1 },
          { question: { en: 'Catch the modern keyword for a reassignable variable', es: 'Atrapa la palabra clave moderna para una variable reasignable' }, correct: 'let', wrongs: ['var', 'def', 'int'], speed: 1.2 }
        ]
      },
      {
        type: 'bug',
        prompt: { en: '<code>b</code> should be a copy of <code>a</code> with 3 items — it is not. Click the broken line, then type the fix!', es: '<code>b</code> debería ser una copia de <code>a</code> con 3 elementos, y no lo es. ¡Haz clic en la línea rota y escribe la corrección!' },
        lang: 'js',
        lines: ['const a = [1, 2, 3];', 'const b = [a];', 'console.log(b.length);'],
        bugLine: 1,
        fix: { accept: ['const b = [...a];'] },
        explain: { en: '[a] nests the whole array inside another. Spread copies the items out: [...a].', es: '[a] mete el arreglo completo dentro de otro. El spread copia los elementos afuera: [...a].' }
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: '<b>Mission:</b> fly modern! Destructure <code>astronaut.name</code> into a const called <code>pilot</code>. Write <code>sum</code> so that <code>sum(...nums)</code> adds every number. Build <code>greeting</code> as <code>Pilot Mae ready</code> with a template literal. Read <code>astronaut.rank?.level</code> into <code>level</code>.', es: '<b>Misión:</b> ¡vuela moderno! Haz destructuring de <code>astronaut.name</code> en una const llamada <code>pilot</code>. Escribe <code>sum</code> para que <code>sum(...nums)</code> sume todos los números. Construye <code>greeting</code> como <code>Pilot Mae ready</code> con un template literal. Lee <code>astronaut.rank?.level</code> en <code>level</code>.' },
        start: "const astronaut = { name: 'Mae', suit: { color: 'white' } };\nconst nums = [1, 2, 3];\n\n// 1) Destructure astronaut.name into a const called pilot\n\n// 2) Write sum: a normal function that adds every\n//    number it receives\n\n// 3) Make greeting = \"Pilot Mae ready\" using a\n//    template literal (backticks) and pilot\n\n// 4) Read astronaut.rank?.level into a const called level\n",
        target: { en: 'pilot is "Mae", sum(...nums) is 6, greeting is "Pilot Mae ready", level is undefined', es: 'pilot es "Mae", sum(...nums) es 6, greeting es "Pilot Mae ready", level es undefined' },
        solution: "const astronaut = { name: 'Mae', suit: { color: 'white' } };\nconst nums = [1, 2, 3];\n\nconst { name: pilot } = astronaut;\n\nfunction sum(...values) {\n  return values.reduce((a, b) => a + b, 0);\n}\n\nconst greeting = `Pilot ${pilot} ready`;\n\nconst level = astronaut.rank?.level;\nconsole.log(greeting, sum(...nums), level);",
        checks: [
          { expr: 'pilot', equals: 'Mae', label: { en: 'pilot holds "Mae" thanks to destructuring', es: 'pilot guarda "Mae" gracias al destructuring' } },
          { expr: 'sum(...nums)', equals: '6', label: { en: 'sum(...nums) spreads and adds up to 6', es: 'sum(...nums) expande y suma 6' } },
          { expr: 'greeting', equals: 'Pilot Mae ready', label: { en: 'greeting reads "Pilot Mae ready"', es: 'greeting dice "Pilot Mae ready"' } },
          { expr: 'level', equals: 'undefined', label: { en: 'level is undefined — no crash, optional chaining worked', es: 'level es undefined: sin error, el optional chaining funcionó' } },
          { codeIncludes: '...', label: { en: 'You used the spread dots', es: 'Usaste los puntos del spread' } },
          { codeIncludes: '`', label: { en: 'You used backticks for the template literal', es: 'Usaste acentos graves para el template literal' } },
          { noError: true, label: { en: 'No errors — smooth flight', es: 'Sin errores: vuelo suave' } }
        ],
        explain: { en: 'Destructure, spread, template, chain — four shortcuts that make modern code short and safe.', es: 'Destructuring, spread, template y chaining: cuatro atajos que hacen el código moderno corto y seguro.' }
      }
    ]
  },
  {
    id: 'js-18', track: 'js', num: 45, icon: '📡', xp: 100,
    title: { en: 'Async Signals', es: 'Señales asíncronas' },
    subtitle: { en: 'Promises and async/await — data from deep space', es: 'Promesas y async/await: datos del espacio profundo' },
    narration: {
      en: "One last signal, Cadet: the universe is asynchronous! Data from space takes time, and a good pilot never freezes while waiting. Promises are containers for values that arrive later. With async and await your code pauses politely until the data lands, then keeps flying. Master timing itself, and the whole galaxy responds on your schedule!",
      es: "Una última señal, Cadete: ¡el universo es asíncrono! Los datos del espacio tardan en llegar, y un buen piloto nunca se congela mientras espera. Las promesas son contenedores de valores que llegarán después. Con async y await tu código espera con educación hasta que llegan los datos, y luego sigue volando. ¡Domina el tiempo y toda la galaxia responderá a tu ritmo!"
    },
    outro: { en: "Signal received from the future! Promises, async and await are yours. The JavaScript galaxy is complete, Cadet!", es: "¡Señal recibida del futuro! Promesas, async y await son tuyos. ¡La galaxia de JavaScript está completa, Cadete!" },
    explainer: 'js-18',
    exercises: [
      {
        type: 'mcq',
        prompt: { en: 'What is a <b>Promise</b>?', es: '¿Qué es una <b>Promise</b> (promesa)?' },
        options: [
          { en: 'A container for a value that arrives later', es: 'Un contenedor para un valor que llega más tarde' },
          { en: 'A function that runs instantly', es: 'Una función que se ejecuta al instante' },
          { en: 'A special kind of loop', es: 'Un tipo especial de bucle' },
          { en: 'An error message', es: 'Un mensaje de error' }
        ],
        answer: 0,
        explain: { en: 'A Promise is an IOU: JavaScript keeps flying and the value lands when it lands.', es: 'Una Promise es un pagaré: JavaScript sigue volando y el valor llega cuando llega.' }
      },
      {
        type: 'match',
        prompt: { en: 'Match each async tool with its job', es: 'Une cada herramienta asíncrona con su trabajo' },
        lang: 'js',
        pairs: [
          { chip: '1', a: { en: 'Promise', es: 'Promise' }, b: { en: 'a container for a future value', es: 'un contenedor de un valor futuro' } },
          { chip: '2', a: { en: '.then(fn)', es: '.then(fn)' }, b: { en: 'runs when the value arrives', es: 'se ejecuta cuando llega el valor' } },
          { chip: '3', a: { en: 'async function', es: 'función async' }, b: { en: 'a function allowed to await', es: 'una función que puede usar await' } },
          { chip: '4', a: { en: 'await', es: 'await' }, b: { en: 'pause here until the promise resolves', es: 'pausa aquí hasta que la promesa se resuelva' } }
        ],
        hint: { en: 'await only works inside async functions.', es: 'await solo funciona dentro de funciones async.' }
      },
      {
        type: 'fill',
        prompt: { en: 'Wait for the data properly before using it', es: 'Espera bien los datos antes de usarlos' },
        template: 'const data = ___ fetchPhoto();',
        answers: [{ accept: ['await'] }],
        hint: { en: 'The keyword that pauses until the promise resolves.', es: 'La palabra clave que pausa hasta que la promesa se resuelve.' },
        explain: { en: 'Without await you would hold the Promise box, not the value inside it.', es: 'Sin await tendrías la caja de la Promise, no el valor que hay dentro.' }
      },
      {
        type: 'order',
        prompt: { en: 'Order the lines: an async loader, defined then called', es: 'Ordena las líneas: un cargador async, definido y luego llamado' },
        lang: 'js',
        lines: ['async function load() {', '  const data = await fetchData();', '  console.log(data);', '}', 'load();'],
        explain: { en: 'async opens the function, await pauses inside it, and the call at the end starts the flight.', es: 'async abre la función, await pausa dentro de ella y la llamada del final inicia el vuelo.' }
      },
      {
        type: 'mcq',
        prompt: { en: 'What does calling an <code>async</code> function always return?', es: '¿Qué devuelve siempre una función <code>async</code> al llamarla?' },
        options: [
          { en: '<code>undefined</code>', es: '<code>undefined</code>' },
          { en: 'A <b>Promise</b>', es: 'Una <b>Promise</b>' },
          { en: 'The final value', es: 'El valor final' },
          { en: 'A callback', es: 'Un callback' }
        ],
        answer: 1,
        explain: { en: 'Async functions wrap their result in a Promise — the value arrives as soon as the awaits finish.', es: 'Las funciones async envuelven su resultado en una Promise: el valor llega en cuanto terminan los await.' }
      },
      {
        type: 'bug',
        prompt: { en: 'The console shows a Promise instead of the signal. Click the broken line, then type the fix!', es: 'La consola muestra una Promise en vez de la señal. ¡Haz clic en la línea rota y escribe la corrección!' },
        lang: 'js',
        lines: ['async function scan() {', '  const result = Promise.resolve("signal");', '  return result;', '}', 'scan().then(v => console.log(v));'],
        bugLine: 1,
        fix: { accept: ['const result = await Promise.resolve("signal");', "const result = await Promise.resolve('signal');"] },
        explain: { en: 'Without await, result holds the Promise box. Add await to unwrap the value inside.', es: 'Sin await, result guarda la caja de la Promise. Agrega await para desenvolver el valor.' }
      },
      {
        type: 'sandbox',
        lang: 'js',
        prompt: { en: '<b>Mission:</b> catch the deep-space signal! <code>fetchPhoto</code> returns <code>Promise.resolve("nebula.jpg")</code>. Write an <code>async</code> function named <code>showPhoto</code> that <code>await</code>s <code>fetchPhoto()</code> and logs the photo, then call it. No timers needed — promises resolve instantly.', es: '<b>Misión:</b> ¡capta la señal del espacio profundo! <code>fetchPhoto</code> devuelve <code>Promise.resolve("nebula.jpg")</code>. Escribe una función <code>async</code> llamada <code>showPhoto</code> que haga <code>await</code> de <code>fetchPhoto()</code> y muestre la foto en consola, luego llámala. Sin timers: las promesas se resuelven al instante.' },
        start: "// Deep-space download — resolves instantly\nconst fetchPhoto = () => Promise.resolve('nebula.jpg');\n\n// 1) Write an async function named showPhoto that\n//    awaits fetchPhoto() and console.logs the photo\n\n// 2) Call showPhoto() to start the download\n",
        target: { en: 'The console prints nebula.jpg after the await resolves', es: 'La consola imprime nebula.jpg después de que el await se resuelve' },
        solution: "const fetchPhoto = () => Promise.resolve('nebula.jpg');\n\nasync function showPhoto() {\n  const photo = await fetchPhoto();\n  console.log(photo);\n}\nshowPhoto();",
        checks: [
          { codeIncludes: 'async', label: { en: 'You marked the function async', es: 'Marcaste la función como async' } },
          { codeIncludes: 'await', label: { en: 'You awaited the fetch', es: 'Esperaste la descarga con await' } },
          { expr: 'typeof showPhoto', equals: 'function', label: { en: 'showPhoto is a function', es: 'showPhoto es una función' } },
          { expr: 'showPhoto() instanceof Promise', equals: 'true', label: { en: 'Calling it returns a Promise', es: 'Llamarla devuelve una Promise' } },
          { console: { includes: 'nebula.jpg' }, label: { en: 'The console shows nebula.jpg after the await', es: 'La consola muestra nebula.jpg después del await' } },
          { noError: true, label: { en: 'No errors — smooth flight', es: 'Sin errores: vuelo suave' } }
        ],
        explain: { en: 'await inside async is how modern JavaScript waits — no timers, no callbacks chaos.', es: 'await dentro de async es como espera el JavaScript moderno: sin timers ni caos de callbacks.' }
      }
    ]
  }
];
