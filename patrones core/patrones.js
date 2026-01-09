// Singleton
const Singleton = (function () {
    let instance;

    function createInstance() {
        const object = new Object("I am the instance");
        return object;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

// Uso del singleton
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log("Same instance? " + (instance1 === instance2)); // true 

//Patron modulo
const Module = (function () {
    let privateVariable = "I am private";

    function privateMethod() {
        console.log(privateVariable);
    }

    return {
        publicMethod: function () {
            privateMethod();
        }
    };
})();

// Uso del modulo
Module.publicMethod(); // "I am private"

//Patron de agregacion
const result = {};
for (const item of data) {
  if (!item || item.key == null) continue;
  result[item.key] = (result[item.key] || 0) + item.value;
}
const data = [
  { key: 'a', value: 2 },
  { key: 'b', value: 3 },
  { key: 'a', value: 4 }
];
// ...código de agregación...
console.log(result);// Resultado: { a: 6, b: 3 }

// Patron de deduplicacion
function deduplicateArray(arr) {
    return [...new Set(arr)];
}

const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = deduplicateArray(numbers);
console.log(uniqueNumbers); // [1, 2, 3, 4, 5]

//Transformacion de datos
const out = {};
for (const { id, value } of input) {
  out[id] = value;
}
