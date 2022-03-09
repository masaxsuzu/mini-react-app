import { Lexer } from "./Lexer";
import { ParseError, describe } from "./ParseError";
import { parse } from "./Parser";

test("eval test", () => {
  const data = new Map<string, number>().set("x", 1).set("y", 2).set("z", 3);

  const testCases = [
    [`'x' = 1`, true],
    [`'x' < 2`, true],
    [`'x' <= 1`, true],
    [`('y' = 1)`, false],
    [`('y' < 2)`, false],
    [`('y' <= 1)`, false],
    [`('z' > 1)`, true],
    [`('z' >= 4)`, false],
    [`'x' = 1 & 'y' = 2`, true],
    [`'x' = 1 & 'y' = 1`, false],
    [`'x' = 2 | 'y' < 3`, true],
    [`'x' = 2 | 'y' < 1`, false],
    [` 'x' = 2 & 'y' < 3  | 'z' <= 3`, false],
    [`('x' = 2 & 'y' < 3) | 'z' <= 3`, true],
  ];

  for (const [src, want] of testCases) {
    const expr = parse(src as string);
    const got = expr.eval(data);
    expect(got).toBe(want);
  }
});
