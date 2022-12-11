export interface Monkey {
  index: number;
  startingItems: number[];
  operation: (worryLevel: number) => number;
  test: (worryLevel: number) => number;
  inspections: number;
}
