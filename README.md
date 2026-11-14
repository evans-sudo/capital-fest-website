# Capital Fest — festival website

A responsive, component-based Capital Fest frontend, reconstructed from the **public content structure of https://elitefestival.org/** and **21 unique Capital Fest photographs provided by the client**.

**Scope:** This is a working first implementation / visual baseline, **not a verified pixel-perfect capture** of the reference. The source website's computed CSS, live animations, exact fonts, and detailed interactions were not available for comparison in a graphical browser. Accordingly, styling and interaction details have been approximated around the validated section order rather than falsely presented as a 1:1 source-code copy.

## What's included

- Next.js App Router, React 19, TypeScript and Tailwind CSS setup
- Motion for React for an on-scroll reveal (most ticker animations are CSS)
- Full-screen concert hero with optional MP4, photographic fallback, brand overlay and scroll control
- Two animated geometric symbol strips
- Large event announcement and a **temporary, clearly non-official flyer composition**
- Ticket entry CTA and keyboard-dismissable drawer, with link support once the actual ticket URL is known
- Mobile menu, anchors and sticky navigation
- Manual horizontal gallery with 21 optimized festival photos, keyboard scroll and arrows
- Dual-direction 'WHERE IT ALL BEGAN' marquees
- Large featured photo and signup section
- Newsletter API route that calls a **configurable, client-controlled webhook**, not one from the reference website
- Separate `/privacy` and `/terms` placeholder pages awaiting client-approved legal documents
- Offline HTML visual preview in `/preview/index.html`, which works without installing dependencies
- 21 original JPEG files retained in `/assets/originals`; optimized WebP files in `/public/images`

## Run the Next.js project

Prerequisites: Node.js 20+ and npm.

```bash
cd capital-fest-website
npm install
npm run dev
```

Visit **http://localhost:3000**. Build production artifacts with:

```bash
npm run build
npm start
```

TypeScript check: `npm run lint`.

## Deploy to Cloudflare Workers

The repository includes the OpenNext adapter and Wrangler configuration. In Cloudflare Workers Builds, use:

| Setting | Value |
| --- | --- |
| Build command | `npm run build:cloudflare` |
| Deploy command | `npx wrangler deploy` |

`npm run build` only creates Next.js output; `npm run build:cloudflare` creates the `.open-next/worker.js` bundle that Wrangler deploys. For a local authenticated deployment, run `npm run deploy`. Configure `NEWSLETTER_WEBHOOK_URL` and `NEWSLETTER_API_TOKEN` as Cloudflare Worker secrets when newsletter signups are ready.

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
| `officialLogo` | Yes | All brand lockups |
| `heroVideo` | Optional | Hero MP4; falls back to uploaded Capital Fest photo |
| `officialFlyer` | Yes | The event poster section |
| `eventDate`, `eventVenue` | If the festival is announced | Add approved text wherever needed |
| `ticketUrl` | If ticketing is live | The ticket drawer CTA |
| `instagramUrl`, `xUrl`, `email` | Recommended | Footer, contact |

Example:

```ts
officialLogo: '/branding/capital-fest-logo.svg',
heroVideo: '/media/capital-fest-hero.mp4',
officialFlyer: '/branding/capital-fest-official-flyer.webp',
ticketUrl: 'https://your-confirmed-ticketing-url.example',
```

Put authorized assets under `public/branding` and videos under `public/media` (create the latter folder if needed). The current **CSS brand lock-up is a temporary approximation**, based on the visible stage branding in the supplied photographs, **not an authentic logo file**. The current visual event poster is a composition using the supplied photos, **not the official event flyer**. We have intentionally *not* copied the Elite Festival trademark, official flyer, media, or legal text into Capital Fest's website.

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
1. Obtain official brand mark, flyer, event date/venue, ticket URL and contact/social links.
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
  BrandMark.tsx            Replaceable CSS brand lockup
  SiteHeader.tsx           Desktop navigation + mobile menu
  Hero.tsx                 Video or image hero
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
public/images/             21 optimized festival photos
assets/originals/          21 unmodified original photos
preview/                   Standalone UI design demo
```

## Original reference vs reconstruction

Verified content order from the public site: **hero video/overlay → two decorative symbol bands → event heading and flyer → ticket announcement → photo highlights → repeated 'WHERE IT ALL BEGAN' text → large featured photo → signup form → decorative footer/footer links**. The current replica preserves that visual narrative with Capital Fest branding and provided images. Unknown precise production details have been marked for a later visual comparison, not presented as observed fact.
