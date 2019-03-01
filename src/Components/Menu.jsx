import React, { Component } from 'react';
import { Button, Col, Row, Container, Image } from 'react-bootstrap';
import ModalComputer from './ModalComputer';
import ModalOponent from './ModalOponent';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {//modal
            computer: false,
            oponent: false
        }
        this.childOponentHandler = this.childOponentHandler.bind(this);
        this.childComputerHandler = this.childComputerHandler.bind(this);
    }

    hideModals() {
        this.setState({
            computer: false,
            oponent: false
        });
    }
    childOponentHandler(childData) {
        if (childData) {
            this.props.setupData('oponent', childData);
        } this.hideModals();
    }
    childComputerHandler(childData) {
        if (childData) {
            this.props.setupData('computer', childData);
        } this.hideModals();
    }


    render() {
        return (
            <Container className='menu_container'>
                <Row>
                    <Image src="./public/logo_big.png" className="homepage_image mx-auto w-50 h-50 mt-5" />
                </Row>
                <Row className="select_mode p-5 cursive">
                    <Col lg={5} className="mb-4 mx-auto">
                        <Button
                            variant="secondary" size="lg" block
                            onClick={() => this.setState({ computer: true, oponent: false })}
                        >Human vs Computer</Button>
                        <ModalComputer
                            show={this.state.computer}
                            onHide={this.childComputerHandler}
                        />
                    </Col>
                    <Col lg={5} className="mx-auto">
                        <Button
                            variant="secondary" size="lg" block
                            onClick={() => this.setState({ computer: false, oponent: true })}
                        >Human vs Human</Button>
                        <ModalOponent
                            show={this.state.oponent}
                            onHide={this.childOponentHandler}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Menu;