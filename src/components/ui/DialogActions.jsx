// שורת הכפתורים בתחתית חלון: הפעולה הראשית ראשונה (מימין), ביטול אחריה
export default function DialogActions({ children }) {
  return <div className="mt-6 flex flex-wrap items-center gap-2">{children}</div>
}
