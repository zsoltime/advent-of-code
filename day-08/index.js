import { getInput, splitLines } from '../utils/index.js';

function parseInput(input) {
  return splitLines(input).map((str) => str.split('').map(Number));
}

function getNeighbours(grid, rowIndex, colIndex) {
  return [
    // top
    grid
      .slice(0, rowIndex)
      .map((row) => row[colIndex])
      .reverse(),
    // right
    grid[rowIndex].slice(colIndex + 1),
    // bottom
    grid.slice(rowIndex + 1).map((row) => row[colIndex]),
    // left
    grid[rowIndex].slice(0, colIndex).reverse(),
  ];
}

function isVisible(grid, rowIndex, colIndex) {
  const height = grid[rowIndex][colIndex];
  const neighbours = getNeighbours(grid, rowIndex, colIndex);

  return neighbours.some((direction) =>
    direction.every((tree) => tree < height),
  );
}

export function getTotalVisibleTrees(input) {
  const grid = parseInput(input);
  let visible = 0;

  grid.forEach((row, rowIndex) =>
    row.forEach((_, colIndex) => {
      if (isVisible(grid, rowIndex, colIndex)) {
        visible++;
      }
    }),
  );

  return visible;
}

function getScenicScore(grid, rowIndex, colIndex) {
  const height = grid[rowIndex][colIndex];
  const neighbours = getNeighbours(grid, rowIndex, colIndex);

  function getCount(trees) {
    let counter = 0;

    for (let tree of trees) {
      counter++;
      if (tree >= height) {
        return counter;
      }
    }

    return counter;
  }

  return neighbours.reduce((a, b) => a * getCount(b), 1);
}

export function getHighestScenicScore(input) {
  const grid = parseInput(input);
  let highestScore = 0;

  grid.forEach((row, rowIndex) =>
    row.forEach((_, colIndex) => {
      let score = getScenicScore(grid, rowIndex, colIndex);

      if (score > highestScore) {
        highestScore = score;
      }
    }),
  );

  return highestScore;
}

if (process.env.NODE_ENV !== 'test') {
  const input = getInput(import.meta.url);
  const answer1 = getTotalVisibleTrees(input);
  const answer2 = getHighestScenicScore(input);

  console.log(`
#1 Consider your map; how many trees are visible from outside
   the grid?
   ${answer1}

#2 Consider each tree on your map. What is the highest scenic
   score possible for any tree?
   ${answer2}
`);
}
