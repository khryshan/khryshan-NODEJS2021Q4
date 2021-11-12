import { Transform } from 'stream';
import { encodeCaesarCipher, decodeCaesarCipher } from '../constants/cipher.js';

class Caesar extends Transform {
  constructor(config) {
    super();
    this.config = config;
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
      let result = '';
      const text = chunk.toString('utf8');

      if (this.config[1] === '1') {
        result = this.encrypt(text, encodeCaesarCipher);
        console.log('result: ', result);
      } else {
        result = this.encrypt(text, decodeCaesarCipher);
      }
      

      callback(null, result);
    } catch (err) {
      callback(err);
    }
  }
}

export default Caesar