import { applyRound, applyRounds, findMonkeyBusiness } from "./solution";
import { input, sample } from "./parsedInput";

describe("Monkey in the middle", () => {
  describe("apply round", () => {
    it("should calculate which items have moved and how many inspections each monkey did", () => {
      const result = applyRound(sample);

      expect(result.length).toEqual(sample.length);
      expect(result[0]!.startingItems).toEqual([20, 23, 27, 26]);
      expect(result[0]!.inspections).toEqual(2);
      expect(result[1]!.startingItems).toEqual([2080, 25, 167, 207, 401, 1046]);
      expect(result[2]!.startingItems).toEqual([]);
      expect(result[3]!.startingItems).toEqual([]);
      expect(result[3]!.inspections).toEqual(5);
    });
  });

  describe("apply multiple rounds", () => {
    it("should count inspections ", () => {
      const result = applyRounds(sample, 20);

      expect(result[0]!.inspections).toEqual(101);
      expect(result[3]!.inspections).toEqual(105);
    });
  });

  describe("calc monkey business", () => {
    it("should calc the multiply of the 2 most busy monkeys - sample", () => {
      const result = findMonkeyBusiness(sample);

      expect(result).toEqual(2713310158);
    });

    it("should calc the multiply of the 2 most busy monkeys - input", () => {
      const result = findMonkeyBusiness(input);

      expect(result).toEqual(30408);
    });
  });
});
