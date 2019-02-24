import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
import Cell from './Cell/Cell';

import Minimax from 'tic-tac-toe-minimax';
const { GameStep } = Minimax;
 
 



function drawLine(idFrom, idTo) {
  const div1 = document.getElementById('the'+idFrom);
  const div2 = document.getElementById('the'+idTo);
  let x1 = div1.offsetLeft + (div1.offsetWidth/2);
  let y1 = div1.offsetTop + (div1.offsetHeight/2);
  let x2 = div2.offsetLeft + (div2.offsetWidth/2);
  let y2 = div2.offsetTop + (div2.offsetHeight/2);
  let newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
  newLine.setAttribute('x1', x1);
  newLine.setAttribute('y1', y1);
  newLine.setAttribute('x2', x2);
  newLine.setAttribute('y2', y2);
  let svg = document.getElementById('svg');
  svg.appendChild(newLine);
}



    






class App extends Component {

  initialState(startingSide) {
    /////////////////////////////
      // Tic Tac deafult game rules
      /////////////////////////////
      // Positions are table cells with their ids
      const positions = () => { //array
        return new Array(9).fill(null).map((x, i) => {
          return {id: i};
        });
      }
      // Avaible pieces to put on table with their side
      const pieces = (startingSide) => { //array
        return new Array(9).fill(null).map((x, i) => {
          switch (startingSide) {
            case 1:
              return {side: i < 5 ? 0 : 1};
            default:
              return {side: i < 5 ? 1 : 0};
          }
        });
      };
      // Winning combinations
      const combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      ////////////////////////////////////
      // End of Tic Tac deafult game rules
      ////////////////////////////////////
  
      if(startingSide === 0) {
        const newpos = [0,1,2,3,4,5,6,7,8]
        const huPlayer = 'X';
        const aiPlayer = 'O';
        const symbols = {
            huPlayer: huPlayer,
            aiPlayer: aiPlayer
        }
        const difficulty = "Hard";
        const gameStep = GameStep( newpos, symbols, difficulty );
        const diffIndex = _.difference(newpos, gameStep.board);
    
        console.log('gamestep', gameStep, diffIndex[0])
        this.getClickedId(diffIndex[0]);
      }
  
       return {
        positions: positions(),
        pieces: pieces(),
        game: {
          movingSide: startingSide,
          winning: null,
          draw: null
        },
        combinations,
        ai: startingSide === 1 ? 0 : 1
      }
  
  }
  constructor(props) {
    super(props);
    this.state = this.initialState(1);

    // HandleCliks
    this.getClickedId = this.getClickedId.bind(this);
    this.restart = this.restart.bind(this);
  }

  getClickedId(id) {
    console.log('Clicked:', id)
    // Validate if clicked id is avaible for placing piece
    const validate = this.validatePosition(id);
    console.log('Position valid: ', validate);
    if (validate) {
      this.move(id);
    }
  }

  validatePosition(id) {//true if avaible cell and game not ended
    const positions = this.state.positions;
    const position = _.find(positions, ['id', id]);
    return !_.has(position, 'piece') && 
      this.state.game.winning === null && 
      this.state.game.draw === null;
  }

  move(id) {
    const movingSide = this.state.game.movingSide;
    console.log('Moving side: ', movingSide)
    // Remove piece from pieces by movingSide
    const pieces = this.state.pieces;
    const index = _.findIndex(pieces, { side: movingSide });
    let newpieces = pieces;
    if (index > -1) {
      newpieces =  [...pieces.slice(0,index), ...pieces.slice(index+1)];
    }
    // Set piece to position
    const positions = this.state.positions;
    const position = _.find(positions, ['id', id]);
    position.piece = {
      side: movingSide
    };
    // Revert movingSide
    const game = this.state.game;
    game.movingSide = movingSide === 0 ? 1 : 0;
    
    this.setState({
        positions,
        pieces: newpieces,
        game
      },
      () => this.gameState(game.movingSide)
    );
  }

  gameState(movingSide) {
    const combinations = this.state.combinations;
    const positions = this.state.positions;
    combinations.forEach((comb) => {
      if (//check if position has piece on it
        _.has(positions[comb[0]], 'piece') &&
        _.has(positions[comb[1]], 'piece') &&
        _.has(positions[comb[2]], 'piece')
      ) {
        if (//check if 3 pieces have the same side
          positions[comb[0]].piece.side === positions[comb[1]].piece.side &&
          positions[comb[0]].piece.side === positions[comb[2]].piece.side
        ) {
          //stop game, someone wins
          const winningSide = positions[comb[0]].piece.side;
          const game = this.state.game;
          game.winning = winningSide;

          //render line
          drawLine(_.head(comb), _.last(comb));

          //state
          this.setState({
            game
          });
        } else if (this.state.pieces.length === 0) {//draw, stop game
          const game = this.state.game;
          game.draw = true;
            this.setState({
              game
            }, ()=>{
              console.log('Draw')
            });
        }
      }
    });

    //AI
    const newpos = positions.map((item)=>{
      if (_.has(item, 'piece')) {
        return item.piece.side === 1 ? 'X' : 'O';
      }
      return item.id;
    });
    const huPlayer = 'X';
    const aiPlayer = 'O';
    const symbols = {
        huPlayer: huPlayer,
        aiPlayer: aiPlayer
    }
    const difficulty = "Normal";
    const gameStep = GameStep( newpos, symbols, difficulty );
    const diffIndex = _.difference(newpos, gameStep.board);


    if(movingSide === this.state.ai)
    this.getClickedId(diffIndex[0]);
    
  }

  restart() {
    const newstate = this.initialState(this.state.ai);
    this.setState({...newstate})
    var elements = document.getElementsByTagName('line')
    while (elements[0]) elements[0].parentNode.removeChild(elements[0])
  }



  render() {
    let cells = () => {
      return this.state.positions.map((item, i) => {
        return (<Cell key={i} position={item} sendId={this.getClickedId} />)
      });
    }



    return (
      <div className="Board_container">
        <div className="Cell_container">
          {
            cells()
          }
        </div>
        <div className={
          `Line ${this.state.game.winning != null ? 
            this.state.game.winning.cssClass :
            ''}`
        }/> 
        <br/>
        

    <svg id="svg"></svg>
    <button onClick={this.restart}>Restart game</button>
      </div>
    );
  }
}

export default App;