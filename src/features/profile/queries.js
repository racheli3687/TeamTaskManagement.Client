import { useMutation } from '@tanstack/react-query'
import { queryKeys } from '../../api/queryKeys'
import { changePassword, updateProfile } from '../../api/users'

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: updateProfile,
    // השם מופיע גם ברשימות החברים
    meta: {
      invalidates: [queryKeys.me, queryKeys.teams.all],
      successMessage: 'שם המשתמש עודכן. בכניסה הבאה יש להשתמש בשם החדש.',
      errorsShownInline: true,
    },
  })

export const useChangePassword = () =>
  useMutation({
    mutationFn: changePassword,
    meta: { successMessage: 'הסיסמה עודכנה.', errorsShownInline: true },
  })
