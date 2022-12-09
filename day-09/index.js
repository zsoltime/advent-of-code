import { getInput, splitLines } from '../utils/index.js';

class Knot {
  static DIRECTIONS = {
    U: { x: 0, y: 1 },
    R: { x: 1, y: 0 },
    D: { x: 0, y: -1 },
    L: { x: -1, y: 0 },
  };

  constructor() {
    this.position = {
      x: 0,
      y: 0,
    };
  }

  move(direction) {
    const { x, y } = Knot.DIRECTIONS[direction];

    this.position.x += x;
    this.position.y += y;
  }

  distanceFrom(knot) {
    return {
      x: knot.position.x - this.position.x,
      y: knot.position.y - this.position.y,
    };
  }

  shouldFollow(previousKnot) {
    const distance = this.distanceFrom(previousKnot);

    return Math.abs(distance.x) > 1 || Math.abs(distance.y) > 1;
  }

  toString() {
    return `${this.position.x}, ${this.position.y}`;
  }
}

export function getVisitedPositions(input, numberOfKnots = 2) {
  const lines = splitLines(input);
  const visitedPositions = new Set();

  const rope = Array(numberOfKnots)
    .fill()
    .map(() => new Knot());

  for (let line of lines) {
    let [direction, steps] = line.split(' ');

    for (let i = 0; i < steps; i++) {
      const head = rope[0];
      const tail = rope.at(-1);

      head.move(direction);

      for (let j = 1; j < numberOfKnots; j++) {
        const currentKnot = rope[j];
        const previousKnot = rope[j - 1];
        const distance = currentKnot.distanceFrom(previousKnot);

        if (currentKnot.shouldFollow(previousKnot)) {
          currentKnot.position.x += Math.sign(distance.x);
          currentKnot.position.y += Math.sign(distance.y);
        }
      }

      visitedPositions.add(`${tail}`);
    }
  }

  return visitedPositions;
}

if (process.env.NODE_ENV !== 'test') {
  const input = getInput(import.meta.url);
  const answer1 = getVisitedPositions(input, 2).size;
  const answer2 = getVisitedPositions(input, 10).size;

  console.log(`
#1 Simulate your complete hypothetical series of motions. How many
   positions does the tail of the rope visit at least once?
   ${answer1}

#2 Simulate your complete series of motions on a larger rope with
   ten knots. How many positions does the tail of the rope visit
   at least once?
   ${answer2}
`);
}
