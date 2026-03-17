const BRAND = '#0d5c4a'
const ACCENT = '#c9a84c'

export default function Footer({ t, theme }) {
  const isDark = theme === 'dark'

  return (
    <footer style={{
      background: '#080f0d',
      color: '#f0ede8',
      padding: '64px 2rem 28px',
      borderTop: `1px solid rgba(13,92,74,0.3)`
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 48, marginBottom: 60 }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 36, height: 36, background: BRAND, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: ACCENT, fontSize: 18, fontWeight: 700 }}>B</span>
              </div>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: '#fff', letterSpacing: 2 }}>BELVEST</span>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.8, opacity: 0.55, maxWidth: 280 }}>
              Ishonchli moliyaviy yechimlar. Murabaha, Ijara, Trade-in va bepul konsultatsiya xizmatlari.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {['T', 'In', 'FB'].map((s, i) => (
                <div key={i} style={{
                  width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', fontSize: 12, fontWeight: 700, opacity: 0.7,
                  transition: 'opacity 0.2s'
                }}>{s}</div>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.4, marginBottom: 20 }}>
              {t.footer.products}
            </h4>
            {['Murabaha', 'Ijara', 'Trade-in', 'Konsultatsiya'].map(item => (
              <a key={item} href="#services" style={{ display: 'block', fontSize: 13.5, opacity: 0.6, textDecoration: 'none', color: '#f0ede8', marginBottom: 12, transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.target.style.opacity = 1}
                onMouseLeave={e => e.target.style.opacity = 0.6}
              >{item}</a>
            ))}
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.4, marginBottom: 20 }}>
              {t.footer.navigation}
            </h4>
            {[
              { label: t.nav.about, href: '#about' },
              { label: t.nav.team, href: '#team' },
              { label: t.nav.services, href: '#services' },
              { label: t.nav.calculator, href: '#calculator' },
              { label: t.nav.contact, href: '#contact' },
            ].map(item => (
              <a key={item.href} href={item.href} style={{ display: 'block', fontSize: 13.5, opacity: 0.6, textDecoration: 'none', color: '#f0ede8', marginBottom: 12, transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.target.style.opacity = 1}
                onMouseLeave={e => e.target.style.opacity = 0.6}
              >{item.label}</a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.4, marginBottom: 20 }}>
              {t.footer.contact}
            </h4>
            <a href="mailto:info@belvest.uz" style={{ display: 'block', fontSize: 13.5, color: ACCENT, textDecoration: 'none', marginBottom: 10 }}>info@belvest.uz</a>
            <a href="tel:+998774809999" style={{ display: 'block', fontSize: 13.5, opacity: 0.65, color: '#f0ede8', textDecoration: 'none', marginBottom: 6 }}>+998 77 480-99-99</a>
            <a href="tel:+998774802222" style={{ display: 'block', fontSize: 13.5, opacity: 0.65, color: '#f0ede8', textDecoration: 'none', marginBottom: 16 }}>+998 77 480-22-22</a>
            <p style={{ fontSize: 12.5, opacity: 0.45, lineHeight: 1.7 }}>
              {t.contact.weekdays}<br />{t.contact.weekend}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 24 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, opacity: 0.35 }}>
            © {new Date().getFullYear()} Belvest. {t.footer.rights}.
          </p>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80' }} />
            <span style={{ fontSize: 11, opacity: 0.4, letterSpacing: 1 }}>BELVEST.UZ</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
