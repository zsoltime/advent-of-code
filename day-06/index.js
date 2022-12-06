import { getInput } from '../utils/index.js';

export function firstNonRepeatingSubstring(str, windowSize) {
  for (let i = 0; i < str.length; i++) {
    const substr = str.slice(i, i + windowSize);

    if (new Set(substr).size === windowSize) {
      return i + windowSize;
    }
  }

  return null;
}

if (process.env.NODE_ENV !== 'test') {
  const input = getInput(import.meta.url);
  const answer1 = firstNonRepeatingSubstring(input, 4);
  const answer2 = firstNonRepeatingSubstring(input, 14);

  console.log(`
#1 How many characters need to be processed before the first
   start-of-packet marker is detected?
   ${answer1}

#2 How many characters need to be processed before the first
   start-of-message marker is detected?
   ${answer2}
`);
}
