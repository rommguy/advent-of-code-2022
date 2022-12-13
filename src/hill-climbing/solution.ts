import { head, tail } from "lodash/fp";
import { UpperCaseCharacter } from "../types";

type Height = Lowercase<UpperCaseCharacter> | "S" | "E";

interface Cell {
  visited: boolean;
  height: Height;
  distance: number;
  isStart: boolean;
  isEnd: boolean;
  rowIndex: number;
  columnIndex: number;
}

type Matrix = Cell[][];
export const parseInput = (input: string): Matrix => {
  const lines = input.split("\n");
  const cells = lines.map((line: string, rowIndex) =>
    line.split("").map((char, columnIndex) => {
      const isStart = char === "S";
      const isEnd = char === "E";
      const heightValue = isStart ? "a" : isEnd ? "z" : char;

      return {
        visited: false,
        height: heightValue,
        distance: -1,
        isEnd,
        isStart,
        rowIndex,
        columnIndex,
      } as Cell;
    })
  );

  return cells;
};

const getNeighbors = (matrix: Matrix, cell: Cell) => {
  const { rowIndex, columnIndex, height: currentHeight } = cell;
  const up = matrix[rowIndex + 1] && matrix[rowIndex + 1]![columnIndex];
  const down = matrix[rowIndex - 1] && matrix[rowIndex - 1]![columnIndex];
  const left = matrix[rowIndex] && matrix[rowIndex]![columnIndex - 1];
  const right = matrix[rowIndex] && matrix[rowIndex]![columnIndex + 1];
  return [up, down, left, right]
    .filter(Boolean)
    .filter(
      (cell) =>
        !cell!.visited &&
        cell!.height.charCodeAt(0) <= currentHeight.charCodeAt(0) + 1
    );
};

interface Location {
  row: number;
  column: number;
}

export const findStartAndEnd = (
  matrix: Matrix
): {
  start: Cell;
  end: Cell;
} => {
  let start: Cell | null = null;
  let end: Cell | null = null;

  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    const row = matrix[rowIndex] as Cell[];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const cell = row[columnIndex];
      if (cell && cell.isStart) {
        cell.distance = 0;
        start = cell;
      }
      if (cell && cell.isEnd) {
        end = cell;
      }
      if (start && end) {
        return { start, end };
      }
    }
  }
  throw new Error("can't find start or end");
};

export const findShortestPath = (input: string): number => {
  const matrix = parseInput(input);

  const { start, end } = findStartAndEnd(matrix);
  return findShortestPathFromStart(matrix, start, end);
};

export const findShortestPathFromAnyStart = (input: string) => {
  const matrix = parseInput(input);

  let min = 100000;
  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    const row = matrix[rowIndex] as Cell[];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const currentMatrix = parseInput(input);
      const { end } = findStartAndEnd(currentMatrix);

      const currentStart = currentMatrix[rowIndex]![columnIndex] as Cell;
      if (currentStart.height === "a") {
        currentStart.distance = 0;
        const result = findShortestPathFromStart(
          currentMatrix,
          currentStart,
          end
        );
        if (result > 0 && result < min) {
          min = result;
        }
      }
    }
  }
  return min;
};

export const findShortestPathFromStart = (
  matrix: Matrix,
  start: Cell,
  end: Cell
): number => {
  // if (!start.isStart || !end.isEnd) {
  //   throw new Error("failed to init start and end");
  // }

  let candidates: Cell[] = [start];

  while (candidates.length > 0 && !end.visited) {
    const next = head(candidates) as Cell;
    next.visited = true;
    if (next === end) {
      return next.distance;
    }
    const neighbors = getNeighbors(matrix, next) as Cell[];
    neighbors.forEach((neighbor) => {
      neighbor.distance = next.distance + 1;
      neighbor.visited = true;
    });
    candidates = [...tail(candidates), ...neighbors];
  }

  return end.distance;
};
