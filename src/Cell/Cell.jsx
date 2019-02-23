import React, { Component } from 'react';
import './Cell.css';
import PropTypes from 'prop-types';

class Cell extends Component {
    constructor(props) {
        super(props);
        // HandleClicks
        this.clickCell = this.clickCell.bind(this);
    }

    clickCell() {
        this.props.sendId(this.props.id);
    }

    render() {
        return (
            <div className="Cell" onClick={this.clickCell}>
                {this.props.id}
            </div>
        );
    }
}

Cell.propTypes = {
    id: PropTypes.number
};

export default Cell;