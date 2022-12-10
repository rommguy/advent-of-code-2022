import {
  calcProcessorState,
  calcSignalStrength,
  drawCRTSolution,
} from "./solution";
import { sample, input } from "./input";
describe("Cathode ray problem", () => {
  describe("processor state calculator", () => {
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

  describe("CRT image", () => {
    it("should return expected image - sample", () => {
      const result = drawCRTSolution(sample);

      console.log(result);
      expect(result.length).toEqual(247);
    });

    it("should return expected image - input", () => {
      const result = drawCRTSolution(input);

      console.log(result);
      expect(result.length).toEqual(247);
    });
  });
});
