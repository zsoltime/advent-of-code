import { getInput } from '../utils/index.js';

function getContent(input) {
  return input.trim().split('\n');
}

function getRanges(line) {
  return line.split(',').map((line) => line.split('-').map(Number));
}

function isFullyContained([a, b]) {
  return (a[0] <= b[0] && a[1] >= b[1]) || (b[0] <= a[0] && b[1] >= a[1]);
}

function isPartiallyContained([a, b]) {
  return a[0] <= b[1] && a[1] >= b[0];
}

export function getFullyContained(input) {
  return getContent(input)
    .map(getRanges)
    .map(isFullyContained)
    .filter(Boolean).length;
}

export function getPartiallyContained(input) {
  return getContent(input)
    .map(getRanges)
    .map(isPartiallyContained)
    .filter(Boolean).length;
}

if (process.env.NODE_ENV !== 'test') {
  const input = getInput(import.meta.url);
  const answer1 = getFullyContained(input);
  const answer2 = getPartiallyContained(input);

  console.log(`
#1 In how many assignment pairs does one range fully
   contain the other?
   ${answer1}

#2 In how many assignment pairs do the ranges overlap?
   ${answer2}
`);
}
