import { last, reverse, words, take, takeRight } from "lodash/fp";
import { supplyStackInput } from "./input";

export const transpose = <T>(matrix: T[][]): T[][] => {
  return matrix[0]!.map((_: T, columnIndex: number) =>
    matrix.map((line) => line[columnIndex] as T)
  );
};

type Cell = string | null;
type Matrix = Cell[][];

export const parseStartStack = (input: string): Matrix => {
  const lines = input.split("\n").filter((line) => line.length > 1) as string[];
  const indicesLine = last(lines);
  const stackLines = take(lines.length - 1, lines);
  const columnsCount = Math.ceil(indicesLine!.length / 4);
  const charsIndices = new Array(columnsCount)
    .fill("")
    .map((_, index) => 4 * index + 1);

  const parsedLines = stackLines.map((line) =>
    charsIndices
      .map((charIndex) => {
        return line[charIndex];
      })
      .map((char) =>
        !char || char.charCodeAt(0) < 65 || char.charCodeAt(0) > 90
          ? null
          : char
      )
  );

  return transpose(parsedLines)
    .map(reverse)
    .map((line) => line.filter(Boolean));
};

type ProcedureLine = { count: number; from: number; to: number };

const parseProcedureLine = (procedureLine: string): ProcedureLine => {
  const lineWords = words(procedureLine);
  return {
    count: parseInt(lineWords[1] as string, 10),
    from: parseInt(lineWords[3] as string, 10),
    to: parseInt(lineWords[5] as string, 10),
  };
};

export const parseProcedure = (input: string): ProcedureLine[] => {
  const lines = input.split("\n");
  return lines.map(parseProcedureLine);
};

export const applyProcedureLine = (
  matrix: Matrix,
  procedureLine: ProcedureLine
): Matrix => {
  const { from, to, count } = procedureLine;
  return matrix.map((column, columnIndex) => {
    const countingIndex = columnIndex + 1;
    if (countingIndex !== from && countingIndex !== to) {
      return column as Cell[];
    }

    if (countingIndex === from) {
      return take(column.length - count, column);
    }

    return [
      ...column,
      ...reverse(takeRight(count, matrix[procedureLine.from - 1])),
    ];
  });
};

export const solve = (input: typeof supplyStackInput): string => {
  const startMatrix = parseStartStack(input.startStack);
  const procedure = parseProcedure(input.procedure);

  const resultMatrix = procedure.reduce(
    (matrix: Matrix, procedureLine: ProcedureLine) => {
      return applyProcedureLine(matrix, procedureLine);
    },
    startMatrix
  );

  return resultMatrix.map(last).join("");
};
