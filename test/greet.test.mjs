import assert from 'node:assert/strict';
import { test } from 'node:test';
import { greet } from '../src/index.mjs';

test('greet saluda al nombre recortado', () => {
  assert.equal(greet('  Ana '), 'Hola, Ana!');
});

test('greet rechaza un nombre vacío', () => {
  assert.throws(() => greet('   '), TypeError);
});
