export const isMarker = (str: string): boolean => {
  const charSet = new Set();
  for (let i = 0; i < str.length; i++) {
    if (charSet.has(str[i])) {
      return false;
    }
    charSet.add(str[i]);
  }

  return true;
};

export const findMarker = (input: string, targetLength: number): number => {
  for (let i = targetLength; i++; i < input.length + 1) {
    if (isMarker(input.substring(i - targetLength, i))) {
      return i;
    }
  }
  return -1;
};
