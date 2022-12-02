import { getCorrectTotalScore, getTotalScore } from './index';

const input = `A Y
B X
C Z
`;

describe('getTotalScore', () => {
  it('should return the total score following the strategy guide', () => {
    expect(getTotalScore(input)).toEqual(15);
  });
});

describe('getCorrectTotalScore', () => {
  it('should return the total score following the instructions', () => {
    expect(getCorrectTotalScore(input)).toEqual(12);
  });
});
