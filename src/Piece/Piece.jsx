import React, { Component } from 'react';

class Piece extends Component {
    render() {
        return (
            <div className="Piece">
                {
                    this.props.side === 1 ? 'X' : 'O'
                }
            </div>
        );
    }
}

export default Piece;