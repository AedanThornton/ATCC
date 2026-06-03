import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SpoilerProvider } from './context/SpoilerContext.jsx'
import { ModalProvider } from './context/FocusContext.jsx'
import FocusCardCache from './components/focuscard/FocusCardCache.jsx'
import LocalStorageManager from './components/savedcards/LocalStorageManager.jsx'
import { LocalStorageProvider } from './context/LocalStorageContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const basename = import.meta.env.BASE_URL;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 30,
      gcTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <QueryClientProvider client={queryClient}>
        <SpoilerProvider>
          <ModalProvider>
            <LocalStorageProvider>
              <FocusCardCache />
              <LocalStorageManager />
              <App />
            </LocalStorageProvider>
          </ModalProvider>
        </SpoilerProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
