import { useState } from "react";
import Node from "./structure/Node";

const createGrid = () => {
  const grid = [];
  for (let i = 0; i < 50; i++) {
    const row = [];
    for (let j = 0; j < 100; j++) {
      const node = {
        row: i,
        col: j,
        isStart: i === 1 && j === 4,
        isFinish: i === 48 && j === 95,
        wall: false,
      };
      row.push(node);
    }
    grid.push(row);
  }
  return grid;
};

export default function PathFinding() {
  const [grid, setGrid] = useState(createGrid());
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const handleMouseDown = (row: number, col: number) => {
    const newGrid = toggleWall(grid, row, col);
    setMouseIsPressed(true);
    setGrid(newGrid);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (!mouseIsPressed) return;
    const newGrid = toggleWall(grid, row, col);
    setGrid(newGrid);
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  // useEffect(() => console.log(grid), [grid]);

  return (
    <div className="mx-auto">
      {grid.map((row, i) => {
        return (
          <div key={i} className="flex my-0">
            {row.map((node, j) => {
              return (
                <Node
                  key={j}
                  node={node}
                  // grid={grid}
                  // setGrid={setGrid}
                  handleMouseDown={handleMouseDown}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseUp={handleMouseUp}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

const toggleWall = (grid: any, row: number, col: number) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    wall: !node.wall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
