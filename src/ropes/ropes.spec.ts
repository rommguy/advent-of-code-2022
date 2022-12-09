import { getNextPositions } from "./solution";

describe("ropes bridge", () => {
  describe("calculating next position", () => {
    it("should move tail if needed", () => {
      const newPos = getNextPositions([1, 1], [1, 2], "R", 1);

      expect(newPos.head).toEqual([1, 3]);
      expect(newPos.tail).toEqual([1, 2]);
    });

    it("should not move tail if head and tail are still connected", () => {
      const newPos = getNextPositions([1, 1], [2, 2], "L", 1);

      expect(newPos.tail).toEqual([1, 1]);
    });

    it("should allow head to go over tail", () => {
      const newPos = getNextPositions([1, 1], [1, 2], "L", 1);

      expect(newPos.tail).toEqual([1, 1]);
    });

    it("should combine diagonal with straight movements", () => {
      const newPos = getNextPositions([10, 1], [10, 2], "D", 4);

      expect(newPos.head).toEqual([6, 2]);
      expect(newPos.tail).toEqual([7, 2]);
    });
  });
});
