// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event BalanceReset();
    event Send(uint256 amount, address destination);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }
    
    function resetBal() public {
        require(msg.sender == owner, "You are not the owner");
        balance = 1000000000000000000;
        emit BalanceReset();
    }
    

    function getBalance() public view returns(uint256){
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        balance += _amount;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit Deposit(_amount);
    }

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // withdraw the given amount
        balance -= _withdrawAmount;

        // assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // emit the event
        emit Withdraw(_withdrawAmount);
    }

    function send(uint256 _sendAmount, address payable _destination) public payable{
        require(msg.sender == owner, "You are not the owner of this account.");
        require(_destination != address(0), "Invalid recipient address");
        require(balance >= _sendAmount, "Contract has insufficient balance");

        uint256 _previousBalance = balance;

        balance -= _sendAmount;
        assert(balance == _previousBalance - _sendAmount);

        _destination.transfer(_sendAmount);
        // (bool success, ) = _destination.call{value: _sendAmount}("");
        // require(success, "Transfer failed");

        emit Send(_sendAmount, _destination);
    }

}
