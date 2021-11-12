import fs from 'fs';
import { pipeline } from 'stream';
import { getConfig } from './src/helper.js';
import Caesar from './src/streams/caesar.js';

const { argv } = process;

const inputArgs = argv.slice(2);
const config = getConfig(inputArgs);

// TODO: if input empty string use process.stdin
const readableStream = fs.createReadStream(config.input);
const writeableStream = fs.createWriteStream(config.output);

const caesarStream = new Caesar('C1');

pipeline(
  readableStream,
  caesarStream,
  writeableStream,
  (err) => {
    if (err) {
     console.error(err)
    } else {
      console.log('\x1b[32m', 'SUCCESS')
    }
  }
)