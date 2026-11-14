import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BrandMark } from './BrandMark';

export function LegalPage({type}:{type:'privacy'|'terms'}) {
  const isPrivacy = type==='privacy';
  return <main className="legal-page"><header className="legal-header"><Link href="/"><BrandMark/></Link><Link href="/" className="legal-back"><ArrowLeft size={16}/> BACK TO CAPITAL FEST</Link></header><article className="legal-content"><div className="eyebrow dark">CAPITAL FEST / LEGAL</div><h1>{isPrivacy?'PRIVACY POLICY':'TERMS & CONDITIONS'}</h1><p className="legal-disclaimer"><strong>Launch placeholder:</strong> Capital Fest has not yet supplied its approved {isPrivacy?'privacy policy':'terms and conditions'}. This page is intentionally not presented as a finalized legal policy. Obtain review and approved copy before publishing or collecting subscriber information.</p><h2>What will go here?</h2>{isPrivacy?<p>The final privacy policy should cover who controls subscriber information, the data collected, the purpose and legal basis for processing, data processors, retention, data subject rights, and contact details.</p>:<p>The final terms should cover festival attendance, ticket purchases, permitted use of the site, refunds, event changes, conduct and safety requirements, and organizer contact information.</p>}<p>For project setup instructions, please refer to the README included with this website.</p></article><footer className="legal-footer"><span>© {new Date().getFullYear()} CAPITAL FEST</span><Link href="/">BACK TO THE FESTIVAL ↗</Link></footer></main>;
}
