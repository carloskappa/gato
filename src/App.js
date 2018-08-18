import React, { Component } from "react";
import gato from "./gato.png";
import Game from "./Game/Game";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={gato} className="App-logo" alt="logo" />
          <h1 className="App-title">Juega al Gato</h1>
        </header>
        <div className="App-intro">
          <Game />
        </div>
      </div>
    );
  }
}

export default App;
