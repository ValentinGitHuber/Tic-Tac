import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!

    this.state = { counter: 0 };

    this.positions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  }



  render() {
    console.log(this.positions)
    return (
      <div>
        {
          this.positions.forEach((p)=>{
            console.log(p);
            return this.positions
          })
        }
        <p>bnm</p>
      </div>
    );
  }
}

export default App;

/*

this.positions.forEach((p)=>{
            console.log(p);
            return (<div>
              p
            </div>)
          })
 */