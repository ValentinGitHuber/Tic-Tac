import React, { Component } from 'react';
import { Button, Col, Row, Image, Modal, Form } from 'react-bootstrap';
import { getImage } from '../helpers';

class ModalComputer extends Component {
  constructor(props) {
    super(props);

    this.handleFlip = this.handleFlip.bind(this);
    this.handleLevel = this.handleLevel.bind(this);
    this.state = {
      flip: true,
      level: 'Normal'
    }
  }

  handleFlip() {
    let old = this.state.flip;
    this.setState({ flip: !old });
  }

  handleLevel(newlevel) {
    this.setState({ level: newlevel });
  }

  render() {
    let side1 = this.state.flip ? getImage('x_dark') : getImage('o_dark');
    let side2 = this.state.flip ? getImage('o_dark') : getImage('x_dark');

    let level = (lvl) => {
      if (this.state.level === lvl) {
        return 'custom'
      } return 'light'
    }
    const data = () => {
      return {
        player: this.state.flip ? 'X' : 'O',
        oponent: this.state.flip ? 'O' : 'X',
        level: this.state.level
      }
    }

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="cursive">
            Play with computer
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row}>
              <Col className="p-2">
                <Button variant={level('Easy')} className="cursive" block onClick={() => this.handleLevel('Easy')}>Easy</Button>
              </Col>
              <Col className="p-2">
                <Button variant={level('Normal')} className="cursive" block onClick={() => this.handleLevel('Normal')}>Normal</Button>
              </Col>
              <Col className="p-2">
                <Button variant={level('Hard')} className="cursive" block onClick={() => this.handleLevel('Hard')}>Hard</Button>
              </Col>
            </Form.Group>
            <Form.Group className="p-3 mx-auto" as={Row}>
              <Col>
                <h5 as={Col} className="text-center cursive">Human</h5>
                <div className="flip_move mx-auto" onClick={this.handleFlip} as={Col}>
                  <Image src={side1} />
                </div>
              </Col>
              <Col>
                <h5 as={Col} className="text-center cursive">Computer</h5>
                <div className="flip_move mx-auto" onClick={this.handleFlip} as={Col}>
                  <Image src={side2} />
                </div>
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="custom" block className="cursive"
            onClick={() => this.props.onHide(data())}
          >Start game</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalComputer;