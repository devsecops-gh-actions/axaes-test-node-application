// Ejemplo mínimo: funciones puras con tests. Sustituir por el código del producto.
function nombreValido(name) {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new TypeError('name debe ser una cadena no vacía');
  }
  return name.trim();
}

export function greet(name) {
  return `Hola, ${nombreValido(name)}!`;
}

export function farewell(name) {
  return `Adiós, ${nombreValido(name)}!`;
}
