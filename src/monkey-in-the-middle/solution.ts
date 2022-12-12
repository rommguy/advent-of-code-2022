import { groupBy, map } from "lodash/fp";
import { Monkey } from "./types";

interface InspectionResult {
  targetIndex: number;
  worryLevel: number;
}

const MODULU_MULTIPLIER = 9699690;
// 96577
// 9699690

export const applyRound = (monkeys: Monkey[]) => {
  return monkeys.reduce((result, _, currentMonkeyIndex) => {
    const currentMonkey = result[currentMonkeyIndex] as Monkey;
    if (currentMonkey.startingItems.length === 0) {
      return result;
    }
    const inspectionResults = currentMonkey.startingItems.map(
      (worryLevel): InspectionResult => {
        // const updatedWorryLevel = Math.floor(
        //   currentMonkey.operation(worryLevel) / 3
        // );
        const updatedWorryLevel = currentMonkey.operation(worryLevel);
        const distanceFromModulu = updatedWorryLevel % MODULU_MULTIPLIER;

        return {
          targetIndex: currentMonkey.test(distanceFromModulu),
          worryLevel: distanceFromModulu,
        };
      }
    );
    const inspectionResultsByTargetMonkey = groupBy(
      "targetIndex",
      inspectionResults
    );

    return result.map((monkey, monkeyIndex): Monkey => {
      const itemsToAdd = inspectionResultsByTargetMonkey[monkeyIndex] as
        | number[]
        | undefined;

      if (!itemsToAdd && monkeyIndex !== currentMonkeyIndex) {
        return monkey;
      }

      if (monkeyIndex === currentMonkeyIndex) {
        return {
          ...monkey,
          startingItems: [],
          inspections: monkey.inspections + monkey.startingItems.length,
        };
      }

      return {
        ...monkey,
        startingItems: [
          ...monkey.startingItems,
          ...map("worryLevel", itemsToAdd!),
        ],
      };
    });
  }, monkeys);
};

export const applyRounds = (
  initialState: Monkey[],
  roundCount: number
): Monkey[] => {
  return new Array(roundCount)
    .fill("")
    .reduce((result) => applyRound(result), initialState);
};

export const findMonkeyBusiness = (initialState: Monkey[]) => {
  const finalState = applyRounds(initialState, 10000);
  const sorted = map("inspections", finalState).sort(
    (a, b) => b - a
  ) as number[];

  return sorted[0]! * sorted[1]!;
};
