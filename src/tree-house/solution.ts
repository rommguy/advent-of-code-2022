import { maxBy, max, takeRight, flatten } from "lodash/fp";
export const getVisibleIndexes = (line: string[]): number[] => {
  let max = "";
  const visibleIndexes = new Set<number>();

  for (let i = 0; i < line.length; i++) {
    const current = line[i] as string;
    if (current > max) {
      max = current;
      visibleIndexes.add(i);
    }
  }

  max = "";

  for (let j = line.length - 1; j >= 0; j--) {
    const current = line[j] as string;
    if (current > max) {
      max = current;
      visibleIndexes.add(j);
    }
  }

  return [...visibleIndexes.values()];
};

export const getColumns = (input: string): string[][] => {
  const lines = input.split("\n").map((line) => [...line]);
  const columns = lines[0]!.map((_, columnIndex) =>
    lines.map((line) => line[columnIndex] as string)
  );

  return columns;
};

export const getRows = (input: string): string[][] =>
  input.split("\n").map((line) => [...line]);

export const solution = (input: string): number => {
  const rows = getRows(input);
  const columns = getColumns(input);
  const visibleLocations = new Set();

  rows.map((row, rowIndex) => {
    getVisibleIndexes(row).forEach((columnIndex) => {
      visibleLocations.add(`${rowIndex}-${columnIndex}`);
    });
  });

  columns.map((column, columnIndex) => {
    getVisibleIndexes(column).forEach((rowIndex) => {
      visibleLocations.add(`${rowIndex}-${columnIndex}`);
    });
  });

  return visibleLocations.size;
};

interface TreeScore {
  start: number;
  end: number;
}

const calcScenicScoreFromStart = (line: string[]): number[] => {
  const result = line.map((tree) => -1);
  const indexes = new Array(10).fill(-1);
  for (let i = 0; i < line.length; i++) {
    const treeHeight = parseInt(line[i] as string, 10);
    const closestSameOrHigherTree = max(
      takeRight(indexes.length - treeHeight, indexes)
    );

    const score =
      closestSameOrHigherTree > -1 ? i - closestSameOrHigherTree : i;

    result[i] = score;

    indexes[treeHeight] = i;
  }

  return result;
};
export const calcScenicScore = (line: string[]): TreeScore[] => {
  const startScores = calcScenicScoreFromStart(line);
  const endScores = calcScenicScoreFromStart(line.reverse()).reverse();

  return startScores.map((startScore, index) => ({
    start: startScore,
    end: endScores[index] as number,
  }));
};

export const findMaxScenicScore = (input: string): number => {
  const rows = getRows(input);
  const columns = getColumns(input);

  const rowsResults = rows.map(calcScenicScore);
  const columnResults = columns.map(calcScenicScore);

  const allResultsMatrix = columnResults.map((columnResults, columnIndex) =>
    columnResults.map((columnTree, rowIndex) => {
      const treeRowResult = rowsResults[rowIndex]![columnIndex] as TreeScore;
      const treeColumnResult = columnTree as TreeScore;
      return {
        rowStart: treeRowResult.start,
        rowEnd: treeRowResult.end,
        columnStart: treeColumnResult.start,
        columnEnd: treeColumnResult.end,
        score:
          treeRowResult.start *
          treeRowResult.end *
          treeColumnResult.start *
          treeColumnResult.end,
      };
    })
  );
  const allResults = flatten(allResultsMatrix) as Array<{ score: number }>;

  return maxBy("score", allResults)!.score;
};
