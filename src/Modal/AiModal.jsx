import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

class AiModal extends Component {
      constructor(props) {
        super(props);

        this.handleFlip = this.handleFlip.bind(this);
        this.handleLevel = this.handleLevel.bind(this);
        this.state = {
          flip: false,
          level: 'normal'
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
      let side1 = process.env.PUBLIC_URL + (this.state.flip ? "/x_dark.png" : "/o_dark.png");
      let side2 = process.env.PUBLIC_URL + (this.state.flip ? "/o_dark.png" : "/x_dark.png");

      let level = (lvl) => {
        if (this.state.level === lvl) {
          return 'custom'
        } return 'light'
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
                <Col className="p-2"><Button variant={level('easy')} className="cursive" block onClick={()=>this.handleLevel('easy')}>Easy</Button></Col>
                <Col className="p-2"><Button variant={level('normal')} className="cursive" block onClick={()=>this.handleLevel('normal')}>Normal</Button></Col>
                <Col className="p-2"><Button variant={level('hard')} className="cursive" block onClick={()=>this.handleLevel('hard')}>Hard</Button></Col>                    
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
            <Button onClick={this.props.onHide} variant="custom" block className="cursive">Start game</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }

  export default AiModal;