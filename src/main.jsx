import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SpoilerProvider } from './context/SpoilerContext.jsx'

const basename = import.meta.env.BASE_URL;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <SpoilerProvider>
        <App />
      </SpoilerProvider>
    </BrowserRouter>
  </StrictMode>,
)
