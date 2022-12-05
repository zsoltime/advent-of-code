import { getTopCrates, getTopCrates9001 } from './index.js';

const input = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;

describe('getTopCrates', () => {
  it('should return the top crates from each stack', () => {
    expect(getTopCrates(input)).toEqual('CMZ');
  });
});

describe('getTopCrates9001', () => {
  it('should return the top crates from each stack', () => {
    expect(getTopCrates9001(input)).toEqual('MCD');
  });
});
