import { useState } from 'react'
import { useClaimTask, useDeleteTask, useReleaseTask, useUpdateTaskStatus } from './queries'

const CONFLICT_TITLES = {
  claim: 'המשימה כבר נתפסה',
  release: 'לא ניתן לשחרר את המשימה',
  status: 'לא ניתן לעדכן את הסטטוס',
}

// הפעולות על משימה בכרטיס ובחלון הפרטים, כולל טיפול אחיד בהתנגשות (409)
export function useTaskActions() {
  const [conflict, setConflict] = useState(null)
  const [claimedTaskId, setClaimedTaskId] = useState(null)

  const claimMutation = useClaimTask()
  const releaseMutation = useReleaseTask()
  const statusMutation = useUpdateTaskStatus()
  const deleteMutation = useDeleteTask()

  const onConflict = (kind) => (error) => {
    if (error.status === 409) setConflict({ title: CONFLICT_TITLES[kind], error })
  }

  const pendingTaskId =
    (claimMutation.isPending && claimMutation.variables) ||
    (releaseMutation.isPending && releaseMutation.variables) ||
    (statusMutation.isPending && statusMutation.variables.taskId) ||
    null

  return {
    pendingTaskId,
    claimedTaskId,
    conflict,
    closeConflict: () => setConflict(null),
    claim: (task) =>
      claimMutation.mutate(task.id, { onSuccess: () => setClaimedTaskId(task.id), onError: onConflict('claim') }),
    release: (task) => releaseMutation.mutate(task.id, { onError: onConflict('release') }),
    complete: (task) => statusMutation.mutate({ taskId: task.id, status: 'Done' }, { onError: onConflict('status') }),
    reopen: (task) =>
      statusMutation.mutate({ taskId: task.id, status: 'InProgress' }, { onError: onConflict('status') }),
    remove: (task, options) => deleteMutation.mutate(task.id, options),
    isDeleting: deleteMutation.isPending,
  }
}
