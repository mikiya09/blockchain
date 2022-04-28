

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';


export const TradeinfoContext = React.createContext();

const { etherrum } = window;



const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const tradeinfoContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({

        provider,
        signer,
        tradeinfoContract
    });
}


export const TradeinfoProvider = ({ children }) => {
    return (
        <TradeinfoContext.Provider value={{ value: 'test' }}>
            {children}
        </TradeinfoContext.Provider>
    );
}



