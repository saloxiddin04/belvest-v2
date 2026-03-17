import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Stats from './components/Stats'
import Services from './components/Services'
import Team from './components/Team'
import Calculator from './components/Calculator'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { translations } from './translations'

export default function App() {
  const [lang, setLang] = useState('uz')
  const [theme, setTheme] = useState('dark')
  const t = translations[lang]

  return (
    <div className={theme} style={{
      background: theme === 'dark' ? '#0a0a0a' : '#f8f6f1',
      color: theme === 'dark' ? '#f0ede8' : '#1a1a1a',
      minHeight: '100vh',
      fontFamily: "'DM Sans', sans-serif"
    }}>
      <Navbar t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
      <Hero t={t} theme={theme} />
      <About t={t} theme={theme} />
      <Stats t={t} theme={theme} />
      <Services t={t} theme={theme} />
      <Team t={t} theme={theme} />
      <Calculator t={t} theme={theme} />
      <Contact t={t} theme={theme} />
      <Footer t={t} theme={theme} />
    </div>
  )
}
