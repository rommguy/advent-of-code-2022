import { sample, input } from "./input";
import { createFSTree, findDirSizeToDelete, sumTargetDirs } from "./solution";

describe("no space left problem", () => {
  describe("creating the FS tree", () => {
    it("should return a File object", () => {
      const result = createFSTree(sample);

      expect(result.isDir).toEqual(true);
      expect(result.name).toEqual("root");
    });

    it("should calc the size of each directory", () => {
      const result = createFSTree(sample);

      expect(result.files.a!.size).toEqual(94853);
      expect(result.files.d!.size).toEqual(24933642);
    });

    it("should summarize sizes of all directories with size < 100000", () => {
      const fsTree = createFSTree(sample);
      const result = sumTargetDirs(fsTree, 100000);

      expect(result).toEqual(95437);
    });

    it("should summarize sizes of all directories below the upper bound, for real input", () => {
      const fsTree = createFSTree(input);
      const result = sumTargetDirs(fsTree, 100000);

      expect(result).toEqual(1334506);
    });
  });

  describe("finding directory to delete", () => {
    it("should find the folder to delete in sample", () => {
      const fsTree = createFSTree(sample);
      const dirSizeToDelete = findDirSizeToDelete(fsTree);

      expect(dirSizeToDelete).toEqual(24933642);
    });

    it("should find the folder to delete in real input", () => {
      const fsTree = createFSTree(input);
      const dirSizeToDelete = findDirSizeToDelete(fsTree);

      expect(dirSizeToDelete).toEqual(7421137);
    });
  });
});
