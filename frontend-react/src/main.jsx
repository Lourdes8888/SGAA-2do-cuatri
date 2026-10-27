import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import './index.css'
import App from './App.jsx'
import tema from './components/tema.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={tema} defaultMode="light">
      <App />
    </ThemeProvider>
  </StrictMode>,
)
