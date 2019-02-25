import React, { Component } from 'react';
import './App.css';
import 'animate.css';
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons'; */

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import Table from 'react-bootstrap/Table';

import AiModal from './Modal/AiModal';
import OponentModal from './Modal/OponentModal';

// import Minimax from 'tic-tac-toe-minimax';
// import * as Helpers from './helpers';

class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = { 
      modal: {
        ai: false,
        oponent: false
      },
      animate: true
    };
  }
  
  render() {

    let startGame = () => {

      

      this.setState({ 
        modal: {
          ai: false,
          oponent: false
        },
        animate: true
      })
    };

    let animate = (str) => {
      if(this.state.animate){
        return ' animated '+str;
      }return;
    }

    return (
      <div>
        <Navbar bg="light">
          <div className="mx-auto">
            <Image src="/logo_big.png" width="32" height="32" className={animate('fadeInDownBig')} />
            Tic Tac Toe
          </div>
        </Navbar>


        <div className="fluid-container">
          <Container className={'board_container p-5 d-none '+animate('fadeIn d-block')}>
            <div className="board">
              <div className="board_row">
                <div className="pos">0</div>
                <div className="pos">3</div>
                <div className="pos">6</div>
              </div>
              <div className="board_row">
                <div className="pos">1</div>
                <div className="pos">4</div>
                <div className="pos">7</div>
              </div>
              <div className="board_row">
                <div className="pos">2</div>
                <div className="pos">5</div>
                <div className="pos">8</div>
              </div>
            </div>
          </Container>
          <Container className="menu_container">
            <Row>
              <Image src="/logo_big.png" width="0" height="0" className={'homepage_image mx-auto w-50 h-50 mt-5 '+animate('zoomOutUp')} />
            </Row>
            <Row className={'select_mode p-5 cursive '+animate('zoomOutDown')}>
              <Col lg={5} className="mb-4 mx-auto">
                  <Button variant="secondary" size="lg" block onClick={() => this.setState({ modal: {ai: true} })}>
                    Human vs Computer
                  </Button>
                  <AiModal
                      show={this.state.modal.ai}
                      onHide={startGame}
                    />
                </Col>
                <Col lg={5} className="mx-auto">
                  <Button variant="secondary" size="lg" block onClick={() => this.setState({ modal: {oponent: true} })}>
                    Human vs Human
                  </Button>
                  <OponentModal
                      show={this.state.modal.oponent}
                      onHide={startGame}
                    />
                </Col>
            </Row>
          </Container>
          
        </div>
        
        </div>
    );
  }
}

export default App;

