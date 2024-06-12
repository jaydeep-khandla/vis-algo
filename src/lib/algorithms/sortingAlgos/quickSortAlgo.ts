type Animation = [number, number] | [number, number, boolean];

export function getQuickSortAnimations(array: number[]): Animation[] {
  const animations: Animation[] = [];
  if (array.length <= 1) return animations;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(
  array: number[],
  low: number,
  high: number,
  animations: Animation[]
) {
  if (low < high) {
    const pi = partition(array, low, high, animations);
    quickSortHelper(array, low, pi - 1, animations);
    quickSortHelper(array, pi + 1, high, animations);
  }
}

function partition(
  array: number[],
  low: number,
  high: number,
  animations: Animation[]
): number {
  const pivot = array[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    animations.push([j, high]);
    animations.push([j, high]);
    if (array[j] < pivot) {
      i++;
      animations.push([i, array[j], true]);
      animations.push([j, array[i], true]);
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  animations.push([i + 1, array[high], true]);
  animations.push([high, array[i + 1], true]);
  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  return i + 1;
}
