
pragma solidity ^0.5.13;


// think of this, when you using unsigned integer as value, and you have a contract keep subtracting value from the total amount whenever being called
// you will reach a moment that total amount is less then 0, but unsigned integer only contains positive integer
// therefore, internally, total might loop back and become larger positive value after last subtraction is executed
// so we need to take care of that

// one exmaple is to use different uint type: uint64 which can store ether up to around 15 (compare to uint256)

contract ExceptionExample {

    mapping(address => uint64) public balanceReceived;

    function receiveMoney() public payable {
        // assert is another popular way of checking if-else in solidity, but will throw error when requirement not met
        // the following assert is saying only when current total balance + new coming amount is greater than current amount then add new amount to total amount
        // the reason is uint64 set the limit for amount, if variable of uint64 has value greater than 15 ether, it will not be able to increase anymore
        assert(balanceReceived[msg.sender] + uint64(msg.value) >= balanceReceived[msg.sender]);
        balanceReceived[msg.sender] += uint64(msg.value);
    }

    function withdrawMoney(address payable _to, uint64 _amount) public {

        require(_amount <= balanceReceived[msg.sender], "You don't have enough other!");
        assert(balanceReceived[msg.sender] >= balanceReceived[msg.sender] - _amount);
        balanceReceived[msg.sender] -= _amount;
        _to.transfer(_amount);

    }

}
