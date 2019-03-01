import React, { Component } from 'react';
// BOOTSTRAP
import { Image } from 'react-bootstrap';

class Position extends Component {
    render() {
        const image = () => {
            switch (this.props.symbol) {
                case 'X':
                    return (<Image src="./public/x_dark.png" />);
                case 'O':
                    return (<Image src="./public/o_dark.png" />);
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