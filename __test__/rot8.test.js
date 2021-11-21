import Rot8 from '../src/streams/rot8.js';
import { encodeRot8Cipher, decodeRot8Cipher } from '../src/constants/cipher.js';

describe('encrypt with ROT-8 cipher', () => {

  test('encode This is secret! -> Bpqa qa amkzmb!)', () => {
    const rot8 = new Rot8('R1', encodeRot8Cipher, decodeRot8Cipher);
    
    rot8.write('This is secret!');
    rot8.on('data', (data) => {
      expect(data.toString('utf-8')).toBe('Bpqa qa amkzmb!');
    });
  });

  test('decode This is secret! -> Lzak ak kwujwl!', () => {
    const rot8 = new Rot8('R0', encodeRot8Cipher, decodeRot8Cipher);

    rot8.write('This is secret!');
    rot8.on('data', (data) => {
      expect(data.toString('utf-8')).toBe('Lzak ak kwujwl!');
    });
  });
});