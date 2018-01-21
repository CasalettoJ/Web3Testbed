pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/token/StandardToken.sol';

contract TestCard is Ownable, StandardToken {
  string public name = "TESTCARD";
  string public symbol = "CARD_TESTCARD";
  uint8 public decimals = 0;
  uint public INITIAL_SUPPLY = 12000;

  mapping(address => uint256) miners;

  function TestCard() public {
    totalSupply = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }

  function mine() public {
    require(miners[msg.sender] <= 0);
    miners[msg.sender] = block.number;
  }

  function stopMine() public {
    require(miners[msg.sender] >= 0);
    uint mined = block.number - balances[msg.sender];
    delete balances[msg.sender];
    totalSupply += mined;
    balances[msg.sender] += mined;
  }

  uint storedData;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}