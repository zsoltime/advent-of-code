import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

export function getInput(moduleUrl) {
  const __filename = fileURLToPath(moduleUrl);
  const __dirname = dirname(__filename);

  return readFileSync(resolve(__dirname, './input.txt'), {
    encoding: 'utf-8',
  });
}

export function splitLines(input) {
  return input.trim().split('\n');
}

export class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    if (!this.items.length) {
      return null;
    }
    return this.items.pop();
  }

  peek() {
    if (!this.items.length) {
      return null;
    }
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
