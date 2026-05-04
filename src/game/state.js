export const SAVE_KEY = 'witches-of-monterey:save:v1'

export const STARTING_CHRISTIANITY = 1000

export const WITCH_NAMES = [
  'Morrigan', 'Hexa', 'Briar', 'Sable', 'Willow', 'Nyx', 'Hecate', 'Circe',
  'Selene', 'Lilith', 'Ravenna', 'Maeve', 'Orla', 'Thorn', 'Mab', 'Esme',
  'Calliope', 'Tabitha', 'Ophelia', 'Yara', 'Zephyra', 'Bramble', 'Cinder',
  'Dusk', 'Ember', 'Fern', 'Gloom', 'Hollow', 'Ivy', 'Juniper',
]

export function createInitialState() {
  return {
    createdAt: Date.now(),
    money: 0,
    darkFavor: 0,
    christianity: STARTING_CHRISTIANITY,
    witches: [],
    nextWitchId: 1,
    totalSacrifices: 0,
    totalAttacks: 0,
    victorious: false,
  }
}

export function recruitCost(numWitches) {
  return Math.floor(50 * Math.pow(1.55, numWitches))
}

export function manualSacrificeYield(state) {
  return 1 + state.witches.length
}

export function manual17MileYield(state) {
  return 5 + state.witches.length
}

export const WITCH_SACRIFICE_RATE = 0.5
export const WITCH_MILE_DRIVE_RATE = 1

export function passiveRates(state) {
  let darkFavorPerSec = 0
  let moneyPerSec = 0
  for (const w of state.witches) {
    if (w.assignment === 'sacrifice') darkFavorPerSec += WITCH_SACRIFICE_RATE
    else if (w.assignment === 'mileDrive') moneyPerSec += WITCH_MILE_DRIVE_RATE
  }
  return { darkFavorPerSec, moneyPerSec }
}

export function pickWitchName(state) {
  const used = new Set(state.witches.map(w => w.name))
  const free = WITCH_NAMES.filter(n => !used.has(n))
  if (free.length) return free[Math.floor(Math.random() * free.length)]
  return `Witch #${state.nextWitchId}`
}
