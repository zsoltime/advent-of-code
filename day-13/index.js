import { getInput } from '../utils/index.js';

function parseInput(input) {
  return input
    .trim()
    .split('\n\n')
    .map((block) => block.split('\n').map((line) => JSON.parse(line)));
}

const arrayify = (x) => (Array.isArray(x) ? x : [x]);
const isNumber = (x) => typeof x === 'number';

function compareSides(left, right) {
  if (isNumber(left) && isNumber(right)) {
    return left === right ? 0 : left < right ? -1 : +1;
  }

  if (isNumber(left) || isNumber(right)) {
    return compareSides(arrayify(left), arrayify(right));
  }

  const min = Math.min(left.length, right.length);

  for (let i = 0; i < min; i++) {
    const result = compareSides(left[i], right[i]);

    if (result) return result;
  }

  return left.length - right.length;
}

function isInRightOrder(pair) {
  return compareSides(...pair) < 0;
}

export function getSumOfIndices(input) {
  return parseInput(input).reduce(
    (sum, pair, i) => (isInRightOrder(pair) ? sum + i + 1 : sum),
    0,
  );
}

export function getDecoderKey(input) {
  const dividerPackets = [[[2]], [[6]]];
  const isDividerPacket = (packet) =>
    dividerPackets
      .map((x) => JSON.stringify(x))
      .includes(JSON.stringify(packet));
  const packets = [...parseInput(input).flat(), ...dividerPackets].sort(
    compareSides,
  );

  return packets.reduce(
    (product, packet, i) =>
      isDividerPacket(packet) ? product * (i + 1) : product,
    1,
  );
}

if (process.env.NODE_ENV !== 'test') {
  const input = getInput(import.meta.url);
  const answer1 = getSumOfIndices(input);
  const answer2 = getDecoderKey(input);

  console.log(`
#1 Determine which pairs of packets are already in the right order.
   What is the sum of the indices of those pairs?
   ${answer1}

#2 What is the decoder key for the distress signal?
   ${answer2}
`);
}
