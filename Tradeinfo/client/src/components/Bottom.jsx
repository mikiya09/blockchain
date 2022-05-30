

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


// display card
const TransactionCard = ({ addressFrom, addressTo, typePrice, rating, message }) => {

    const from = 'https://goerli.etherscan.io/address/' + addressFrom;
    const to = 'https://goerli.etherscan.io/address/' + addressTo;
    
    return (

        <div className="">
            <a href={from} target="_blank" rel="noopener noreferrer">
                <p>From: {addressFrom}</p>
            </a>
            <a href={to} target="_blank" rel="noopener noreferrer">
                <p>To: {addressTo}</p>
            </a>
            <p>Price: {typePrice} ETH</p>
            <p>Score: {rating} (out of 10)</p>
            <p>Message: {message}</p>
        </div>

    )
}


const Bottom = () => {

    const { isLoading, transactionData, sendTransaction, handleTransaction, transactions } = useContext(tradeInfoContext);
    
    const submitTransaction = (e) => {

        const { addressTo, typePrice, rating, message } = transactionData;

        e.preventDefault();

        if(!addressTo || !typePrice || !rating || !message) return alert("make sure all information are filled");

        sendTransaction();

    }
    

    return (

        
        <div className="bottom">
            <h1>Bottom</h1>
            <div className="transaction-section">
                <h3>Rate Your Experience</h3>
                <Input placeholder="receiver's address" name="addressTo" type="text" handleChange={handleTransaction}/>
                <Input placeholder="base price" name="typePrice" type="number" handleChange={handleTransaction}/>
                <Input placeholder="score" name="rating" type="number" handleChange={handleTransaction}/>
                <Input placeholder="message" name="message" type="text" handleChange={handleTransaction}/>
                {isLoading ? (
                    <Loader />
                ) : (
                    <button type="button" onClick={submitTransaction} className="">
                        send
                    </button>
                )}
            </div>
            <div className="display-transaction">
                {transactions.reverse().map((transaction, i) => (
                    <TransactionCard key={i} {...transaction} />
                ))}
            </div>
        </div>
    );
}


export default Bottom;
