


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


const Middle = () => {


    const handleSubmit = () => {

    };

    return (
        <div className="middle">

            <div className="">
                <h1>Add Type:</h1> 
                <Input placeholder="type(str)" name="strType-2" type="text" handleChange={() => {}} />
                <Input placeholder="type(num)" name="numType" type="number" handleChange={() => {}} />
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

        </div>

    );
}

export default Middle;
