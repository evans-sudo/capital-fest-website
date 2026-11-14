export function TextMarquee() {
  const text = Array.from({length: 6}, (_,i)=><span key={i}>WHERE IT ALL BEGAN<span className="marquee-asterisk"> ✳ </span></span>);
  return <div className="marquee-area" aria-label="Where it all began"><div className="marquee-line"><div className="marquee-line__inner">{text}{text}</div></div><div className="marquee-line marquee-line--reverse"><div className="marquee-line__inner">{text}{text}</div></div></div>;
}
