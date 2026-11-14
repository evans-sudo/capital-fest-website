import Image from 'next/image';
import { siteConfig } from '@/lib/site-config';

/** Display the organizer's supplied artwork without recreating or recoloring it. */
export function BrandMark({ className = '' }: { className?: string; inverse?: boolean }) {
  return <span className={`brand-mark ${className}`}>
    <Image
      src={siteConfig.officialLogo || '/branding/capital-fest-logo.png'}
      width={565}
      height={492}
      alt="Capital Fest"
      unoptimized
      priority
      style={{ display: 'block', width: '100%', height: 'auto', objectFit: 'contain' }}
    />
  </span>;
}
