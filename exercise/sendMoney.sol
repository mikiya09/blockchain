
pragma solidity ^0.5.13;

contract SendMoneyExample {

    uint public balanceReceived;

    // msg is whatever address that call this function, so here when a address(user) call this receiveMoney function, 
    // that address' will have a msg object associated with it, and msg has member value that marked down the amount of money 
    function receiveMoney() public payable {
        balanceReceived += msg.value;
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    // here whatever address calls this function, money could be able to transfer to msg.sender
    // so here we will be able to get whatever amount of money we have(getBalance()), and send it to whoever calls this function
    function withdrawMoney() public {
        address payable to = msg.sender;
        to.transfer(this.getBalance());
    }

    // here whoever call this function, send the money given the address of itself
    function withdrawMoneyTo (address payable _to) public {
        _to.transfer(this.getBalance());
    }
}

