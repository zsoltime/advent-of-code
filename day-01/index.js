import { getInput } from '../utils/index.js';

const sum = (nums) => nums.reduce((a, b) => a + b, 0);

function getCaloriesByElves(input) {
  return input
    .split('\n\n')
    .map((line) => line.split('\n').map(Number))
    .map(sum);
}

export function getMaxCalories(input) {
  return Math.max(...getCaloriesByElves(input));
}

export function getTopThreeCalories(input) {
  const top3 = getCaloriesByElves(input)
    .sort((a, b) => b - a)
    .slice(0, 3);

  return sum(top3);
}

if (process.env.NODE_ENV !== 'test') {
  const input = getInput(import.meta.url);
  const answer1 = getMaxCalories(input);
  const answer2 = getTopThreeCalories(input);

  console.log(`
#1 Find the Elf carrying the most Calories.
   How many total Calories is that Elf carrying?
   ${answer1}

#2 Find the top three Elves carrying the most Calories.
   How many Calories are those Elves carrying in total?
   ${answer2}
`);
}
