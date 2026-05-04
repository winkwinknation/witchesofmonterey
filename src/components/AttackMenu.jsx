import { STARTING_CHRISTIANITY } from '../game/state.js'

const ATTACK_FLAVORS = [
  'You hurl a hex of revisionist cartography at the welcome sign.',
  'A coastal fog rolls in spelling LOVERS POINT in cursive.',
  'A sea otter, possessed, gnaws the apostrophe off a plaque.',
  'The Chamber of Commerce receives 400 anonymous Yelp reviews.',
  'Hung Cao tweets through it. The tweet has 2 likes.',
  'A pelican drops a pentagram-stamped business card on his porch.',
]

export default function AttackMenu({ state, setState }) {
  const canAttack = state.darkFavor >= 1 && state.christianity > 0
  const pct = Math.max(0, (state.christianity / STARTING_CHRISTIANITY) * 100)

  function attack() {
    setState(prev => {
      if (prev.darkFavor < 1 || prev.christianity <= 0) return prev
      const drained = prev.darkFavor
      const remaining = Math.max(0, prev.christianity - drained)
      return {
        ...prev,
        darkFavor: 0,
        christianity: remaining,
        totalAttacks: prev.totalAttacks + 1,
        victorious: remaining <= 0,
      }
    })
  }

  const flavor = ATTACK_FLAVORS[state.totalAttacks % ATTACK_FLAVORS.length]

  return (
    <div className="menu attack-menu">
      <section className="card card-attack">
        <h2>Lovers <s>of Christ</s> Point</h2>
        <p className="card-flavor">
          A windswept granite outcrop where, somewhere on the Asilomar bluffs, Hung Cao
          insists civilization is being eroded by Wiccans.
        </p>

        <div className="meter">
          <div className="meter-label">
            <span>Christianity remaining</span>
            <span>{Math.ceil(state.christianity)} / {STARTING_CHRISTIANITY}</span>
          </div>
          <div className="meter-bar">
            <div className="meter-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        <button
          className="big-action big-action-attack"
          onClick={attack}
          disabled={!canAttack}
        >
          <span className="big-action-label">Unleash Dark Favor</span>
          <span className="big-action-yield">
            {state.darkFavor < 1
              ? 'Need at least 1 Dark Favor'
              : `Channel ${Math.floor(state.darkFavor)} Dark Favor`}
          </span>
        </button>

        {state.totalAttacks > 0 && (
          <p className="attack-flavor">{flavor}</p>
        )}

        <p className="card-stat">
          Total attacks launched: {state.totalAttacks}
        </p>
      </section>
    </div>
  )
}
