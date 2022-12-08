import { sample, input } from "./input";
import {
  calcScenicScore,
  findMaxScenicScore,
  getColumns,
  getRows,
  getVisibleIndexes,
  solution,
} from "./solution";

describe("Tree house problem", () => {
  it("should find all trees that are visible in a line", () => {
    const sample1 = "543234565";
    const sample2 = "123454321";

    const res = getVisibleIndexes(sample2.split(""));
    expect(getVisibleIndexes(sample1.split(""))).toEqual([0, 7, 8]);
    expect(res.sort()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("should get columns", () => {
    const res = getColumns(sample);

    expect(res.length).toEqual(5);
    expect(res[1]).toEqual(["0", "5", "5", "3", "5"]);
  });

  it("should get rows", () => {
    const res = getRows(sample);

    expect(res.length).toEqual(5);
    expect(res[2]).toEqual(["6", "5", "3", "3", "2"]);
  });

  describe("solution", () => {
    it("should count visible trees in sample", () => {
      const result = solution(sample);

      expect(result).toEqual(21);
    });

    it("should count visible trees in input", () => {
      const result = solution(input);

      expect(result).toEqual(1717);
    });

    describe("scenic score", () => {
      it("should calc scores for each tree", () => {
        const sample1 = ["2", "3", "4", "8", "3", "2", "1", "6"];
        const result = calcScenicScore(sample1);

        expect(result.length).toEqual(sample1.length);
        expect(result[0]!.start).toEqual(0);
        expect(result[1]!.start).toEqual(1);
        expect(result[2]!.start).toEqual(2);
        expect(result[3]!.start).toEqual(3);
        expect(result[7]!.start).toEqual(4);

        expect(result[0]!.end).toEqual(1);
        expect(result[3]!.end).toEqual(4);
        expect(result[5]!.end).toEqual(2);
      });

      it("should find the tree with the highest scenic score in sample", () => {
        const result = findMaxScenicScore(sample);

        expect(result).toEqual(8);
      });

      it("should find the tree with the highest scenic score in input", () => {
        const result = findMaxScenicScore(input);

        expect(result).toEqual(321975);
      });
    });
  });
});
