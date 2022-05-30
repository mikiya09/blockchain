


import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';


import { contractABI, contractAddress } from '../utils/constants';

export const tradeInfoContext = React.createContext();

const { ethereum } = window;


const getEthereumContract = () => {

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const tradeInfoContract = new ethers.Contract(contractAddress, contractABI, signer);

    // console.log({
    //     provider,
    //     signer,
    //     tradeInfoContract
    // });

    return tradeInfoContract;

}


export const TradeInfoProvider = ({ children }) => {


    ////////////////////////////////////// Top /////////////////////////////////////////
    // -----------------------------
    // declare variable for currentAccount
    const [currentAccount, setCurrentAccount ] = useState('');
    // owner
    const [owner, setOwner] = useState('');
    // declare type data
    const [typeData, setTypeData] = useState({ newType: '', typePrice: '' });
    // return structured type
    const [types, setTypes] = useState([]);
    // for loading
    const [isLoading, setIsLoading] = useState(false);

    // handle add type
    const handleAddType = (e, name) => {
        setTypeData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }



    // checking if metamask is installed
    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert("Please install Metamask");
            const accounts = await ethereum.request({ method: 'eth_accounts'});
    
            if(accounts.length) {
                setCurrentAccount(accounts[0]);
                
                getAllTypes();
                getAllInformation();
                getAllTransactions();
            } else {
                console.log("No accounts found")
            }

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")

        } 
    }

    
    // check if transaction exist
    const checkIfTransactionsExist = async () => {
        try {
            
            const tradeInfoContract = getEthereumContract();
            const transactionCount = await tradeInfoContract.getTransactionCount();
            
            window.localStorage.setItem("transactionCount", transactionCount);

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }


    // find Owner & set Owner
    const findOwner = async () => {
        try {
            
            const tradeInfoContract = getEthereumContract();
            const owner = await tradeInfoContract.owner();
            // address seems not to be case sensitive, and setting owner address to lowercase for unity
            setOwner(owner.toLowerCase());

        } catch (error) {
            console.log(error);
            throw new Error("If connected, then no explicitly owner in this smart contract");
        }
    }



    // connect to the wallet(metamask)
    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please install metamask");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            
            // method that set the value of accounts[0] to the currentAccount variable(declare on the top)
            setCurrentAccount(accounts[0]);

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }


    // add type: since we have owner variables, first check if currentAccount == owner, if not return alert
    // currentAccount is set to acccounts[0] through function setCurrentAccount in checkIfWalletConnected function
    // owner is set when smart contract is deployed
    const sendType = async () => {
        
        try {
            // console.log(currentAccount);
            // console.log(owner);
            // console.log(owner === currentAccount);
            if (!ethereum) return alert("Please install metamask");
            if( currentAccount != owner ) return alert("Only Owner can add type");

            const { newType, typePrice } = typeData;
            const tradeInfoContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(typePrice);

            // addType hash
            const addTypeHash = await tradeInfoContract.addType(newType, parsedAmount);

            setIsLoading(true);
            console.log('Loading...' + addTypeHash.hash);
            await addTypeHash.wait();
            setIsLoading(false);
            console.log('Success! ' + addTypeHash.hash);

        } catch (error) {
            console.log(error);
        }
    }

    // get all type
    const getAllTypes = async () => {
        try {

            if(!ethereum) return alert("Please install metamask");
            const tradeInfoContract = getEthereumContract();
            const availableTypes = await tradeInfoContract.getAllType();

            console.log(availableTypes);
            const structuredTypes = availableTypes.map((types) => ({
                
                newType: types.typeName,
                typePrice: parseInt(types.typePrice._hex) / (10 ** 18)

            }))

            console.log(structuredTypes);
            setTypes(structuredTypes);

        } catch (error) {

        }
    }

    ////////////////////////////////////// Mid /////////////////////////////////////////

    // ----------------------------
    // declare form Data for uploading infomation section
    const [infoData, setInfoData] = useState({ yourType: '', detail: '', yourAddress: ''})
    // return structued infomation
    const [information, setInformation] = useState([]);
    
    // handle add info function
    const handleAddInfo = (e, name) => {
        setInfoData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    // send info
    const sendInfo = async () => {

        try {

            if (!ethereum) return alert("Please install metamask");

            const { yourType, detail, yourAddress } = infoData;
            // get contract 
            const tradeInfoContract = getEthereumContract();

            // called solidity function, and upload data onto blockchain, get the transaction hash
            const sendInfoHash = await tradeInfoContract.addInfo(yourType, detail, yourAddress); 

            setIsLoading(true);
            console.log('Loading... ' + sendInfoHash.hash);
            await sendInfoHash.wait();
            setIsLoading(false);
            console.log("Success! " + sendInfoHash.hash);


        } catch (error) {
            console.log(error)
        }
    }


    // get all info
    const getAllInformation = async () => {

        try {
            
            if (!ethereum) return alert("Please install metamask");
            const tradeInfoContract = getEthereumContract();
            const availableInfo = await tradeInfoContract.getAllInfo();

            console.log(availableInfo);
            const structuredInfo = availableInfo.map((information) => ({

                yourType: information.yourType,
                detail: information.detail,
                yourAddress: information.yourAddress

            }))

            console.log(structuredInfo);
            setInformation(structuredInfo);

        } catch (error) {

        }

    }



    ////////////////////////////////////// Bottom /////////////////////////////////////////


    // ------------------------------
    // declare formData for transaction section
    const [transactionData, setTransactionData] = useState({ addressTo: '', typePrice: '', rating: '', message: ''});
    // transaction count
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    // return structured transaction
    const [transactions, setTransactions] = useState([]);

    // handleTransaction function
    const handleTransaction = (e, name) => {
        setTransactionData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }


    // bottom: send transaction
    const sendTransaction = async () => {

        try {
            
            if(!ethereum) return alert("Please install metamask");

            const { addressTo, typePrice, rating, message } = transactionData;
            // provider, singer, your contract getting it from above function
            const tradeInfoContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(typePrice);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208',  // 21000 GWEI
                    value: parsedAmount._hex,   // 0.00001 
                }]
            });

            // get the transaction hash after storing the value onto the blockchain
            const transactionHash = await tradeInfoContract.addTransaction(addressTo, parsedAmount, rating, message);

            setIsLoading(true);
            console.log('Loading... ' + transactionHash.hash);
            await transactionHash.wait();
            setIsLoading(false);
            console.log('Success! ' + transactionHash.hash);

            // get the transaction count
            const transactionCount = await tradeInfoContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    } 
    
    // bottom: get all transaction
    const getAllTransactions = async () => {
        try {

            if(!ethereum) return alert("Please install metamask");
            const tradeInfoContract = getEthereumContract();
            const availableTransactions = await tradeInfoContract.getAllTransactions();
            
            // owner
            // const owner = await tradeInfoContract.owner();
            // setOwner(owner);

            console.log(availableTransactions);

            const structuredTransactions = availableTransactions.map((transactions) => ({

                addressTo: transactions.receiver,
                addressFrom: transactions.sender,
                rating: parseInt(transactions.rate._hex),
                typePrice: parseInt(transactions.price._hex) / (10 ** 18),
                message: transactions.message

            }))

            console.log(structuredTransactions);
            setTransactions(structuredTransactions);

        } catch (error) {

        }
    }




    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, []);


    return (
        <tradeInfoContext.Provider value={{ connectWallet, currentAccount, findOwner, owner, setOwner, isLoading,
                                            typeData, setTypeData, sendType, handleAddType, types,
                                            infoData, setInfoData, sendInfo, handleAddInfo, information,
                                            transactionData, setTransactionData, handleTransaction, sendTransaction, transactions, setTransactions }}>
            {children}
        </tradeInfoContext.Provider>
    );
}
