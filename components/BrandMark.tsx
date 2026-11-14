import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';

/** Temporary editable typographic brand lock-up until official artwork is provided. */
export function BrandMark({ className = '', inverse = false }: { className?: string; inverse?: boolean }) {
  if (siteConfig.officialLogo) {
    return <Image src={siteConfig.officialLogo} width={210} height={120} alt="Capital Fest" className={className} priority />;
  }
  return <span className={`brand-mark ${inverse ? 'brand-mark--inverse' : ''} ${className}`} aria-label="Capital Fest">
    <span className="brand-mark__arch" aria-hidden="true" />
    <span className="brand-mark__first">CAPITAL</span>
    <span className="brand-mark__second">FEST</span>
    <span className="brand-mark__baseline" aria-hidden="true" />
  </span>;
}
