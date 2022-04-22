

pragma solidity ^0.5.13;

contract MappingStructExample {
    // a smart contract also has its address in the blockchain, note that

    // struct is used to make a new data type for your convenience 
    struct Payment {
        uint amount;
        uint timestamps;
    }

    struct Balance {
        uint totalBalance;
        uint numPayments;
        mapping(uint => Payment) payment;
    }


    // when call getBalance() we have to give it an address, because this is a mapping, mapping need a key to display value
    // mapping to the new data type: Balance(I created), think of it as any basic data type
    mapping(address => Balance) public balanceReceived; 
                                                         


    function getBalance() public view returns(uint) {
        return address(this).balance;   // "this" keyword is a pointer (same as in c++), balance is a method in address object
    }                                   // it points to the instance it was used in, in this case MappingStructExample contract
                                        

    // understand mapping: when we use sendMoney function, we are interacting with balanceReceveid, which is a mapping data strcuture
    // mapping(dictionary) has key(address) and value(ether), whichever address call sendMondy function, its address will store into mapping as key, and the ether as value 
    function sendMoney() public payable {
        balanceReceived[msg.sender].totalBalance += msg.value; // mapping[key] = value(data type), here we reach to Balance data type, and get totalBalance out

        // create/construct new instance/object (similar to c++), giving two values: amount and timestamps refer to line 8
        Payment memory newPayment = Payment(msg.value, now);    // memory means store in memory, now refers to the time right now

        // address => Balance, get Balance object; payment is a mapping in Balance type, access to it using .
        // balanceReceived[msg.sender].numPayments is an uint, so it will be the key in payment mapping, this mapping is intented to record 
        // Number : Amount 
        balanceReceived[msg.sender].payment[balanceReceived[msg.sender].numPayments] = newPayment;
        balanceReceived[msg.sender].numPayments++;

    }


    // mapping data structure is stored in the smart contract, and therefore ether(money) is also stored in the smart, not in the account, two concepts
    // the function here takes an address as input, and whoever calls this function will be the address(in mapping) sending money out
    // and input is the address receiving money, so it's possible to send money from mapping to user address
    function withdrawAllMoney(address payable _to) public {
        uint balanceToSend = balanceReceived[msg.sender].totalBalance;
        balanceReceived[msg.sender].totalBalance = 0;
        _to.transfer(balanceToSend);
    }


    // same idea here, but add a if-else statement to check if a person has enough money in the mapping before sending money
    // here the concept is not sending money from our own address, but sending from a shared wallet that have our money
    // like a bank
    function withdrawMoney(address payable _to, uint _amount) public {
        require(balanceReceived[msg.sender].totalBalance >= _amount, "not enough funds");
        balanceReceived[msg.sender].totalBalance -= _amount;
        _to.transfer(_amount);
    }
}
