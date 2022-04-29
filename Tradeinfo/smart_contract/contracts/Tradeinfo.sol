

// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;


contract tradeinfo {

    uint256 typeCount;

    event SendType(uint amount, string strType);

    struct TypeStruct {
        uint amount;
        string strType;
    }


    TypeStruct[] typeCollection;


    function addTypeToBlockchain(uint amount, string memory strType) public {
        typeCount += 1;
        typeCollection.push(TypeStruct(amount, strType));

        emit SendType(amount, strType);
    }

    function getAllType() public view returns(TypeStruct[] memory) {
        return typeCollection;
    }

    function getTypeCount() public view returns(uint256) {
        return typeCount;
    }

}
