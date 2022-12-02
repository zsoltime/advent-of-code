import { getMaxCalories, getTopThreeCalories } from './index.js';

const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

describe('getMaxCalories', () => {
  it('should return the total calories carried by the Elf carrying the most Calories', () => {
    expect(getMaxCalories(input)).toEqual(24000);
  });
});

describe('getTopThreeCalories', () => {
  it('should return the calories the top 3 Elves carrying in total', () => {
    expect(getTopThreeCalories(input)).toEqual(45000);
  });
});
