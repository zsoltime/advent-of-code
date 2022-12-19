import { getDecoderKey, getSumOfIndices } from './index.js';

const input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
`;

describe('getSumOfIndices', () => {
  it('should return the sum of the indices of the pairs already in the right order', () => {
    expect(getSumOfIndices(input)).toEqual(13);
  });
});

describe('getDecoderKey', () => {
  it('should return the decoder key for the distress signal', () => {
    expect(getDecoderKey(input)).toEqual(140);
  });
});
