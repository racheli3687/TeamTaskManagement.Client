import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { deleteMessage, getMessages, getUnreadCount, markMessageAsRead, sendMessage } from '../../api/messages'
import { queryKeys } from '../../api/queryKeys'

const UNREAD_POLL_MS = 30_000
const invalidates = [queryKeys.messages.all]

export const useMessages = (params) =>
  useQuery({
    queryKey: queryKeys.messages.list(params),
    queryFn: ({ signal }) => getMessages(params, signal),
    placeholderData: keepPreviousData,
  })

// מונה ההודעות שלא נקראו מתעדכן ברקע, גם בלי פעולה של המשתמש
export const useUnreadCount = () =>
  useQuery({
    queryKey: queryKeys.messages.unread,
    queryFn: ({ signal }) => getUnreadCount(signal),
    refetchInterval: UNREAD_POLL_MS,
  })

export const useSendMessage = () =>
  useMutation({
    mutationFn: sendMessage,
    meta: { invalidates, successMessage: 'ההודעה נשלחה.', errorsShownInline: true },
  })

export const useMarkAsRead = () => useMutation({ mutationFn: markMessageAsRead, meta: { invalidates } })

export const useDeleteMessage = () =>
  useMutation({ mutationFn: deleteMessage, meta: { invalidates, successMessage: 'ההודעה נמחקה.' } })
