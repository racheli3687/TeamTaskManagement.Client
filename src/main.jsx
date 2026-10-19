import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/rubik'
import '@fontsource/ibm-plex-sans-hebrew/400.css'
import '@fontsource/ibm-plex-sans-hebrew/500.css'
import '@fontsource/ibm-plex-sans-hebrew/600.css'
import '@fontsource/ibm-plex-sans-hebrew/700.css'
import './index.css'
import App from './app/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
