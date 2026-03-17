import { CreditCard, Home, ArrowLeftRight, MessageSquare, ArrowRight } from 'lucide-react'

const BRAND = '#0d5c4a'
const ACCENT = '#c9a84c'

export default function Services({ t, theme }) {
  const isDark = theme === 'dark'

  const services = [
    { Icon: CreditCard, title: t.services.s1Title, desc: t.services.s1Desc, color: '#0d5c4a' },
    { Icon: Home, title: t.services.s2Title, desc: t.services.s2Desc, color: '#1a7a5e' },
    { Icon: ArrowLeftRight, title: t.services.s3Title, desc: t.services.s3Desc, color: '#c9a84c' },
    { Icon: MessageSquare, title: t.services.s4Title, desc: t.services.s4Desc, color: '#2a9d7a' },
  ]

  return (
    <section id="services" style={{
      padding: '100px 2rem',
      background: isDark ? '#0a0a0a' : '#f8f6f1'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontSize: 12, color: ACCENT, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>— {t.services.title}</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, marginTop: 8, marginBottom: 16,
            color: isDark ? '#f0ede8' : '#0a1a16'
          }}>
            {t.services.title}
          </h2>
          <p style={{ fontSize: 15, opacity: 0.6, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
            {t.services.subtitle}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }} className="services-grid">
          {services.map(({ Icon, title, desc, color }, i) => (
            <div key={i} style={{
              padding: '36px 32px', borderRadius: 20,
              background: isDark ? '#111' : '#fff',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'}`,
              position: 'relative', overflow: 'hidden',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'default'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = `0 16px 48px ${isDark ? 'rgba(13,92,74,0.2)' : 'rgba(13,92,74,0.12)'}`
              e.currentTarget.querySelector('.service-corner').style.opacity = '1'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.querySelector('.service-corner').style.opacity = '0'
            }}>
              {/* Corner accent */}
              <div className="service-corner" style={{
                position: 'absolute', top: 0, right: 0, width: 80, height: 80,
                background: `${color}15`, borderRadius: '0 20px 0 80px',
                opacity: 0, transition: 'opacity 0.3s'
              }} />

              {/* Number */}
              <div style={{
                position: 'absolute', top: 20, right: 24,
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 48, fontWeight: 300, opacity: 0.08
              }}>0{i + 1}</div>

              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: `${color}18`,
                border: `1px solid ${color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 20
              }}>
                <Icon size={22} color={color} />
              </div>

              <h3 style={{
                fontSize: 18, fontWeight: 600, marginBottom: 12,
                color: isDark ? '#f0ede8' : '#1a1a1a'
              }}>{title}</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.75, opacity: 0.65, marginBottom: 24 }}>{desc}</p>

              <a href="#calculator" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 13, fontWeight: 600, color: color, textDecoration: 'none',
                letterSpacing: 0.5
              }}>
                {t.services.learnMore} <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
