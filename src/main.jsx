import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './web page/pro.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
