import { useState, useEffect, useRef } from "react";
import { getMergeSortAnimations } from "../lib/algorithms/sortingAlgos/mergeSortAlgo";
import { getBubbleSortAnimations } from "../lib/algorithms/sortingAlgos/bubbleSortAlgo";

// Interface for the ElementsRefObject
type ElementsRefObject = {
  elements?: HTMLInputElement | null;
  delay?: HTMLInputElement | null;
  resetButton?: HTMLButtonElement | null;
  bubbleSortButton?: HTMLButtonElement | null;
  mergeSortButton?: HTMLButtonElement | null;
  quickSortButton?: HTMLButtonElement | null;
  heapSortButton?: HTMLButtonElement | null;
};

// Function to get a random integer between two values
// From https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to create an array of random numbers
const createArray = (ele: number): number[] => {
  const array = [];
  for (let i = 0; i < ele; i++) {
    array.push(getRandomInt(5, 500));
  }
  return array;
};

export default function SortingArray() {
  const [state, setState] = useState<number[]>([]);
  const [runTime, setRunTime] = useState<number>(0);
  const barRefs = useRef<HTMLDivElement[]>([]);
  const [comp, setComp] = useState<number>(0);
  const [elements, setElements] = useState<number>(100);
  const [delay, setDelay] = useState<number>(4);

  const elementRefs = useRef<ElementsRefObject>({});

  useEffect(() => {
    // Create an array of random numbers when the component mounts
    setState(createArray(elements));
  }, [elements]);

  // Function to disable all buttons
  const disableButtons = (): void => {
    Object.values(elementRefs.current).forEach((el) => {
      if (el instanceof HTMLElement) {
        if (!el.disabled) {
          el.disabled = true;
        } else {
          el.disabled = false;
        }
      }
    });
  };

  // Function to reset the array
  const resetArray = (): void => {
    setState(createArray(elements));
    barRefs.current.forEach((bar) => {
      bar.style.backgroundColor = "black";
    });
  };

  // Function to trigger bubble sort algorithm
  function bubbleSort(): void {
    disableButtons();
    let swap = 0;
    // comp = 0;
    const start = performance.now();
    const animations = getBubbleSortAnimations(state);
    const end = performance.now();
    const time = end - start;
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = animations[i].length === 2;
      if (isColorChange) {
        setComp((prev) => prev++);
        const [barOneIdx, barTwoIdx] = animations[i];
        const color = i % 2 === 0 ? "green" : "black";
        setTimeout(() => {
          barRefs.current[barOneIdx].style.backgroundColor = color;
          barRefs.current[barTwoIdx].style.backgroundColor = color;
        }, i * delay);
      } else {
        swap++;
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = barRefs.current[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * delay);
      }
    }
    console.log("swap: ", swap / 2);
    console.log("comp: ", comp / 2);
    setTimeout(() => {
      barRefs.current.forEach((bar) => {
        bar.style.backgroundColor = "green";
      });
      setRunTime(time);
      disableButtons();
    }, animations.length * delay);
  }

  // Function to trigger merge sort algorithm
  function mergeSort(): void {
    disableButtons();
    const start = performance.now();
    const animations = getMergeSortAnimations(state);
    const end = performance.now();
    const time = end - start;
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const color = i % 3 === 0 ? "#E39828" : "black";
        setTimeout(() => {
          barRefs.current[barOneIdx].style.backgroundColor = color;
          barRefs.current[barTwoIdx].style.backgroundColor = color;
        }, i * delay);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = barRefs.current[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * delay);
      }
    }
    // Reset bar colors to green after sorting is complete
    setTimeout(() => {
      barRefs.current.forEach((bar) => {
        // Calculate and set the runtime after all animations are complete
        bar.style.backgroundColor = "green";
        bar.style.transition = "background-color 0.5s";
      });
      setRunTime(time);
      disableButtons();
    }, animations.length * delay);
  }

  // Function to trigger quick sort algorithm
  function quickSort(): void {}

  // Function to trigger heap sort algorithm
  function heapSort(): void {}

  return (
    <main className="w-fit flex flex-col gap-8 px-10 pb-10 mx-auto border-2 border-black">
      <div className="w-full flex justify-between items-center gap-2 px-3 mt-3 border-2 shadow-[0.2em_0.2em] border-black">
        <span className="font-bold font-mono">
          {runTime} {" ms "}
        </span>
        <span>
          <label className="font-mono font-bold" htmlFor="arraySize">
            Elements{" "}
          </label>
          <input
            className=" bg-transparent"
            type="range"
            name="arraySize"
            min={50}
            max={150}
            value={elements}
            onChange={(e) => setElements(Number(e.target.value))}
            id="arraySize"
            ref={(el) => (elementRefs.current.elements = el!)}
          />
        </span>
        <span>
          <label className="font-mono font-bold" htmlFor="arraySize">
            Delay{" "}
          </label>
          <input
            className=" bg-transparent"
            type="range"
            name="delay"
            id="delay"
            min={1}
            max={100}
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            ref={(el) => (elementRefs.current.delay = el!)}
          />
        </span>
        <span className="font-bold font-mono">
          {elements} {" elements "}
        </span>
      </div>
      <div className="flex w-full gap-0.5 items-end h-[500px]">
        {/* Map over the array and create a div for each number */}
        {state.map((value, idx) => (
          <div
            ref={(el) => (barRefs.current[idx] = el!)}
            key={idx}
            style={{
              height: `${value}px`,
              width: "100%",
              backgroundColor: "black",
            }}
          ></div>
        ))}
      </div>
      <div className="flex w-full justify-between gap-5">
        <button
          onClick={resetArray}
          className="btn"
          ref={(el) => (elementRefs.current.resetButton = el!)}
        >
          Reset
        </button>
        <button
          onClick={bubbleSort}
          className="btn"
          ref={(el) => (elementRefs.current.bubbleSortButton = el!)}
        >
          Bubble Sort
        </button>
        <button
          onClick={mergeSort}
          className="btn"
          ref={(el) => (elementRefs.current.mergeSortButton = el!)}
        >
          Merge Sort
        </button>
        <button
          onClick={quickSort}
          className="btn"
          ref={(el) => (elementRefs.current.quickSortButton = el!)}
        >
          Quick Sort
        </button>
        <button
          onClick={heapSort}
          className="btn"
          ref={(el) => (elementRefs.current.heapSortButton = el!)}
        >
          Heap Sort
        </button>
        <button
          // onClick={() => testSortingAlgorithms(mergeSortAlgo)}
          className="btn"
        >
          Test Algorithms
        </button>
      </div>
    </main>
  );
}

// Only for Testing
// function testSortingAlgorithms(sortAlgo: (array: number[]) => number[]) {
//   for (let i = 0; i < 100; i++) {
//     const array = [];
//     const length = getRandomInt(1, 1000);
//     for (let i = 0; i < length; i++) {
//       array.push(getRandomInt(-1000, 1000));
//     }
//     const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
//     const mergeSortedArray = getMergeSortAnimations(array.slice());
//     console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
//   }
// }

// function arraysAreEqual(array1: number[], array2: number[]) {
//   if (array1.length !== array2.length) return false;
//   for (let i = 0; i < array1.length; i++) {
//     if (array1[i] !== array2[i]) return false;
//   }
//   return true;
// }
