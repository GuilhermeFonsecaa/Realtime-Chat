import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'sonner'
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from './utils/constants.ts'
import { SocketProvider } from './context/SocketContext.tsx'

createRoot(document.getElementById('root')!).render(

  <SocketProvider>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster closeButton />
    </QueryClientProvider>
  </SocketProvider>

)
