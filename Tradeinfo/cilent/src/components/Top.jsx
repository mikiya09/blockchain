

import React, { useContext } from 'react';

import { TradeinfoContext } from '../context/TradeinfoContext';
import { Loader } from './';


const Top = () => {


    const { value } = useContext(TradeinfoContext);

    console.log(value);

    const connectWallet = () => {

    };

    return (
        
        <div className="top">
            <h1>Owner:</h1>
            <h1>ETH in Contract:</h1>
            <button type="button" onClick={connectWallet} className="">connect</button>
        </div>

    );
}

export default Top;
