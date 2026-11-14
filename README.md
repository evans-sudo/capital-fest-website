# Capital Fest — festival website

A responsive, component-based Capital Fest frontend, reconstructed from the **public content structure of https://elitefestival.org/** and **30 Capital Fest photographs provided by the client**.

**Current edit:** Uses the exact organizer-supplied transparent PNG, nine additional photos, and the supplied 17.4-second MP4. The reference's public animation source was inspected to reproduce its intro, hero reveal, navigation movement, 45-second symbol loops, 8.5-second gallery autoplay, 30-second text loops, and scroll reveals. Visual comparison in a graphical browser remains pending because browser access was unavailable in this session.

## What's included

- Next.js App Router, React 19, TypeScript and Tailwind CSS setup
- Motion for React scroll reveals with reduced-motion support; CSS intro, navigation and ticker animations
- Concert hero with supplied MP4 playing automatically, muted and looping, with photographic fallback and official logo; no video controls are displayed
- Two animated geometric symbol strips
- Large event announcement and a **temporary, clearly non-official flyer composition**
- Ticket entry CTA and keyboard-dismissable drawer, with link support once the actual ticket URL is known
- Mobile menu, anchors and sticky navigation
- Horizontal gallery with 30 optimized festival photos, arrows, keyboard scrolling, 8.5-second autoplay and play/pause; pauses on hover, focus, hidden tabs and offscreen
- Dual-direction 'WHERE IT ALL BEGAN' marquees
- Large featured photo and signup section
- Newsletter API route that calls a **configurable, client-controlled webhook**, not one from the reference website
- Separate `/privacy` and `/terms` placeholder pages awaiting client-approved legal documents
- Offline HTML visual preview in `/preview/index.html`, which works without installing dependencies
- Original JPEGs retained in `/assets/originals` (latest batch in `/november-2026`); optimized WebPs in `/public/images`
- Official Instagram and YouTube account links connected; social icons without configured URLs stay hidden

## Run the Next.js project

Prerequisites: Node.js 20+ and npm.

```bash
cd capital-fest-website
npm install
npm run dev
```

Visit **http://localhost:3000**. Build production artifacts with:

```bash
npm run build:next
npm start
```

TypeScript check: `npm run lint`.

## Deploy to Cloudflare Workers

The repository includes the OpenNext adapter and Wrangler configuration. In Cloudflare Workers Builds, use:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

`npm run build` creates the `.open-next/worker.js` bundle and compiled OpenNext config that Wrangler deploys. `npm run build:cloudflare` is an alias for the same build. The adapter invokes `npm run build:next` internally to build Next.js without recursion. For a local authenticated deployment, run `npm run deploy`. Configure `NEWSLETTER_WEBHOOK_URL` and `NEWSLETTER_API_TOKEN` as Cloudflare Worker secrets when newsletter signups are ready.

## View the immediate visual preview

Open `preview/index.html` locally in a browser (the images reference the included `public/images` folder); or serve the project root:

```bash
python3 -m http.server 8765
# Visit http://localhost:8765/preview/index.html
```

This preview is a standalone HTML/CSS/JavaScript representation, for design review only. **The authoritative implementation is the Next.js application.** In preview mode, form submission deliberately reports that the backend is not configured. The Next.js app has the real `/api/subscribe` route, which will only return success after an authorized webhook confirms receipt.

## Branding and missing launch content

Edit `lib/site-config.ts` to replace launch placeholders:

| Field | Required for launch | Where used |
|---|---|---|
| `officialLogo` | Supplied | Exact PNG used for all brand lockups |
| `heroVideo` | Supplied | Automatic muted hero MP4; photographic fallback |
| `officialFlyer` | Yes | The event poster section |
| `eventDate`, `eventVenue` | If the festival is announced | Add approved text wherever needed |
| `ticketUrl` | If ticketing is live | The ticket drawer CTA |
| `instagramUrl`, `youtubeUrl` | Supplied | Footer links to the official accounts |
| `tiktokUrl`, `xUrl`, `facebookUrl`, `email` | Awaiting account URLs | Optional social links (hidden until configured) and contact |

Example:

```ts
officialLogo: '/branding/capital-fest-logo.png',
heroVideo: '/media/capital-fest-hero.mp4',
officialFlyer: '/branding/capital-fest-official-flyer.webp',
ticketUrl: 'https://your-confirmed-ticketing-url.example',
```

