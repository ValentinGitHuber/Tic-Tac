import React, { Component } from 'react';
import { Navbar, Image } from 'react-bootstrap';

class TopBar extends Component {
    render() {
        return (
            <Navbar bg="light">
                <div className="mx-auto">
                    <Image src="./public/logo_extra_small.png" />
                    Tic Tac Toe
                </div>
            </Navbar>
        );
    }
}

export default TopBar;