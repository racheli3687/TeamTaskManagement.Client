import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { queryKeys } from '../../api/queryKeys'
import {
  claimTask,
  createTask,
  deleteTask,
  getMemberTasks,
  getTask,
  getTeamTasks,
  releaseTask,
  updateTask,
  updateTaskStatus,
} from '../../api/tasks'

const STATUSES = ['Open', 'InProgress', 'Done']

// הצוות כולו מתעדכן אחרי כל פעולה על משימה: רשימות, ספירות ופרטי המשימה
const invalidates = [queryKeys.tasks.all]

// מקור הרשימה: משימות של צוות, או משימות שמשויכות לחבר
const fetchers = { team: getTeamTasks, member: getMemberTasks }

export const useTaskList = (source, params) =>
  useQuery({
    queryKey: queryKeys.tasks.list(source, params),
    queryFn: ({ signal }) => fetchers[source.kind](source.id, params, signal),
    placeholderData: keepPreviousData,
    enabled: source.id != null,
  })

export const useTask = (taskId) =>
  useQuery({
    queryKey: queryKeys.tasks.detail(taskId),
    queryFn: ({ signal }) => getTask(taskId, signal),
    enabled: taskId != null,
  })

// מספר המשימות בכל סטטוס: עמוד בגודל 1 לכל סטטוס, ו-TotalCount מהשרת
export const useTaskCounts = (teamId) =>
  useQuery({
    queryKey: queryKeys.tasks.counts(teamId),
    queryFn: async ({ signal }) => {
      const pages = await Promise.all(
        STATUSES.map((status) => getTeamTasks(teamId, { status, page: 1, pageSize: 1 }, signal)),
      )
      return Object.fromEntries(STATUSES.map((status, index) => [status, pages[index].totalCount]))
    },
    enabled: teamId != null,
  })

export const useCreateTask = () =>
  useMutation({
    mutationFn: createTask,
    meta: { invalidates, successMessage: 'המשימה נוצרה.', errorsShownInline: true },
  })

export const useUpdateTask = () =>
  useMutation({
    mutationFn: updateTask,
    meta: { invalidates, successMessage: 'השינויים נשמרו.', errorsShownInline: true },
  })

export const useDeleteTask = () =>
  useMutation({ mutationFn: deleteTask, meta: { invalidates, successMessage: 'המשימה נמחקה.' } })

// בפעולות על המשאב המוגבל, 409 מוצג בחלון ייעודי ולא כהודעה קופצת
export const useClaimTask = () =>
  useMutation({
    mutationFn: claimTask,
    meta: { invalidates, successMessage: 'המשימה נתפסה ונרשמה על שמך.', handledStatuses: [409] },
  })

export const useReleaseTask = () =>
  useMutation({
    mutationFn: releaseTask,
    meta: { invalidates, successMessage: 'המשימה שוחררה וחזרה לרשימת הפנויות.', handledStatuses: [409] },
  })

export const useUpdateTaskStatus = () =>
  useMutation({
    mutationFn: updateTaskStatus,
    meta: {
      invalidates,
      successMessage: (task) => (task.status === 'Done' ? 'המשימה סומנה כהושלמה.' : 'המשימה נפתחה מחדש.'),
      handledStatuses: [409],
    },
  })
