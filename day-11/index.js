import { getInput, getLCM, splitLines } from '../utils/index.js';

function parseMonkeys(input) {
  const monkeys = input
    .trim()
    .split('\n\n')
    .map((data) => {
      const lines = splitLines(data);
      const regexNumber = /\d+/g;
      const regexOperation =
        /new = old (?<operator>[\*\+]) (?<operand>\d+|old)/;

      let { operator, operand } = lines[2].match(regexOperation).groups;
      operand = operand === 'old' ? prev : parseInt(operand);

      return {
        items: lines[1].match(regexNumber).map((n) => parseInt(n)),
        getWorryLevel(prev) {
          return operator === '*' ? prev * operand : prev + operand;
        },
        divisibleBy: parseInt(lines[3].match(regexNumber)[0]),
        getNextMonkey(worryLevel) {
          const block =
            worryLevel % this.divisibleBy === 0 ? lines[4] : lines[5];
          return block.match(regexNumber)[0];
        },
        inspectedItems: 0,
      };
    });

  return monkeys;
}

export function getMonkeyBusiness(input, rounds) {
  const monkeys = parseMonkeys(input);
  const lcm = getLCM(monkeys.map((x) => x.divisibleBy));

  for (let i = 0; i < rounds; i++) {
    for (let monkey of monkeys) {
      for (let item of monkey.items) {
        let worryLevel = monkey.getWorryLevel(item);
        worryLevel =
          rounds === 20 ? Math.floor(worryLevel / 3) : worryLevel % lcm;
        const nextMonkey = monkey.getNextMonkey(worryLevel);

        monkeys[nextMonkey].items.push(worryLevel);
      }
      monkey.inspectedItems += monkey.items.length;
      monkey.items = [];
    }
  }

  const inspectedItems = monkeys
    .map((monkey) => monkey.inspectedItems)
    .sort((a, b) => b - a);

  return inspectedItems[0] * inspectedItems[1];
}

if (process.env.NODE_ENV !== 'test') {
  const input = getInput(import.meta.url);
  const answer1 = getMonkeyBusiness(input, 20);
  const answer2 = getMonkeyBusiness(input, 10_000);

  console.log(`
#1 What is the level of monkey business after 20 rounds of
   stuff-slinging simian shenanigans?
   ${answer1}

#2 what is the level of monkey business after 10000 rounds?
   ${answer2}
`);
}
