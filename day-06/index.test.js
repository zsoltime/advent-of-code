import { firstNonRepeatingSubstring } from './index.js';

const testCases = [
  {
    input: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
    startOfMessage: 19,
    startOfPacket: 7,
  },
  {
    input: 'bvwbjplbgvbhsrlpgdmjqwftvncz',
    startOfMessage: 23,
    startOfPacket: 5,
  },
  {
    input: 'nppdvjthqldpwncqszvftbrmjlhg',
    startOfMessage: 23,
    startOfPacket: 6,
  },
  {
    input: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
    startOfMessage: 29,
    startOfPacket: 10,
  },
  {
    input: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
    startOfMessage: 26,
    startOfPacket: 11,
  },
];
describe('firstNonRepeatingSubstring', () => {
  it('should return the start-of-packet marker', () => {
    for (let testCase of testCases) {
      expect(firstNonRepeatingSubstring(testCase.input, 4)).toEqual(
        testCase.startOfPacket,
      );
    }
  });

  it('should return the start-of-packet message', () => {
    for (let testCase of testCases) {
      expect(firstNonRepeatingSubstring(testCase.input, 14)).toEqual(
        testCase.startOfMessage,
      );
    }
  });
});
