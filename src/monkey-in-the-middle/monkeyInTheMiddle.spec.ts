import { applyRound } from "./solution";
import { sample } from "./parsedInput";

describe("Monkey in the middle", () => {
  describe("apply round", () => {
    it("should calculate which items have moved and how many inspections each monkey did", () => {
      const result = applyRound(sample);

      expect(result.length).toEqual(sample.length);
      expect(result[0]!.startingItems).toEqual([20, 23, 27, 26]);
      expect(result[1]!.startingItems).toEqual([2080, 25, 167, 207, 401, 1046]);
      expect(result[2]!.startingItems).toEqual([]);
      expect(result[3]!.startingItems).toEqual([]);
    });
  });
});
