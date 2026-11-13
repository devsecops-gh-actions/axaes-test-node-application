import assert from 'node:assert/strict';
import { test } from 'node:test';
import { farewell, greet } from '../src/index.mjs';

test('greet saluda al nombre recortado', () => {
  assert.equal(greet('  Ana '), 'Hola, Ana!');
});

test('greet rechaza un nombre vacío', () => {
  assert.throws(() => greet('   '), TypeError);
});

test('farewell despide al nombre recortado', () => {
  assert.equal(farewell('  Ana '), 'Adiós, Ana!');
});

test('farewell rechaza un nombre vacío', () => {
  assert.throws(() => farewell(''), TypeError);
});
