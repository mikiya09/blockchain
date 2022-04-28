

import { Top, Middle, Bottom } from './components';

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
