import HungCaoCrying from './HungCaoCrying.jsx'

export default function VictoryScreen({ onRestart }) {
  return (
    <div className="victory-screen">
      <div className="victory-card">
        <h1 className="victory-title">
          You have successfully renamed
          <br />
          <s>Lovers Of Christ Point</s>
          <br />
          <span className="victory-new-name">Lovers Point</span>
        </h1>

        <div className="victory-art-frame">
          <HungCaoCrying />
        </div>

        <p className="victory-flavor">
          The apostrophe was removed at sundown. The Wiccan community has, in fact,
          taken over.
        </p>

        <button className="btn btn-primary" onClick={onRestart}>
          Begin a new dark age
        </button>
      </div>
    </div>
  )
}
