
import React from 'react';
import {useState} from 'react';


function Square({value, onSquareClick}) {
  return (
    <button className="squares" onClick={onSquareClick} >{value}</button>
  )
}

function Board({squares, xIsNext, onPlay}) {
  
  function handleClick(i) {
    if (squares[i] || calculateWinner()) {
      return;
    }
    let nextSquares = squares.slice();
    
    nextSquares[i] = xIsNext ?  'X' : 'O';
    onPlay(nextSquares);
  }
  function calculateWinner() {
    const winners = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [2,4,6],
      [0,4,8]
    ]
    for (let i = 0; i < winners.length; i++) {
      const [a,b,c] = winners[i];
      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
        return squares[a];
      }
    }
  }

  const winner = calculateWinner();
  let status;
  if (winner) {
    status = winner + ' wins!';
  } else {
    status = (xIsNext ? 'X' : 'O') + ' is next';
  }

  return (
    <div>
      <h1 className="status">{status}</h1>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  )
}

export default function Game() {

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove+1), nextSquares];
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length-1)
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description = move > 0 ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move} className="timetravel-button">
        <button onClick={() => jumpTo(move)} >{description}</button>
      </li>
    )
  })

  return (
    <div>
      <div className="header">
          <h1>Tic Tac Toe</h1>
      </div>
      <div className="game">
        
        <div className="board">
          <Board squares={currentSquares } xIsNext={xIsNext} onPlay={handlePlay} />
        </div>
        <div className="dropdown" >
          <ol className="dropdown-list">{moves}</ol>
        </div>
      </div>
    </div>
  )
}
