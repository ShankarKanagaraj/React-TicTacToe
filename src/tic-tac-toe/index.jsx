import "../tic-tac-toe/style.css";
import { useEffect, useState } from "react";

function Square({ value, onclick }) {
  return (
    <button onClick={onclick} className="square">
      {value}
    </button>

  );
}

export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [status, setStatus] = useState("");

  function getWinner(squares) {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0 ,3 ,6],
      [1, 4, 7],
    ];

    for (let i = 0; i < winningPatterns.length; i++) {
      const [x,y,z] = winningPatterns[i];

      if (
        squares[x] &&
        squares[x] === squares[y] &&
        squares[x] === squares[z]
      ) {
        return squares[x];
      }
    }
    return null;
  }

  function handleClick(getCurrentSquare) {
    let cpySquares = [...squares];
    if (getWinner(cpySquares) || cpySquares[getCurrentSquare]) return;
    cpySquares[getCurrentSquare] = isXTurn ? "X" : "O";
    setIsXTurn(!isXTurn);
    setSquares(cpySquares);
  }

  function handleRestart() {
    setIsXTurn(true);
    setSquares(Array(9).fill(""));
  }

  useEffect(() => {
    if (!getWinner(squares) && squares.every((item) => item !== "")) {
      setStatus(`This is a draw, Please restart the game`);
    } else if (getWinner(squares)) {
      setStatus(`Winner is ${getWinner(squares)}. Please restart the game`);
    } else {
      setStatus(`Next player is ${isXTurn ? "X" : "O"}`);
    }
  }, [squares, isXTurn]);

  return (
    <div className="tic-tac-toe-container">
      <div className="row">
        <Square value={squares[0]} onclick={() => handleClick(0)} />
        <Square value={squares[1]} onclick={() => handleClick(1)} />
        <Square value={squares[2]} onclick={() => handleClick(2)} />
      </div>
      <div className="row">
        <Square value={squares[3]} onclick={() => handleClick(3)} />
        <Square value={squares[4]} onclick={() => handleClick(4)} />
        <Square value={squares[5]} onclick={() => handleClick(5)} />
      </div>
      <div className="row">
        <Square value={squares[6]} onclick={() => handleClick(6)} />
        <Square value={squares[7]} onclick={() => handleClick(7)} />
        <Square value={squares[8]} onclick={() => handleClick(8)} />
      </div>
      <h1>{status}</h1>
      <button onClick={handleRestart}>Restart</button>
    </div>
  );
}

