import { useNavigate } from 'react-router-dom'
import { Eye, Search, Shield, Briefcase, TrendingUp, CheckCircle, Clock, XCircle, Award } from 'lucide-react'

export default function Dashboard({ applications }) {
  const navigate = useNavigate()

  const stats = {
    total: applications.length,
    applied: applications.filter(a => a.status === 'Applied').length,
    interview: applications.filter(a => a.status === 'Interview').length,
    offered: applications.filter(a => a.status === 'Offered').length,
    rejected: applications.filter(a => a.status === 'Rejected').length,
  }

  const features = [
    {
      icon: '🔍',
      title: 'Blind Spot Detector',
      desc: 'Find missing skills for your target role',
      path: '/blind-spot',
      color: '#3B82F6',
      action: 'Analyze Skills',
    },
    {
      icon: '💼',
      title: 'Job Recommendations',
      desc: 'Curated jobs matched to your profile',
      path: '/jobs',
      color: '#10B981',
      action: 'Browse Jobs',
    },
    {
      icon: '🛡️',
      title: 'Fake Internship Check',
      desc: 'Verify listings before you apply',
      path: '/fake-detector',
      color: '#F59E0B',
      action: 'Check Listing',
    },
    {
      icon: '📊',
      title: 'Application Tracker',
      desc: 'Track all your applications in one place',
      path: '/tracker',
      color: '#8B5CF6',
      action: 'View Tracker',
    },
  ]

  const statusConfig = {
    Applied: { color: '#3B82F6', icon: Clock },
    Interview: { color: '#F59E0B', icon: TrendingUp },
    Offered: { color: '#10B981', icon: CheckCircle },
    Rejected: { color: '#EF4444', icon: XCircle },
  }

  return (
    <div className="page">
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #131C35 0%, #1A2540 100%)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '32px',
        marginBottom: 28,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: -40, right: -40,
          width: 200, height: 200,
          background: 'radial-gradient(circle, #3B82F630, transparent)',
          borderRadius: '50%',
        }} />
        <div style={{ position: 'relative' }}>
          <span style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Welcome back</span>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginTop: 4, marginBottom: 8 }}>
            Hello👋
          </h1>
          <p style={{ color: 'var(--muted2)', fontSize: 15, maxWidth: 480 }}>
            You have <strong style={{ color: 'var(--yellow)' }}>{stats.interview} interview{stats.interview !== 1 ? 's' : ''}</strong> scheduled and <strong style={{ color: 'var(--green)' }}>{stats.offered} offer</strong> waiting. Keep going!
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => navigate('/jobs')}>
              <Search size={15} /> Find Jobs
            </button>
            <button className="btn btn-ghost" onClick={() => navigate('/blind-spot')}>
              <Eye size={15} /> Check Blind Spots
            </button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {[
          { label: 'Total Applied', value: stats.total, color: '#3B82F6' },
          { label: 'In Interview', value: stats.interview, color: '#F59E0B' },
          { label: 'Offers Received', value: stats.offered, color: '#10B981' },
          { label: 'Rejected', value: stats.rejected, color: '#EF4444' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36, fontWeight: 700, color, fontFamily: 'Space Grotesk' }}>{value}</div>
            <div style={{ fontSize: 13, color: 'var(--muted2)', marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Quick Actions</h2>
      <div className="grid-2" style={{ marginBottom: 32 }}>
        {features.map(({ icon, title, desc, path, color, action }) => (
          <div key={path} className="card" style={{ cursor: 'pointer', transition: 'all 0.2s' }}
            onClick={() => navigate(path)}
            onMouseEnter={e => e.currentTarget.style.borderColor = color}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: color + '20',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, flexShrink: 0,
              }}>{icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{title}</div>
                <div style={{ color: 'var(--muted2)', fontSize: 13 }}>{desc}</div>
              </div>
            </div>
            <button className="btn btn-ghost" style={{ marginTop: 16, fontSize: 13 }}
              onClick={e => { e.stopPropagation(); navigate(path) }}>
              {action} →
            </button>
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Recent Applications</h2>
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {applications.slice(0, 4).map((app, i) => {
          const cfg = statusConfig[app.status] || {}
          return (
            <div key={app.id} style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '16px 20px',
              borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 8,
                background: app.logoColor + '25',
                color: app.logoColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 16, flexShrink: 0,
              }}>{app.logo}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500, fontSize: 14 }}>{app.role}</div>
                <div style={{ color: 'var(--muted)', fontSize: 12 }}>{app.company} · {app.location}</div>
              </div>
              <span className={`badge badge-${app.status === 'Offered' ? 'green' : app.status === 'Interview' ? 'yellow' : app.status === 'Rejected' ? 'red' : 'blue'}`}>
                {app.status}
              </span>
            </div>
          )
        })}
        <div style={{ padding: '12px 20px', textAlign: 'center' }}>
          <button className="btn btn-ghost" style={{ fontSize: 13 }} onClick={() => navigate('/tracker')}>
            View All Applications →
          </button>
        </div>
      </div>
    </div>
  )
}
