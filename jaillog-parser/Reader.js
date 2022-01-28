export class Reader {
  #input = '';
  #cursor = 0;

  init(input) {
    this.#input = input;
  }

  read() {
    const tokens = [];
    while(!this.isEOF()) {
      tokens.push(this.#input[this.#cursor]);
      this.#cursor++;
    }
    return tokens;
  }

  isEOF() {
    return this.#cursor === this.#input.length;
  }

  hasMore() {
    return this.#cursor < this.#input.length;
  }

  getNext() {
    if(!this.hasMore()) {
      return null;
    }

    const current = this.#input.slice(this.#cursor);

    // Number:
    if(!Number.isNaN(Number(current[0]))) {
      let number = '';
      while(!Number.isNaN(Number(current[this.#cursor]))) {
        number += current[this.#cursor++];
      }
      return {
        type: 'NUMBER',
        value: number
      };
    }
    return null;
  }
}