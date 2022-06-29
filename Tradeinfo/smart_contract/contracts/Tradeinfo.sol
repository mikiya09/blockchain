
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract tradeInfo {


    /////////////////////////////////////////// add type to blockchain ///////////////////////////////////////////////


    // declare owner variable for holding main address
    address public owner;

    // constructor: whoever execute the contract is the owner
    constructor() {
        owner = msg.sender;
    }

    // counter for types that had uploaded
    uint256 typeCount;
    // create data type for holding type information
    struct TypeStruct {
        string typeName;
        uint typePrice;
    }
    // declare event for holding type information on the blockchain
    event SendType(string typeName, uint typePrice);

    // An array of TypeStruct datatype
    TypeStruct[] typeCollection;

    // check if type exist
    mapping(string => bool) typeExist;


    // function to add type onto blockchain
    function addType(string memory typeName, uint typePrice) public {
        // check requirement (later)
        // 1. whether is owner
        // 2. whether type already exist
        typeCount += 1; // counter add one
        typeCollection.push(TypeStruct(typeName, typePrice));  // push type into array
        typeExist[typeName] = true; // set true if type after upload once

        emit SendType(typeName, typePrice);
    }

    // return the array of type
    function getAllType() public view returns(TypeStruct[] memory) {
        return typeCollection;
    }

    // return the count of type
    function getTypeCount() public view returns(uint256) {
        return typeCount;
    }


    //////////////////////////////////////////// upload personal info to blockchain /////////////////////////////////////////////

    // count the number of time of uploading operation
    uint256 infoCount;
    // create data type to hold personal info
    struct InfoStruct {
        string yourType;
        string detail;
        address yourAddress;
    }
    event SendInfo(string yourType, string detail, address yourAddress);

    // array of InfoStruct
    InfoStruct[] infoCollection;

    // check if type exist for one user
    mapping(address => string) infoExist;

    // function to upload info onto blockchain
    function addInfo(string memory yourType, string memory detail, address yourAddress) public {
        // 1. check if type exist based on the uploading address
        infoCount += 1; // counter
        infoCollection.push(InfoStruct(yourType, detail, yourAddress));  // push info into array
        infoExist[yourAddress] = yourType;

        emit SendInfo(yourType, detail, yourAddress);
    }

    // return the array of information
    function getAllInfo() public view returns(InfoStruct[] memory) {
        return infoCollection;
    }

    // return the count of info
    function getInfoCount() public view returns(uint256) {
        return infoCount;
    }

    //////////////////////////////////////////// rate and transfer money /////////////////////////////////////////////
    // check if info has been read or not, that can be achieved using js, make that type display to a link object, and once it has been click, marked as read

    // transaction count
    uint256 transactionCount;

    // transfer event
    event Transfer(address from, address receiver, uint price, uint rate, string message);

    // transfer struct
    struct TransferStruct {
        address sender;
        address receiver;
        uint price;
        uint rate;
        string message;
    }

    // create an array of transaction 
    TransferStruct[] transactions;

    // add transaction onto blockchain
    function addTransaction(address payable receiver, uint price, uint rate, string memory message) public {
        transactionCount += 1;
        price = price * (rate / 10);    // price is calcualted first, below is just sending a record to the blockchain
        transactions.push(TransferStruct(msg.sender, receiver, price, rate, message));

        emit Transfer(msg.sender, receiver, price, rate, message);
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }

}
