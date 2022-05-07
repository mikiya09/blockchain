
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaidInfo {

    // declare owner variable for storing address
    address public owner;

    // owner set to whoever execute the contract
    constructor() {
        owner = msg.sender;
    }

    // mapping type with int: one to one, back and front
    mapping(uint => string) numTOstr;
    mapping(string => uint) public strTOnum;
    
    // map type to price
    mapping(string => uint) price;

    // check repetitive type in array 
    mapping(string => bool) existStr;
    mapping(uint => bool) existNum;

    // type array
    uint[] private typeArray;

    // add new type the contract
    function addType(string memory _type, uint _num) public payable {
        require(msg.sender == owner, "Only owner can add type");
        require(existStr[_type] == false, "type exists");
        require(existNum[_num] == false, "reference number exists");
        require(msg.value >= 1 ether, "base price needed");

        existStr[_type] = true;
        existNum[_num] = true;
        numTOstr[_num] = _type;
        strTOnum[_type] = _num;
        price[_type] = msg.value;

        // for stats purpose 
        typeArray.push(_num);
    } 

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    ///////////////////////////////////////////// upload info to type //////////////////////////////////////////////

    // type will be unique after adding to the contract
    // create new type call provider
    struct provider {
        address addr;
        string description;
        bool status;
    }

    mapping(string => provider[]) private pCollection;

    // function for getting type from mapping
    function getType(uint _num) private view returns(string memory) {
        return numTOstr[_num];
    }

    // function for getting num from mapping
    function getNum(string memory _type) private view returns(uint) {
        return strTOnum[_type];
    }

    // check address uniqueness 
    bool IF = false;
    function checkAddress(address addrValue, string memory _type) private {
        uint len = pCollection[_type].length;
        for (uint i=0; i < len; i++) {
            provider storage p = pCollection[_type][i];
            if (p.addr == addrValue) {
                IF = true;
            }
        }
    }

    // collecting all provider's unique address, but one could appear more than once
    address[] providerArray;


    // check if type exist in the array
    function checkTypeExistence(string memory _type) private view returns(bool) {
        // uint numType = strTOnum[_type];
        if (existStr[_type] == true) {
            return true;
        }
        if (existStr[_type] == true) {
            return true;
        }
        return false;
    }
    

    // first check address uniqueness
    // then check the type that is about to upload exist in the contract
    // after all this, start uploading
    function upload(string memory _type, string memory detail) public {

        checkAddress(msg.sender, _type);

        require(checkTypeExistence(_type) == true, "this type is not in the contract");
        require(IF != true, "repetitive upload");
        pCollection[_type].push(provider(msg.sender, detail, false));
        IF = false;

        providerArray.push(msg.sender);
    }


    ///////////////////////////////////////////// display //////////////////////////////////////////////

    // display the array of type in reference number form 
    function getTypeArray() public view returns(uint[] memory) {
        return typeArray;
    }

    function getProvider(string memory _type) public view returns(provider[] memory) {
        return pCollection[_type];
    }


    ///////////////////////////////////////////// check if read //////////////////////////////////////////////
    
    // read or not
    // give a type, then give a address to check if provider in this type had marked as read or not
    function markRead(string memory _type, address addrValue) public {
        require(msg.sender == owner, "Only own can read");
        uint len = pCollection[_type].length;

        for (uint i=0; i < len; i++) {
            // in order to change global variable, we have to specify storage instead of memory
            provider storage p = pCollection[_type][i];
            if (p.addr == addrValue) {
                p.status = true;
                break;
            }
        } 
    }


    ///////////////////////////////////////////// rate //////////////////////////////////////////////
    // if check read, prompt to rate
    // if rate lower then 6, check the case and see if indeed no qualified or owner's mistake, all base value send to provider
    // rating
    function rate(uint score, string memory _type, address payable _to) public {

        require(score > 6, "transition cannot be completed!");

        uint len = pCollection[_type].length;
        for (uint i=0; i < len; i++) {
            provider storage p = pCollection[_type][i];
            if (p.addr == _to) {
                if (p.status = true) {
                    uint base = price[_type];
                    _to.transfer((base * score) / 10);
                    break;
                }
            }
        }
}


    /////////////////////////////////////////// random reward //////////////////////////////////////

    // array of addresses from provider
    // questions: I don't know if the random number generation could be affected by the occurence of a same address in the array, 
    // but right now, I set all the address unique in the array for generating random number

    function random(uint _num) private view returns(uint) {

        return uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))) % _num;
    }

    // pick an address based on the random number generated
    function luckyAudience() public view returns(address) {
        uint index = random(providerArray.length);
        return providerArray[index];
    }

    // send the reward ether to the address
    // reward: total balance / number of providers
    function reward(address payable _to) public {
        require(msg.sender == owner, "only owner can choose which to reward");

        uint rewardAmount =  address(this).balance / providerArray.length;
        _to.transfer(rewardAmount);
    }



    ///////////////////////////////////////// destory contract /////////////////////////////////////

    // destroy the contract, and send all the money back to the owner
    function destroySmartContract(address payable _to) public {
        require(msg.sender == owner, "Only the owner could do this");

        selfdestruct(_to);
    }

    function closeContract(address payable _owner, address payable _provider) public {
        reward(_provider);
        destroySmartContract(_owner);
    }

}


// PTSD (post-traumatic stress disorder) 
// OCD (obsessive-compulsive disorder) 
// schizophrenia

// https://www.youtube.com/watch?v=Qu6GloG0dQk
// https://www.youtube.com/watch?v=Wn_Kb3MR_cU