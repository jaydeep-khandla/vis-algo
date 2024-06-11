// import { useState } from "react";

type Node = {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  wall: boolean;
};

type NodeProps = {
  node: Node;
  //   grid: Node[][];
  //   setGrid: React.Dispatch<React.SetStateAction<Node[][]>>;
  handleMouseDown: (row: number, col: number) => void;
  handleMouseEnter: (row: number, col: number) => void;
  handleMouseUp: () => void;
};

export default function Node({
  node,
  //   grid,
  //   setGrid,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
}: NodeProps) {
  const { row, col, isStart, isFinish, wall } = node;

  const isFinishClass = isFinish ? "bg-green-500" : isStart ? "bg-red-500" : "";
  const wallClass = wall ? "bg-black" : "";

  return (
    <div
      className={`w-3 h-3 p-1 m-0 border-[1px]  border-black ${isFinishClass} ${wallClass}`}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
      onMouseUp={() => handleMouseUp()}
    ></div>
  );
}
