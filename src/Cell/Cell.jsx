import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './Cell.css';
import Piece from '../Piece/Piece';

class Cell extends Component {
    constructor(props) {
        super(props);
        // HandleClicks
        this.clickCell = this.clickCell.bind(this);
    }

    clickCell() {
        this.props.sendId(this.props.position.id);
    }

    render() {
        const piece = () => {
            let item = this.props.position;
            if (_.has(item, 'piece')) {
                return (<Piece side={item.piece.side}/>);
            }
        }
        
        return (
            <div className="Cell" onClick={this.clickCell}>
                { piece() }
            </div>
        );
    }
}

Cell.propTypes = {
    positions: PropTypes.array
};

export default Cell;