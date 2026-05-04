import { recruitCost, pickWitchName, WITCH_SACRIFICE_RATE, WITCH_MILE_DRIVE_RATE } from '../game/state.js'

const ASSIGNMENTS = [
  { id: 'idle', label: 'Idle' },
  { id: 'sacrifice', label: 'Sacrifices' },
  { id: 'mileDrive', label: '17 Mile Drive' },
]

const RECRUIT_FLAVORS = [
  "There's a barista in Carmel-by-the-Sea who has been reading Crowley between orders. She's ready.",
  "A docent at the Monterey Bay Aquarium has been whispering to the octopuses. They whisper back.",
  "A yoga instructor in Pacific Grove keeps her altar in the savasana closet. Nobody's noticed.",
  "A retired marine biologist in Moss Landing claims the sea otters owe her a favor. They do.",
  "A used bookstore clerk in Seaside has been mis-shelving Bibles in the occult section on purpose.",
  "An open-mic poet at East Village Coffee Lounge has been reciting the wrong Latin. Or the right Latin.",
  "A cheese monger at the Carmel farmers' market sells brie that grants visions on Tuesdays.",
  "A sommelier in Carmel Valley has been blessing the rosé. Sales are up. So are sightings.",
  "A surfer at Asilomar Beach paddles out at dusk and never seems to come back wet.",
  "A tide-pool docent at Point Lobos claims one of the anemones is her grandmother. The anemone agrees.",
  "A barista at Captain + Stoker's keeps drawing pentagrams in the latte foam. The regulars tip extra.",
  "A pastry chef in downtown Monterey folds her croissants 333 times. They sell out by 9am.",
  "A bartender at the Mucky Duck is teaching the parrot Enochian. The parrot is a quick study.",
  "A volunteer at the Steinbeck House gift shop has been quietly editing the prayer cards.",
  "A choir alto at a Pebble Beach chapel hums in a key that wasn't invented yet.",
  "An equestrian instructor in Carmel Valley says her horse remembers the burning times.",
  "A hot yoga teacher in Marina ends every class with a chant nobody can quite repeat.",
  "A docent at the Cannery Row historical plaque has been quietly rewriting Steinbeck's footnotes.",
  "A wine club hostess in Carmel Valley swears the cork popped on its own. Three witnesses agree.",
  "A girl at the Pacific Grove butterfly sanctuary speaks fluent Monarch. The Monarchs translated her.",
  "A real estate agent in Seaside keeps closing deals on the new moon. Always cash. Always foreign.",
  "A pottery instructor in Big Sur fires her kilns with driftwood that screams. The mugs are gorgeous.",
  "A whale-watching captain out of Fisherman's Wharf claims the gray whales gave her a contract.",
  "A volunteer at the Carmel Mission gift shop has been swapping the rosaries one bead at a time.",
  "A barista on Lighthouse Avenue keeps a jar labeled 'tips' filled with teeth. Tourists oblige.",
]

export default function CovenMenu({ state, setState }) {
  const cost = recruitCost(state.witches.length)
  const canAfford = state.money >= cost

  function recruit() {
    setState(prev => {
      const c = recruitCost(prev.witches.length)
      if (prev.money < c) return prev
      const newWitch = {
        id: prev.nextWitchId,
        name: pickWitchName(prev),
        assignment: 'idle',
      }
      return {
        ...prev,
        money: prev.money - c,
        witches: [...prev.witches, newWitch],
        nextWitchId: prev.nextWitchId + 1,
      }
    })
  }

  function assign(witchId, assignment) {
    setState(prev => ({
      ...prev,
      witches: prev.witches.map(w =>
        w.id === witchId ? { ...w, assignment } : w
      ),
    }))
  }

  function bulkAssign(assignment) {
    setState(prev => ({
      ...prev,
      witches: prev.witches.map(w => ({ ...w, assignment })),
    }))
  }

  const counts = state.witches.reduce(
    (acc, w) => ({ ...acc, [w.assignment]: (acc[w.assignment] || 0) + 1 }),
    { idle: 0, sacrifice: 0, mileDrive: 0 }
  )

  const flavorIndex = (state.nextWitchId - 1) % RECRUIT_FLAVORS.length
  const flavor = RECRUIT_FLAVORS[flavorIndex]

  return (
    <div className="menu coven-menu">
      <section className="card card-coven">
        <h2>Recruit a Witch</h2>
        <p className="card-flavor">{flavor}</p>
        <button
          className="big-action big-action-coven"
          onClick={recruit}
          disabled={!canAfford}
        >
          <span className="big-action-label">Initiate New Witch</span>
          <span className="big-action-yield">${cost}</span>
        </button>
        {!canAfford && (
          <p className="card-meta warn">Need ${cost - Math.floor(state.money)} more</p>
        )}
        <p className="card-meta">
          Each witch: +1 manual ritual yield, +1 manual toll yield, and can be assigned
          to passive work below.
        </p>
      </section>

      <section className="card">
        <h2>Coven Assignments</h2>
        <div className="bulk-row">
          <span>Assign all to:</span>
          <button className="btn btn-sm" onClick={() => bulkAssign('idle')}>Idle ({counts.idle})</button>
          <button className="btn btn-sm" onClick={() => bulkAssign('sacrifice')}>
            Sacrifices ({counts.sacrifice})
          </button>
          <button className="btn btn-sm" onClick={() => bulkAssign('mileDrive')}>
            17 Mile ({counts.mileDrive})
          </button>
        </div>
        <p className="card-meta">
          Per witch: {WITCH_SACRIFICE_RATE} Dark Favor/sec or ${WITCH_MILE_DRIVE_RATE}/sec
        </p>
        {state.witches.length === 0 ? (
          <p className="empty-state">
            No witches yet. The forests of Big Sur are quiet.
          </p>
        ) : (
          <ul className="witch-list">
            {state.witches.map(w => (
              <li key={w.id} className="witch-row">
                <span className="witch-name">{w.name}</span>
                <div className="witch-assign">
                  {ASSIGNMENTS.map(a => (
                    <button
                      key={a.id}
                      className={`pill ${w.assignment === a.id ? 'pill-active' : ''}`}
                      onClick={() => assign(w.id, a.id)}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
