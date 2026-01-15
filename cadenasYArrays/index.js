/*
───────────────────────────────
 Problema 1 — String (Muy común)
───────────────────────────────
Enunciado:
  Dada una cadena s, devuelve el primer carácter que NO se repite.
  Si no existe, devuelve null.

Ejemplos:
  firstUniqueChar("stress")   // → 't'
  firstUniqueChar("aabbcc")   // → null
  firstUniqueChar("")         // → null

Requisitos:
  - O(N) tiempo
  - Manejar Unicode correctamente (explica cómo)
  - Código claro y defensivo
*/

function firstUniqueChar(s) {
  if (!s) return null;

  const count = new Map();

  // Usar for...of para manejar Unicode correctamente
  for (const ch of s) {
    count.set(ch, (count.get(ch) || 0) + 1);
  }

  for (const ch of s) {
    if (count.get(ch) === 1) {
      return ch;
    }
  }

  return null;
}
/*
───────────────────────────────
 Explicación de la solución
───────────────────────────────
Primero cuento la frecuencia de cada carácter usando un Map.
Luego hago una segunda pasada para devolver el primero con frecuencia uno.
Uso for…of para manejar correctamente Unicode.
El algoritmo es O(N) en tiempo y espacio.
*/
console.log(firstUniqueChar("stress"));   // → 't'
console.log(firstUniqueChar("aabbcc"));   // → null
firstUniqueChar("")         // → null

/*
───────────────────────────────
 Problema 2 — Array + Enteros
───────────────────────────────
Enunciado:
  Dado un array de enteros A, devuelve el menor entero positivo (> 0) que NO aparece en el array.

Requisitos:
  - O(N) tiempo
  - O(N) o mejor espacio
  - Manejar duplicados
  - Input grande
*/

function solution(A) {
  const seen = new Set();

  for (const num of A) {
    if (num > 0) {
      seen.add(num);
    }
  }

  for (let i = 1; i <= A.length + 1; i++) {
    if (!seen.has(i)) {
      return i;
    }
  }
}

console.log(solution([1, 3, 6, 4, 1, 2])); // → 5
solution([1, 2, 3])        // → 4
solution([-1, -3])         // → 1
console.log(solution([1,2,15,4,6]));

/*
───────────────────────────────
 Problema 3 — Array + Razonamiento
───────────────────────────────
Enunciado:
  Dado un array de strings, agrupa los anagramas.

Requisitos:
  - Explicar la clave de agrupación
  - Analizar complejidad
  - Considerar strings largos
*/
function groupAnagrams(words) {
  const map = new Map();

  for (const word of words) {
    // Array de 26 posiciones para letras a–z
    const counts = new Array(26).fill(0);

    for (const ch of word) {
      const index = ch.charCodeAt(0) - 97;
      counts[index]++;
    }

    // Convertimos el conteo en una clave única
    const key = counts.join('#');

    if (!map.has(key)) {
      map.set(key, []);
    }

    map.get(key).push(word);
  }

  return Array.from(map.values());
}

// Ejemplo
console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));

/*
───────────────────────────────
 Salida esperada
───────────────────────────────
[
  ["eat","tea","ate"],
  ["tan","nat"],
  ["bat"]
]
*/

/*
 Ventana deslizante
 Encuentra la suma máxima de cualquier subarray de tamaño k en un array de números enteros positivos dado.
 */
// Recibimos un array y un número k que será el tamaño de la ventana
function maxSumSubarray(array, k) {
  // Esto funcionará sólo si los números son enteros positivos
  // Si puedes tener números negativos, entonces puedes usar:
  // let maxSum = -Infinity
  // para garantizar que siempre se actualice el valor al inicio
  let maxSum = 0
  let windowSum = 0

  // Inicializamos la ventana iterando sobre los primeros k elementos
  for (let i = 0; i < k; i++) {
    windowSum += array[i]
  }
  maxSum = windowSum

  // Movemos la ventana con otro ciclo,
  // empezando desde el índice k hasta el final del array
  for (let i = k; i < array.length; i++) {
    const currentValue = array[i]
    const previousValue = array[i - k]
    // Actualizamos la suma de la ventana
    windowSum += currentValue - previousValue
    // Asignamos cualquiera de los dos valores que sea mayor
    maxSum = Math.max(maxSum, windowSum)
  }

  return maxSum
}

const array = [2, 3, 5, 1, 6]
const k = 3

console.log(maxSumSubarray(array, k)) // 12