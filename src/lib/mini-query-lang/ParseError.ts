import { Token } from "./Token";

export class ParseError extends Error {
  constructor(public token: Token, public message: string) {
    super(message);
  }
}

export function describe(error: ParseError, src: string): string {
  const numOfLines = src.slice(0, error.token.position).split("\n").length;
  return `line${numOfLines}: ${error.message}`;
}
