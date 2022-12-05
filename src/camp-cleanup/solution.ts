import { campCleanupInput } from "./input";
import { sum } from "lodash/fp";

const sample = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const getRangeMinMax = (range1: string): [number, number] =>
  (range1.split("-") as [string, string]).map((n) => parseInt(n, 10)) as [
    number,
    number
  ];

const isContained = (range1: string, range2: string) => {
  const [min1, max1] = getRangeMinMax(range1);
  const [min2, max2] = getRangeMinMax(range2);
  return min1 >= min2 && max1 <= max2;
};

const isOverlap = (range1: string, range2: string) => {
  const [min1, max1] = getRangeMinMax(range1);
  const [min2, max2] = getRangeMinMax(range2);
  return min1 <= max2 && max1 >= min2;
};

export const isElfNotNeeded = (range1: string, range2: string) => {
  return isContained(range1, range2) || isContained(range2, range1);
};

const result = campCleanupInput
  .split("\n")
  .map((rangePair) => {
    const [range1, range2] = rangePair.split(",");
    return isOverlap(range1 as string, range2 as string);
  })
  .filter(Boolean);

console.log("result is ", result.length);
