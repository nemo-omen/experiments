import { Reader } from './Reader.js';

export class Parser {
  constructor() {
    this.#input = '';
    this.#reader = new Reader();
  }

  parse(input) {
    this.#input = input;
    this.#reader.init(input);
    this.#lookahead = this.#reader.getNext();

    return this.ChargeList();
  }

  #consume(type) {
    const token = this.#lookahead;

  }

  ChargeList() {
    return {
      type: 'ChargeList',
      body: this.Charge(),
    }
  }

  Charge() {
    
  }
}