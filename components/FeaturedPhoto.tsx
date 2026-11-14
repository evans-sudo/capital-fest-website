import Image from 'next/image';
import { featurePhoto } from '@/lib/photos';
export function FeaturedPhoto() {
  return <section className="featured" aria-label="Capital Fest performance moment"><Image src={featurePhoto.src} alt={featurePhoto.alt} fill sizes="100vw"/><div className="featured__shade"/><div className="featured__content"><span className="eyebrow">THE SOUND THAT MOVES US</span><h2>WE CAME<br/>FOR THE <em>MUSIC.</em><br/>WE STAYED<br/>FOR THE <em>MEMORIES.</em></h2><span className="featured__bottom">THIS IS CAPITAL FEST. <span>✳</span></span></div></section>;
}
