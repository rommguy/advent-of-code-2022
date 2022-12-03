import { caloriesInput as input } from "./input";
import { min, flow, map, sum, takeRight } from "lodash/fp";

const calories = input.split("\n\n") as string[];
let results: number[] = [];
flow(
  map((elf: string) =>
    elf.split("\n").map((caloriesStr) => parseInt(caloriesStr, 10))
  ),
  map(sum),
  map((elfCalories) => {
    const minimum = min(results);
    if (!minimum || elfCalories > minimum) {
      results = takeRight(3, [...results, elfCalories].sort());
    }
  })
)(calories);

console.log("found max - ", results);
console.log("found max - ", sum(results));
