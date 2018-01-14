import React, { Component } from 'react';
import { render } from 'react-dom';
import '../css/style.css';
import ironImage from '../assets/iron.gif'; 

export default class Hello extends Component {
  render() {
    return (
      <div>
        Hello from react <br />
        <img src={ironImage} />
      </div>
    );
  }
}

render(<Hello />, document.getElementById('app'));