import { Stack } from './index.js';

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
