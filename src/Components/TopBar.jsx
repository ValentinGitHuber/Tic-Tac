import React, { Component } from 'react';
import { Navbar, Image } from 'react-bootstrap';
import { getImage } from '../helpers'; 

class TopBar extends Component {
    render() {
        return (
            <Navbar bg="light">
                <div className="mx-auto">
                    <Image src={getImage('logo_extra_small')} />
                    Tic Tac Toe
                </div>
            </Navbar>
        );
    }
}

export default TopBar;