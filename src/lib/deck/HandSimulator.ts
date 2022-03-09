import { parse } from "../mini-query-lang/Parser";
import { Deck } from "./Deck";

export class HandSimulator {
  constructor(private deck: Deck) {}

  public compute(init: number, query: string): number {
    let expr = parse(query);

    let patterns = this.deck.shuffle(init);
    let all = patterns.length;
    let matched = 0;
    for (const pattern of patterns) {
      var m = new Map<string, number>();
      for (const p of pattern) {
        let n = m.get(p);
        if (n === undefined) {
          m.set(p, 0);
          n = 0;
        }
        m.set(p, n + 1);
      }
      if (expr.eval(m)) {
        matched++;
      }
    }
    return matched / all;
  }
}
