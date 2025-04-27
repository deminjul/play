import { useState } from 'react';
import "./app.css";

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button 
      className="text-lg font-bold w-25 h-25 bg-[#F9EEFF] text-[#3a50cb]
      rounded border-8 border-[#EAC4FF] hover:bg-[#B588E9] transition-all"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));

  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  function calculateWinner(squares: (string | null)[]): string | null {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);
  
  let status: string;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <>
      <div className={`w-55 h-10 mt-10 mb-8 grid grid-cols-1 rounded
        mx-auto text-center pt-1 text-xl font-bold 
        ${winner ? "bg-[#FDB8F7] text-[#BC4EB3]" : "bg-[#b5d4f8] text-[#3a50cb]"}`}
      >
        {status}
      </div>

      <div className="grid grid-cols-3 mx-auto w-85 h-27">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="grid grid-cols-3 mx-auto w-85 h-27">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="grid grid-cols-3 mx-auto w-85 h-27">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>

      <div className="flex justify-center w-full mt-4">  
        <button 
          className="w-15 h-15 bg-[#b5d4f8] flex justify-center text-[#3a50cb] text-4xl font-bold 
          rounded border-6 border-[#566BDD] hover:bg-[#566BDD] hover:text-[#b5d4f8] transition-all"
          onClick={handleRestart}
        > 
          ⟳ 
        </button>
      </div>
    </>
  );
}
