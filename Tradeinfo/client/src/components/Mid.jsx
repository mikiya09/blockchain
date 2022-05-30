
import React, { useContext } from 'react';

import { tradeInfoContext } from '../context/tradeInfoContext';
import { Loader } from './';


// self defined input tag
const Input = ({ placeholder, name, type, value, handleChange }) => (

    <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => handleChange(e, name)}
        className=""
    />
);


// display info card
const InfoCard = ({ yourType, detail, yourAddress }) => {

    return (
        <div className="">
            <p>selected type: {yourType}</p>
            <p>brief description: {detail}</p>
            <p>user address: {yourAddress}</p>
        </div>
    )

}


const Mid = () => {

    const { infoData, setInfoData, sendInfo, handleAddInfo, information, isLoading } = useContext(tradeInfoContext);

    const submitInfo = (e) => {

        const { yourType, detail, yourAddress } = infoData;

        e.preventDefault();

        if (!yourType || !detail || !yourAddress) return alert("make sure all information are filled");

        sendInfo();

    }

    return (
        <div className="mid">
            <h1>Mid</h1>
            <div className="upload-section">
                <h3>Upload Your Personal Info</h3>
                <Input placeholder="your type" name="yourType" type="text" handleChange={handleAddInfo}/>
                <Input placeholder="brief intro" name="detail" type="text" handleChange={handleAddInfo}/>
                <Input placeholder="your address" name="yourAddress" type="text" handleChange={handleAddInfo}/>
                {isLoading ? (
                    < Loader />
                ) : (
                    <button type="button" onClick={submitInfo} className="">
                        upload
                    </button>
                )}
            </div>
            <div className="display-info">
                {information.reverse().map((info, i) => (
                    <InfoCard key={i} {...info} />
                ))}
            </div>
        </div>
    );
}


export default Mid;
