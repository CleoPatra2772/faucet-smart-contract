// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.17;

interface IERC20 {
    function transfer(address to, uint256 amount) external view returns (bool);
    function balanceOf(address account) external view returns (uint256);
    event Transfer(address indexed from, address indexed to, uint256 value);

}

contract Faucet {
    address payable owner;
    IERC20 public token;
    
    uint256 public withdrawalAmount = 50 * (10 ** 18);
    uint256 public lockTime = 1 minutes;

    event Withdrawal(address indexed to, uint256 indexed amount);
    event Deposit(address indexed from, uint256 indexed amount);

    mapping(address => uint256 ) nextAccessTime;

    constructor(address tokenAddress) payable {
        token = IERC20(tokenAddress);
        owner = payable(msg.sender);
    }

    function requestTokens() public {
        require(msg.sender != address(0), "Request must not originate from a zero account");
        require(token.balanceOf(address(this)) >= withdrawalAmount, "Insuffcient balance of the faucet");
        require(block.timestamp >= nextAccessTime[msg.sender], "Insufficient time elapsed since last withdrawal");

        nextAccessTime[msg.sender] = block.timestamp + lockTime;
        token.transfer(msg.sender, withdrawalAmount);
    }

    //preload the faucet with erc20 tokens.
    receive() external payable {
        //broadcast an event to notify every time contract receive funds
        emit Deposit(msg.sender, msg.value);

    }

    function getBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }


    function setWithdrawalAmount(uint256 amount) public onlyOwner {
        withdrawalAmount = amount * (10 ** 18);
    }

    function setLockTime(uint256 amount) public onlyOwner {
        lockTime = amount * 1 minutes;
    }

    function withdrawal() external onlyOwner {
        emit Withdrawal(msg.sender, token.balanceOf(address(this)));
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }


    modifier onlyOwner() {
        require(owner == msg.sender, "Only contract owner can access this function"); 
        _;
    }




}