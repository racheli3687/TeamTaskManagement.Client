import { ChevronLeft, Plus, UsersRound } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router'
import Button from '../../components/ui/Button'
import EmptyState from '../../components/ui/EmptyState'
import PageHeader from '../../components/ui/PageHeader'
import Pagination from '../../components/ui/Pagination'
import QueryView from '../../components/ui/QueryView'
import { SkeletonGrid } from '../../components/ui/Skeleton'
import { useUrlState } from '../../hooks/useUrlState'
import { useTeams } from './queries'
import TeamFormDialog from './TeamFormDialog'

const DEFAULT_PAGING = { page: 1, pageSize: 12 }

function TeamTile({ team }) {
  return (
    <Link
      to={`/teams/${team.id}`}
      className="group flex h-full items-center justify-between gap-4 rounded-xl border border-line bg-surface p-5 transition hover:border-brand"
    >
      <div className="min-w-0">
        <h2 className="truncate font-display text-lg font-semibold group-hover:text-brand" dir="auto">
          {team.name}
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          {team.membersCount === 0 ? 'אין חברים עדיין' : `${team.membersCount} חברים`}
        </p>
      </div>
      <ChevronLeft className="size-5 shrink-0 text-ink-soft transition group-hover:-translate-x-1 group-hover:text-brand" aria-hidden />
    </Link>
  )
}

export default function TeamsPage() {
  const [paging, setPaging] = useUrlState(DEFAULT_PAGING)
  const [creating, setCreating] = useState(false)
  const teamsQuery = useTeams(paging)

  return (
    <>
      <PageHeader
        title="צוותים"
        description="כל הצוותים בחברה. בכל צוות: ראש צוות, חברים ומשימות משלו."
        actions={
          <Button icon={Plus} onClick={() => setCreating(true)}>
            צוות חדש
          </Button>
        }
      />

      <QueryView query={teamsQuery} skeleton={<SkeletonGrid className="h-24" />}>
        {(page) =>
          page.items.length === 0 ? (
            <EmptyState
              icon={UsersRound}
              title="עדיין אין צוותים"
              description="צוות הוא הבית של המשימות. יוצרים צוות, מצרפים חברים ומתחילים לעבוד."
              action={
                <Button icon={Plus} onClick={() => setCreating(true)}>
                  יצירת הצוות הראשון
                </Button>
              }
            />
          ) : (
            <>
              <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {page.items.map((team) => (
                  <li key={team.id}>
                    <TeamTile team={team} />
                  </li>
                ))}
              </ul>
              <Pagination
                page={page.page}
                pageSize={page.pageSize}
                totalCount={page.totalCount}
                onPageChange={(next) => setPaging({ page: next })}
              />
            </>
          )
        }
      </QueryView>

      <TeamFormDialog open={creating} onClose={() => setCreating(false)} />
    </>
  )
}
