import React, { Component } from "react";
import Board from "../Board/Board";
const initialState = {
  squares: new Array(9).fill(null),
  isGameOver: false,
  player: "X",
  cpu: "O"
};
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  calculateWinner(squares) {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    if (this.checkTiedGame(squares)) {
      return null;
    }
    return false;
  }

  resetGame() {
    this.setState(initialState);
  }

  checkValidMove(move, board, turn) {
    const squares = board.slice();
    if (!squares[move]) {
      squares[move] = turn;
      return squares;
    } else {
      return null;
    }
  }

  checkTiedGame(squares) {
    const board = squares.slice();
    const newBoard = board.filter(value => !value);
    return newBoard.length === 0;
  }

  findMoveByScore(scoresArr, score) {
    return scoresArr.indexOf(score);
  }

  handleCpuLogic(board) {
    const newBoard = board.slice();
    const winner = this.calculateWinner(newBoard);
    if (winner !== false) {
      this.resetGame();
      return;
    }
    const bestMove = this.minimax(newBoard, 0, this.state.cpu);
    newBoard[bestMove] = this.state.cpu;

    this.setState({
      squares: newBoard
    });
  }

  minimax(board, depth, player) {
    const isGameOver = this.calculateWinner(board);
    if (isGameOver === false) {
      const moves = [];
      for (let i = 0; i < board.length; i++) {
        const checkValid = this.checkValidMove(i, board, player);
        if (checkValid) {
          const value = this.minimax(
            checkValid,
            depth + 1,
            player === this.state.player ? this.state.cpu : this.state.player
          );
          moves.push({
            score: value,
            index: i
          });
        }
      }

      if (player === this.state.cpu) {
        const maxValue = moves.reduce(
          (a, b) => (a.score >= b.score ? a : b),
          {}
        );
        if (depth === 0) {
          return maxValue.index;
        } else {
          return maxValue.score;
        }
      } else {
        const minValue = moves.reduce(
          (a, b) => (a.score <= b.score ? a : b),
          {}
        );
        if (depth === 0) {
          return minValue.index;
        } else {
          return minValue.score;
        }
      }
    } else if (isGameOver === null) {
      return 0;
    } else if (isGameOver === this.state.player) {
      return depth - 10;
    } else if (isGameOver === this.state.cpu) {
      return 10 - depth;
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    const winner = this.calculateWinner(squares);
    if (winner) {
      this.setState({ isGameOver: true });
    }
    if (winner || squares[i]) {
      return;
    }
    this.setState(
      {
        squares: this.checkValidMove(i, squares, this.state.player)
      },
      () => {
        this.handleCpuLogic(this.state.squares);
      }
    );
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
      </div>
    );
  }
}

export default Game;
