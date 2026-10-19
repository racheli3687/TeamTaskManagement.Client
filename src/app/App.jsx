import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router'
import AuthProvider from '../auth/AuthProvider'
import ThemeProvider from '../theme/ThemeProvider'
import AppRoutes from './AppRoutes'
import AppToaster from './AppToaster'
import { queryClient } from './queryClient'

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
            <AppToaster />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
