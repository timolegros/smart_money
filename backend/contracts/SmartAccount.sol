// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

// import "hardhat/console.sol";

contract SmartAccount is Initializable {
    address payable public owner;
    address payable public charity;
    address public sponsor;

    bool public savingsLocked;

    uint256 public savingPercent;
    uint256 public checkingAmt;
    uint256 public savingsAmt;
    uint256 public betCounter = 0;

    enum BetState {INCOMPLETE, WIN, LOSE}

    struct Bet {
        uint256 amount;
        BetState state;
        string description;
    }

    mapping(uint => Bet) public bets;

    event Withdrawal(uint amount, uint when);

    function initialize(address payable owner_, uint256 savingPercent_, address sponsor_, address payable charity_) public initializer {
        owner = owner_;
        savingPercent = savingPercent_;
        sponsor = sponsor_;
        charity = charity_;
    }

    function withdraw(bool checkingAccount, uint256 amount) external {
        require(msg.sender == owner, "You aren't the owner");

        if (checkingAccount) {
            require(checkingAmt >= amount, "Insufficient funds");
            emit Withdrawal(amount, block.timestamp);
            checkingAmt -= amount;
            (bool sent, bytes memory data) = owner.call{value: amount}("");
            require(sent, "Failed to send Ether");
        } else {
            require(!savingsLocked, "Savings is locked!");
            require(savingsAmt >= amount, "Insufficient funds");
            emit Withdrawal(amount, block.timestamp);
            savingsAmt -= amount;
            (bool sent, bytes memory data) = owner.call{value: amount}("");
            require(sent, "Failed to send Ether");
        }
    }

    function placeBet(uint256 amount, string calldata description) external {
        require(msg.sender == owner, "You aren't the owner");
        require(checkingAmt >= amount, "Insufficient funds");
        require(amount > 0, "Bet amount must be greater than 0");

        betCounter += 1;
        bets[betCounter] = Bet(amount, BetState.INCOMPLETE, description);
        checkingAmt -= amount;
    }

    // Sponsor Functions

    function setSavingsLock(bool lock) external {
        require(msg.sender == sponsor, "You aren't the sponsor");
        savingsLocked = lock;
    }

    function reviewBet(uint256 betIndex, BetState state) external {
        require(msg.sender == sponsor, "You aren't the sponsor");
        require(bets[betIndex].amount != 0, "Bet does not exist");
        require(bets[betIndex].state == BetState.INCOMPLETE, "Bet has already been reviewed");
        require(state == BetState.LOSE || state == BetState.WIN, "Bet state must be either win or lose");

        if (state == BetState.WIN) {
            // update bet state and return bet funds to checking account
            bets[betIndex].state = BetState.WIN;
            checkingAmt += bets[betIndex].amount;
        } else {
            bets[betIndex].state = BetState.LOSE;
            (bool sent, bytes memory data) = charity.call{value: bets[betIndex].amount}("");
            require(sent, "Failed to send Ether");
        }
    }

    receive() payable external {
        savingsAmt += (msg.value * savingPercent) / 100;
        checkingAmt += (msg.value * (100 - savingPercent)) / 100;
    }

    fallback() payable external {
        savingsAmt += (msg.value * savingPercent) / 100;
        checkingAmt += (msg.value * (100 - savingPercent)) / 100;
    }
}
