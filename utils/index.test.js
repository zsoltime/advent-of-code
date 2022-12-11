import { getLCM, splitLines, Stack } from './index.js';

describe('getLCM', () => {
  it('returns the expected LCM for two numbers', () => {
    expect(getLCM([2, 4])).toBe(4);
  });

  it('returns the expected LCM for three or more numbers', () => {
    expect(getLCM([2, 4, 6])).toBe(12);
  });

  it('returns 1 when given an empty array or an array of zeros', () => {
    expect(getLCM([])).toBe(1);
  });

  it('returns the expected LCM for a large number of numbers', () => {
    expect(getLCM([2, 4, 6, 8, 10])).toBe(120);
  });

  it('returns the expected LCM when given a mixture of positive and negative numbers, and zero', () => {
    expect(getLCM([2, -4, 6, 0, -8, 10])).toBe(0);
  });

  it('returns the expected LCM when given an array of prime numbers', () => {
    expect(getLCM([2, 3, 5, 7, 11])).toBe(2310);
  });

  it('returns the expected LCM when given an array of numbers that are all multiples of a common number', () => {
    expect(getLCM([6, 12, 18, 24, 30])).toBe(360);
  });
});

describe('splitLines', () => {
  it('should return an array of lines from the input', () => {
    const input = `line 1
line 2
line 3`;
    expect(splitLines(input)).toEqual(['line 1', 'line 2', 'line 3']);
  });

  it('should remove leading and trailing empty lines', () => {
    const input = `

line 1

line 3

`;
    expect(splitLines(input)).toEqual(['line 1', '', 'line 3']);
  });
});

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  test('push()', () => {
    stack.push(1);
    expect(stack.items).toEqual([1]);

    stack.push(2);
    expect(stack.items).toEqual([1, 2]);
  });

  test('pop()', () => {
    stack.push(1);
    stack.push(2);

    expect(stack.pop()).toEqual(2);
    expect(stack.items).toEqual([1]);

    expect(stack.pop()).toEqual(1);
    expect(stack.items).toEqual([]);

    expect(stack.pop()).toBeNull();
    expect(stack.items).toEqual([]);
  });

  test('peek()', () => {
    stack.push(1);
    stack.push(2);

    expect(stack.peek()).toEqual(2);
    expect(stack.items).toEqual([1, 2]);

    expect(stack.pop()).toEqual(2);
    expect(stack.items).toEqual([1]);
  });

  test('isEmpty()', () => {
    expect(stack.isEmpty()).toBeTruthy();

    stack.push(1);
    expect(stack.isEmpty()).toBeFalsy();

    stack.pop();
    expect(stack.isEmpty()).toBeTruthy();
  });
});
