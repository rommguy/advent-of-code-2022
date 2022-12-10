import { last, words, sum, isNumber, trim } from "lodash/fp";
export const calcProcessorState = (input: string): number[] => {
  const instructions = input.split("\n");
  const initialVal = 1;

  const stateArr = instructions.reduce(
    (result, instruction) => {
      const [cmd, val] = trim(instruction).split(" ") as [string, string];
      const currentState = isNumber(last(result))
        ? (last(result) as number)
        : initialVal;
      if (cmd.startsWith("noop")) {
        return [...result, currentState];
      }

      return [...result, currentState, currentState + parseInt(val, 10)];
    },
    [1] as number[]
  );

  return stateArr;
};

const calcSignalStrengthFromStates = (states: number[]) => {
  const initialCycles = new Array(Math.floor((states.length - 20) / 40))
    .fill("")
    .map((_, index) => 20 + (index + 1) * 40);
  const cycles: number[] = [20, ...initialCycles];
  return sum(cycles.map((cycle) => cycle * (states[cycle - 1] as number)));
};

export const calcSignalStrength = (input: string): number => {
  const states = calcProcessorState(input);
  const signalStrength = calcSignalStrengthFromStates(states);

  return signalStrength;
};
