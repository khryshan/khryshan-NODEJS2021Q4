import Atbash from '../src/streams/atbash.js';

describe('encrypt with Atbash cipher', () => {

  test('encode This is secret! -> Gsrh rh hvxivg!)', () => {
    const atbash = new Atbash();
    
    atbash.write('This is secret!');
    atbash.on('data', (data) => {
      expect(data.toString('utf-8')).toBe('Gsrh rh hvxivg!');
    });
  });

});