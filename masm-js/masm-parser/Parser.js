import { Tokenizer } from './Tokenizer.js';

export class Parser {
  constructor() {
    this._string = '';
    this._tokenizer = new Tokenizer();
  }
  /**
   * 
   * @param {string} string  the string to parse
   * @returns {Object} an Abstract Syntax Tree
   */
  parse(string) {
    this._string = string;
    this._tokenizer.init(string);

    this._lookahead = this._tokenizer.getNextToken();

    return this.Program();
  }

  /**
   * Main entry point.
   * 
   * Program
   *    : Literal
   *    ;
   */
  Program() {
    return {
      type: 'Program',
      body: this.Literal(),
    } 
  }

  /**
   * Literal
   *    : NumericLiteral
   *    | StringLiteral
   *    ;
   */
  Literal() {
    switch(this._lookahead.type) {
      case 'NUMBER': return this.NumericLiteral();
      case 'STRING': return this.StringLiteral();
    }
    throw new SyntaxError('Unexpected literal production');
  }

  /**
   * StringLiteral
   *    : STRING
   *    ;
   */
  StringLiteral() {
    const token = this._eat('STRING');
    return {
      type: 'StringLiteral',
      value: token.value.slice(1, -1),
    }
  }
  /**
   * NumericLiteral
   *    : NUMBER
   *    ; 
   */
  NumericLiteral() {
    const token = this._eat('NUMBER');
    return {
      type: 'NumericLiteral',
      value: Number(token.value),
    }
  }

  _eat(tokenType) {
    const token = this._lookahead;
    if(token === null) {
      throw new SyntaxError(
        `Unexpected end of input, expected ${tokenType}`,
      );
    }

    if(token.type !== tokenType) {
      throw new SyntaxError(
        `Unexpected token, expected ${tokenType}`,
      );
    }

    // advance to next token
    this._lookahead = this._tokenizer.getNextToken();

    return token;
  }
}