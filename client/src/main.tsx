import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from 'sonner'
import {QueryClientProvider} from "@tanstack/react-query"
import { queryClient } from './utils/constants.ts'

createRoot(document.getElementById('root')!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster closeButton />
    </QueryClientProvider>
  </>
)
