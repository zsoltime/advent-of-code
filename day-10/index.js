import { getInput, splitLines } from '../utils/index.js';

const CHARS_PER_ROW = 40;

function processInput(input, callback) {
  const lines = splitLines(input);
  let cycle = 1;
  let x = 1;

  for (const line of lines) {
    const [command, arg] = line.split(' ');
    const cycles = command === 'addx' ? 2 : 1;

    for (let i = 0; i < cycles; i++, cycle++) {
      callback(cycle, x);
    }

    x += Number(arg) || 0;
  }
}

export function getSumOfSignalStrengths(input) {
  let sum = 0;

  processInput(input, (cycle, x) => {
    if ((cycle - 20) % CHARS_PER_ROW === 0) {
      const signalStrength = cycle * x;
      sum += signalStrength;
    }
  });

  return sum;
}

export function renderImage(input) {
  const PIXEL_DARK = '░';
  const PIXEL_LIT = '█';
  let result = '';

  processInput(input, (cycle, x) => {
    const column = (cycle - 1) % CHARS_PER_ROW;
    const isPixelLit = x - 1 <= column && column <= x + 1;

    result += isPixelLit ? PIXEL_LIT : PIXEL_DARK;

    if (column === CHARS_PER_ROW - 1) {
      result += '\n';
    }
  });

  return result;
}

if (process.env.NODE_ENV !== 'test') {
  const input = getInput(import.meta.url);
  const answer1 = getSumOfSignalStrengths(input);
  const answer2 = renderImage(input);

  console.log(`
#1 What is the sum of these six signal strengths?
   ${answer1}

#2 What eight capital letters appear on your CRT?
${answer2}
`);
}
