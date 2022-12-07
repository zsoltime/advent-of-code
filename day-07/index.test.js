import {
  getDirectorySizes,
  getSmallestDirToDelete,
  getSumOfTotalSizes,
} from './index.js';

let input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const dirs = getDirectorySizes(input);

describe('getSumOfTotalSizes', () => {
  it('should return the sum of the total sizes of the directories with a total size of at most 100000', () => {
    expect(getSumOfTotalSizes(dirs)).toEqual(95437);
  });
});

describe('getSmallestDirToDelete', () => {
  it('should return the size of the smallest directory that, if deleted, would free up enough space on the filesystem', () => {
    expect(getSmallestDirToDelete(dirs)).toEqual(24933642);
  });
});
