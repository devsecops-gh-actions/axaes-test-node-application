// Ejemplo mínimo: función pura con test. Sustituir por el código del producto.
export function greet(name) {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new TypeError('name debe ser una cadena no vacía');
  }
  return `Hola, ${name.trim()}!`;
}
