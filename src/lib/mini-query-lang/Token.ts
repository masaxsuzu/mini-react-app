import { ParseError } from "./ParseError";

export type TokenType = "eoq" | "symbol" | "number" | "string" | "illegal";

export class Token {
  constructor(
    public type: TokenType,
    public literal: string,
    public position: number
  ) {}

  public IsReservedAs(literal: string) {
    return this.type === "symbol" && this.literal === literal;
  }
}

export class TokenSequence {
  private current = 0;
  constructor(private tokens: Token[], at: number) {
    this.current = at;
  }

  public consume(n: number) {
    return new TokenSequence(this.tokens, this.current + n);
  }

  public mustBe(type: TokenType) {
    const token = this.peek(0);
    if (token.type !== type) {
      throw new ParseError(token, `${token.literal} is not ${type}`);
    }
  }

  public expect(literal: string) {
    const token = this.peek(0);
    if (token.IsReservedAs(literal)) {
      return this.consume(1);
    } else {
      throw new ParseError(token, `${token.literal} is not ${literal}`);
    }
  }

  public peek(next: number) {
    let i =
      this.current + next < this.tokens.length
        ? this.current + next
        : this.tokens.length - 1;
    return this.tokens[i];
  }
}
