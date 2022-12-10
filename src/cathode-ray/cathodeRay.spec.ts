import { calcProcessorState, calcSignalStrength } from "./solution";
import { sample, input } from "./input";
describe("Cathode ray problem", () => {
  describe("processor state calculater", () => {
    it("should calc processor state", () => {
      const sampleInput = `addx 10
            addx 5
            addx 3
            noop
            addx 8`;

      const result = calcProcessorState(sampleInput);

      expect(result).toEqual([1, 1, 11, 11, 16, 16, 19, 19, 19, 27]);
    });
  });

  describe("signal strength check", () => {
    it("should calculate signal strength on sample", () => {
      const result = calcSignalStrength(sample);

      expect(result).toEqual(13140);
    });

    it("should calculate signal strength on real input", () => {
      const result = calcSignalStrength(input);

      expect(result).toEqual(12740);
    });
  });
});
