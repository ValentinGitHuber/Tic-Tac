import React, { Component } from 'react';
import './App.css';
import Cell from './Cell/Cell';

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
          default:
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
    let cells = () => {
      return this.state.positions.map((item, i) => {
        return (<Cell key={i}/>)
      });
    }

    return (
      <div>
        <div className="Cell_container">
          {
            cells()
          }
        </div>
      </div>
    );
  }
}

export default App;