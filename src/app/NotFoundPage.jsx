import { Compass } from 'lucide-react'
import ButtonLink from '../components/ui/ButtonLink'
import EmptyState from '../components/ui/EmptyState'

export default function NotFoundPage() {
  return (
    <EmptyState
      icon={Compass}
      title="העמוד לא נמצא"
      description="ייתכן שהקישור שגוי או שהעמוד הועבר."
      action={<ButtonLink to="/">חזרה ללוח הבקרה</ButtonLink>}
    />
  )
}
