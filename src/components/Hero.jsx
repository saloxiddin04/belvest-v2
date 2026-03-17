import { ArrowRight, PhoneCall } from 'lucide-react'

const BRAND = '#0d5c4a'
const ACCENT = '#c9a84c'

export default function Hero({ t, theme }) {
  const isDark = theme === 'dark'
  return (
    <section id="home" style={{
      minHeight: '100vh',
      background: isDark
        ? 'linear-gradient(135deg, #050f0d 0%, #0a1a16 50%, #070d0b 100%)'
        : 'linear-gradient(135deg, #e8f5f0 0%, #f0faf6 50%, #e5f2ec 100%)',
      display: 'flex', alignItems: 'center', paddingTop: 70,
      position: 'relative', overflow: 'hidden'
    }}>
      {/* BG geometric */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 80% 60% at 70% 50%, ${isDark ? 'rgba(13,92,74,0.15)' : 'rgba(13,92,74,0.08)'} 0%, transparent 70%)`
      }} />
      <div style={{
        position: 'absolute', top: '10%', right: '5%', width: 400, height: 400,
        borderRadius: '50%', pointerEvents: 'none',
        border: `1px solid ${isDark ? 'rgba(13,92,74,0.2)' : 'rgba(13,92,74,0.15)'}`,
        animation: 'spin 30s linear infinite'
      }} />
      <div style={{
        position: 'absolute', top: '20%', right: '10%', width: 260, height: 260,
        borderRadius: '50%', pointerEvents: 'none',
        border: `1px solid ${isDark ? 'rgba(201,168,76,0.15)' : 'rgba(201,168,76,0.2)'}`,
        animation: 'spin 20s linear infinite reverse'
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="hero-grid">
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px',
              background: `rgba(13,92,74,0.15)`, borderRadius: 100,
              border: `1px solid rgba(13,92,74,0.3)`,
              marginBottom: 28
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
              <span style={{ fontSize: 12, color: isDark ? '#a3e8c8' : BRAND, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase' }}>Est. 2019</span>
            </div>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 300, lineHeight: 1.15,
              color: isDark ? '#f0ede8' : '#0a1a16',
              marginBottom: 24
            }}>
              {t.hero.founded}
            </h1>
            <p style={{
              fontSize: 16, lineHeight: 1.75, opacity: 0.75,
              marginBottom: 40, maxWidth: 480,
              color: isDark ? '#c8c4be' : '#2a3a34'
            }}>
              {t.hero.subtitle}
            </p>

            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a href="#contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 28px', borderRadius: 10,
                background: BRAND, color: '#fff', textDecoration: 'none',
                fontSize: 14, fontWeight: 600, letterSpacing: 0.5,
                transition: 'all 0.2s', border: 'none'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#0d7a62'}
              onMouseLeave={e => e.currentTarget.style.background = BRAND}
              >
                <PhoneCall size={16} /> {t.hero.cta}
              </a>
              <a href="#about" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 24px', borderRadius: 10, textDecoration: 'none',
                background: 'transparent', fontSize: 14, fontWeight: 500,
                color: isDark ? '#f0ede8' : '#1a1a1a',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)'}`,
                transition: 'all 0.2s'
              }}>
                {t.hero.learnMore} <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right visual */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 20, overflow: 'hidden',
              background: isDark ? 'rgba(13,92,74,0.15)' : 'rgba(13,92,74,0.08)',
              border: `1px solid ${isDark ? 'rgba(13,92,74,0.3)' : 'rgba(13,92,74,0.2)'}`,
              padding: 32, backdropFilter: 'blur(10px)'
            }}>
              {/* Metrics cards */}
              {[
                { num: '1200+', label: t.about?.clients || 'Clients' },
                { num: '2100+', label: t.about?.cars || 'Cars Sold' },
                { num: '550+', label: t.about?.tradeIn || 'Trade-in' },
              ].map((m, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 20px', marginBottom: i < 2 ? 12 : 0,
                  background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)',
                  borderRadius: 12,
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                  backdropFilter: 'blur(6px)',
                  animation: `fadeUp 0.7s ${0.2 + i * 0.15}s both ease`
                }}>
                  <span style={{ fontSize: 13, opacity: 0.7, fontWeight: 500 }}>{m.label}</span>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 28, fontWeight: 600, color: ACCENT
                  }}>{m.num}</span>
                </div>
              ))}

              <div style={{
                marginTop: 16, padding: '14px 20px',
                background: `rgba(13,92,74,0.2)`,
                border: `1px solid rgba(13,92,74,0.4)`, borderRadius: 12,
                display: 'flex', alignItems: 'center', gap: 12
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: BRAND, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: ACCENT, fontSize: 18 }}>✦</span>
                </div>
                <div>
                  <div style={{ fontSize: 12, opacity: 0.6, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase' }}>Islamic Finance</div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Murabaha & Ijara</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
