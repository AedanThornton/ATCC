import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SpoilerProvider } from './context/SpoilerContext.jsx'
import { ModalProvider } from './context/FocusContext.jsx'
import FocusCardCache from './components/focuscard/FocusCardCache.jsx'

const basename = import.meta.env.BASE_URL;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <SpoilerProvider>
        <ModalProvider>
          <App />
          <FocusCardCache />
        </ModalProvider>
      </SpoilerProvider>
    </BrowserRouter>
  </StrictMode>,
)
