import { getFullyContained, getPartiallyContained } from './index';

const input = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
5-5,5-8
`;

describe('getFullyContained', () => {
  it('should return the number of pairs where one range fully contains the other', () => {
    expect(getFullyContained(input)).toEqual(3);
  });
});

describe('getPartiallyContained', () => {
  it('should return the number of pairs where the ranges overlap', () => {
    expect(getPartiallyContained(input)).toEqual(5);
  });
});
