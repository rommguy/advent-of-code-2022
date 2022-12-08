export const getVisibleIndexes = (line: string[]): number[] => {
  let max = "0";
  const visibleIndexes = new Set<number>();

  for (let i = 0; i < line.length; i++) {
    const current = line[i] as string;
    if (current > max) {
      max = current;
      visibleIndexes.add(i);
    }
  }

  max = "0";

  for (let j = line.length - 1; j >= 0; j--) {
    const current = line[j] as string;
    if (current > max) {
      max = current;
      visibleIndexes.add(j);
    }
  }

  return [...visibleIndexes.values()];
};
