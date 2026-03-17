const BRAND = '#0d5c4a'
const ACCENT = '#c9a84c'

export default function About({ t, theme }) {
  const isDark = theme === 'dark'
  const cardBg = isDark ? 'rgba(22,22,22,0.8)' : '#fff'
  const border = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'

  return (
    <section id="about" style={{
      padding: '100px 2rem',
      background: isDark ? '#0f0f0f' : '#fff'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="about-grid">
          <div>
            <span style={{ fontSize: 12, color: ACCENT, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>— {t.about.title}</span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300,
              lineHeight: 1.2, marginTop: 12, marginBottom: 28,
              color: isDark ? '#f0ede8' : '#0a1a16'
            }}>
              {t.about.companyTitle}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, opacity: 0.75, marginBottom: 14 }}>{t.about.p1}</p>
            <p style={{ fontSize: 15, lineHeight: 1.8, opacity: 0.75, marginBottom: 14 }}>{t.about.p2}</p>
            <p style={{ fontSize: 15, lineHeight: 1.8, opacity: 0.75, marginBottom: 32, fontStyle: 'italic' }}>{t.about.p3}</p>

            <div style={{ height: 1, background: `linear-gradient(90deg, ${BRAND}, ${ACCENT}, transparent)`, marginBottom: 32 }} />

            {[
              { title: t.about.murabaha, desc: t.about.murabahaDesc },
              { title: t.about.ijara, desc: t.about.ijaraDesc }
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 24, padding: '20px 24px', background: cardBg, borderRadius: 14, border: `1px solid ${border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT }} />
                  <span style={{ fontWeight: 600, fontSize: 15, color: isDark ? '#f0ede8' : '#1a1a1a' }}>{item.title}</span>
                </div>
                <p style={{ fontSize: 13.5, lineHeight: 1.7, opacity: 0.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Right side - visual block */}
          <div style={{ position: 'sticky', top: 100 }}>
            <div style={{
              borderRadius: 20, overflow: 'hidden',
              background: `linear-gradient(135deg, ${BRAND} 0%, #0a3d2f 100%)`,
              padding: '48px 36px', color: '#fff'
            }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 300, color: ACCENT, lineHeight: 1 }}>2019</div>
              <div style={{ fontSize: 13, opacity: 0.7, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28, marginTop: 4 }}>Founded</div>
              
              <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', marginBottom: 28 }} />

              {['Islamic Finance', 'Murabaha', 'Ijara', 'Trade-in', 'Consultation'].map((tag, i) => (
                <div key={i} style={{
                  display: 'inline-block', margin: '4px 6px 4px 0',
                  padding: '6px 14px', borderRadius: 100,
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  fontSize: 12, fontWeight: 500, letterSpacing: 0.5
                }}>{tag}</div>
              ))}

              <div style={{ height: 1, background: 'rgba(255,255,255,0.15)', margin: '28px 0' }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { num: '5+', label: 'Years exp.' },
                  { num: '24/7', label: 'Support' },
                  { num: '100%', label: 'Transparent' },
                  { num: '0%', label: 'Hidden fees' }
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '16px', background: 'rgba(255,255,255,0.06)', borderRadius: 12 }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: ACCENT }}>{s.num}</div>
                    <div style={{ fontSize: 11, opacity: 0.6, textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  )
}
