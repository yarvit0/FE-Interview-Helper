const tasks = [
  () => fetchData(1),
  () => fetchData(2),
  () => fetchData(3),
  () => fetchData(4)
];
/*
Implementa:
  runWithLimit(tasks, limit)
Requisitos:
  *Como máximo, 'limit' tareas se ejecutan concurrentemente
  *Preservar el orden de los resultados
  *Fallar rápido O recolectar errores (explica tu elección)
*/

async function runWithLimit(tasks, limit) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < tasks.length) {
      const current = index++;
      results[current] = await tasks[current]();
    }
  }

  const workers = Array(limit).fill(0).map(worker);
  await Promise.all(workers);

  return results;
}
/**
 * Límite de concurrencia significa:
   "Como máximo, 'limit' promesas se están ejecutando al mismo tiempo.
   Cuando una termina, se inicia la siguiente."
   Esto requiere:
   Un índice compartido
   Un bucle de trabajadores
   Programación controlada
   "Uso un índice compartido para coordinar los trabajadores.
   Cada trabajador toma la siguiente tarea, la ejecuta y almacena el resultado en el índice correcto.
   Esto garantiza que nunca excedemos el límite de concurrencia y se preserva el orden."
 */

runWithLimit(tasks, 2);