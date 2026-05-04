import { useState } from 'react'

function describeProgress(s) {
  if (!s) return ''
  if (s.victorious) return 'Coven triumphant — Christ has been ousted.'
  const witches = s.witches?.length ?? 0
  const pct = Math.max(0, Math.min(100, Math.round((1 - s.christianity / 1000) * 100)))
  return `${witches} witch${witches === 1 ? '' : 'es'} · ${pct}% of Christ Point drained`
}

function continueLabel(s) {
  if (!s) return ''
  if (s.victorious) return 'Bask in your victory'
  if (s.witches?.length === 0 && s.darkFavor < 1) return 'Resume your fledgling coven'
  if (s.christianity < 250) return 'Finish what you started'
  if (s.christianity < 750) return 'Return to your dark work'
  return 'Continue scheming against Hung Cao'
}

export default function StartScreen({ savedState, onStart, onContinue, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div className="start-screen">
      <div className="start-card">
        <div className="news-frame">
          {!imgFailed && (
            <img
              src={`${import.meta.env.BASE_URL}news-image.jpg`}
              alt="KSBW: Witches in Monterey?"
              className="news-image"
              onError={() => setImgFailed(true)}
            />
          )}
          {imgFailed && (
            <div className="news-fallback" aria-hidden="true">
              <div className="news-fallback-tag">r/MontereyBay</div>
              <div className="news-fallback-headline">It's all about the witches</div>
              <blockquote>
                "There's a place in Monterey, California, called Lovers Point. The original
                name was Lovers of Christ Point. But now it's become — they took out the
                Christ — it's Lovers Point. Monterey is a really dark place now, a lot of
                witchcraft. The Wiccan community has really taken over there." — Hung Cao
              </blockquote>
              <div className="news-fallback-banner">
                <div className="news-fallback-title">WITCHES IN MONTEREY?</div>
                <div className="news-fallback-sub">
                  Acting Navy Secretary Hung Cao called Monterey a 'really dark place' with
                  'a lot of witchcraft'
                </div>
              </div>
            </div>
          )}
        </div>

        <h1 className="title">Witches of Monterey</h1>
        <p className="tagline">
          The Wiccan community has <em>not</em> taken over... yet.
        </p>

        <div className="start-buttons">
          {savedState ? (
            <>
              <button className="btn btn-primary" onClick={onContinue}>
                {continueLabel(savedState)}
              </button>
              <div className="save-meta">{describeProgress(savedState)}</div>
              <button className="btn btn-ghost" onClick={onStart}>
                Start a new coven (overwrite save)
              </button>
              {confirmDelete ? (
                <div className="confirm-row">
                  <span>Delete forever?</span>
                  <button className="btn btn-danger" onClick={onDelete}>Yes, banish it</button>
                  <button className="btn btn-ghost" onClick={() => setConfirmDelete(false)}>No</button>
                </div>
              ) : (
                <button className="btn btn-link" onClick={() => setConfirmDelete(true)}>
                  Delete save
                </button>
              )}
            </>
          ) : (
            <button className="btn btn-primary btn-big" onClick={onStart}>
              Start a coven and challenge Hung Cao
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
