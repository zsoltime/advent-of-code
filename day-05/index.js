import { getInput, splitLines, Stack } from '../utils/index.js';

function groupItems(str) {
  const groups = [];

  for (let i = 0; i < str.length; i += 4) {
    groups.push(str.slice(i, i + 4));
  }

  return groups;
}

function parseCrates(rawCrates) {
  const getCrateID = (item) =>
    item.trim().length === 0 ? null : item.replace(/[\s+\[\]]/g, '');

  const lines = rawCrates
    .split('\n')
    .reverse()
    .slice(1)
    .map(groupItems)
    .map((line) => line.map(getCrateID));

  const stacks = Array(lines[0].length)
    .fill()
    .map(() => new Stack());

  lines.forEach((line) => {
    line.forEach((char, i) => {
      if (char) {
        stacks[i].push(char);
      }
    });
  });

  return stacks;
}

function parseMoves(rawMoves) {
  function getMove(line) {
    const regex = /move (?<qty>\d+) from (?<from>\d+) to (?<to>\d+)/i;
    const { from, qty, to } = line.match(regex).groups;

    return { from: from - 1, qty: qty - 0, to: to - 1 };
  }

  return splitLines(rawMoves).map(getMove);
}

function parseInput(input) {
  const [rawCrates, rawMoves] = input.split('\n\n');

  return {
    crates: parseCrates(rawCrates),
    moves: parseMoves(rawMoves),
  };
}

export function getTopCrates(input) {
  const { crates, moves } = parseInput(input);

  for (let move of moves) {
    for (let i = 0; i < move.qty; i++) {
      const item = crates[move.from].pop();
      crates[move.to].push(item);
    }
  }

  return crates.map((stack) => stack.peek()).join('');
}

export function getTopCrates9001(input) {
  const { crates, moves } = parseInput(input);

  for (let move of moves) {
    const popped = [];

    for (let i = 0; i < move.qty; i++) {
      popped.unshift(crates[move.from].pop());
    }
    for (let i = 0; i < move.qty; i++) {
      crates[move.to].push(popped[i]);
    }
  }

  return crates.map((stack) => stack.peek()).join('');
}

if (process.env.NODE_ENV !== 'test') {
  const input = getInput(import.meta.url);
  const answer1 = getTopCrates(input);
  const answer2 = getTopCrates9001(input);

  console.log(`
#1 After the rearrangement procedure completes, what crate ends up
   on top of each stack? (CrateMover 9000)
   ${answer1}

#2 After the rearrangement procedure completes, what crate ends up
   on top of each stack? (CrateMover 9001)
   ${answer2}
`);
}
