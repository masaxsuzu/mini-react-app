import { Card } from "./Card";

export class Deck {
  public cards: string[];
  constructor(n: number, cards: Card[]) {
    this.cards = [];
    let x =
      cards.length > 0 ? cards.map((x) => x.number).reduce((a, b) => a + b) : 0;
    let rest = n - x;
    if (x > n) {
      rest = 0;
    }
    for (const card of cards) {
      for (let i = 0; i < card.number; i++) {
        this.cards.push(card.name);
      }
    }
    for (let i = 0; i < rest; i++) {
      this.cards.push("");
    }
  }

  public shuffle(n: number) {
    return combinations(this.cards, n);
  }
}

function combinations<T>(set: T[], k: number): T[][] {
  var i, j, combs, head, tailcombs;

  // There is no way to take e.g. sets of 5 elements from
  // a set of 4.
  if (k > set.length || k <= 0) {
    return [];
  }

  // K-sized set has only one K-sized subset.
  if (k == set.length) {
    return [set];
  }

  // There is N 1-sized subsets in a N-sized set.
  if (k == 1) {
    combs = [];
    for (i = 0; i < set.length; i++) {
      combs.push([set[i]]);
    }
    return combs;
  }
  combs = [];
  for (i = 0; i < set.length - k + 1; i++) {
    // head is a list that includes only our current element.
    head = set.slice(i, i + 1);
    // We take smaller combinations from the subsequent elements
    tailcombs = combinations(set.slice(i + 1), k - 1);
    // For each (k-1)-combination we join it with the current
    // and store it to the set of k-combinations.
    for (j = 0; j < tailcombs.length; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }
  return combs;
}
