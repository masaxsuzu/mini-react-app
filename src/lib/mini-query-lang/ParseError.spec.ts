import { Lexer } from "./Lexer";
import { ParseError, describe } from "./ParseError";

test("illegal string error 1", () => {
  const src = `
('123' <= xyz) has
illegal tokens.`;
  try {
    let lex = new Lexer(src);
    lex.tokenize();
    throw new Error("should not reach here");
  } catch (e) {
    if (e instanceof Error) {
      let got = describe(e as ParseError, src);
      expect(got).toBe(`line2: x is illegal`);
    } else {
      throw new Error("should not reach here");
    }
  }
});
