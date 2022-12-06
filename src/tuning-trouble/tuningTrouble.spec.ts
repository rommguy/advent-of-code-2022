import { isMarker } from "./solution";

describe("tuning trouble", () => {
  describe("checking if str is a marker", () => {
    it("should check if characters appear more than once", () => {
      expect(isMarker("abba")).toEqual(false);
      expect(isMarker("baca")).toEqual(false);
      expect(isMarker("oajg")).toEqual(true);
    });
  });
});
