import {
  applyProcedureLine,
  parseProcedure,
  parseStartStack,
  solve,
} from "./solution";
import { sample, supplyStackInput } from "./input";

describe("supply stack", () => {
  describe("parse start stack", () => {
    it("should ", () => {
      const result = parseStartStack(sample.startStack);

      expect(result.length).toEqual(3);
      expect(result[0]!.length).toEqual(2);
      expect(result[1]!.length).toEqual(3);
      expect(result[2]!.length).toEqual(1);
      expect(result[1]![2]).toEqual("D");
    });
  });

  describe("parse procedure ", () => {
    it("should parse procedures", () => {
      const result = parseProcedure(sample.procedure);

      expect(result.length).toEqual(4);
      expect(result[0]!.count).toEqual(1);
      expect(result[1]!.to).toEqual(3);
      expect(result[2]!.from).toEqual(2);
    });
  });

  describe("solution", () => {
    it("should apply procedure line", () => {
      const stack = parseStartStack(sample.startStack);

      const result = applyProcedureLine(stack, { count: 2, from: 2, to: 3 });

      expect(result.length).toEqual(stack.length);
      expect(result[1]).toEqual(["M"]);
      expect(result[2]).toEqual(["P", "D", "C"]);
    });

    it("should return a string of the top crates on each column", () => {
      const result = solve(sample);

      expect(result).toEqual("CMZ");
    });

    it("should solve the real input", () => {
      const result = solve(supplyStackInput);

      expect(result.length).toEqual(9);
    });
  });
});
