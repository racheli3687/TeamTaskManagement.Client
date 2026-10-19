// איור סטטי של רעיון המערכת: משימה פנויה, משימה שנתפסה, וניסיון תפיסה שני שנדחה
const SAMPLE_TASKS = [
  { title: 'עיצוב דף הנחיתה', stripe: 'bg-brand', note: 'פנויה לתפיסה', noteClass: 'border border-dashed border-line text-ink-soft' },
  { title: 'חיבור מערכת התשלומים', stripe: 'bg-marker', note: 'נועה עובדת על זה', noteClass: 'marker-highlight font-semibold' },
  { title: 'בדיקות עומסים', stripe: 'bg-done', note: 'הושלמה', noteClass: 'text-done font-semibold' },
]

export default function ClaimIllustration() {
  return (
    <div className="relative mt-12 max-w-md space-y-3" aria-hidden>
      {SAMPLE_TASKS.map((task, index) => (
        <div
          key={task.title}
          className="relative flex items-center justify-between rounded-xl bg-surface px-5 py-4 text-ink shadow-lg"
          style={{ marginInlineStart: `${index * 1.5}rem` }}
        >
          <span className={`absolute inset-y-3 start-0 w-1 rounded-full ${task.stripe}`} />
          <span className="font-display font-semibold">{task.title}</span>
          <span className={`rounded-md px-2 py-0.5 text-xs ${task.noteClass}`}>{task.note}</span>
        </div>
      ))}
      <div className="absolute -bottom-6 end-4 rotate-[-4deg] rounded-lg bg-ink px-3 py-2 text-sm font-medium text-canvas shadow-xl">
        המשימה כבר נתפסה (409)
      </div>
    </div>
  )
}
