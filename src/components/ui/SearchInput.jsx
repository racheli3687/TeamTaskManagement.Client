import { Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const DEBOUNCE_MS = 300

// חיפוש עם השהיה: בקשה לשרת רק אחרי שההקלדה נעצרת
export default function SearchInput({ value, onChange, placeholder, label }) {
  const [text, setText] = useState(value)
  const [prevValue, setPrevValue] = useState(value)
  const timer = useRef(null)

  // ערך שהשתנה מבחוץ (למשל "ניקוי הסינון") מעדכן את השדה. ההתאמה בזמן הרינדור, לפי ההמלצה של React.
  if (value !== prevValue) {
    setPrevValue(value)
    if (value !== text.trim()) setText(value)
  }

  useEffect(() => () => clearTimeout(timer.current), [])

  function handleChange(event) {
    const next = event.target.value
    setText(next)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => onChange(next.trim()), DEBOUNCE_MS)
  }

  return (
    <label className="relative block min-w-0 flex-1">
      <span className="sr-only">{label}</span>
      <Search className="pointer-events-none absolute inset-y-0 start-3 my-auto size-4 text-ink-soft" aria-hidden />
      <input
        type="search"
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-line bg-surface ps-9 pe-3 text-sm transition placeholder:text-ink-soft/70 focus:border-brand focus:outline-none focus:ring-3 focus:ring-brand/20"
      />
    </label>
  )
}
