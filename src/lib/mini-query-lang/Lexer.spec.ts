import React from "react";
import { Lexer } from "./Lexer";
import { ParseError } from "./ParseError";
import { Token } from "./Token";

test("tokenize query", () => {
  let lex = new Lexer("('123' <= 123) & ('456' >= 456) | ('789' <= 789)");
  let want = [
    new Token("symbol", "(", 0),
    new Token("string", "123", 2),
    new Token("symbol", "<", 7),
    new Token("symbol", "=", 8),
    new Token("number", "123", 10),
    new Token("symbol", ")", 13),

    new Token("symbol", "&", 15),

    new Token("symbol", "(", 17),
    new Token("string", "456", 19),
    new Token("symbol", ">", 24),
    new Token("symbol", "=", 25),
    new Token("number", "456", 27),
    new Token("symbol", ")", 30),

    new Token("symbol", "|", 32),

    new Token("symbol", "(", 34),
    new Token("string", "789", 36),
    new Token("symbol", "<", 41),
    new Token("symbol", "=", 42),
    new Token("number", "789", 44),
    new Token("symbol", ")", 47),

    new Token("eoq", "", 48),
  ];
  let got = lex.tokenize();
  expect(got.length).toBe(want.length);
  for (let index = 0; index < got.length; index++) {
    const gi = got[index];
    const wi = want[index];

    expect(gi.type).toBe(wi.type);
    expect(gi.literal).toBe(wi.literal);
    expect(gi.position).toBe(wi.position);
  }
});

test("tokenize query with illegal string", () => {
  let lex = new Lexer("('123' <= xyz)");

  try {
    lex.tokenize();
    throw new Error("should not reach here");
  } catch (e) {
    if (e instanceof Error) {
      let error = e as ParseError;
      expect(error.token.type).toBe("illegal");
      expect(error.token.literal).toBe("x");
      return;
    }
    throw new Error("should not reach here");
  }
});
