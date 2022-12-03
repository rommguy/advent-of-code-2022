import { RPSinput } from "./input";
import { map, flow, split, sum } from "lodash/fp";

// A - rock, B - paper, C - scissors

// x - lose, y - draw, z - win

const sampleInput = `A Y
B X
C Z`;

type Selection = "A" | "B" | "C";
type Outcome = "X" | "Y" | "Z";

const selectionScores: Record<Selection, number> = {
  A: 1,
  B: 2,
  C: 3,
};

const selectionMod: Record<Selection, number> = {
  A: 0,
  B: 1,
  C: 2,
};
const modValueToSelection = ["A", "B", "C"];

const lossScore = 0;
const drawScore = 3;
const winScore = 6;

const outcomeScores: Record<Outcome, number> = {
  X: lossScore,
  Y: drawScore,
  Z: winScore,
};

const getResultScore = (
  opponentSelection: Selection,
  yourSelection: Selection
): number => {
  const opponentModScore = selectionMod[opponentSelection];
  const yourModScore = selectionMod[yourSelection];

  if ((yourModScore + 1) % 3 === opponentModScore) {
    return lossScore;
  } else if (yourModScore === opponentModScore) {
    return drawScore;
  }
  return winScore;
};

const getYourSelection = (
  opponentSelection: Selection,
  outcome: Outcome
): Selection => {
  const opponentModScore = selectionMod[opponentSelection];
  // const modDiff = outcome === "X" ? 2 : outcome === "Y" ? 0 : 1;

  if (outcome === "X") {
    // loss
    const yourModScore = (opponentModScore + 2) % 3;
    return modValueToSelection[yourModScore] as Selection;
  } else if (outcome === "Y") {
    // draw
    const yourModScore = opponentModScore;
    return modValueToSelection[yourModScore] as Selection;
  } else {
    // win
    const yourModScore = (opponentModScore + 1) % 3;
    return modValueToSelection[yourModScore] as Selection;
  }
};

const calcRoundScore = (
  opponentSelection: Selection,
  outcome: Outcome
): number => {
  const yourSelection = getYourSelection(opponentSelection, outcome);
  const selectionScore = selectionScores[yourSelection];
  const outcomeScore = outcomeScores[outcome];
  return selectionScore + outcomeScore;
};

const totalScore = flow(
  split("\n"),
  map(split(" ")),
  map(([opponentSelection, outcome]: [Selection, Outcome]) =>
    calcRoundScore(opponentSelection, outcome)
  ),
  sum
)(RPSinput);

console.log("Total score: ", totalScore);
