import { words, sumBy, sum, min } from "lodash/fp";

type File = {
  isDir: boolean;
  size: number;
  name: string;
  files: Record<string, File>;
  parent: null | File;
};

const ROOT = "root";
const TOTAL = 70000000;
const UPDATE_SIZE = 30000000;

export const addDirSizes = (file: File): void => {
  if (file.size > -1) {
    return;
  }

  const filesArr = Object.values(file.files);
  filesArr.map(addDirSizes);
  const total = sumBy("size", filesArr);
  file.size = total;
};

export const createFSTree = (input: string): File => {
  const root: File = {
    isDir: true,
    size: -1,
    name: ROOT,
    files: {},
    parent: null,
  };

  const lines = input.split("\n");
  let currentFile = root;
  let i = 0;
  while (i < lines.length) {
    const currentLine = lines[i] as string;
    const isCommand = currentLine.startsWith("$");
    if (isCommand) {
      const cmd = currentLine.replace("$ ", "");
      if (cmd.startsWith("cd")) {
        if (cmd === "cd .." && currentFile.parent) {
          currentFile = currentFile.parent;
        } else if (cmd === "cd /") {
          currentFile = root;
        } else {
          const dirName = words(currentLine)[1] as string;
          currentFile = currentFile.files[dirName]!;
        }
      }
    } else {
      if (currentLine.startsWith("dir")) {
        const dirName = words(currentLine)[1] as string;
        currentFile.files[dirName] = {
          name: dirName,
          isDir: true,
          size: -1,
          files: {},
          parent: currentFile,
        };
      } else {
        const [sizeStr, fileName, suffix] = words(currentLine) as [
          string,
          string,
          string
        ];
        const fullFileName = `${fileName}.${suffix}`;
        currentFile.files[fullFileName] = {
          name: fullFileName,
          isDir: false,
          size: parseInt(sizeStr, 10),
          files: {},
          parent: currentFile,
        };
      }
    }

    i++;
  }

  addDirSizes(root);
  return root;
};

export const sumTargetDirs = (fsTree: File, upperBound: number): number => {
  if (!fsTree.isDir) {
    return 0;
  }

  const subDirsSum = sum(
    Object.values(fsTree.files).map((file) => sumTargetDirs(file, upperBound))
  );
  return fsTree.size < upperBound ? subDirsSum + fsTree.size : subDirsSum;
};

const findDirSizesToDeleteRecursive = (
  fsTree: File,
  spaceToClear: number
): number[] => {
  if (!fsTree.isDir) {
    return [];
  }

  const nestedResults = Object.values(fsTree.files).map((file) =>
    findDirSizesToDeleteRecursive(file, spaceToClear)
  );

  return [fsTree.size]
    .concat(...nestedResults)
    .filter((size) => size >= spaceToClear);
};

export const findDirSizeToDelete = (fsTree: File): number => {
  const currentSize = fsTree.size;
  const spaceToClear = UPDATE_SIZE - (TOTAL - currentSize);

  if (spaceToClear <= 0) {
    return 0;
  }

  return min(findDirSizesToDeleteRecursive(fsTree, spaceToClear))!;
};
