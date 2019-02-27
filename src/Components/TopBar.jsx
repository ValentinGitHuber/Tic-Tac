import React, { Component } from 'react';
import { Navbar, Image } from 'react-bootstrap';

class TopBar extends Component {
    render() {
        return (
            <Navbar bg="light">
                <div className="mx-auto">
                    <Image src={this.props.src} />
                    Tic Tac Toe
                </div>
            </Navbar>
        );
    }
}

export default TopBar;