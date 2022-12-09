import { takeRight, last } from "lodash/fp";

type Pos = [number, number];

type Direction = "R" | "U" | "L" | "D" | "UR" | "UL" | "DR" | "DL";

const getNextHeadPosition = (
  headPos: Pos,
  direction: Direction,
  amount: number
): Pos => {
  switch (direction) {
    case "D":
      return [headPos[0] - amount, headPos[1]];
    case "U":
      return [headPos[0] + amount, headPos[1]];
    case "R":
      return [headPos[0], headPos[1] + amount];
    case "L":
      return [headPos[0], headPos[1] - amount];
    case "UR":
      return [headPos[0] + amount, headPos[1] + amount];
    case "UL":
      return [headPos[0] + amount, headPos[1] - amount];
    case "DR":
      return [headPos[0] - amount, headPos[1] + amount];
    case "DL":
      return [headPos[0] - amount, headPos[1] - amount];
  }
};

export const calcNextTailPos = (newHeadPos: Pos, tailPos: Pos): Pos => {
  const horizontalDistance = Math.abs(newHeadPos[1] - tailPos[1]);
  const verticalDistance = Math.abs(newHeadPos[0] - tailPos[0]);
  if (horizontalDistance <= 1 && verticalDistance <= 1) {
    return tailPos;
  }

  if (horizontalDistance > verticalDistance) {
    const directionSign = newHeadPos[1] > tailPos[1] ? 1 : -1;
    return [newHeadPos[0], newHeadPos[1] - directionSign];
  }

  const directionSign = newHeadPos[0] > tailPos[0] ? 1 : -1;
  return [newHeadPos[0] - directionSign, newHeadPos[1]];
};

type Action = [Direction, number];

const getVerticalDiffAction = (verticalDiff: number): Action => {
  if (verticalDiff === 0) {
    throw new Error("no vertical diff");
  }
  if (verticalDiff > 0) {
    return ["D", verticalDiff];
  }

  return ["U", verticalDiff * -1];
};

const getHorizontalDiffAction = (horizontalDiff: number): Action => {
  if (horizontalDiff === 0) {
    throw new Error("no horizontal diff");
  }

  if (horizontalDiff > 0) {
    return ["L", horizontalDiff];
  }

  return ["R", horizontalDiff * -1];
};
const calcAction = (initialPos: Pos, newPos: Pos): Action => {
  const verticalDiff = initialPos[0] - newPos[0];
  const horizontalDiff = initialPos[1] - newPos[1];
  if (horizontalDiff === 0 && verticalDiff === 0) {
    throw new Error("no diff");
  }

  if (verticalDiff !== 0 && horizontalDiff !== 0) {
    const verticalAction = getVerticalDiffAction(verticalDiff);
    const horizontalAction = getHorizontalDiffAction(horizontalDiff);
    return [`${verticalAction[0]}${horizontalAction[0]}` as Direction, 1];
  } else if (verticalDiff !== 0) {
    return getVerticalDiffAction(verticalDiff);
  }
  return getHorizontalDiffAction(horizontalDiff);
};

export const getNextPositions = (
  positions: Pos[],
  direction: Direction,
  amount: number
): Pos[] => {
  const headPos = positions[0] as Pos;
  const tailPos = positions[1] as Pos;
  const positionsWithoutHead = takeRight(positions.length - 1, positions);
  const newHeadPos = getNextHeadPosition(headPos, direction, amount);
  if (positions.length < 2) {
    return [newHeadPos];
  }

  const newTailPos = calcNextTailPos(newHeadPos, tailPos);

  if (newTailPos[0] === tailPos[0] && newTailPos[1] === tailPos[1]) {
    return [newHeadPos, ...positionsWithoutHead];
  }

  const newAction: Action = calcAction(tailPos, newTailPos);
  // diagonal will result in multiple actions
  const restPositions = getNextPositions(
    positionsWithoutHead,
    newAction[0],
    newAction[1]
  );

  return [newHeadPos, ...restPositions];
};

const parseLinesToSingleStepActions = (lines: string[]): Action[] => {
  const initialActions: Action[] = lines.map((line) => {
    const [direction, amount] = line.split(" ");
    return [direction, parseInt(amount!, 10)] as [Direction, number];
  });

  const actions: Action[] = initialActions
    .map((action) => {
      const [direction, stepsAmount] = action;
      if (stepsAmount <= 1) {
        return [action];
      }
      return new Array(stepsAmount).fill([direction, 1]);
    })
    .flat();

  return actions;
};
export const countDistinctTailPositions = (
  input: string,
  knotsCount: number
): number => {
  const lines = input.split("\n");
  const actions = parseLinesToSingleStepActions(lines);

  const initialPositions = new Array(knotsCount).fill([100, 100]);

  const result = actions.reduce(
    (accm, action) => {
      const updatedPositions = getNextPositions(
        accm.positions,

        action[0],
        action[1]
      );
      const tailPos = last(updatedPositions) as Pos;
      accm.distinctPositions.add(`${tailPos[0]}-${tailPos[1]}`);

      return {
        ...accm,
        positions: updatedPositions,
      };
    },
    {
      distinctPositions: new Set(),
      positions: initialPositions,
    }
  );

  return result.distinctPositions.size;
};
