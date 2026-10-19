// מפתחות ה-cache במקום אחד. מבנה היררכי: רענון של מפתח אב מרענן את כל מה שמתחתיו.
export const queryKeys = {
  me: ['me'],
  teams: {
    all: ['teams'],
    list: (params) => ['teams', 'list', params],
    detail: (teamId) => ['teams', 'detail', teamId],
    members: (teamId, params) => ['teams', 'members', teamId, params],
    directory: (role, teamId) => ['teams', 'directory', role, teamId],
  },
  tasks: {
    all: ['tasks'],
    list: (source, params) => ['tasks', 'list', source.kind, source.id, params],
    detail: (taskId) => ['tasks', 'detail', taskId],
    counts: (teamId) => ['tasks', 'counts', teamId],
  },
  messages: {
    all: ['messages'],
    list: (params) => ['messages', 'list', params],
    unread: ['messages', 'unread'],
  },
}
