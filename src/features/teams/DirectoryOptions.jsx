import { ROLE_LABELS } from '../../lib/constants'

// אפשרויות <select> של משתמשים, מקובצות לפי צוות (מתוך useDirectory)
export default function DirectoryOptions({ directory, include = () => true }) {
  return directory.map(({ team, members }) => {
    const visible = members.filter(include)
    if (visible.length === 0) return null
    return (
      <optgroup key={team.id} label={team.name}>
        {visible.map((member) => (
          <option key={member.id} value={member.id}>
            {member.userName} ({ROLE_LABELS[member.role]})
          </option>
        ))}
      </optgroup>
    )
  })
}
