import { SAVE_KEY } from './state.js'

export function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function writeSave(state) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...state, savedAt: Date.now() }))
  } catch {}
}

export function deleteSave() {
  try {
    localStorage.removeItem(SAVE_KEY)
  } catch {}
}

export function hasSave() {
  return loadSave() !== null
}
