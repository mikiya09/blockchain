
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.6.0;

contract SimpleMappingExample {

    mapping(uint => bool) public myMapping;             // mapping is like json file, or dictionnary in python: {key1: value1, key2: value2, ...} 
    mapping(address => bool) public myAddressMapping;   // all default bool value is set to false, in this case is {address1: false, address2: false, ...}
                                                        // the variable name myMapping/myAddressMapping could be understand as an array (dictionary)
    function setValue(uint _index) public {
        myMapping[_index] = true;                       // takes in a unsigned integer value as the key, and set whatever value corresponding with this key to true
    }

    function setMyAddressToTrue() public {
        myAddressMapping[msg.sender] = true;
    }

}
