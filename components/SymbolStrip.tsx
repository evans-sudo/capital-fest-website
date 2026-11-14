const symbols = ['✳','✦','◈','✳','◆','✦','✳','◉','✳','✦','◈','✳','◆','✦','✳','◉'];
export function SymbolStrip({ reverse = false, footer = false }: { reverse?: boolean; footer?: boolean }) {
  return <div className={`symbols ${reverse ? 'symbols--reverse' : ''} ${footer ? 'symbols--footer' : ''}`} aria-hidden="true"><div className="symbols__track">{[0,1].map((copy)=><span className="symbols__set" key={copy}>{symbols.map((glyph,i)=><span key={i} className={`symbols__glyph symbols__glyph--${i%4}`}>{glyph}</span>)}</span>)}</div></div>;
}
