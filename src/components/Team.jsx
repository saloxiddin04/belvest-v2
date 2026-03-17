const BRAND = '#0d5c4a'
const ACCENT = '#c9a84c'

const teamMembers = [
  { name: 'Sherzod Inogamov', role: 'director', initials: 'ШИ' },
  { name: 'Bafo Zufarov', role: 'partner', initials: 'БЗ' },
  { name: 'Sofia Yuldasheva', role: 'advisor', initials: 'СЮ' },
  { name: 'Bekzod', role: 'sales', initials: 'БЕ' },
  { name: 'Abdulaziz Shokirov', role: 'sales', initials: 'АШ' },
]

export default function Team({ t, theme }) {
  const isDark = theme === 'dark'
  const border = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'

  return (
    <section id="team" style={{
      padding: '100px 2rem',
      background: isDark ? '#0f0f0f' : '#fff'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontSize: 12, color: ACCENT, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>— {t.team.title}</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, marginTop: 8,
            color: isDark ? '#f0ede8' : '#0a1a16'
          }}>{t.team.title}</h2>
        </div>

        {/* Director - featured */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <TeamCard member={teamMembers[0]} t={t} isDark={isDark} border={border} featured />
        </div>

        {/* Others */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 60 }} className="team-grid">
          {teamMembers.slice(1).map((m, i) => (
            <TeamCard key={i} member={m} t={t} isDark={isDark} border={border} />
          ))}
        </div>

        {/* Experience banner */}
        <div style={{
          padding: '40px 48px', borderRadius: 20,
          background: `linear-gradient(135deg, ${BRAND} 0%, #0a3d2f 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
          flexWrap: 'wrap'
        }}>
          <div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: '#fff', marginBottom: 10 }}>
              {t.team.expTitle}
            </h3>
            <p style={{ fontSize: 14, opacity: 0.8, color: '#c8e8dc', maxWidth: 560, lineHeight: 1.7 }}>
              {t.team.expDesc}
            </p>
          </div>
          <a href="#contact" style={{
            padding: '14px 28px', borderRadius: 10, textDecoration: 'none',
            background: ACCENT, color: '#1a1a1a', fontWeight: 600, fontSize: 14,
            whiteSpace: 'nowrap', flexShrink: 0
          }}>
            {t.nav.contact} →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 520px) {
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function TeamCard({ member, t, isDark, border, featured }) {
  return (
    <div style={{
      width: featured ? 260 : '100%',
      borderRadius: 16, overflow: 'hidden',
      border: `1px solid ${border}`,
      background: isDark ? '#111' : '#fff',
      transition: 'transform 0.3s, box-shadow 0.3s'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-4px)'
      e.currentTarget.style.boxShadow = `0 16px 40px ${isDark ? 'rgba(13,92,74,0.25)' : 'rgba(13,92,74,0.15)'}`
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = 'none'
    }}>
      {/* Avatar */}
      <div style={{
        height: featured ? 180 : 140,
        background: `linear-gradient(135deg, #0a3d2f, ${featured ? '#0d5c4a' : '#0a3020'})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <div style={{
          width: featured ? 80 : 64, height: featured ? 80 : 64, borderRadius: '50%',
          background: 'rgba(201,168,76,0.2)',
          border: '2px solid rgba(201,168,76,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{ color: '#c9a84c', fontFamily: "'Cormorant Garamond', serif", fontSize: featured ? 28 : 22, fontWeight: 600 }}>
            {member.initials}
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: featured ? '18px 20px 20px' : '14px 16px 18px' }}>
        <div style={{ fontWeight: 600, fontSize: featured ? 16 : 14, marginBottom: 4 }}>{member.name}</div>
        <div style={{ fontSize: 12, color: '#0d5c4a', fontWeight: 500, marginBottom: 6 }}>
          {t.team.roles[member.role]}
        </div>
        <div style={{ fontSize: 11.5, opacity: 0.55, lineHeight: 1.5 }}>
          {featured ? 'многолетний опыт плюс легко находит общий язык с клиентами' : 'Профессионал с опытом'}
        </div>
      </div>
    </div>
  )
}
