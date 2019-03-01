import React, { Component } from 'react';
import { Button, Col, Row, Image, Modal, Form } from 'react-bootstrap';

class ModalOponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flip: true
    };
    this.handleFlip = this.handleFlip.bind(this);
  }

  handleFlip() {
    this.setState(prevState => ({
      flip: !prevState.flip
    }));
  }

  render() {
    const you = this.state.flip ? "./public/x_dark.png" : "./public/o_dark.png";
    const oponent = this.state.flip ? "./public/o_dark.png" : "./public/x_dark.png";
    const data = () => {
      return {
        player: this.state.flip ? 'X' : 'O',
        oponent: this.state.flip ? 'O' : 'X'
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
            Play with oponent
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="p-3 mx-auto" as={Row}>
              <Col>
                <h5 as={Col} className="text-center cursive">You</h5>
                <div className="flip_move mx-auto" onClick={this.handleFlip} as={Col}>
                  <Image src={you} />
                </div>
              </Col>
              <Col>
                <h5 as={Col} className="text-center cursive">Oponent</h5>
                <div className="flip_move mx-auto" onClick={this.handleFlip} as={Col}>
                  <Image src={oponent} />
                </div>
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="custom" block className="customAccent cursive"
            onClick={() => this.props.onHide(data())}
          >Start game</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalOponent;