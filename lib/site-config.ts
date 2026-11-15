import { headlinerFlyer } from './flyers';

/** Replace these explicit placeholders only with confirmed Capital Fest information. */
export const siteConfig = {
  brandName: 'Capital Fest',
  brandShort: 'CAPITAL FEST',
  eventLabel: 'THE NEXT EDITION',
  eventDate: null as string | null,
  eventVenue: null as string | null,
  ticketUrl: null as string | null,
  instagramUrl: 'https://www.instagram.com/capitalfest__/' as string | null,
  xUrl: null as string | null,
  tiktokUrl: null as string | null,
  facebookUrl: null as string | null,
  youtubeUrl: 'https://www.youtube.com/@CapitalFest' as string | null,
  email: null as string | null,
  heroVideo: '/media/capital-fest-hero-v2.mp4' as string | null,
  officialFlyer: headlinerFlyer.src as string | null,
  officialLogo: '/branding/capital-fest-logo.png',
} as const;
