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
      testCardInstance: null,
    };
  }

  async componentWillMount() {
      let results = await getWeb3;
      const testCard = contract(TestCard);
      testCard.setProvider(results.web3.currentProvider);
      const testCardInstance = await testCard.deployed();
      this.setState({web3: results.web3, testCardInstance: testCardInstance });
      const accounts = await this._getAccounts(results.web3);
      //console.log(await this.state.testCardInstance.set(5, {from: accounts[0]}));
      const accountBal = await this.state.testCardInstance.balanceOf.call(accounts[0]);
      const storedVal = await this.state.testCardInstance.get.call();
      this.setState({storedValue: storedVal.c[0], balance: accountBal.c[0]});
  }

  _getAccounts(web3) {
    return new Promise(function(resolve, reject) {
      web3.eth.getAccounts((err, res) => {
        resolve(res);
      })
    });
  }

  _startMine = async () => {
    const accounts = await this._getAccounts(this.state.web3);
    this.state.testCardInstance.mine({from: accounts[0]});
  };

  _stopMine = async () => {
    const accounts = await this._getAccounts(this.state.web3);
    this.state.testCardInstance.stopMine({from: accounts[0]});
    const accountBal = await this.state.testCardInstance.balanceOf.call(accounts[0]);
    this.setState({balance: accountBal.c[0]});
  };

  render() {
    return (
      <div>
        Stored number (test): {this.state.storedValue} <br />
        Balance of Iron Ores: {this.state.balance} 
        <img src={ironImage} /> <br />
        <button onClick={this._startMine}>Start Mining Iron</button>
        <button onClick={this._stopMine}>Stop Mining Iron</button>
      </div>
    );
  }

}

render(<Hello />, document.getElementById('app'));