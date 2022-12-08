import { splitLines, Stack } from './index.js';

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
