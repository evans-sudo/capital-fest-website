import Link from 'next/link';
import { ArrowUpRight, Instagram } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { BrandMark } from './BrandMark';
import { SymbolStrip } from './SymbolStrip';

export function Footer({ onTickets }: { onTickets: () => void }) {
  return <footer className="footer"><SymbolStrip footer/><div className="footer__body"><div className="footer__brand"><a href="#home" aria-label="Back to top"><BrandMark/></a><p>MORE THAN MUSIC.<br/>MORE THAN A MOMENT.</p><div className="footer__social">{siteConfig.instagramUrl&&<a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18}/></a>}{siteConfig.xUrl&&<a href={siteConfig.xUrl} target="_blank" rel="noopener noreferrer">X</a>}</div></div><div className="footer__nav"><div><h3>MAIN PAGES</h3><a href="#home">Home</a><button type="button" onClick={onTickets}>Tickets</button><a href="#highlights">Highlights</a><a href="#signup">Sign Up</a></div><div><h3>COMPANY</h3><a href="#experience">About Capital Fest</a><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms & Conditions</Link></div><div><h3>CONTACT & OTHER</h3>{siteConfig.email ? <a href={`mailto:${siteConfig.email}`}>Contact us <ArrowUpRight size={14}/></a> : <a href="#signup">Get updates <ArrowUpRight size={14}/></a>}<span>Made for the culture.</span></div></div></div><div className="footer__bottom"><span>© {new Date().getFullYear()} CAPITAL FEST. ALL RIGHTS RESERVED.</span><span className="footer__bottom-links"><Link href="/privacy">PRIVACY</Link><Link href="/terms">TERMS</Link><a href="#home">BACK TO TOP ↑</a></span></div></footer>;
}
