import { ParseError } from "./ParseError";
import { Token } from "./Token";

export class Lexer {
  private keywords: string[] = ["AND", "OR"];
  private tokens: Token[] = [];
  private src: string;
  private text: string;
  private currentPosition: number;
  private nextPosition: number;
  constructor(src: string) {
    this.src = src;
    this.text = "";
    this.currentPosition = 0;
    this.nextPosition = 0;

    this.advance();
  }
  public tokenize() {
    while (true) {
      let token = this.Next();
      this.tokens.push(token);
      if (token.type === "eoq") {
        break;
      }
    }
    return this.tokens;
  }

  private Next(): Token {
    this.skipWhitespace();
    let token = new Token("illegal", this.text, this.currentPosition);
    let pos = this.currentPosition;
    switch (this.text) {
      case "":
        token = new Token("eoq", "", pos);
        this.advance();
        return token;
      case "&":
      case "|":
      case "<":
      case ">":
      case "=":
      case "(":
      case ")":
        token = new Token("symbol", this.text, pos);
        this.advance();
        return token;
      case "'":
        let strPos = this.currentPosition + 1;
        token = new Token("string", this.readString(), strPos);
        this.advance();
        return token;
      default:
        if (this.isDigit(this.text)) {
          let numPos = this.currentPosition;
          token = new Token("number", this.readNumber(), numPos);
          return token;
        }
        throw new ParseError(token, `${token.literal} is illegal`);
    }
  }

  private advance() {
    this.text =
      this.src.length <= this.nextPosition ? "" : this.src[this.nextPosition];
    this.currentPosition = this.nextPosition;
    this.nextPosition++;
  }

  private readString() {
    let from = this.currentPosition + 1;
    while (true) {
      this.advance();
      if (this.text === "'") {
        break;
      } else if (this.text === "") {
        throw new Error("unterminated string");
      }
    }
    return this.src.substring(from, this.currentPosition);
  }

  private readNumber() {
    let from = this.currentPosition;
    while (this.isDigit(this.text)) {
      this.advance();
    }
    return this.src.substring(from, this.currentPosition);
  }

  private isDigit(char: string) {
    return char >= "0" && char <= "9";
  }

  private skipWhitespace() {
    while (
      this.text === " " ||
      this.text === "\t" ||
      this.text === "\n" ||
      this.text === "\r"
    ) {
      this.advance();
    }
  }
}
