import { useEffect, useRef, useState } from 'react'
import { Users, Car, ArrowLeftRight } from 'lucide-react'

const BRAND = '#0d5c4a'
const ACCENT = '#c9a84c'

function CountUp({ target, suffix = '+' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 2000
        const steps = 60
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(current))
        }, duration / steps)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function Stats({ t, theme }) {
  const isDark = theme === 'dark'

  const stats = [
    { Icon: Users, num: 1200, label: t.about.clients, items: [
      t.about.clients,
      '24/7 support',
      'Bepul maslahat'
    ]},
    { Icon: Car, num: 2100, label: t.about.cars, items: [
      'Garantiya',
      'Bepul baholash',
      'Tez jarayon'
    ]},
    { Icon: ArrowLeftRight, num: 550, label: t.about.tradeIn, items: [
      "Almashtirish",
      'Foydali to\'lov',
      'Eng tezkor'
    ]},
  ]

  return (
    <section style={{
      padding: '100px 2rem',
      background: isDark
        ? 'linear-gradient(180deg, #0f0f0f 0%, #0a1a16 100%)'
        : 'linear-gradient(180deg, #fff 0%, #e8f5f0 100%)'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{ fontSize: 12, color: ACCENT, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>— Belvest</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, marginTop: 8,
            color: isDark ? '#f0ede8' : '#0a1a16'
          }}>
            {t.about.stats}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="stats-grid">
          {stats.map(({ Icon, num, label, items }, i) => (
            <div key={i} style={{
              borderRadius: 20, overflow: 'hidden',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)'}`,
              background: isDark ? 'rgba(16,16,16,0.8)' : '#fff',
              transition: 'transform 0.3s, box-shadow 0.3s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px)'
              e.currentTarget.style.boxShadow = `0 20px 60px ${isDark ? 'rgba(13,92,74,0.2)' : 'rgba(13,92,74,0.15)'}`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}>
              {/* Top part - dark */}
              <div style={{
                padding: '32px 28px 28px',
                background: isDark ? 'rgba(13,92,74,0.2)' : `rgba(13,92,74,0.08)`,
                borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                textAlign: 'center'
              }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: BRAND, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Icon size={22} color="#fff" />
                </div>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 52, fontWeight: 600, color: ACCENT, lineHeight: 1
                }}>
                  <CountUp target={num} />
                </div>
                <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6, fontWeight: 500 }}>{label}</div>
              </div>

              {/* Bottom part - list */}
              <div style={{ padding: '20px 28px 24px' }}>
                {items.map((item, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: j < items.length - 1 ? 10 : 0 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: `rgba(13,92,74,0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: BRAND, fontSize: 12 }}>✓</span>
                    </div>
                    <span style={{ fontSize: 13, opacity: 0.75 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
