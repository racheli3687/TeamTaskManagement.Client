import { Route, Routes } from 'react-router'
import { GuestOnly, RequireAuth } from '../auth/RouteGuards'
import AppLayout from '../components/layout/AppLayout'
import AuthLayout from '../features/auth/AuthLayout'
import LoginPage from '../features/auth/LoginPage'
import RegisterPage from '../features/auth/RegisterPage'
import DashboardPage from '../features/dashboard/DashboardPage'
import MessagesPage from '../features/messages/MessagesPage'
import ProfilePage from '../features/profile/ProfilePage'
import MemberTasksPage from '../features/tasks/MemberTasksPage'
import MyTasksPage from '../features/tasks/MyTasksPage'
import TeamTasksPage from '../features/tasks/TeamTasksPage'
import TeamPage from '../features/teams/TeamPage'
import TeamsPage from '../features/teams/TeamsPage'
import { ROLES } from '../lib/constants'
import NotFoundPage from './NotFoundPage'

const { Manager, TeamLead, Member } = ROLES

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<GuestOnly />}>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Route>

      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="teams/:teamId" element={<TeamPage />} />
          <Route path="teams/:teamId/tasks" element={<TeamTasksPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="profile" element={<ProfilePage />} />

          <Route element={<RequireAuth roles={[Manager]} />}>
            <Route path="teams" element={<TeamsPage />} />
          </Route>
          <Route element={<RequireAuth roles={[Manager, TeamLead]} />}>
            <Route path="members/:memberId/tasks" element={<MemberTasksPage />} />
          </Route>
          <Route element={<RequireAuth roles={[Member]} />}>
            <Route path="my-tasks" element={<MyTasksPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
