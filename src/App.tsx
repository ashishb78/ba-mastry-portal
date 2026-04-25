import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import AppLayout from './components/AppLayout'
import CapstonePage from './pages/CapstonePage'
import DashboardPage from './pages/DashboardPage'
import SettingsPage from './pages/SettingsPage'
import WeekPage from './pages/WeekPage'
import WeeksPage from './pages/WeeksPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/weeks" element={<WeeksPage />} />
          <Route path="/week/:weekNumber" element={<WeekPage />} />
          <Route path="/capstone" element={<CapstonePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
