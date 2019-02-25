import React, { Component } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import AiModal from './Modal/AiModal';
import OponentModal from './Modal/OponentModal';

// import Minimax from 'tic-tac-toe-minimax';
// import * as Helpers from './helpers';

class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = { 
      modal: {
        ai: true,
        oponent: false
      }
    };
  }
  
  render() {
    let modalClose = () => {
      this.setState({ 
        modal: {
          ai: false,
          oponent: false
        }
      })
    };

    return (
      <div>
        <Navbar bg="light">
          <div className="mx-auto">
            {/* <img src="/logo_extra_small.png" width="32" height="32" className="d-inline-block align-top" alt=""/> */}
            Tic Tac Toe
          </div>
        </Navbar>


        <div className="fluid-container">
          <Container>
            <Row>
              <Image src="/logo_big.png" className="homepage_image mx-auto w-50 h-50 mt-5" />
            </Row>
            <Row className="select_mode p-5 cursive">
              <Col lg={5} className="mb-4 mx-auto">
                  <Button variant="secondary" size="lg" block onClick={() => this.setState({ modal: {ai: true} })}>
                  <FontAwesomeIcon icon={faUser} />Human vs Computer <FontAwesomeIcon icon={faLaptop} />
                  </Button>
                  <AiModal
                      show={this.state.modal.ai}
                      onHide={modalClose}
                    />
                </Col>
                <Col lg={5} className="mx-auto">
                  <Button variant="secondary" size="lg" block onClick={() => this.setState({ modal: {oponent: true} })}>
                    <FontAwesomeIcon icon={faUser} />Human vs Human <FontAwesomeIcon icon={faUser} />
                  </Button>
                  <OponentModal
                      show={this.state.modal.oponent}
                      onHide={modalClose}
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

