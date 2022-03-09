import {
  Expression,
  LogicalExpression,
  RangeExpression,
  RangeOperatorType,
} from "./Ast";
import { Lexer } from "./Lexer";
import { ParseError } from "./ParseError";
import { TokenType, TokenSequence } from "./Token";

export class Parser {
  constructor() {}
  public parse(tokens: TokenSequence) {
    let [expr, rest] = this.parseExpression(tokens);
    rest.mustBe("eoq");
    return expr;
  }
  private parseExpression(tokens: TokenSequence): [Expression, TokenSequence] {
    return this.parseAndOperator(tokens);
  }
  private parseAndOperator(tokens: TokenSequence): [Expression, TokenSequence] {
    let [left, rest] = this.parseOrOperator(tokens);
    while (rest.peek(0).IsReservedAs("&")) {
      let [right, rest2] = this.parseOrOperator(rest.consume(1));
      left = new LogicalExpression("&", left, right);
      rest = rest2;
    }
    return [left, rest];
  }
  private parseOrOperator(tokens: TokenSequence): [Expression, TokenSequence] {
    let [left, rest] = this.parsePrimary(tokens);
    while (rest.peek(0).IsReservedAs("|")) {
      let [right, rest2] = this.parsePrimary(rest.consume(1));
      left = new LogicalExpression("|", left, right);
      rest = rest2;
    }
    return [left, rest];
  }
  private parsePrimary(tokens: TokenSequence): [Expression, TokenSequence] {
    if (tokens.peek(0).IsReservedAs("(")) {
      let rest = tokens.consume(1);
      let [expr, rest2] = this.parseExpression(rest);
      rest = rest2.expect(")");
      return [expr, rest];
    }
    return this.parseRange(tokens);
  }

  private parseRange(tokens: TokenSequence): [Expression, TokenSequence] {
    tokens.mustBe("string");
    let str = tokens.peek(0).literal;
    let rest = tokens.consume(1);
    rest.mustBe("symbol");

    let op: RangeOperatorType = "=";
    switch (rest.peek(0).literal) {
      case "=":
        op = "=";
        break;
      case "<":
        if (rest.peek(1).literal === "=") {
          op = "<=";
        } else {
          op = "<";
        }
        break;
      case ">":
        if (rest.peek(1).literal === "=") {
          op = ">=";
        } else {
          op = ">";
        }
        break;
      default:
        throw new ParseError(
          rest.peek(0),
          `range operator must be one of '=', '<', '<=', '>' and '>='`
        );
    }
    rest = rest.consume(op.length);
    rest.mustBe("number");
    let num = parseInt(rest.peek(0).literal);
    rest = rest.consume(1);

    return [new RangeExpression(op, str, num), rest];
  }
}

export function parse(query: string): Expression {
  let lexer = new Lexer(query);
  let parser = new Parser();
  let tokens = lexer.tokenize();
  return parser.parse(new TokenSequence(tokens, 0));
}
