// ────────────────
// INTRODUCCIÓN
// ────────────────

/*
Problema:
Se te dan funciones asíncronas, no promesas directamente.
*/

function task(id, delay) {
  return () =>
    new Promise(resolve =>
      setTimeout(() => {
            console.log("taskId"+id);
            resolve(id);
        }
        , delay)
    );
}

const tasks2 = [
  task(1, 300),
  task(2, 200),
  task(3, 100),
  task(4, 50)
];

/*
───────────────────────────────
 Ejecución Secuencial
───────────────────────────────
👉 Ejecuta todas las tareas una tras otra (sin solaparse)

Comportamiento esperado:
  - Termina la tarea 1
  - Luego la tarea 2
  - Luego la tarea 3
  - Luego la tarea 4
*/

async function  secuencialTasks(tasks){
  const results = [];
    for (let i = 0; i < tasks.length; i++) {
        results[i] = await tasks[i]();
    }
    return results;
}
secuencialTasks(tasks2);

/*
──────────────────────────────────────────────
 Ejecuta como máximo 2 tareas al mismo tiempo
──────────────────────────────────────────────

Comportamiento esperado:
  - Las tareas empiezan en orden
  - Solo hay 2 tareas ejecutándose en paralelo
  - Se conserva el orden de los resultados
*/

async function runWithConcurrency(tasks, limit) {
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

// ────────────────
// PROBLEMA 1
// ────────────────

/*
// Ejemplo de tareas:
// const tasks = [
//   () => fetchData(1),
//   () => fetchData(2),
//   () => fetchData(3),
//   () => fetchData(4)
// ];

───────────────────────────────
 Implementa:
   runWithLimit(tasks, limit)
───────────────────────────────
Requisitos:
  * Como máximo, 'limit' tareas se ejecutan concurrentemente
  * Preservar el orden de los resultados
  * Fallar rápido O recolectar errores (explica tu elección)
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
──────────────────────────────────────────────
 Límite de concurrencia significa:
──────────────────────────────────────────────
  - Como máximo, 'limit' promesas se están ejecutando al mismo tiempo.
  - Cuando una termina, se inicia la siguiente.

Esto requiere:
  - Un índice compartido
  - Un bucle de trabajadores
  - Programación controlada

"Uso un índice compartido para coordinar los trabajadores.
Cada trabajador toma la siguiente tarea, la ejecuta y almacena el resultado en el índice correcto.
Esto garantiza que nunca excedemos el límite de concurrencia y se preserva el orden."
*/

//runWithLimit(tasks, 2);