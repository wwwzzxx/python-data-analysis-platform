import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { preloadPyodide } from './utils/pyodide'

// 预加载Pyodide，提高首次运行速度
preloadPyodide()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)