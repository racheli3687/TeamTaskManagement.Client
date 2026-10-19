# ניהול משימות בצוות: לקוח React

הלקוח של [TeamTaskManagement.Api](https://github.com/racheli3687/TeamTaskManagement.Api). כל פעולות השרת זמינות בממשק: הרשמה והתחברות, צוותים וחברים, משימות (כולל תפיסה, שחרור וסטטוס), הודעות ופרופיל.

## דרישות

- Node.js בגרסה 20.19 ומעלה (או 22.12 ומעלה)
- השרת רץ מקומית ב-`http://localhost:5102`, עם CORS שמאפשר את `http://localhost:5173`

## הרצה

```bash
npm install
npm run dev
```

הלקוח נפתח ב-`http://localhost:5173`. כתובת השרת מוגדרת ב-`.env.development` (`VITE_API_URL`).

| פקודה | תיאור |
|---|---|
| `npm run dev` | שרת פיתוח |
| `npm run build` | build ל-`dist` |
| `npm run preview` | הרצת ה-build |
| `npm run lint` | בדיקת ESLint |

## טכנולוגיות

React 19, Vite, React Router 7, TanStack Query 5, Tailwind CSS 4, lucide-react, sonner.

## מבנה

```
src/
  api/          קריאות HTTP לפי משאב, ApiError ו-queryKeys
  app/          App, ניתוב, QueryClient והודעות קופצות
  auth/         החיבור (token), AuthProvider ושומרי מסלולים לפי תפקיד
  theme/        מצב בהיר וכהה
  components/   רכיבי UI משותפים ומעטפת האפליקציה
  features/     מסכים לפי תחום: auth, dashboard, teams, tasks, messages, profile
  hooks/        useUrlState: סינון ועמוד ב-URL
  lib/          קבועים, עיצוב תאריכים, הרשאות תצוגה
```

## החלטות עיקריות

- **הרשאות:** הממשק מציג לכל תפקיד רק את הפעולות שמותרות לו, לפי אותם כללים שבשרת. השרת נשאר הבדיקה הקובעת.
- **תפקיד עדכני:** התפקיד והצוות נטענים מ-`GET /api/users/me` ולא רק מה-token, כך שמינוי או העברה חלים בלי התחברות מחדש.
- **התנגשות (409):** בתפיסה, בשחרור ובעדכון סטטוס, 409 מוצג בחלון ייעודי עם הודעת השרת ומזהה הפנייה (`correlationId`), והרשימה מתרעננת.
- **סינון, מיון ו-pagination:** מתבצעים בשרת. מצב הסינון נשמר ב-URL.
- **ביטול בקשות:** ה-`signal` של TanStack Query מועבר ל-`fetch`, כך שבקשה שכבר לא נחוצה מבוטלת גם בשרת (`CancellationToken`).
- **שגיאות:** כל שגיאה מוצגת בעברית. בטפסים השגיאה מוצגת בתוך הטופס, ובשאר המקרים כהודעה קופצת עם מזהה הפנייה.
