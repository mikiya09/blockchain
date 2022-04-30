
# Material

        1. npm

        2. react.js
            => Vite (vitejs.dev)
                + integrated dev env
                + start, install, build react more easily

        3. alchemy: endpoint

        4. private key

        5. metamask
        


# structure

        1. to remove confusion for now, just name the project directory with first letter uppercase, the rest lowercase 

        2. client (directory)
        3. smart_contract


# =============== Client Side ================

# Preparation
        [under the project directory]


        >> mkdir cilent
        >> cd cilent
        >> npm init vite@latest
            + Project name: ./
            + Package name: (any_name)
            + Select a framework: react
            + Select a variant: react

        [install] 
        >> npm install
        [run on localhost:3000]
        >> npm run dev


# Front End Setup

        1. based on smart contract: design the interactive page with buttons and displays needed
        2. seperate different section(<div></div>) into different .jsx file

        >> cd project/client/src
        >> mkdir components
        >> cd components
        >> touch Top.jsx Middle.jsx Bottom.jsx Loader.jsx

        < template >
        ====================================
        const Top = () => {
        
            return (
                <div className="top">
                    <h1>This is Top Section</h1>
                </div>
            );
        }

        export default Top;
        ====================================
        [view each of the seperate file as a <div></div> object with javascript functionality in html]

        3. export those seperate file
        
        >> vim index.js
        [add]
        ====================================
        export { default as Top } from './Top';
        export { default as Middle } from './Middle';
        export { default as Bottom } from './Bottom';
        export { default as Loader } from './Loader';


# Seperate File Dev

        >> vim client/src/App.jsx

        [App.jsx file is like the index.html for your app, main html will include here]
        + clear App.jsx and add the following

        ====================================
        import {Top, Middle, Bottom} from './components';
        

        const App = () => {
        
            return (
                <div className="outermost-box">
                    <div className="top-box">
                        <Top />
                    </div>

                    <div className="middle-box">
                        <Middle />
                    </div>
                    
                    <div className="bottom-box">
                        <Bottom />
                    </div>
                </div>
            );
        }

        export default App;
        ====================================

        >> vim client/src/index.css
        [this .css is connected to App.jsx]

        ===================================
        import { Loader } from './';

        // if any of seperate file needs it
        ===================================


# Complete Webpage with React.js 
        
        => in .jsx file, html inside return ();

        => Define function
            + you can define function inside const Top = () => {} above return ();
            + same format: functionName = () => {};
            + these function could be put in the html element for functionality
            + onClick={functionName} 

        => Define html element
            // define outside of the const function
            const Input = ({ placeholder, name, type, value, handleChange }) => (
                <input 
                    placeholder={placeholder}
                    type={type}
                    step="0.0001"   // this is the up&down button for increase/decrease number with step of 0.0001
                    value={value}
                    onChange={(e) => handleChange(e, name)}
                    className=""
                />
            );

            // inside html element
            <Input placeholder="xxxx" name="xxxx" type="text/number" handleChange={functionName} />


        => if-else like statement (in html)
            //
            <div>

                {false/true ? (
                    <Loader />
                ) : (
                    <button type="button" onClick={functionName} className=""> xxxx </button>
                )}

            </div>
            

# =============== Contract Side ================

# Setup Dev Env
        [under the project directory]

        [+] setup a empty package.json file 
        >> mkdir smart_contract
        >> cd smart_contract
        >> npm init -y

        [+] install dependencies 
        >> npm install --save-dev hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers

        [+] initialize hardhat project
        >> npx hardhat
        >> [create a basic sample project]
        >> [enter]
        >> [enter]

        [+] run test (optional)
        >> npx hardhat test
        >> cd ./smart_contract/contracts
        >> remove the original file inside
        >> vim Yoursmartcontract.sol        
        // to remove all confusion for now, just name the contract with first letter uppercase, the rest lowercase


