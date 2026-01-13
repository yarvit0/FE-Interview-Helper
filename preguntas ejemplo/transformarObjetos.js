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

/*"Estoy usando una sola pasada sobre los datos, por lo que la complejidad temporal es O(N).
Trato el objeto de salida como un hash map para acceso en tiempo constante.
También omito de forma defensiva los registros mal formados para evitar errores en tiempo de ejecución.
Este enfoque escala linealmente y evita asignaciones innecesarias."*/