type Animation = [number, number] | [number, number, boolean];

export function getBubbleSortAnimations(array: number[]): Animation[] {
  const animations: Animation[] = [];
  if (array.length <= 1) return animations;
  bubbleSortHelper(array, animations);
  return animations;
}

function bubbleSortHelper(array: number[], animations: Animation[]) {
  const n = array.length;
  let flag: boolean = true;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // These are the values that we're comparing; we push them once to change their color.
      animations.push([j, j + 1]);
      // These are the values that we're comparing; we push them a second time to revert their color.
      animations.push([j, j + 1]);
      if (array[j] > array[j + 1]) {
        // We swap the values at index j and j+1.
        animations.push([j, array[j + 1], true]);
        animations.push([j + 1, array[j], true]);
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        flag = true;
      }
    }
    if (!flag) break;
    flag = false;
  }
}
