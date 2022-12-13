import {
  findShortestPath,
  findShortestPathFromAnyStart,
  findStartAndEnd,
  parseInput,
} from "./solution";
import { input, sample } from "./input";

describe("hill climbing", () => {
  it("should parse input", () => {
    const result = parseInput(sample);

    expect(result.length).toEqual(5);
    expect(result[3]![3]!.height).toEqual("t");
  });

  it("should find start and end", () => {
    const result = findStartAndEnd(parseInput(sample));

    expect(result.start.isStart).toEqual(true);
    expect(result.start.rowIndex).toEqual(0);
    expect(result.start.columnIndex).toEqual(0);
    expect(result.end.isEnd).toEqual(true);
    expect(result.end.rowIndex).toEqual(2);
    expect(result.end.columnIndex).toEqual(5);
  });

  it("should count steps from beginning to target - sample", () => {
    const result = findShortestPath(sample);

    expect(result).toEqual(31);
  });

  it("should count steps from beginning to target - input", () => {
    const result = findShortestPath(input);

    expect(result).toEqual(534);
  });

  describe("shortest paths from all options", () => {
    it('should find shortest path from any "a" elevation - sample', () => {
      const result = findShortestPathFromAnyStart(sample);

      expect(result).toEqual(29);
    });

    it('should find shortest path from any "a" elevation - input', () => {
      const result = findShortestPathFromAnyStart(input);

      expect(result).toEqual(29);
    });
  });
});
