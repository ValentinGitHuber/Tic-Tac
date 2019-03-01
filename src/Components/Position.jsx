import React, { Component } from 'react';
// BOOTSTRAP
import { Image } from 'react-bootstrap';
import { getImage } from '../helpers';

class Position extends Component {
    render() {
        const image = () => {
            switch (this.props.symbol) {
                case 'X':
                    return (<Image src={getImage('x_dark')} />);
                case 'O':
                    return (<Image src={getImage('o_dark')} />);
                default:
                    return;
            }
        };

        return (
            <div className="pos" onClick={()=>this.props.click(this.props.id)} id={'position'+this.props.id} >
                <div className='text_in_pos'>
                    {
                        image()
                    }
                </div>
            </div>
        );
    }
}

export default Position;