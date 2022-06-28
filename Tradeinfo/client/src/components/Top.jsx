
import React, { useContext } from 'react';

import { tradeInfoContext } from '../context/tradeInfoContext';
import { Loader } from './';



const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.00001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className=""
    />
);


// display type card
const TypeCard = ({ newType, typePrice }) => {

    return (
        <div className="">
            <p>Type: {newType}</p> 
            <p>Price: {typePrice}</p> 
        </div>
    )

}



const Top = () => {

    const { findOwner, owner, connectWallet, currentAccount, 
            typeData, setTypeData, sendType, handleAddType, isLoading, types } = useContext(tradeInfoContext);

    const submitType = (e) => {

        const { newType, typePrice } = typeData;

        e.preventDefault();

        if (!newType || !typePrice ) return alert("make sure all information are filled");

        sendType();
    }

    // find out the owner (if there is) for display
    findOwner();

    return (
        <div className="top">
            <h1>Top</h1>
            <div className="connect-section">
                <p>Owner Account: {owner}</p>
                <p>User Account: {currentAccount}</p>
                {currentAccount ? (
                    <p>connected!</p>
                ) : (
                    <button type="button" onClick={connectWallet}>
                        connect
                    </button>
                )}
            </div>
            <div className="addType-section">
                <h3>Balance in the Contract: </h3>
                <h3>add new type request</h3>
                <Input placeholder="new type" name="newType" type="text" handleChange={handleAddType}/>
                <Input placeholder="base price" name="typePrice" type="number" handleChange={handleAddType}/>
                {isLoading ? (
                    <Loader />
                ) : (
                    <button type="button" onClick={submitType} className="">
                        set
                    </button>
                )}
            </div>
             <div className="display-type">
                {types.reverse().map((type, i) => (
                    <TypeCard key={i} {...type} />
                ))}
            </div>           
        </div>

    );
}


export default Top;
