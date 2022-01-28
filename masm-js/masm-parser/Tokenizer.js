export class Tokenizer {
  init(string) {
    this._string = string;
    this._cursor = 0;
  }

  /**
   * Whether tokenizer reached EOF
   */
  isEOF() {
    return this._cursor === this._string.length;
  }

  /**
   * Whether we still have more tokens
   */
  hasMoreTokens() {
    return this._cursor < this._string.length;
  }

  /**
   * Gets next token
   */
  getNextToken() {
    if(!this.hasMoreTokens()) {
      return null;
    }

    const string = this._string.slice(this._cursor);

    // Numbers:
    if(!Number.isNaN(Number(string[0]))) {
      let number = '';
      while(!Number.isNaN(Number(string[this._cursor]))) {
        number += string[this._cursor++];
      }
      return {
        type: 'NUMBER',
        value: number
      };
    }

    // String:
    if(string[0] === '"' || string[0] === "'") {
      let terminator = string[0];
      let s = '';
      do {
        s += string[this._cursor++];
      } while((string[this._cursor] !== terminator && !this.isEOF()));
      s += string[this._cursor++];
      return {
        type: 'STRING',
        value: s,
      };
    }

    return null;
  }

}