import { sample } from "./input";
import { getVisibleIndexes } from "./solution";

describe("Tree house problem", () => {
  it("should find all trees that are visible", () => {
    const sample1 = "543234565";
    const sample2 = "123454321";

    const res = getVisibleIndexes(sample2.split(""));
    expect(getVisibleIndexes(sample1.split(""))).toEqual([0, 7, 8]);
    expect(res.sort()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