The supplied logo is stored unchanged at `public/branding/capital-fest-logo.png`; its transparent pixels display correctly over the page. The unchanged H.264/AAC portrait video is at `public/media/capital-fest-hero.mp4`. It fills the hero and plays automatically, muted and looping, with no play/pause button or film viewer. Playback stops for reduced-motion preferences, hidden tabs, and when the hero is offscreen.

The official social links supplied by the organizer are [Instagram](https://www.instagram.com/capitalfest__/) and [YouTube](https://www.youtube.com/@CapitalFest). Both open in a new tab. Set additional confirmed account URLs in `lib/site-config.ts`; social icons without URLs stay hidden. No handles or destination links are invented.

The event poster is still a composition using the supplied photos and official logo, pending the official flyer. Event details and ticket URLs remain unconfigured.

The sample event copy is creative placeholder marketing text. No date, venue, performers, social handles, or ticket URL have been invented.

## Newsletter integration

The Next.js newsletter form submits name, email and the optional marketing opt-in flag to `/api/subscribe`. This endpoint validates inputs and forwards them only if a secure endpoint is configured in `.env.local`:

```bash
NEWSLETTER_WEBHOOK_URL=https://your-approved-subscription-backend.example/api/newsletter
NEWSLETTER_API_TOKEN=your-server-to-server-token
```

When no endpoint is configured the API returns **503 (signups not live)**, with a message that the frontend displays. It never pretends users have subscribed. Do not route data to the reference site's EmailJS setup; use your own authorized email/CRM service. Before production, add your own rate limiting, bot protection, explicit consent recordkeeping, compliant privacy copy and delivery/unsubscribe operations.

## Legal and launch checklist

The routes `/privacy` and `/terms` are **clearly marked placeholders** and are not legal advice. Obtain final, organizer-approved legal notices before collecting real user details or publishing the site. The staging metadata sets `robots.index=false`: switch this to `true` only when ready for public indexing.

Before launch:
1. Add the official flyer, event date/venue, ticket URL, contact email and remaining social links.
2. Confirm permission to use the supplied festival photographs and any other media.
3. Integrate newsletter backend and approved privacy/terms pages; verify end-to-end.
4. Validate navigation, ticket modal, mobile menu, form, gallery and reduced-motion behavior.
5. Capture original and replica at 1440×900, 768×1024, 390×844, and 320×568 and adjust fine spacing and typography.
6. Test performance, accessibility, SEO and hosting production configuration.

## Components

```text
app/
  page.tsx                 Homepage composition
  layout.tsx               Metadata and global stylesheet
  globals.css              Brand CSS, animation and breakpoints
  api/subscribe/route.ts   Subscription server-side bridge
  privacy/page.tsx         Legal placeholder
  terms/page.tsx           Legal placeholder
components/
  BrandMark.tsx            Exact organizer-supplied PNG
  SiteHeader.tsx           Desktop navigation + mobile menu
  Hero.tsx                 Automatic muted video hero
  PageIntro.tsx            Timed reference-style logo entrance
  SocialLinks.tsx          Configurable platform links
  SymbolStrip.tsx          Decorative strips
  EventAnnouncement.tsx    Event poster + tickets CTA
  Highlights.tsx           Photo carousel
  TextMarquee.tsx          Dual text bands
  FeaturedPhoto.tsx        Full bleed stage photo
  Newsletter.tsx           Newsletter UI + validation
  Footer.tsx               Navigation and links
  TicketPanel.tsx          Ticket drawer
  LegalPage.tsx            Legal-page template
lib/
  site-config.ts           Centralized event and provider placeholders
  photos.ts                Hero/photo/gallery selection
  photo-manifest.json      All unique asset metadata
public/images/             30 optimized festival photos
assets/originals/          30 unmodified original photos
preview/                   Standalone UI design demo
```

## Original reference vs reconstruction

Verified content order from the public site: **hero video/overlay → two decorative symbol bands → event heading and flyer → ticket announcement → photo highlights → repeated 'WHERE IT ALL BEGAN' text → large featured photo → signup form → decorative footer/footer links**. The current replica preserves that visual narrative with Capital Fest branding and provided images. Animation timings were verified against the reference’s public JavaScript. A side-by-side rendered comparison is still pending.
