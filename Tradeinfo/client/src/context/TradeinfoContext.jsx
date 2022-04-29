

import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TradeinfoContext = React.createContext();
const { ethereum } = window;





const getEthereumContract = () => {

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const tradeinfoContract = new ethers.Contract(contractAddress, contractABI, signer);

    return tradeinfoContract;

}


export const TradeinfoProvider = ({ children }) => {


    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({ strType: '', numType: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [tradeinfoCount, setTradeinfoCount] = useState(localStorage.getItem('tradeinfoCount'));
    const [tradeinfo, setTradeinfo] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({...prevState, [name]: e.target.value }));
    }



    const getAllTradeinfo = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const tradeinfoContract = getEthereumContract();

            const availableTradeinfo = await tradeinfoContract.getAllType();

            // format tradeinfo
            const structuredTradeinfo = availableTradeinfo.map((transaction) => ({
                strType: transaction.strType,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }))

            console.log(structuredTradeinfo);

            setTradeinfo(structuredTradeinfo);

        }   catch (error) {
            console.log(error);
        }
    }




    const checkIfWalletIsConnected = async () => {

        try { 

            if(!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if(accounts.length) {
                setCurrentAccount(accounts[0]);

                getAllTradeinfo();
            } else {
                console.log("No accounts found");
            }
        
        }   catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }   
        
    }



    const checkIfTradeinfoExist = async () => {

        try {
            const tradeinfoContract = getEthereumContract();
            const tradeinfoCount = await tradeinfoContract.getTypeCount();

            window.localStorage.setItem("tradeinfoCount", tradeinfoCount);
        }   catch (error) {

            console.log(error);
            throw new Error("No ethereum object.")
        }
    }





    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);

        }   catch (error) {
            console.log(error);
            
            throw new Error("No ethereum object.")
        }
    }



    const sendTransaction = async () => {
        try {
        
            if(!ethereum) return alert("Please install metamask");


            // get
            const { strType, numType } = formData;
            const tradeinfoContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(numType);
    
            console.log(numType);
            console.log(strType);


            const tradeinfoHash = await tradeinfoContract.addTypeToBlockchain(parsedAmount, strType);
            console.log(tradeinfoHash.hash);

            setIsLoading(true);
            console.log('Loading...' + tradeinfoHash.hash);
            await tradeinfoHash.wait();
            setIsLoading(false);
            console.log('Success!  ' + tradeinfoHash.hash);

            const tradeinfoCount = await tradeinfoContract.getTypeCount();

            // console.log(tradeinfoCount.toNumber());

            setTradeinfoCount(tradeinfoCount.toNumber());

            // console.log(tradeinfoContract.getAllType());


        }   catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }






    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTradeinfoExist();
    }, []);



    
    return (
        <TradeinfoContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, tradeinfo, isLoading }}>
            {children}
        </TradeinfoContext.Provider>
    );
}
