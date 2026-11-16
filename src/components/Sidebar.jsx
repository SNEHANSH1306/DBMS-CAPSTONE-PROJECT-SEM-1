import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Search, Shield, Briefcase, Eye, ChevronRight, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/blind-spot', icon: Eye, label: 'Blind Spot Detector' },
  { to: '/jobs', icon: Search, label: 'Job Recommendations' },
  { to: '/fake-detector', icon: Shield, label: 'Fake Internship Check' },
  { to: '/tracker', icon: Briefcase, label: 'Application Tracker' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const initial = user?.name?.[0]?.toUpperCase() || '?'

  return (
    <aside style={{
      width: 240,
      minHeight: '100vh',
      background: 'var(--bg2)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 0',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ padding: '0 20px 28px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18,
          }}>🔍</div>
          <div>
            <div style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 17, color: 'var(--text)' }}>CareerLens</div>
            <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: -2 }}>Smart Job Search</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '16px 12px', flex: 1 }}>
        <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.08em', padding: '0 8px', marginBottom: 8 }}>FEATURES</div>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end={to === '/'} style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 12px',
            borderRadius: 8,
            marginBottom: 4,
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 500,
            transition: 'all 0.15s',
            background: isActive ? '#3B82F615' : 'transparent',
            color: isActive ? 'var(--accent)' : 'var(--muted2)',
            borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
          })}>
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom profile */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 32, height: 32,
            background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: 'white',
          }}>{initial}</div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name || 'Loading...'}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>{user?.targetRole || 'Student'}</div>
          </div>
        </div>
        <button onClick={handleLogout} className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: 13 }}>
          <LogOut size={14} /> Log out
        </button>
      </div>
    </aside>
  )
}
