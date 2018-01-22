pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/token/StandardToken.sol';

contract TestCard is Ownable, StandardToken {
  string public name = "TESTCARD";
  string public symbol = "CARD_TESTCARD";
  uint8 public decimals = 0;
  uint public INITIAL_SUPPLY = 10;

  mapping(address => uint) miners;
  mapping(address => uint) miningRewardTemp;

  function TestCard() public {
    totalSupply = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }

  function mine() public {
    miners[msg.sender] = block.number;
  }

  function stopMine() public {
    uint mineStart = miners[msg.sender];
    uint mined = block.number - mineStart;
    miningRewardTemp[msg.sender] = mined;
    totalSupply = totalSupply.add(mined);
    balances[msg.sender] = mined;
    Transfer(address(0), msg.sender, mined);
  }
}