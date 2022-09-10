// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/proxy/Clones.sol';
import './SmartAccount.sol';

contract SmartAccountFactory {
    using Clones for address;

    event AccountCreated(uint256 accountIndex, address accountAddress);

    uint256 accountIndex = 0;
    address accountImpl;
    address payable charity;
    mapping (address => address) public accounts;

    constructor(address accountImpl_, address payable charity_) {
        require(accountImpl_ != address(0), "Must be a valid address");
        accountImpl = accountImpl_;
        charity = charity_;
    }

    function createAccount(uint256 savingPercent, address sponsor) external {
        require(accounts[msg.sender] == address(0), "You already have an account");
        require(msg.sender != sponsor, "You can not be your own sponsor");
        require(savingPercent <= 100, "Saving percent must be within [0, 100]");

        accountIndex += 1;
        bytes32 hash = keccak256(
            abi.encodePacked(msg.sender, accountIndex)
        );

        address payable newAccount = payable(accountImpl.cloneDeterministic(hash));
        emit AccountCreated(accountIndex, newAccount);

        SmartAccount(newAccount).initialize(payable(msg.sender), savingPercent, sponsor, charity);
    }
}
