import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, Instagram } from 'lucide-react'

const BRAND = '#0d5c4a'
const ACCENT = '#c9a84c'

export default function Contact({ t, theme }) {
  const isDark = theme === 'dark'
  const [form, setForm] = useState({ name: '', surname: '', email: '', phone: '', message: '' })
  const [sent, setSent] = useState(false)
  const border = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.1)'
  const inputBg = isDark ? 'rgba(255,255,255,0.05)' : '#f8f6f1'

  const inputStyle = {
    width: '100%', padding: '13px 16px', borderRadius: 10, fontSize: 14,
    background: inputBg, border: `1px solid ${border}`,
    color: isDark ? '#f0ede8' : '#1a1a1a',
    transition: 'border-color 0.2s'
  }

  return (
    <section id="contact" style={{
      padding: '100px 2rem',
      background: isDark ? '#0a0a0a' : '#f8f6f1'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontSize: 12, color: ACCENT, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>— {t.contact.title}</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, marginTop: 8,
            color: isDark ? '#f0ede8' : '#0a1a16'
          }}>{t.contact.title}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 40, alignItems: 'start' }} className="contact-grid">
          {/* Contact info */}
          <div>
            <div style={{ padding: '36px 32px', borderRadius: 20, background: `linear-gradient(135deg, ${BRAND}, #072e22)`, color: '#fff', marginBottom: 20 }}>
              {[
                { Icon: MapPin, text: 'Toshkent shaxar, Olmazor tumani, Yangi sebzor MFY, Sebzor s-17/18 mavze, 1uy, 41xona' },
                { Icon: Phone, text: '+998 77-480-22-22 / +998 77-480-99-99' },
                { Icon: Mail, text: 'info@belvest.uz' },
                { Icon: Clock, text: `${t.contact.weekdays}\n${t.contact.weekend}` },
              ].map(({ Icon, text }, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, marginBottom: i < 3 ? 24 : 0, alignItems: 'flex-start' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} />
                  </div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.6, opacity: 0.85, paddingTop: 10, whiteSpace: 'pre-line' }}>{text}</div>
                </div>
              ))}

              <div style={{ height: 1, background: 'rgba(255,255,255,0.12)', margin: '24px 0' }} />

              <div style={{ display: 'flex', gap: 12 }}>
                <a href="https://t.me/belvest" style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', fontSize: 16 }}>✈</a>
                <a href="https://instagram.com/belvest" style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                  <Instagram size={16} color="#fff" />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ padding: '40px 36px', borderRadius: 20, background: isDark ? '#111' : '#fff', border: `1px solid ${border}` }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: `rgba(13,92,74,0.15)`, border: `2px solid ${BRAND}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28 }}>✓</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, marginBottom: 8 }}>Yuborildi!</h3>
                <p style={{ opacity: 0.6, fontSize: 14 }}>Tez orada siz bilan bog'lanamiz.</p>
                <button onClick={() => setSent(false)} style={{ marginTop: 20, padding: '10px 24px', borderRadius: 8, background: BRAND, color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Yana</button>
              </div>
            ) : (
              <>
                <p style={{ fontSize: 14, opacity: 0.6, marginBottom: 28 }}>{t.contact.subtitle}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, opacity: 0.6, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>{t.contact.name} *</label>
                    <input style={inputStyle} value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="..." />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, opacity: 0.6, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>{t.contact.surname}</label>
                    <input style={inputStyle} value={form.surname} onChange={e => setForm({...form, surname: e.target.value})} placeholder="..." />
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, opacity: 0.6, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>{t.contact.email} *</label>
                  <input style={inputStyle} type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@example.com" />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, opacity: 0.6, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>{t.contact.phone}</label>
                  <input style={inputStyle} type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+998 ..." />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, opacity: 0.6, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.8 }}>{t.contact.message}</label>
                  <textarea style={{ ...inputStyle, height: 100, resize: 'vertical' }} value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="..." />
                </div>
                <button onClick={() => setSent(true)} style={{
                  width: '100%', padding: '16px', borderRadius: 12, border: 'none', cursor: 'pointer',
                  background: `linear-gradient(135deg, ${BRAND}, #0d7a62)`,
                  color: '#fff', fontSize: 15, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  transition: 'all 0.2s'
                }}>
                  <Send size={16} /> {t.contact.send}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
