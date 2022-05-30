import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'
import { TradeInfoProvider } from './context/tradeInfoContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <TradeInfoProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </TradeInfoProvider>
)
