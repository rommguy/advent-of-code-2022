import { parseProcedure, parseStartStack } from "./solution";
import { sample } from "./input";

describe("supply stack", () => {
  describe("parse start stack", () => {
    it("should ", () => {
      const result = parseStartStack(sample.startStack);

      expect(result.length).toEqual(3);
      expect(result[0]!.filter(Boolean).length).toEqual(2);
      expect(result[1]!.filter(Boolean).length).toEqual(3);
      expect(result[2]!.filter(Boolean).length).toEqual(1);
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
});
