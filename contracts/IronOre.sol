pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/math/SafeMath.sol';
import 'zeppelin-solidity/contracts/token/StandardToken.sol';

contract IronOre is Ownable, StandardToken {
  string public name = "IRONORE";
  string public symbol = "RLC_IRON";
  uint8 public decimals = 0;
  uint public INITIAL_SUPPLY = 10;

  mapping(address => uint) miners;
  mapping(address => uint) miningRewardTemp;

  function IronOre() public {
    totalSupply = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }

  function startMine() public {
    miners[msg.sender] = block.number;
  }

  function collectMine() public {
    miningRewardTemp[msg.sender] = 0;
    uint mineStart = miners[msg.sender];
    uint mined = block.number - mineStart;
    miningRewardTemp[msg.sender] = mined;
    totalSupply = totalSupply.add(mined);
    balances[msg.sender] = balances[msg.sender].add(mined);
    miners[msg.sender] = block.number;
    Transfer(address(0), msg.sender, mined);
  }

  function stopMine() public {
    delete miners[msg.sender];
  }
}