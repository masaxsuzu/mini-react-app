import { Deck } from "./Deck";
import { HandSimulator } from "./HandSimulator";

test("9 / 40 ", () => {
  let cards = [
    { name: "x", number: 3 },
    { name: "y", number: 3 },
    { name: "z", number: 3 },
  ];
  let deck = new Deck(40, cards);
  let sim = new HandSimulator(deck);
  let got = sim.compute(5, "'x' >= 1 | 'y' >= 1 | 'z' >= 1");
  expect(got).toBeGreaterThan(0.7417);
  expect(got).toBeLessThan(0.7418);
});

test("Drytron", () => {
  let deck = new Deck(40, [
    { name: "バンα", number: 3 },
    { name: "アルζ", number: 3 },
    { name: "エルγ", number: 1 },
    { name: "ルタδ", number: 1 },
    { name: "弁天", number: 3 },
    { name: "神巫", number: 3 },
    { name: "極超の竜輝巧", number: 3 },
    { name: "エマージェンシー・サイバー", number: 3 },
  ]);
  let hand = new HandSimulator(deck);
  let got = hand.compute(
    5,
    `
  ('バンα' >= 1 & 'アルζ' >= 1) |
  ('極超の竜輝巧' >= 1 & 'アルζ' >= 1) | ('エマージェンシー・サイバー' >= 1 & 'アルζ' >= 1) |
  ('バンα' >= 1 & '極超の竜輝巧' >= 1) | ('バンα' >= 1 & 'エマージェンシー・サイバー' >= 1) |
  
  ('バンα' >= 1 & 'エルγ' >= 1) | 
  ('極超の竜輝巧' >= 1 & 'エルγ' >= 1) | ('エマージェンシー・サイバー' >= 1 & 'エルγ' >= 1) | 

  ('バンα' >= 1 & 'ルタδ' >= 1) | 
  ('極超の竜輝巧' >= 1 & 'ルタδ' >= 1) | ('エマージェンシー・サイバー' >= 1 & 'ルタδ' >= 1) | 
  
  ('アルζ' >= 1 & 'エルγ' >= 1) | 
  ('極超の竜輝巧' >= 1 & 'エルγ' >= 1) | ('エマージェンシー・サイバー' >= 1 & 'エルγ' >= 1) | 
  ('アルζ' >= 1 & '極超の竜輝巧' >= 1) | ('アルζ' >= 1 & 'エマージェンシー・サイバー' >= 1) | 
  
  ('エルγ' >= 1 & 'ルタδ' >= 1) | 
  ('極超の竜輝巧' >= 1 & 'ルタδ' >= 1) | ('エマージェンシー・サイバー' >= 1 & 'ルタδ' >= 1) | 

  ('バンα' >= 1 & '弁天' >= 1) |
  ('極超の竜輝巧' >= 1 & '弁天' >= 1) | ('エマージェンシー・サイバー' >= 1 & '弁天' >= 1) | 
  
  ('アルζ' >= 1 & '弁天' >= 1) | 
  
  ('アルζ' >= 1 & '神巫' >= 1) |
  ('極超の竜輝巧' >= 1 & '神巫' >= 1) | ('エマージェンシー・サイバー' >= 1 & '神巫' >= 1)
  `
  );
  expect(got).toBeGreaterThan(0.6956);
  expect(got).toBeLessThan(0.6957);
});
