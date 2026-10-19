import { Toaster } from 'sonner'
import { useTheme } from '../theme/useTheme'

export default function AppToaster() {
  const { theme } = useTheme()
  return <Toaster position="top-center" dir="rtl" theme={theme} richColors closeButton />
}
