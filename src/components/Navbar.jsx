import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react'

const BRAND = '#0d5c4a'
const ACCENT = '#c9a84c'

export default function Navbar({ t, lang, setLang, theme, setTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const isDark = theme === 'dark'
  const bg = scrolled
    ? (isDark ? 'rgba(10,10,10,0.95)' : 'rgba(248,246,241,0.95)')
    : 'transparent'
  const borderB = scrolled ? (isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.07)') : 'none'

  const navItems = [
    { label: t.nav.about, href: '#about' },
    { label: t.nav.team, href: '#team' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.calculator, href: '#calculator' },
    { label: t.nav.contact, href: '#contact' },
  ]

  const langs = [
    { code: 'uz', label: "O'Z", flag: '🇺🇿' },
    { code: 'ru', label: 'RU', flag: '🇷🇺' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
      background: bg, backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: borderB,
      transition: 'all 0.3s ease',
      padding: '0 2rem'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>
        {/* Logo */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 36, height: 36, background: BRAND, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#c9a84c', fontSize: 18, fontWeight: 700 }}>B</span>
          </div>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: BRAND, letterSpacing: 2 }}>BELVEST</span>
        </a>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="hidden-mobile">
          {navItems.map(item => (
            <a key={item.href} href={item.href} style={{
              textDecoration: 'none', fontSize: 13, fontWeight: 500, letterSpacing: 1,
              color: isDark ? 'rgba(240,237,232,0.7)' : 'rgba(26,26,26,0.7)',
              transition: 'color 0.2s',
              textTransform: 'uppercase'
            }}
            onMouseEnter={e => e.target.style.color = BRAND}
            onMouseLeave={e => e.target.style.color = isDark ? 'rgba(240,237,232,0.7)' : 'rgba(26,26,26,0.7)'}
            >{item.label}</a>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Lang switcher */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setLangOpen(!langOpen)} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px',
              background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)'}`,
              borderRadius: 8, cursor: 'pointer',
              color: isDark ? '#f0ede8' : '#1a1a1a',
              fontSize: 13, fontWeight: 500
            }}>
              {langs.find(l => l.code === lang)?.flag} {lang.toUpperCase()}
              <ChevronDown size={12} />
            </button>
            {langOpen && (
              <div style={{
                position: 'absolute', top: '110%', right: 0, minWidth: 120,
                background: isDark ? '#161616' : '#fff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                borderRadius: 10, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
              }}>
                {langs.map(l => (
                  <button key={l.code} onClick={() => { setLang(l.code); setLangOpen(false) }} style={{
                    display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '10px 14px',
                    background: l.code === lang ? (isDark ? 'rgba(13,92,74,0.3)' : 'rgba(13,92,74,0.1)') : 'transparent',
                    border: 'none', cursor: 'pointer', color: isDark ? '#f0ede8' : '#1a1a1a',
                    fontSize: 13, fontWeight: 500, textAlign: 'left'
                  }}>
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button onClick={() => setTheme(isDark ? 'light' : 'dark')} style={{
            width: 38, height: 38, borderRadius: 8, border: 'none', cursor: 'pointer',
            background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: isDark ? '#f0ede8' : '#1a1a1a',
            transition: 'all 0.2s'
          }}>
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Mobile menu */}
          <button onClick={() => setOpen(!open)} style={{
            display: 'none', width: 38, height: 38, borderRadius: 8, border: 'none', cursor: 'pointer',
            background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            alignItems: 'center', justifyContent: 'center',
            color: isDark ? '#f0ede8' : '#1a1a1a'
          }} className="show-mobile">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background: isDark ? '#111' : '#fff',
          borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
          padding: '1rem 2rem 1.5rem'
        }}>
          {navItems.map(item => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '12px 0', textDecoration: 'none',
              fontSize: 14, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase',
              color: isDark ? 'rgba(240,237,232,0.8)' : 'rgba(26,26,26,0.8)',
              borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`
            }}>{item.label}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
