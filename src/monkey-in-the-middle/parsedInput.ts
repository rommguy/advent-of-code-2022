import { Monkey } from "./types";

export const sample: Monkey[] = [
  {
    index: 0,
    startingItems: [79, 98],
    operation: (worryLevel) => worryLevel * 19,
    test: (worryLevel) => (worryLevel % 23 === 0 ? 2 : 3),
    inspections: 0,
  },
  {
    index: 1,
    startingItems: [54, 65, 75, 74],
    operation: (worryLevel) => worryLevel + 6,
    test: (worryLevel) => (worryLevel % 19 === 0 ? 2 : 0),
    inspections: 0,
  },
  {
    index: 2,
    startingItems: [79, 60, 97],
    operation: (worryLevel) => worryLevel * worryLevel,
    test: (worryLevel) => (worryLevel % 13 === 0 ? 1 : 3),
    inspections: 0,
  },
  {
    index: 3,
    startingItems: [74],
    operation: (worryLevel) => worryLevel + 3,
    test: (worryLevel) => (worryLevel % 17 === 0 ? 0 : 1),
    inspections: 0,
  },
];

export const input: Monkey[] = [
  {
    index: 0,
    startingItems: [98, 97, 98, 55, 56, 72],
    operation: (worryLevel) => worryLevel * 13,
    test: (worryLevel) => (worryLevel % 11 === 0 ? 4 : 7),
    inspections: 0,
  },
  {
    index: 1,
    startingItems: [73, 99, 55, 54, 88, 50, 55],
    operation: (worryLevel) => worryLevel + 4,
    test: (worryLevel) => (worryLevel % 17 === 0 ? 2 : 6),
    inspections: 0,
  },
  {
    index: 2,
    startingItems: [67, 98],
    operation: (worryLevel) => worryLevel * 11,
    test: (worryLevel) => (worryLevel % 5 === 0 ? 6 : 5),
    inspections: 0,
  },
  {
    index: 3,
    startingItems: [82, 91, 92, 53, 99],
    operation: (worryLevel) => worryLevel + 8,
    test: (worryLevel) => (worryLevel % 13 === 0 ? 1 : 2),
    inspections: 0,
  },
  {
    index: 4,
    startingItems: [52, 62, 94, 96, 52, 87, 53, 60],
    operation: (worryLevel) => worryLevel * worryLevel,
    test: (worryLevel) => (worryLevel % 19 === 0 ? 3 : 1),
    inspections: 0,
  },
  {
    index: 5,
    startingItems: [94, 80, 84, 79],
    operation: (worryLevel) => worryLevel + 5,
    test: (worryLevel) => (worryLevel % 2 === 0 ? 7 : 0),
    inspections: 0,
  },
  {
    index: 6,
    startingItems: [89],
    operation: (worryLevel) => worryLevel + 1,
    test: (worryLevel) => (worryLevel % 3 === 0 ? 0 : 5),
    inspections: 0,
  },
  {
    index: 7,
    startingItems: [70, 59, 63],
    operation: (worryLevel) => worryLevel + 3,
    test: (worryLevel) => (worryLevel % 7 === 0 ? 4 : 3),
    inspections: 0,
  },
];
