


import React, { useContext } from 'react';
import { TradeinfoContext } from '../context/TradeinfoContext';

import { Loader } from './';



const Input = ({ placeholder, name, type, value, handleChange }) => (



    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className=''
    />

);



const TradeinfoCard = ({ strType, amount}) => {
    return (
        <div>
            <p>{strType}: {amount}</p>
        </div>
    )
}





const Top = () => {


    const { connectWallet, currentAccount, formData, sendTransaction, handleChange, tradeinfo } = useContext(TradeinfoContext);

    const handleSubmit = (e) => {
        
        const { strType, numType } = formData;

        e.preventDefault();

        if(!strType || !numType) return;

        sendTransaction();

    }


    return (
        <div className="top">
            <h3>current account: {currentAccount}</h3>
            {!currentAccount ? (
                <button type="button" onClick={connectWallet} className="">connect</button>
            ) : (
                <p>connected!</p>
            )}
            <div>
                <Input placeholder="num" name="numType" type="number" handleChange={handleChange} />
                <Input placeholder="psych" name="strType" type="text" handleChange={handleChange} />
            </div>
            {false ? (
                <Loader />
            ) : (
                <button type="button" onClick={handleSubmit} className="">upload</button>
            )}
            <div>
                {tradeinfo.reverse().map((transaction, i) => (
                    <TradeinfoCard key={i} {...transaction} />
                ))}
            </div>
        </div>
    );
}

export default Top;


// 2:30:00
