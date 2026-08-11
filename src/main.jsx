import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // <-- Ensures styles are loaded globally
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)