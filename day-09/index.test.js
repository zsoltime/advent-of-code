import { getVisitedPositions } from './index.js';

describe('getVisitedPositions', () => {
  it('should return the number of positions the tail of the rope with two knots visits at least once', () => {
    const input = `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`;

    expect(getVisitedPositions(input, 2).size).toEqual(13);
  });

  it('should return the number of positions the tail of the rope with ten knots visits at least once', () => {
    const input = `
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`;
    expect(getVisitedPositions(input, 10).size).toEqual(36);
  });
});
