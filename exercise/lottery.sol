


pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;

    function Lottery() public {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);

        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public restricted {

        uint index = random() % players.length;
        // this pointing to the current contract, balance is all the money inside the contract

        players[index].transfer(this.balance);          
        // [] dynamic array with an initial size of zero, empty up the array so that you can start a new roll
        players = new address[](0); 
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }

}

// don't run npm audi fix -- force, otherwise will break the dependencies
// for compiling:
// npm install --save solc@0.4.17

// for testing:
// npm install --save mocha ganache-cli web3@1.0.0-beta.26

// endpoint
// https://rinkeby.infura.io/v3/73f1ecf9ce7d4842aac9b10e392b2dcf
// deployment
// npm install --save truffle-hdwallet-provider


// admit disagree disease tent dry churn grocery purchase frog fold puppy assist
