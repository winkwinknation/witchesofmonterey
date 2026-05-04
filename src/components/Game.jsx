import { useState } from 'react'
import SacrificesMenu from './SacrificesMenu.jsx'
import CovenMenu from './CovenMenu.jsx'
import AttackMenu from './AttackMenu.jsx'
import { STARTING_CHRISTIANITY } from '../game/state.js'

const TABS = [
  { id: 'sacrifices', label: 'Sacrifices & Coin' },
  { id: 'coven', label: 'The Coven' },
  { id: 'attack', label: 'Attack Christ Point' },
]

function fmt(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(2) + 'M'
  if (n >= 1e4) return Math.floor(n).toLocaleString()
  return Math.floor(n * 10) / 10 + ''
}

export default function Game({ state, setState, onWipe, rates }) {
  const [tab, setTab] = useState('sacrifices')
  const [confirmWipe, setConfirmWipe] = useState(false)

  if (!state) return null

  const christianityPct = Math.max(0, (state.christianity / STARTING_CHRISTIANITY) * 100)

  return (
    <div className="game">
      <header className="hud">
        <div className="hud-stats">
          <div className="stat">
            <span className="stat-label">Money</span>
            <span className="stat-value">${fmt(state.money)}</span>
            {rates.moneyPerSec > 0 && <span className="stat-rate">+{rates.moneyPerSec}/s</span>}
          </div>
          <div className="stat">
            <span className="stat-label">Dark Favor</span>
            <span className="stat-value dark">{fmt(state.darkFavor)}</span>
            {rates.darkFavorPerSec > 0 && <span className="stat-rate">+{rates.darkFavorPerSec}/s</span>}
          </div>
          <div className="stat">
            <span className="stat-label">Witches</span>
            <span className="stat-value">{state.witches.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Christ Point</span>
            <span className="stat-value cross">{Math.ceil(state.christianity)}</span>
            <span className="stat-rate">{christianityPct.toFixed(1)}% pure</span>
          </div>
        </div>
        <div className="hud-actions">
          {confirmWipe ? (
            <>
              <span className="hud-warn">Wipe save and restart?</span>
              <button className="btn btn-danger btn-sm" onClick={onWipe}>Wipe</button>
              <button className="btn btn-ghost btn-sm" onClick={() => setConfirmWipe(false)}>Cancel</button>
            </>
          ) : (
            <button className="btn btn-ghost btn-sm" onClick={() => setConfirmWipe(true)}>
              Delete save
            </button>
          )}
        </div>
      </header>

      <nav className="tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`tab ${tab === t.id ? 'tab-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="tab-body">
        {tab === 'sacrifices' && <SacrificesMenu state={state} setState={setState} />}
        {tab === 'coven' && <CovenMenu state={state} setState={setState} />}
        {tab === 'attack' && <AttackMenu state={state} setState={setState} />}
      </main>
    </div>
  )
}
