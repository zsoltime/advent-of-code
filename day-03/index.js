import { getInput, splitLines } from '../utils/index.js';

function splitItems(input) {
  return [input.slice(0, input.length / 2), input.slice(input.length / 2)];
}

function findFirstCommonItem(strings) {
  const sets = strings.map((str) => new Set(str.split('')));
  const commonLetters = [...sets[0]].filter((ch) =>
    sets.every((set) => set.has(ch)),
  );

  return commonLetters[0];
}

function letterToPriority(ch) {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  return letters.indexOf(ch) + 1;
}

export function getSumOfPriorities(input) {
  return splitLines(input)
    .map(splitItems)
    .map(findFirstCommonItem)
    .map(letterToPriority)
    .reduce((a, b) => a + b, 0);
}

function groupItems(arr) {
  const groups = [];

  for (let i = 0; i < arr.length; i += 3) {
    groups.push(arr.slice(i, i + 3));
  }

  return groups;
}

export function getSumOfGroupedPriorities(input) {
  return groupItems(splitLines(input))
    .map(findFirstCommonItem)
    .map(letterToPriority)
    .reduce((a, b) => a + b, 0);
}

if (process.env.NODE_ENV !== 'test') {
  const input = getInput(import.meta.url);
  const answer1 = getSumOfPriorities(input);
  const answer2 = getSumOfGroupedPriorities(input);

  console.log(`
#1 Find the item type that appears in both compartments
   of each rucksack. What is the sum of the priorities of
   those item types?
   ${answer1}

#2 Find the item type that corresponds to the badges of
   each three-Elf group. What is the sum of the priorities
   of those item types?
   ${answer2}
`);
}
