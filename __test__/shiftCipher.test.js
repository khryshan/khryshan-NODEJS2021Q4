import ShiftCipher from '../src/streams/shiftCipher.js';
import { encodeCaesarCipher, decodeCaesarCipher } from '../src/constants/cipher.js';

describe('check shiftCipher module based on caesar cipher (encode)', () => {
  let caesar;

  beforeEach(() => {
    caesar = new ShiftCipher('C1', encodeCaesarCipher, decodeCaesarCipher);
  });

  test('encode AAA -> BBB', () => {
    caesar.write('AAA');
    caesar.on('data', (data) => {
      expect(data.toString('utf-8')).toBe('BBB');
    });
  });

  test('encode 2@_AAA! -> 2@_BBB!', () => {
    caesar.write('2@_AAA!');
    caesar.on('data', (data) => {
      expect(data.toString('utf-8')).toBe('2@_BBB!');
    });
  });
});

describe('check shiftCipher module based on caesar cipher (decode)', () => {
  let caesar;

  beforeEach(() => {
    caesar = new ShiftCipher('C0', encodeCaesarCipher, decodeCaesarCipher);
  });

  test('decode CCc -> BBb', () => {
    caesar.write('CCc');
    caesar.on('data', (data) => {
      expect(data.toString('utf-8')).toBe('BBb');
    });
  });

  test('decode 2@_AAA! -> 2@_ZZZ!', () => {
    caesar.write('2@_AAA!');
    caesar.on('data', (data) => {
      expect(data.toString('utf-8')).toBe('2@_ZZZ!');
    });
  });
});