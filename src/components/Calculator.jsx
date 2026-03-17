import { useState, useMemo } from 'react'
import { Calculator as CalcIcon, ChevronDown, ChevronUp } from 'lucide-react'

const BRAND = '#0d5c4a'
const ACCENT = '#c9a84c'

export default function Calculator({ t, theme }) {
  const isDark = theme === 'dark'
  const [price, setPrice] = useState(15000)
  const [downPct, setDownPct] = useState(15)
  const [termMonths, setTermMonths] = useState(24)
  const [annualRate, setAnnualRate] = useState(22)
  const [calcType, setCalcType] = useState('annuity')
  const [showSchedule, setShowSchedule] = useState(false)
  const [calculated, setCalculated] = useState(false)

  const border = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.1)'
  const inputBg = isDark ? 'rgba(255,255,255,0.05)' : '#f8f6f1'
  const cardBg = isDark ? '#111' : '#fff'

  const results = useMemo(() => {
    const downAmount = (price * downPct) / 100
    const loanAmount = price - downAmount
    const monthlyRate = annualRate / 100 / 12

    let schedule = []
    let totalInterest = 0

    if (calcType === 'annuity') {
      // Annuity formula: M = P * r(1+r)^n / ((1+r)^n - 1)
      const monthly = monthlyRate === 0
        ? loanAmount / termMonths
        : loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1)

      let balance = loanAmount
      for (let i = 1; i <= termMonths; i++) {
        const interestPayment = balance * monthlyRate
        const principalPayment = monthly - interestPayment
        balance -= principalPayment
        totalInterest += interestPayment
        schedule.push({
          month: i,
          payment: monthly,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, balance)
        })
      }

      return {
        downAmount,
        loanAmount,
        monthlyPayment: monthly,
        totalPayment: monthly * termMonths,
        totalInterest,
        schedule
      }
    } else {
      // Differentiated: principal = loan/n, interest = balance * rate
      const principalPayment = loanAmount / termMonths
      let balance = loanAmount
      let firstMonthly = 0

      for (let i = 1; i <= termMonths; i++) {
        const interestPayment = balance * monthlyRate
        const monthly = principalPayment + interestPayment
        totalInterest += interestPayment
        if (i === 1) firstMonthly = monthly
        balance -= principalPayment
        schedule.push({
          month: i,
          payment: monthly,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, balance)
        })
      }

      return {
        downAmount,
        loanAmount,
        monthlyPayment: firstMonthly,
        totalPayment: loanAmount + totalInterest,
        totalInterest,
        schedule
      }
    }
  }, [price, downPct, termMonths, annualRate, calcType])

  const fmt = (n) => `$${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

  const InputField = ({ label, value, onChange, min, max, step = 1, suffix }) => (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <label style={{ fontSize: 12, fontWeight: 600, opacity: 0.6, textTransform: 'uppercase', letterSpacing: 0.8 }}>{label}</label>
        <span style={{ fontSize: 15, fontWeight: 600, color: ACCENT }}>{value}{suffix}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: BRAND, cursor: 'pointer' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, opacity: 0.4, marginTop: 4 }}>
        <span>{min}{suffix}</span><span>{max}{suffix}</span>
      </div>
    </div>
  )

  return (
    <section id="calculator" style={{
      padding: '100px 2rem',
      background: isDark
        ? 'linear-gradient(180deg, #0a1a16 0%, #0a0a0a 100%)'
        : 'linear-gradient(180deg, #e8f5f0 0%, #f8f6f1 100%)'
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{ fontSize: 12, color: ACCENT, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase' }}>— {t.calculator.title}</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, marginTop: 8, marginBottom: 12,
            color: isDark ? '#f0ede8' : '#0a1a16'
          }}>{t.calculator.title}</h2>
          <p style={{ fontSize: 15, opacity: 0.6, maxWidth: 500, margin: '0 auto' }}>{t.calculator.subtitle}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }} className="calc-grid">
          {/* Left - Inputs */}
          <div style={{ padding: '36px 32px', borderRadius: 20, background: cardBg, border: `1px solid ${border}` }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
              {[
                { val: 'annuity', label: t.calculator.annuity },
                { val: 'differentiated', label: t.calculator.differentiated }
              ].map(opt => (
                <button key={opt.val} onClick={() => setCalcType(opt.val)} style={{
                  flex: 1, padding: '10px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                  background: calcType === opt.val ? BRAND : (isDark ? 'rgba(255,255,255,0.06)' : '#f0ede8'),
                  color: calcType === opt.val ? '#fff' : (isDark ? '#f0ede8' : '#1a1a1a'),
                  transition: 'all 0.2s', letterSpacing: 0.3
                }}>{opt.label}</button>
              ))}
            </div>

            <InputField label={t.calculator.carPrice} value={price} onChange={setPrice} min={1000} max={200000} step={500} suffix="" />

            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <label style={{ fontSize: 12, fontWeight: 600, opacity: 0.6, textTransform: 'uppercase', letterSpacing: 0.8 }}>{t.calculator.carPrice}</label>
              </div>
              <input
                type="number" value={price} onChange={e => setPrice(Math.max(1000, Number(e.target.value)))}
                style={{
                  width: '100%', padding: '12px 14px', borderRadius: 10, fontSize: 16, fontWeight: 600,
                  background: inputBg, border: `1px solid ${border}`, color: isDark ? '#f0ede8' : '#1a1a1a'
                }}
              />
            </div>

            <InputField label={t.calculator.downPayment} value={downPct} onChange={setDownPct} min={0} max={80} step={5} suffix="%" />
            
            {/* Down amount display */}
            <div style={{
              padding: '10px 14px', marginBottom: 20, borderRadius: 10,
              background: `rgba(13,92,74,0.1)`, border: `1px solid rgba(13,92,74,0.2)`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <span style={{ fontSize: 12, opacity: 0.7 }}>{t.calculator.downPayment}:</span>
              <span style={{ fontWeight: 700, color: BRAND }}>{fmt(results.downAmount)}</span>
            </div>

            <InputField label={t.calculator.term} value={termMonths} onChange={setTermMonths} min={3} max={84} step={3} suffix=" mo" />
            <InputField label={t.calculator.rate} value={annualRate} onChange={setAnnualRate} min={1} max={60} step={0.5} suffix="%" />

            <button onClick={() => setCalculated(true)} style={{
              width: '100%', padding: '16px', borderRadius: 12, border: 'none', cursor: 'pointer',
              background: `linear-gradient(135deg, ${BRAND}, #0d7a62)`,
              color: '#fff', fontSize: 15, fontWeight: 700, letterSpacing: 0.5,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <CalcIcon size={18} /> {t.calculator.calculate}
            </button>
          </div>

          {/* Right - Results */}
          <div>
            <div style={{ padding: '32px', borderRadius: 20, background: `linear-gradient(135deg, ${BRAND}, #0a3d2f)`, color: '#fff', marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, marginBottom: 24, opacity: 0.9 }}>
                {t.calculator.results}
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { label: t.calculator.loanAmount, val: fmt(results.loanAmount), big: false },
                  { label: t.calculator.monthlyPayment, val: fmt(results.monthlyPayment), big: true },
                  { label: t.calculator.totalPayment, val: fmt(results.totalPayment), big: false },
                  { label: t.calculator.totalInterest, val: fmt(results.totalInterest), big: false },
                ].map((item, i) => (
                  <div key={i} style={{
                    padding: '18px 16px', borderRadius: 14,
                    background: item.big ? 'rgba(201,168,76,0.2)' : 'rgba(255,255,255,0.08)',
                    border: item.big ? '1px solid rgba(201,168,76,0.4)' : '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <div style={{ fontSize: 11, opacity: 0.65, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 6 }}>{item.label}</div>
                    <div style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: item.big ? 26 : 20, fontWeight: 600,
                      color: item.big ? ACCENT : '#fff'
                    }}>{item.val}</div>
                  </div>
                ))}
              </div>

              {/* Summary bar */}
              <div style={{ marginTop: 20, padding: '14px 16px', borderRadius: 12, background: 'rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 11, opacity: 0.6 }}>Principal / Interest</span>
                  <span style={{ fontSize: 11 }}>{((results.loanAmount / results.totalPayment) * 100).toFixed(0)}% / {((results.totalInterest / results.totalPayment) * 100).toFixed(0)}%</span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 4,
                    background: `linear-gradient(90deg, ${ACCENT}, #0d7a62)`,
                    width: `${(results.loanAmount / results.totalPayment) * 100}%`,
                    transition: 'width 0.5s ease'
                  }} />
                </div>
              </div>
            </div>

            {/* Schedule toggle */}
            <button onClick={() => setShowSchedule(!showSchedule)} style={{
              width: '100%', padding: '14px 20px', borderRadius: 12, border: `1px solid ${border}`,
              cursor: 'pointer', background: cardBg,
              color: isDark ? '#f0ede8' : '#1a1a1a',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              fontSize: 14, fontWeight: 600
            }}>
              <span>{t.calculator.schedule}</span>
              {showSchedule ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>

        {/* Schedule table */}
        {showSchedule && (
          <div style={{
            marginTop: 24, borderRadius: 20, overflow: 'hidden',
            border: `1px solid ${border}`, background: cardBg
          }}>
            <div style={{ overflowX: 'auto', maxHeight: 440, overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: isDark ? 'rgba(13,92,74,0.3)' : 'rgba(13,92,74,0.1)' }}>
                    {[t.calculator.month, t.calculator.payment, t.calculator.principal, t.calculator.interest, t.calculator.balance].map(h => (
                      <th key={h} style={{ padding: '14px 16px', textAlign: 'right', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.8, color: isDark ? '#a3e8c8' : BRAND, whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.schedule.map((row, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`, background: i % 2 === 0 ? 'transparent' : (isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)') }}>
                      <td style={{ padding: '11px 16px', textAlign: 'right', fontWeight: 600, color: ACCENT }}>{row.month}</td>
                      <td style={{ padding: '11px 16px', textAlign: 'right', fontWeight: 600 }}>{fmt(row.payment)}</td>
                      <td style={{ padding: '11px 16px', textAlign: 'right', color: isDark ? '#6ee7b7' : BRAND }}>{fmt(row.principal)}</td>
                      <td style={{ padding: '11px 16px', textAlign: 'right', opacity: 0.6 }}>{fmt(row.interest)}</td>
                      <td style={{ padding: '11px 16px', textAlign: 'right', opacity: 0.7 }}>{fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .calc-grid { grid-template-columns: 1fr !important; }
        }
        input[type=range] { height: 4px; }
      `}</style>
    </section>
  )
}
