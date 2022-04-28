


import { Loader } from './';

const Input = ({ placeholder, name, type, value, handleChange }) => (

    <input 
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className=""
    />
);



const Bottom = () => {

    const handleSubmit = () => {

    };

    return (
        <div className="Bottom">

            <div className="">
                <h1>Upload:</h1>
                <Input placeholder="your address" name="address" type="text" handleChange= {()=>{}} />
                <Input placeholder="type(str)" name="strType-3" type="text" handleChange= {()=>{}} />
                <Input placeholder="description" name="describe" type="text" handleChange= {()=>{}} />
            </div>

            <div className="loading">
                {false ? (
                    <Loader />
                ) : (
                    <button type="button" onClick={handleSubmit} className="">
                        Send Now
                    </button>
                ) }
            </div>

            <div className="display-type">
            </div>

            <div className="">
                <h1>Read:</h1>
                <Input placeholder="addressTo" name="addressTo" type="text" handleChange= {()=>{}} />
                <Input placeholder="basic" name="address" type="number" handleChange= {()=>{}} />
                <Input placeholder="score" name="score" type="number" handleChange= {()=>{}} />
            </div>
 
            <div className="loading">
                {false ? (
                    <Loader />
                ) : (
                    <button type="button" onClick={handleSubmit} className="">
                        Send Now
                    </button>
                ) }
            </div>       

        </div>

    );
}

export default Bottom;
