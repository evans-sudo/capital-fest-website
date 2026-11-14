import Image from 'next/image';
import { ArrowUpRight, MoveUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { eventPhoto } from '@/lib/photos';
import { BrandMark } from './BrandMark';

export function EventAnnouncement({ onTickets }: { onTickets: () => void }) {
  return <section className="announcement" id="experience">
    <div className="announcement__topline"><span>001 / THE EXPERIENCE</span><span>CAPITAL FEST</span></div>
    <p className="announcement__small">IT'S NOT JUST AN EVENT. IT'S A FEELING.</p>
    <h2 className="massive-heading announcement__heading">ARE YOU READY<br/>FOR THE <em>ENERGY</em><span>?!</span></h2>
    <div className="announcement__grid"><div className="announcement__aside"><span className="sparkle decorative" aria-hidden="true">✳</span><p>ONE CITY.<br/>ONE SOUND.<br/>ENDLESS ENERGY.</p><div className="announcement__zigzag" aria-hidden="true">〰〰〰</div></div>
      <div className="festival-flyer" aria-label="Capital Fest festival artwork preview">
        {siteConfig.officialFlyer ? <Image src={siteConfig.officialFlyer} alt="Official Capital Fest festival flyer" fill sizes="(max-width:700px) 88vw, 510px" className="festival-flyer__img"/> : <><Image src={eventPhoto.src} alt="Capital Fest festival stage logo photographed live" fill sizes="(max-width:700px) 88vw, 510px" className="festival-flyer__img"/><div className="festival-flyer__overlay"><span className="festival-flyer__edition">THE NEXT EDITION</span><BrandMark className="festival-flyer__logo"/><div className="festival-flyer__tagline">A NIGHT TO REMEMBER.</div><div className="festival-flyer__detail">OFFICIAL EVENT DETAILS TO BE ANNOUNCED</div></div></>}
      </div><div className="announcement__aside announcement__aside--right"><span>THE MOMENT</span><span>IS OURS</span><MoveUpRight size={54} strokeWidth={1.5}/></div>
    </div>
    <div className="announcement__closing"><span>BIG ENERGY. REAL CONNECTION.</span><span>CREATED FOR THE CULTURE.</span></div>
    <div className="ticket-cta"><div><p className="eyebrow dark">DON'T MISS THE NEXT WAVE</p><h3>TICKETS<span>!</span></h3><p>Good times are better when you're there.</p></div><button type="button" onClick={onTickets} className="ticket-cta__button">TICKET UPDATES <ArrowUpRight size={21}/></button></div>
  </section>;
}
