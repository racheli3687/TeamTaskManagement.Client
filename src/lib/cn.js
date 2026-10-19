// חיבור מחלקות CSS, תוך דילוג על ערכים ריקים (false, null, undefined)
export const cn = (...classes) => classes.filter(Boolean).join(' ')
