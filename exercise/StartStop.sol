

pragma solidity ^0.5.13;

contract StartStopUpdateExample {

    address owner;

    bool public paused;     // when you set this variables public, you can see it showing up on the deployed contract interface, and you check its value

    // here we set whoever deploy the contract the function to the owner (address)
    constructor() public {
        owner = msg.sender;
    }

    function sendMoney() public payable {
    }

    function setPaused(bool _paused) public {
        require(msg.sender == owner, "You are not the owner");
        paused = _paused;
    }

    // here is a if else check in solidity, to see if the user call this function has the same address as the owner does
    // you can do to narrow down to sepecific person to do certain things
    function withdrawAllMoney(address payable _to) public {
        require(msg.sender == owner, "You are not the owner");
        require(!paused, "Contract is paused");  // here !paused should express the meaning of paused == true (the contract is pause), otherwise print "contract is paused"
        _to.transfer(address(this).balance);
    }

    function destroySmartContract(address payable _to) public {
        require(msg.sender == owner, "You are not the owner");
        selfdestruct(_to);          // this is a function you call when you destruct a smart contract, takes an argument, and send all the money left to this address argument
                                    // once destoryed, it will no longer exist on the block
    }                               // something need to figure out, since in order to let a smart contract work, a block need to be mined, what does a block contain? 
                                    // what if a block only contain one smart, what if this smart contract is delete 

}

