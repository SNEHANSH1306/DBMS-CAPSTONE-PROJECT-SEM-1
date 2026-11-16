import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const TARGET_ROLES = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'ML Engineer', 'Data Scientist']
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year']

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', email: '', password: '',
    college: '', branch: '', year: '',
    targetRole: '', skills: '', resumeLink: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signup({
        ...form,
        skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
      })
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div className="card" style={{ width: '100%', maxWidth: 460 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            width: 44, height: 44, margin: '0 auto 12px',
            background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
            borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
          }}>🔍</div>
          <h1 style={{ fontSize: 22, marginBottom: 4 }}>Create your account</h1>
          <p style={{ color: 'var(--muted2)', fontSize: 14 }}>Tell us a bit about yourself to get started</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid-2" style={{ marginBottom: 16 }}>
            <div>
              <label htmlFor="name">Full name</label>
              <input id="name" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Pranav Sharma" required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" required />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={form.password} onChange={(e) => update('password', e.target.value)} placeholder="At least 6 characters" required minLength={6} />
          </div>

          <div className="grid-2" style={{ marginBottom: 16 }}>
            <div>
              <label htmlFor="college">College / university</label>
              <input id="college" value={form.college} onChange={(e) => update('college', e.target.value)} placeholder="e.g. MNIT Jaipur" />
            </div>
            <div>
              <label htmlFor="branch">Branch</label>
              <input id="branch" value={form.branch} onChange={(e) => update('branch', e.target.value)} placeholder="e.g. Computer Science" />
            </div>
          </div>

          <div className="grid-2" style={{ marginBottom: 16 }}>
            <div>
              <label htmlFor="year">Year of study</label>
              <select id="year" value={form.year} onChange={(e) => update('year', e.target.value)}>
                <option value="">Select year</option>
                {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="targetRole">Target role</label>
              <select id="targetRole" value={form.targetRole} onChange={(e) => update('targetRole', e.target.value)}>
                <option value="">Select a role</option>
                {TARGET_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label htmlFor="skills">Skills (comma-separated)</label>
            <input id="skills" value={form.skills} onChange={(e) => update('skills', e.target.value)} placeholder="React, JavaScript, Git" />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label htmlFor="resumeLink">Resume link (optional)</label>
            <input id="resumeLink" value={form.resumeLink} onChange={(e) => update('resumeLink', e.target.value)} placeholder="https://drive.google.com/..." />
          </div>

          {error && (
            <div style={{ background: '#EF444420', color: 'var(--red)', padding: '10px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16 }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted2)', marginTop: 20 }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent)' }}>Log in</Link>
        </p>
      </div>
    </div>
  )
}
