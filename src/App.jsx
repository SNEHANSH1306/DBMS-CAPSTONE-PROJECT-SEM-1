import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import BlindSpot from './pages/BlindSpot'
import JobRecommendations from './pages/JobRecommendations'
import FakeDetector from './pages/FakeDetector'
import AppTracker from './pages/AppTracker'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import { useAppState } from './hooks/useAppState'

function AppLayout() {
  const state = useAppState()

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ marginLeft: 240, flex: 1, minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Dashboard applications={state.applications} />} />
          <Route path="/blind-spot" element={<BlindSpot userProfile={state.userProfile} setUserProfile={state.setUserProfile} />} />
          <Route path="/jobs" element={
            <JobRecommendations
              userProfile={state.userProfile}
              addApplication={state.addApplication}
              applications={state.applications}
            />
          } />
          <Route path="/fake-detector" element={<FakeDetector />} />
          <Route path="/tracker" element={
            <AppTracker
              applications={state.applications}
              addApplication={state.addApplication}
              updateApplication={state.updateApplication}
              deleteApplication={state.deleteApplication}
            />
          } />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
