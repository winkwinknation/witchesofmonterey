import { useEffect, useRef, useState } from 'react'
import StartScreen from './components/StartScreen.jsx'
import Game from './components/Game.jsx'
import VictoryScreen from './components/VictoryScreen.jsx'
import { createInitialState, passiveRates, WITCH_SACRIFICE_RATE, WITCH_MILE_DRIVE_RATE } from './game/state.js'
import { loadSave, writeSave, deleteSave } from './game/save.js'

const TICK_MS = 1000

export default function App() {
  const [screen, setScreen] = useState('start')
  const [state, setState] = useState(null)
  const [savedSnapshot, setSavedSnapshot] = useState(() => loadSave())
  const tickRef = useRef(null)

  useEffect(() => {
    if (screen !== 'game' || !state) return
    tickRef.current = setInterval(() => {
      setState(prev => {
        if (!prev) return prev
        let darkFavor = prev.darkFavor
        let money = prev.money
        for (const w of prev.witches) {
          if (w.assignment === 'sacrifice') darkFavor += WITCH_SACRIFICE_RATE
          else if (w.assignment === 'mileDrive') money += WITCH_MILE_DRIVE_RATE
        }
        return { ...prev, darkFavor, money }
      })
    }, TICK_MS)
    return () => clearInterval(tickRef.current)
  }, [screen, state === null])

  useEffect(() => {
    if (!state) return
    writeSave(state)
  }, [state])

  useEffect(() => {
    if (state?.victorious && screen === 'game') {
      setScreen('victory')
    }
  }, [state?.victorious, screen])

  function startNewGame() {
    const fresh = createInitialState()
    setState(fresh)
    writeSave(fresh)
    setSavedSnapshot(fresh)
    setScreen('game')
  }

  function continueGame() {
    const saved = loadSave()
    if (!saved) return
    setState(saved)
    setScreen(saved.victorious ? 'victory' : 'game')
  }

  function wipeSave() {
    deleteSave()
    setState(null)
    setSavedSnapshot(null)
    setScreen('start')
  }

  if (screen === 'start') {
    return (
      <StartScreen
        savedState={savedSnapshot}
        onStart={startNewGame}
        onContinue={continueGame}
        onDelete={wipeSave}
      />
    )
  }

  if (screen === 'victory') {
    return <VictoryScreen onRestart={wipeSave} />
  }

  return (
    <Game
      state={state}
      setState={setState}
      onWipe={wipeSave}
      rates={state ? passiveRates(state) : { darkFavorPerSec: 0, moneyPerSec: 0 }}
    />
  )
}
