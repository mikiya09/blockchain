import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'
import { TradeinfoProvider } from './context/TradeinfoContext';

ReactDOM.createRoot(document.getElementById('root')).render(

    <TradeinfoProvider>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </TradeinfoProvider>

)
