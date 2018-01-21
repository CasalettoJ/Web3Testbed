import React, { Component } from 'react';
import { render } from 'react-dom';
import getWeb3 from './utils/getWeb3'
import contract from 'truffle-contract';

import '../css/style.css';
import ironImage from '../assets/iron.gif'; 
import TestCard from '../../build/contracts/TestCard.json'

export default class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      testCard: null,
    };
  }

  async componentWillMount() {
      let results = await getWeb3;
      this.setState({web3: results.web3, testCard: contract(TestCard) });
      this.state.testCard.setProvider(this.state.web3.currentProvider);
  }

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