const assert = require("assert");
const { isPrime } = require("./index");

// 1. Casos que DEBEN retornar true (Números primos)
assert.strictEqual(isPrime(2), true, "El 2 debería ser primo");
assert.strictEqual(isPrime(3), true, "El 3 debería ser primo");
assert.strictEqual(isPrime(7), true, "El 7 debería ser primo");
assert.strictEqual(isPrime(13), true, "El 13 debería ser primo");

// 2. Casos que DEBEN retornar false (Números no primos y compuestos)
assert.strictEqual(isPrime(1), false, "El 1 NO es primo");
assert.strictEqual(isPrime(4), false, "El 4 NO es primo");
assert.strictEqual(isPrime(9), false, "El 9 NO es primo");
assert.strictEqual(isPrime(0), false, "El 0 NO es primo");
assert.strictEqual(isPrime(-5), false, "Los números negativos NO son primos");

console.log("¡Todas las pruebas pasaron con éxito!");