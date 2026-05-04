import { manualSacrificeYield, manual17MileYield } from '../game/state.js'

export default function SacrificesMenu({ state, setState }) {
  const sacYield = manualSacrificeYield(state)
  const moneyYield = manual17MileYield(state)

  function runSacrifice() {
    setState(prev => ({
      ...prev,
      darkFavor: prev.darkFavor + manualSacrificeYield(prev),
      totalSacrifices: prev.totalSacrifices + 1,
    }))
  }

  function workMileDrive() {
    setState(prev => ({
      ...prev,
      money: prev.money + manual17MileYield(prev),
    }))
  }

  return (
    <div className="menu sacrifices-menu">
      <section className="card card-dark">
        <h2>Run a Sacrifice Ceremony</h2>
        <p className="card-flavor">
          Light the black candles. Whisper the rites. Channel the darkness Hung Cao
          warned them about.
        </p>
        <button className="big-action big-action-dark" onClick={runSacrifice}>
          <span className="big-action-label">Sacrifice to Satan</span>
          <span className="big-action-yield">+{sacYield} Dark Favor</span>
        </button>
        <p className="card-meta">
          Bonus from coven size: +{state.witches.length} per ritual
        </p>
        <p className="card-stat">
          Lifetime sacrifices: {state.totalSacrifices}
        </p>
      </section>

      <section className="card card-coast">
        <h2>Work the 17 Mile Drive Toll Booth</h2>
        <p className="card-flavor">
          Smile, take their $12, point at the cypress tree. The tourists never suspect
          a thing.
        </p>
        <button className="big-action big-action-coast" onClick={workMileDrive}>
          <span className="big-action-label">Collect Entrance Fees</span>
          <span className="big-action-yield">+${moneyYield}</span>
        </button>
        <p className="card-meta">
          Bonus from coven size: +${state.witches.length} per shift
        </p>
      </section>
    </div>
  )
}
