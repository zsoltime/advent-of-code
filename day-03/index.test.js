import { getSumOfPriorities, getSumOfGroupedPriorities } from './index';

const input = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;

describe('getSumOfPriorities', () => {
  it('should return the sum of the priorities', () => {
    expect(getSumOfPriorities(input)).toEqual(157);
  });
});

describe('getSumOfGroupedPriorities', () => {
  it('should return the sum of the grouped priorities', () => {
    expect(getSumOfGroupedPriorities(input)).toEqual(70);
  });
});
