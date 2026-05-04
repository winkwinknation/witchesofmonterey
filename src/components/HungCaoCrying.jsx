const PALETTE = {
  '.': null,
  'h': '#0d0d0d',
  's': '#d4a274',
  'd': '#a87c4a',
  'p': '#0d0d0d',
  'w': '#ffffff',
  'n': '#1a2238',
  'r': '#9a1f2e',
  't': '#7ec8e3',
  'b': '#bce5f5',
  'm': '#3a1212',
}

const ART = [
  '....................',
  '......hhhhhhhh......',
  '.....hhhhhhhhhh.....',
  '....hhhhhhhhhhhh....',
  '...hhhhhhhhhhhhhh...',
  '...hhssssssssssshh..',
  '...hssssssssssssshh.',
  '....ssssssssssssss..',
  '....sswpsssspwsss...',
  '....sstpsssssptss...',
  '....sstsssssssstss..',
  '....stssssddssssts..',
  '....sssssddddsssss..',
  '....ssssssddssssss..',
  '....ssssssssssssss..',
  '....sssmmmmmmmsss...',
  '....ssmsssssssmss...',
  '....ddssssssssddd...',
  '...nnwwwwwwwwwwwnn..',
  '..nnnnnnnwrrwnnnnnn.',
  '.nnnnnnnnnrrnnnnnnnn',
  'nnnnnnnnnnrrnnnnnnnn',
]

const PIXEL = 14
const COLS = 20
const ROWS = ART.length

export default function HungCaoCrying() {
  const rects = []
  for (let y = 0; y < ROWS; y++) {
    const row = ART[y]
    for (let x = 0; x < COLS; x++) {
      const ch = row[x] ?? '.'
      const fill = PALETTE[ch]
      if (!fill) continue
      rects.push(
        <rect
          key={`${x}-${y}`}
          x={x * PIXEL}
          y={y * PIXEL}
          width={PIXEL}
          height={PIXEL}
          fill={fill}
        />
      )
    }
  }

  const tearDrops = [
    { x: 6, y: 12 }, { x: 6, y: 13 }, { x: 6, y: 14 },
    { x: 13, y: 12 }, { x: 13, y: 13 }, { x: 13, y: 14 },
  ]

  return (
    <svg
      className="hung-cao-art"
      viewBox={`0 0 ${COLS * PIXEL} ${ROWS * PIXEL}`}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
      role="img"
      aria-label="A pixel art figure in a navy suit, weeping"
    >
      {rects}
      {tearDrops.map((p, i) => (
        <rect
          key={`tear-${i}`}
          x={p.x * PIXEL}
          y={p.y * PIXEL}
          width={PIXEL}
          height={PIXEL}
          fill={PALETTE['t']}
        />
      ))}
      {tearDrops.filter((_, i) => i % 3 === 0).map((p, i) => (
        <rect
          key={`tear-hl-${i}`}
          x={p.x * PIXEL + 2}
          y={p.y * PIXEL + 2}
          width={4}
          height={4}
          fill={PALETTE['b']}
        />
      ))}
    </svg>
  )
}
