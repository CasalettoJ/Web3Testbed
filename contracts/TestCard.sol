pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/token/StandardToken.sol';

contract TestCard is Ownable, StandardToken {
  string public name = "TESTCARD";
  string public symbol = "CARD_TESTCARD";
  uint8 public decimals = 0;
  uint public INITIAL_SUPPLY = 12000;

  function TestCard() public {
    totalSupply = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }

  uint storedData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}