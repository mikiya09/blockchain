
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract tradeInfo {

    // count number of type owner entered
    uint256 typeCount;

    // create an event to storage data on blockchain
    event psychType(string aType, uint256 mapNum);


    // create data type to wrapped up "owner wanted type"
    struct psychTypeStruct {
        string aType;
        uint256 mapNum;
    }

    // create a list of that type object
    psychTypeStruct[] typeCollection;

    // add to blockchain
    function addType(string memory aType, uint256 mapNum) public {
        typeCount += 1;
        typeCollection.push(psychTypeStruct(aType, mapNum));

        emit psychType(aType, mapNum);
    }

    // get array of that type
    function getType() public view returns(psychTypeStruct[] memory) {
        return typeCollection;
    }

    // get typeCount
    function getTypeCount() public view returns(uint256) {
        return typeCount;
    }


    /////////////////////////////////////////////// provider upload /////////////////////////////////////////////////
    
    // create data type to wrapped up "provider uploaded info"
    struct psychInfoStruct {
        address addr;
        string aType;
        string someDetail;
    }

    // count number of provider (psychInfoStruct object)
    uint256 infoCount;

    // create an event to storage data on blockchain
    event psychInfoObject(address addr, string aType, string someDetail);

    // create list
    psychInfoStruct[] infoCollection;

    // add to blockchain
    function addInfo(address payable addr, string memory aType, string memory someDetail) public {
        infoCount += 1;
        infoCollection.push(psychInfoStruct(addr, aType, someDetail));

        emit psychInfoObject(addr, aType, someDetail);
    }

    // get array of that type
    function getInfo() public view returns(psychInfoStruct[] memory) {
        return infoCollection;
    }

    // 
    function getInfoCount() public view returns(uint256) {
        return infoCount;
    }


    /////////////////////////////////////////////////  transfer ////////////////////////////////////////////////////

    // create data type to wrapped up "transaction"
    struct transferStruct {
        address addr;
        uint256 amount;
        uint256 score;
    }

    // count 
    uint256 transactionCount;

    // event
    event transfer(address receiver, uint amount, uint score);

    // list
    transferStruct[] transactions;

    // add
    function addTransactions(address payable receiver, uint amount, uint score) public {
        transactionCount += 1;
        transactions.push(transferStruct(receiver, amount, score));

        emit transfer(receiver, amount, score);
    }

    // 
    function getAllTransaction() public view returns(transferStruct[] memory) {
        return transactions;
    }

    // 
    function getTransactionCount() public view returns(uint256) {
        return transactionCount;
    }


}

