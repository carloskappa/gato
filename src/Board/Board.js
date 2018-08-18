import React, { Component } from "react";
import "./Board.css";
import Tile from "../Tile/Tile";
class Board extends Component {
  renderTile(i) {
    return (
      <Tile
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderBoard() {
    const board = [];
    let helper = 0;
    for (let i = 0; i < 3; i++) {
      const children = [];
      for (let j = 0; j < 3; j++) {
        children.push(this.renderTile(helper));
        helper++;
      }
      board.push(
        <div key={i} className="board-row">
          {children}
        </div>
      );
    }
    return board;
  }

  render() {
    return <div>{this.renderBoard()}</div>;
  }
}

export default Board;
