import ShiftCipher from './shiftCipher.js';
import { encodeCaesarCipher, decodeCaesarCipher } from '../constants/cipher.js';

class Caesar extends ShiftCipher {
  constructor(config) {
    super();
    this.config = config;
    this.encode = encodeCaesarCipher;
    this.decode = decodeCaesarCipher;
  }
}

export default Caesar