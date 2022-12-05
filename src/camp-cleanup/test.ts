import { isElfNotNeeded } from "./solution";

describe("check if one of the elves is not needed", () => {
  it("should return true if overlap", () => {
    expect(isElfNotNeeded("2-8", "3-5")).toEqual(true);
    expect(isElfNotNeeded("2-3", "1-5")).toEqual(true);
    expect(isElfNotNeeded("5-5", "3-5")).toEqual(true);
    expect(isElfNotNeeded("4-5", "4-8")).toEqual(true);
    expect(isElfNotNeeded("4-5", "3-4")).toEqual(false);
  });
});
