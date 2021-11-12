import { getConfig } from './src/helper.js';

const { argv } = process;


const inputArgs = argv.slice(2);
const config = getConfig(inputArgs);
console.log('config: ', config);
