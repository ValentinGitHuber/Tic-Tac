import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    // Tic Tac deafult game rules
    // Starting default side
    const starts = 1;
    // Positions are table cells
    const positions = () => {
      return new Array(9).fill(null).map((x, i) => {
        return {id: i};
      });
    }
    // Avaible pieces to put on table
    const pieces = (starts) => {
      return new Array(9).fill(null).map((x, i) => {
        switch (starts) {
          case 1:
            return {side: i < 5 ? 1 : 0};
          case 0:
            return {side: i < 5 ? 0 : 1};
        }
      });
    };

    // App state
    this.state = {
      positions: positions(),
      pieces: pieces(),
      game: {
        starts: starts,
        win: null,
        loose: null
      }
    };
  }



  render() {
    return (
      <div>
        <p>Tic Tac</p>
      </div>
    );
  }
}

export default App;