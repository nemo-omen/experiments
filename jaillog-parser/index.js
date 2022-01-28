import fs from 'fs';
import { Reader } from './Reader.js';

const rawData = fs.readFileSync('charges.txt', 'utf8');

const reader = new Reader(rawData);

while(!reader.isEOF()) {
  console.log(reader.getNext());
}