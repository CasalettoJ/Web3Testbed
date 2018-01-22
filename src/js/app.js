import React, { Component } from 'react';
import { render } from 'react-dom';
import getWeb3 from './utils/getWeb3'
import contract from 'truffle-contract';

import '../css/style.css';
import ironImage from '../assets/iron.gif'; 
import TestCard from '../../build/contracts/IronOre.json'

export default class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: null,
      testCardInstance: null,
      actions: [],
    };
  }

  async componentWillMount() {
      let results = await getWeb3;
      const testCard = contract(TestCard);
      testCard.setProvider(results.web3.currentProvider);
      const testCardInstance = await testCard.deployed();
      this.setState({web3: results.web3, testCardInstance: testCardInstance });
      const accounts = await this._getAccounts(results.web3);
      const accountBal = await this.state.testCardInstance.balanceOf.call(accounts[0]);
      this.setState({balance: accountBal.c[0]});
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
    console.log( await this.state.testCardInstance.startMine({from: accounts[0]}));
    const actions = this.state.actions;
    actions.push("Began to mine Iron Ore!");
    this.setState({actions: actions});
  };

  _stopMine = async () => {
    const accounts = await this._getAccounts(this.state.web3);
    console.log( await this.state.testCardInstance.stopMine({from: accounts[0]}));
    const actions = this.state.actions;
    actions.push("Stopped Mining Iron Ore..");
    this.setState({actions: actions});
  };

  _collectMine = async () => {
    const oldBal = this.state.balance;
    const accounts = await this._getAccounts(this.state.web3);
    console.log(await this.state.testCardInstance.collectMine({from: accounts[0]}));
    const accountBal = await this.state.testCardInstance.balanceOf.call(accounts[0]);
    this.setState({minedNum: accountBal.c[0] - oldBal, balance: accountBal.c[0]});
    const actions = this.state.actions;
    actions.push('Collected your ' + (accountBal.c[0] - oldBal).toString() + ' iron ore.');
    this.setState({actions: actions});
  };

  render() {
    const listItems = this.state.actions.map((msg, i) =>
      <div key={i}>{msg}</div>
    );
    return (
      <div>
        Balance of Iron Ores: {this.state.balance} 
        <img src={ironImage} /> <br />
        <button onClick={this._startMine}>Start Mining</button>
        <button onClick={this._collectMine}>Collect Ore</button>
        <button onClick={this._stopMine}>Stop Mining</button>
        <br />
        Adventure log: <br />
        {listItems}
      </div>
    );
  }

}

render(<Hello />, document.getElementById('app'));