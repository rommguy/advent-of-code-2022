import { countDistinctTailPositions, getNextPositions } from "./solution";
import { input, sample } from "./input";

describe("ropes bridge", () => {
  describe("calculating next position", () => {
    it("should move tail if needed", () => {
      const newPos = getNextPositions(
        [
          [1, 2],
          [1, 1],
        ],
        "R",
        1
      );

      expect(newPos[0]).toEqual([1, 3]);
      expect(newPos[1]).toEqual([1, 2]);
    });

    it("should not move tail if head and tail are still connected", () => {
      const newPos = getNextPositions(
        [
          [2, 2],
          [1, 1],
        ],
        "L",
        1
      );

      expect(newPos[1]).toEqual([1, 1]);
    });

    it("should allow head to go over tail", () => {
      const newPos = getNextPositions(
        [
          [1, 2],
          [1, 1],
        ],
        "L",
        1
      );

      expect(newPos[1]).toEqual([1, 1]);
    });

    it("should combine diagonal with straight movements", () => {
      const newPos = getNextPositions(
        [
          [9, 2],
          [10, 1],
        ],
        "D",
        1
      );

      expect(newPos[0]).toEqual([8, 2]);
      expect(newPos[1]).toEqual([9, 2]);
    });
  });

  describe("counting distinct positions", () => {
    it("should count distinct locations where the tail visits - sample", () => {
      const result = countDistinctTailPositions(sample, 2);

      expect(result).toEqual(13);
    });

    it("should count distinct locations where the tail visits - input", () => {
      const result = countDistinctTailPositions(input, 2);

      expect(result).toEqual(6311);
    });
  });

  describe("more knots!", () => {
    it("should count distinct locations where the tail visits - sample", () => {
      const result = countDistinctTailPositions(sample, 10);

      expect(result).toEqual(1);
    });

    it("should count distinct locations where the tail visits - input", () => {
      const result = countDistinctTailPositions(input, 10);

      expect(result).toEqual(2482);
    });
  });
});
