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
