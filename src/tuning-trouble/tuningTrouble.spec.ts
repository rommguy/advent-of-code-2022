import { findMarker, isMarker } from "./solution";
import { sample, sample2, input } from "./input";

describe("tuning trouble", () => {
  describe("checking if str is a marker", () => {
    it("should check if characters appear more than once", () => {
      expect(isMarker("abba")).toEqual(false);
      expect(isMarker("baca")).toEqual(false);
      expect(isMarker("oajg")).toEqual(true);
    });

    it("should find the index of the first marker", () => {
      expect(findMarker(sample, 4)).toEqual(7);
      expect(findMarker(sample2, 4)).toEqual(5);
      expect(findMarker(input, 4)).toEqual(1531);
    });

    it("should find start of message", () => {
      expect(findMarker(sample, 14)).toEqual(19);
      expect(findMarker(sample2, 14)).toEqual(23);
      expect(findMarker(input, 14)).toEqual(2518);
    });
  });
});