# Contract Deployment Setup

        [+] Deployment of Smart Contract locally
        >> cd ./smart_contract/scripts
        >> mv sample-script.js deploy.js

        [add the following]
        ---------------------------------------------------------------------------- 
        // special attention: in .getContractFactory(""), sometime I named the string like Yourcontract
        // if the name of the contract is tradeinfo, it will automatically require me to name it tradeInfo
        // (i think it's auto detect naming)
        // but if the name is transaction, capitalize the first letter will be fine: Transaction
        // but eventually, it will prompt you to name it correctly after run deploy
        // but to remove confusion, I will apply the same naming convenition("Yourcontract") for the later file

        ============================================================================
        const main = async () => {
            // capitalize first letter mean we are having a class(for contract) 
            const Yourcontract = await hre.ethers.getContractFactory("yourcontract");
            // first letter lowercase means it is a instance of its class
            const yourcontract = await Yourcontract.deploy();

            await yourcontract.deployed();

            console.log('Yourcontract deployed to: ', yourcontract.address);
        }

        const runMain = async () => {
            
            try {
                await main();
                process.exit(0);

            }   catch(error) {
                console.error(error);
                process.exit(1);
            }

        }

        runMain();     
        ============================================================================



# Compile (with hardhat)
        
        >> cd ./smart_contract
        >> vim hardhat.config.js

        [ADD]
        =============================================
        require('@nomiclabs/hardhat-waffle');

        module.exports = {
            solidity: '0.8.0',
            networks: {
                ropsten: {
                    url: 'ropsten-endpoint(alchemy)',
                    accounts: [ 'private_key' ]
                }
            }
        }
        =============================================

        >> cd ./smart_contract
        >> npx hardhat run scripts/deploy.js --network ropsten
        => if success, grab the contract address



# =============== Interaction ================

# Material logic

        => build connection with below two materials with js

        1. every smart contract has its own address on the blockchain (locate)

        2. together there will be a json file contain human-readable detail about the contract (communication) -- called ABI


        => facts
            + there are data store inside the smart (memory/storage)
            + also data store on the blockchain (event)

# Prepare address & abi

        >> cd ./client/src/
        >> mkdir utils
        >> cd utils
        >> touch constants.js
        // copy the .json file that contain smart contract abi to here -- locate in ./smart_contract/artifacts
        // following naming convention
        >> cp ./smart_contract/artifacts/contracts/xxx.sol/xxx.json ../../../../client/src/utils/Yourcontract.sol
    

        [add the following to constants.js]
        ===================================
        import abi from './Yourcontract.json';
        
        export const contractABI = abi.abi;
        export const contractAddress = 'contract_address';



# Communication Implementation logic(detail)
        
        >> cd ./client/src
        >> mkdir context
        >> cd context
        >> touch YourcontractContext.jsx        // this file will include main logic of communication

        [ADD]
        =======================================================================================================================
        import React, { useEffect, useState } from 'react';     // necessary package
        import { ethers } from 'ethers';

        import { contractABI, contractAddress } from '../utils/constants';  // get ABI and address from there

        export const YourcontractContext = React.createContext();   // make contract context accessible from outside
        const { ethereum } = window;        // ethereum interaction object provided by metamask?


        // get contract object
        const getEthereumContract = () => {
        
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const yourContract = new ethers.Contract(contractAddress, contractABI, signer);  // pay attention to variable naming 
        
            // print something out check if connect successfully
            console.log({
                provider,
                signer,
                yourcontractInfo
            });

            return yourinfoContract;
        }


        // export object for outside accessibility
        export const YourcontractProvider = ({ children }) => {
    
            return (
                <Yourcontract.Provider value={{ value: 'test' }}>   // export value for webpage(html, js) to access
                    {children}
                </Youcontract.Provider>
            );
        }

        =======================================================================================================================


# build connection
        
        >> cd ./client/src
        >> vim main.jsx

        [ADD]
        ==============================================
        import React from 'react';
        import Reaction from 'react-dom/client';

        import App from './App';
        import './index.css';
        import { YourcontractProvider } from './context/YourcontractContext';

        ReactDOM.createRoot(document.getElementById('root')).render(

        <YourcontractProvider>
            <React.StrictMode>
                <App />
            <React.StrictMode>
        </YourcontractProvider>

        )
        ==============================================


# Test 
        < find any of the div part inside ./client/src/components >
        >> vim Top.jsx

        [ADD]
        =============================================
        import React, { useContext } from 'react';
        import { Yourcontract } from '../context/Yourcontract';

        import { Loader } from './';

        const Top = () => {

            const { value } = useContext(YourcontractContext);      // remember we have export this object (above)

            console.log(value)                                      // create a variable and check on the web console("test")

            return (
            
            ..........

            );
        }

        export default Top;
