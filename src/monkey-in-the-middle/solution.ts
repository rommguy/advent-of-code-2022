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
        return { ...monkey, startingItems: [] };
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
