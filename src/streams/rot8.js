import ShiftCipher from './shiftCipher.js';
import { encodeRot8Cipher, decodeRot8Cipher } from '../constants/cipher.js';

class Rot8 extends ShiftCipher {
  constructor(config) {
    super();
    this.config = config;
    this.encode = encodeRot8Cipher;
    this.decode = decodeRot8Cipher;
  }
}

export default Rot8;