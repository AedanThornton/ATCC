import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SpoilerProvider } from './context/SpoilerContext.jsx'
import { ModalProvider } from './components/focuscard/FocusContext.jsx' 
import FocusCardCache from './components/focuscard/FocusCardCache.jsx'
import { LocalStorageProvider } from './management/localstorage/LocalStorageContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { LayoutProvider } from './architecture/layout/LayoutContext.jsx'
import { WorkspaceProvider } from './architecture/editor/workspace/hooks/WorkspaceContext.jsx' 
import { CollectionsProvider } from './architecture/collections/hooks/CollectionsContext.jsx' 
import DnDWrapper from './management/dragndrop/DnDWrapper.jsx' 
import { DnDProvider } from './management/dragndrop/DnDContext.jsx' 
import LocalStorageManager from './management/localstorage/LocalStorageManager.jsx' 
import { PlayProvider } from './architecture/play/main/hooks/PlayContext.jsx'
import { SetEditProvider } from './architecture/editor/set/hooks/SetEditContext.jsx'

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
              <DnDProvider>
                <DnDWrapper>
                  <SetEditProvider>
                    <PlayProvider>
                      <WorkspaceProvider>
                        <LayoutProvider>
                          <CollectionsProvider>
                            <FocusCardCache />
                            <LocalStorageManager />
                            <App />
                          </CollectionsProvider>
                        </LayoutProvider>
                      </WorkspaceProvider>
                    </PlayProvider>
                  </SetEditProvider>
                </DnDWrapper>
              </DnDProvider>
            </LocalStorageProvider>
          </ModalProvider>
        </SpoilerProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
