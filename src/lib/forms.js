// ערכי טופס כאובייקט. שדות טקסט נקצצים, פרט לסיסמאות (רווח הוא תו חוקי בסיסמה).
export function readForm(event) {
  event.preventDefault()
  const values = {}
  for (const [name, value] of new FormData(event.currentTarget)) {
    const isPassword = event.currentTarget.elements[name]?.type === 'password'
    values[name] = typeof value === 'string' && !isPassword ? value.trim() : value
  }
  return values
}
