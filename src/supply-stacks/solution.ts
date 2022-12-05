import { last, take, reverse, words } from "lodash/fp";

export const transpose = <T>(matrix: T[][]): T[][] =>
  matrix.map((line: T[], lineIndex: number) =>
    matrix.map((line) => line[lineIndex] as T)
  );

type Cell = string | null;

export const parseStartStack = (input: string): Cell[][] => {
  const lines = input.split("\n").filter((line) => line.length > 1) as string[];
  const indicesLine = last(lines);
  const stackLines = take(lines.length - 1, lines);
  const columnsCount = Math.ceil(indicesLine!.length / 4);
  const charsIndices = new Array(columnsCount)
    .fill("")
    .map((_, index) => 4 * index + 1);

  const parsedLines = stackLines.map((line) =>
    charsIndices
      .map((charIndex) => line[charIndex])
      .map((char) =>
        !char || char.charCodeAt(0) < 65 || char.charCodeAt(0) > 90
          ? null
          : char
      )
  );

  return transpose(parsedLines).map(reverse);
  //   [line[1], line[5], line[9]].filter((char) =>
  //     !char || char.charCodeAt(0) < 65 || char.charCodeAt(0) > 90 ? null : char
  //   )
  // );
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
