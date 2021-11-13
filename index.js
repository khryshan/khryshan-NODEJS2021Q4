import fs from 'fs';
import { pipeline } from 'stream';
import { getConfig } from './src/helper.js';
import Atbash from './src/streams/atbash.js';
import Caesar from './src/streams/caesar.js';
import Rot8 from './src/streams/rot8.js';

const { argv } = process;

const inputArgs = argv.slice(2);
const config = getConfig(inputArgs);

// TODO: if input empty string use process.stdin
const readableStream = fs.createReadStream(config.input);
const writeableStream = fs.createWriteStream(config.output);

const atbashStream = new Atbash('A');
const caesarStream = new Caesar('C1');
const rot8Stream = new Rot8('R0');

pipeline(
  readableStream,
  atbashStream,
  // caesarStream,
  // rot8Stream,
  writeableStream,
  (err) => {
    if (err) {
     console.error(err)
    } else {
      console.log('\x1b[32m', 'SUCCESS')
    }
  }
)