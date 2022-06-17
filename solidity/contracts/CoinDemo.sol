pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CoinDemo is ERC20 {
    constructor () ERC20("demoCoin","DC") {
        _mint(msg.sender,1000);
    }

    function getBalance(address _owner) public view returns(uint256 balance){
        require(msg.sender==_owner);
        return balanceOf(_owner);
    }
}
