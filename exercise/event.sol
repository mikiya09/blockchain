
pragma solidity ^0.5.11;

contract EventExample {

    mapping(address => uint) public tokenBalance;

    // normally, smart contract won't be able to return anything with "return" keywork in the real blockchain network, 
    // in this case true won't be generate
    // in order to produce something in the real network, we have use event type, 
    // and put in the variable that you want to return (address, address, uint)
    // also event seems that must have to captialize the first letter
    event TokensSent(address _from, address _to, uint _amount);

    constructor() public {
        tokenBalance[msg.sender] = 100;
    }

    function sendToken(address _to, uint _amount) public returns(bool) {
        require(tokenBalance[msg.sender] >= _amount, "Not enough tokens");
        assert(tokenBalance[_to] + _amount >= tokenBalance[_to]);
        assert(tokenBalance[msg.sender] - _amount <= tokenBalance[msg.sender]);

        tokenBalance[msg.sender] -= _amount;
        tokenBalance[_to] += _amount;

        // emit is the way of making it happen
        emit TokensSent(msg.sender, _to, _amount);

        return true;
    }

}
