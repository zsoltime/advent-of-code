import { getInput, splitLines } from '../utils/index.js';

const ROOT = '.';

function getType(line) {
  if (line.startsWith('$')) return 'command';
  if (line.startsWith('dir')) return 'directory';
  return 'file';
}

export function getDirectorySizes(input) {
  const lines = splitLines(input);
  const dirs = new Map();
  let currentDirectory = [ROOT];

  for (let line of lines) {
    if (getType(line) === 'command') {
      let [, command, arg] = line.split(' ');

      if (command === 'cd') {
        if (arg === '/') {
          currentDirectory.splice(1);
        } else if (arg === '..') {
          currentDirectory.pop();
        } else {
          currentDirectory.push(arg);
        }
      }
    }

    if (getType(line) === 'file') {
      const [size] = line.split(' ');
      const key = currentDirectory.join('/');

      dirs.set(key, (dirs.get(key) || 0) + Number(size));

      if (currentDirectory.length > 1) {
        for (let i = currentDirectory.length - 1; i > 0; i--) {
          const parentKey = currentDirectory.slice(0, i).join('/');

          dirs.set(parentKey, (dirs.get(parentKey) || 0) + Number(size));
        }
      }
    }
  }

  return dirs;
}

export function getSumOfTotalSizes(dirs) {
  const MAX_DIR_SIZE = 100_000;
  let total = 0;

  for (let size of dirs.values()) {
    if (size <= MAX_DIR_SIZE) {
      total += size;
    }
  }

  return total;
}

export function getSmallestDirToDelete(dirs) {
  const TOTAL_DISKSPACE = 70_000_000;
  const UNUSED_SPACE = 30_000_000;
  const usedSpace = dirs.get(ROOT);
  const minRequired = UNUSED_SPACE - (TOTAL_DISKSPACE - usedSpace);
  let smallest = Infinity;

  for (let size of dirs.values()) {
    if (size >= minRequired && size < smallest) {
      smallest = size;
    }
  }

  return smallest;
}

if (process.env.NODE_ENV !== 'test') {
  const input = getInput(import.meta.url);
  const dirs = getDirectorySizes(input);
  const answer1 = getSumOfTotalSizes(dirs);
  const answer2 = getSmallestDirToDelete(dirs);

  console.log(`
#1 What is the sum of the total sizes of the directories with
   a total size of at most 100000?
   ${answer1}

#2 What is the size of the smallest directory that, if deleted,
   would free up enough space on the filesystem?
   ${answer2}
`);
}
