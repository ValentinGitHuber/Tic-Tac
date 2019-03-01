import React, { Component } from 'react';

import './styles/App.css';
import 'animate.css';

import TopBar from './Components/TopBar';
import Board from './Components/Board';
import Menu from './Components/Menu';

class App extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      board: false,//false
      setupData: {}
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.handleExit = this.handleExit.bind(this);
  }

  handleMenu(setup, menuData) {
    this.setState({
      board: true,
      setupData: {
        setup,
        ...menuData
      }
    });
  }

  handleExit() {
    this.setState({
      board: false,
      setupData: {}
    })
  }

  render() {
    const showBoard = () => {
      if (this.state.board) {
        return (<Board show={this.state.board} setupData={this.state.setupData} exitgame={this.handleExit} />);
      } else {
        return (<Menu show={!this.state.board} setupData={this.handleMenu} />)
      }
    }
    return (
      <div>
        <TopBar />
        <div className="fluid-container">
          {
            showBoard()
          }
          {/* <Board show={this.state.board} setupData={this.state.setupData} />
          <Menu show={!this.state.board} setupData={this.handleMenu} /> */}
        </div>
      </div>
    );
  }
}

export default App;

