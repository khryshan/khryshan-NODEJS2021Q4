import Caesar from '../src/streams/caesar.js';
import { encodeCaesarCipher, decodeCaesarCipher } from '../src/constants/cipher.js';

describe('encrypt with Caesar cipher', () => {

  test('encode This is secret! -> Uijt jt tfdsfu!)', () => {
    const caesar = new Caesar('C1', encodeCaesarCipher, decodeCaesarCipher);
    
    caesar.write('This is secret!');
    caesar.on('data', (data) => {
      expect(data.toString('utf-8')).toBe('Uijt jt tfdsfu!');
    });
  });


  test('decode This is secret! -> Sghr hr rdbqds!', () => {
    const caesar = new Caesar('C0', encodeCaesarCipher, decodeCaesarCipher);

    caesar.write('This is secret!');
    caesar.on('data', (data) => {
      expect(data.toString('utf-8')).toBe('Sghr hr rdbqds!');
    });
  });
});