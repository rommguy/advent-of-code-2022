import { rucksacksInput } from "./input";
import type { Character } from "./types";
import { sum } from "lodash/fp";

const sampleInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const ruckSacks = rucksacksInput
  .split("\n")
  .map((rucksackStr) => rucksackStr.split("")) as Character[][];

const getPriority = (item: Character): number => {
  // Lowercase item types a through z have priorities 1 through 26.
  // Uppercase item types A through Z have priorities 27 through 52.
  const charCode = item.charCodeAt(0);
  return charCode >= 97 ? charCode - 96 : charCode - 38;
};

type RucksackItems = {
  [char in Character]?: number;
};

const createItemsMap = (rucksack: Character[]): RucksackItems => {
  const result: RucksackItems = {};
  for (let i = 0; i < rucksack.length; i++) {
    const item = rucksack[i] as Character;
    result[item] = 1;
  }
  return result;
};

const findProblemItem = (rucksack: Character[]): Character => {
  const firstCompartment = rucksack.slice(0, rucksack.length / 2);
  const secondCompartment = rucksack.slice(
    rucksack.length / 2,
    rucksack.length
  );
  const firstCompartmentItems = createItemsMap(firstCompartment);

  for (let i = 0; i < secondCompartment.length; i++) {
    const item = secondCompartment[i] as Character;
    if (firstCompartmentItems[item]) {
      return item;
    }
  }
  throw new Error(`no problem item in rucksack ${rucksack}`);
};

const getRucksackPriority = (rucksack: Character[]): number => {
  const item = findProblemItem(rucksack);
  return getPriority(item);
};

const solution = ruckSacks.reduce(
  (sum: number, rucksack: Character[]): number => {
    return sum + getRucksackPriority(rucksack);
  },
  0
);

console.log("solution for rucksacks: ", solution);

// 2nd solution

type ElvesGroup = [Character[], Character[], Character[]];

const findGroupBadgeItem = (group: ElvesGroup): Character => {
  const firstElfItems = createItemsMap(group[0]!);
  const secondElfItems = createItemsMap(group[1]!);
  // const thirdElfItems = createItemsMap(group[2]!);
  for (let i = 0; i < group[2].length; i++) {
    const item = group[2][i] as Character;
    if (firstElfItems[item] && secondElfItems[item]) {
      return item;
    }
  }
  throw new Error("no badge item for group");
};

const findGroupBadgePriority = (group: ElvesGroup): number => {
  const badgeItem = findGroupBadgeItem(group);
  return getPriority(badgeItem);
};

const findGroupsBadgesSum = (rucksacks: Character[][]): number => {
  const groupsCount = rucksacks.length / 3;
  const groups = new Array(groupsCount)
    .fill("")
    .map((val: unknown, groupIndex: number) =>
      rucksacks.slice(groupIndex * 3, groupIndex * 3 + 3)
    ) as ElvesGroup[];

  return sum(groups.map(findGroupBadgePriority));
};

console.log("solution for badges: ", findGroupsBadgesSum(ruckSacks));
// console.log(ruckSacks.length);
