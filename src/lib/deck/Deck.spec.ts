import { Deck } from "./Deck";

test("init deck", () => {
  let cards = [
    { name: "x", number: 1 },
    { name: "y", number: 2 },
  ];
  let deck = new Deck(5, cards);
  expect(deck.cards).toStrictEqual(["x", "y", "y", "", ""]);
});

test("shuffle deck n = 3", () => {
  let cards = [
    { name: "x", number: 1 },
    { name: "y", number: 1 },
    { name: "z", number: 1 },
  ];
  let deck = new Deck(3, cards);
  let got = Array.from(deck.shuffle(2));
  expect(got).toStrictEqual([
    ["x", "y"],
    ["x", "z"],
    ["y", "z"],
  ]);
});

test("shuffle deck n = 40", () => {
  let deck = new Deck(40, []);
  let got = Array.from(deck.shuffle(5));
  expect(got.length).toBe(658008);
});
