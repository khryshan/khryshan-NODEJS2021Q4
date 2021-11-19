import { Transform } from 'stream';
import { atbashCipher } from '../constants/cipher.js';

class Atbash extends Transform {
  constructor() {
    super();
  }

  encrypt(str, cipher) {
    return str.split('').map(item => {
      if (cipher.hasOwnProperty(item)) {
        return cipher[item];
      } else {
        return item;
      }
    }).join('');
  }


  _transform(chunk, encoding, callback) {
    try {
      const text = chunk.toString('utf8');
      const result = this.encrypt(text, atbashCipher);
      
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  }
}

export default Atbash;