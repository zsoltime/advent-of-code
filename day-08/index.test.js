import { getHighestScenicScore, getTotalVisibleTrees } from './index.js';

const input = `
30373
25512
65332
33549
35390
`;

describe('getTotalVisibleTrees', () => {
  it('should return the number of trees visible from outside the grid', () => {
    expect(getTotalVisibleTrees(input)).toEqual(21);
  });
});

describe('getHighestScenicScore', () => {
  it('should return the highest scenic score possible for any tree', () => {
    expect(getHighestScenicScore(input)).toEqual(8);
  });
});
