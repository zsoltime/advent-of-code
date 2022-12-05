import { getInput } from '../utils/index.js';

function getContent(input) {
  return input.trim().split('\n');
}

// A: Rock
// B: Paper
// C: Scissors

// X: Rock
// Y: Paper
// Z: Scissors

function getScore([opponent, player]) {
  const scoreForShape = { X: 1, Y: 2, Z: 3 };
  const scoreForOutcome = {
    A: { X: 3, Y: 6, Z: 0 },
    B: { X: 0, Y: 3, Z: 6 },
    C: { X: 6, Y: 0, Z: 3 },
  };
  const shapeScore = scoreForShape[player];
  const outcomeScore = scoreForOutcome[opponent][player];

  return shapeScore + outcomeScore;
}

function getPairs(input) {
  return getContent(input).map((line) => line.split(' '));
}

export function getTotalScore(input) {
  return getPairs(input).reduce((total, pair) => total + getScore(pair), 0);
}

// X: lose
// Y: draw
// Z: win

function getPlayerByOutcome([opponent, desiredOutcome]) {
  const shapeForOutcome = {
    A: { X: 'Z', Y: 'X', Z: 'Y' },
    B: { X: 'X', Y: 'Y', Z: 'Z' },
    C: { X: 'Y', Y: 'Z', Z: 'X' },
  };
  const player = shapeForOutcome[opponent][desiredOutcome];

  return player;
}

export function getCorrectTotalScore(input) {
  return getPairs(input)
    .map((pair) => [pair[0], getPlayerByOutcome(pair)])
    .reduce((total, pair) => total + getScore(pair), 0);
}

if (process.env.NODE_ENV !== 'test') {
  const input = getInput(import.meta.url);
  const answer1 = getTotalScore(input);
  const answer2 = getCorrectTotalScore(input);

  console.log(`
#1 What would your total score be if everything goes
   exactly according to your strategy guide?
   ${answer1}

#2 Following the Elf's instructions for the second column,
   what would your total score be if everything goes exactly
   according to your strategy guide?
   ${answer2}
`);
}
