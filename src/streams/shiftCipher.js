import { Transform } from 'stream';

class ShiftCipher extends Transform {
  constructor(config, encode, decode) {
    super();
    this.config = config;
    this.encode = encode;
    this.decode = decode;
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
        result = this.encrypt(text, this.encode);
      } else {
        result = this.encrypt(text, this.decode);
      }

      callback(null, result);
    } catch (err) {
      callback(err);
    }
  }
}

export default ShiftCipher