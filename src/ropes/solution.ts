type Pos = [number, number];

type Direction = "R" | "U" | "L" | "D";

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
  }
};
export const getNextPositions = (
  tailPos: Pos,
  headPos: Pos,
  direction: Direction,
  amount: number
): { tail: Pos; head: Pos } => {
  const newHeadPos = getNextHeadPosition(headPos, direction, amount);
  const horizontalDistance = Math.abs(newHeadPos[1] - tailPos[1]);
  const verticalDistance = Math.abs(newHeadPos[0] - tailPos[0]);
  if (horizontalDistance <= 1 && verticalDistance <= 1) {
    return { tail: tailPos, head: newHeadPos };
  }

  if (horizontalDistance > verticalDistance) {
    const directionSign = newHeadPos[1] > tailPos[1] ? 1 : -1;
    return {
      tail: [newHeadPos[0], newHeadPos[1] - directionSign],
      head: newHeadPos,
    };
  }

  const directionSign = newHeadPos[0] > tailPos[0] ? 1 : -1;
  return {
    tail: [newHeadPos[0] - directionSign, newHeadPos[1]],
    head: newHeadPos,
  };
};

type Action = [Direction, number];
export const countDistinctTailPositions = (input: string): number => {
  const lines = input.split("\n");
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

  const initialHeadPosition: Pos = [100, 100];
  const initialTailPosition: Pos = [100, 100];

  const result = actions.reduce(
    (accm, action) => {
      const actionResult = getNextPositions(
        accm.tailPos,
        accm.headPos,
        action[0],
        action[1]
      );
      accm.distinctPositions.add(
        `${actionResult.tail[0]}-${actionResult.tail[1]}`
      );

      return {
        ...accm,
        tailPos: actionResult.tail,
        headPos: actionResult.head,
      };
    },
    {
      distinctPositions: new Set(),
      tailPos: initialTailPosition,
      headPos: initialHeadPosition,
    }
  );

  return result.distinctPositions.size;
};
