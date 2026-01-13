// PREGUNTA 1
const Data =[
  { userId: 'u1', category: 'food', amount: 20 },
  { userId: 'u2', category: 'travel', amount: 100 },
  { userId: 'u1', category: 'food', amount: 30 },
  { userId: 'u1', category: 'travel', amount: 50 },
  { userId: 'u2', category: 'food', amount: 10 }
]

//Write a function that returns total amount spent per user per category

function userTotalSpent(data) {
  const result = {};

  for (const entry of data) {
    if (
      !entry ||
      entry.userId == null ||
      entry.category == null ||
      typeof entry.amount !== 'number'
    ) {
      continue;
    }

    const { userId, category, amount } = entry;

    if (!result[userId]) {
      result[userId] = {};
    }

    result[userId][category] =
      (result[userId][category] || 0) + amount;
  }

  return result;
}

console.log(userTotalSpent(Data));

/*"Estoy usando una sola pasada sobre los datos, así que la complejidad temporal es O(N).
Trato el objeto de salida como un mapa hash para acceso en tiempo constante.
También omito de forma defensiva los registros mal formados para evitar errores en tiempo de ejecución.
Este enfoque escala linealmente y evita asignaciones innecesarias."*/

//PREGUNTA 2
//Explain the output:

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}

//Fix it without changing var
//Explain how this impacts real apps
for (var i = 0; i < 3; i++) {
  (function (x) {
    setTimeout(() => console.log(x), 0);
  })(i);
}
/* 
  *¿Por qué?:
var tiene alcance de función, no de bloque
Hay una sola variable i compartida
Cuando se ejecutan los callbacks de setTimeout, el bucle ya ha terminado
i === 3 cuando se ejecutan los callbacks

  *Event Loop:
"El bucle se ejecuta de forma síncrona y programa tres callbacks de temporizador.
Una vez que la pila de llamadas está vacía, el event loop ejecuta los callbacks encolados, todos los cuales hacen referencia al mismo valor de i."*/