import { groupBy, map } from "lodash/fp";
import { Monkey } from "./types";

interface InspectionResult {
  targetIndex: number;
  worryLevel: number;
}
export const applyRound = (monkeys: Monkey[]) => {
  return monkeys.reduce((result, _, currentMonkeyIndex) => {
    const currentMonkey = result[currentMonkeyIndex] as Monkey;
    const inspectionResults = currentMonkey.startingItems.map(
      (worryLevel): InspectionResult => {
        const updatedWorryLevel = Math.floor(
          currentMonkey.operation(worryLevel) / 3
        );
        return {
          targetIndex: currentMonkey.test(updatedWorryLevel),
          worryLevel: updatedWorryLevel,
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
          inspections: monkey.inspections + currentMonkey.startingItems.length,
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
  const finalState = applyRounds(initialState, 20);
  const sorted = map("inspections", finalState).sort(
    (a, b) => b - a
  ) as number[];

  return sorted[0]! * sorted[1]!;
};
