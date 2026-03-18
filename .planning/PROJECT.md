# BolusBrain Landing Page

## What This Is

The pre-launch marketing site for BolusBrain — a personal T1D meal and insulin tracking app built by Liam Biswell. The site exists to capture waitlist signups from the T1D community before the app launches, and to establish credibility as a real product with a real founder story. Lives at bolusbrain.app.

## Core Value

Get T1D users on the waitlist — every signup is a person who believed in the product before it launched.

## Requirements

### Validated

- ✓ Landing page exists with hero, features, founder story, roadmap sections — existing codebase
- ✓ Waitlist form with email input — existing (Loops.so integration, URL placeholder only)
- ✓ bolusbrain.app domain owned by Liam

### Active

- [ ] Logo centred and larger in the nav
- [ ] Typography upgraded — Geist font, editorial feel for headings
- [ ] Emoji icons replaced with Lucide React SVG icons
- [ ] Real app screenshots integrated into the page
- [ ] Framer Motion entrance animations (scroll-in, fade — subtle, not flashy)
- [ ] Layout breaks the symmetrical 3-column AI-generated feel
- [ ] Loops.so form URL wired up — email capture actually works
- [ ] Deployed to Vercel, bolusbrain.app pointing at it

### Out of Scope

- Backend/database for emails — Loops.so handles storage, no custom DB needed
- Authentication or user accounts — pre-launch waitlist only
- Blog or content pages — single landing page only
- App demo or interactive features — screenshots sufficient for v1
- Privacy policy / terms pages — can be added post-launch

## Context

**Existing codebase:** Next.js 16.1.6, React 19, TypeScript, Tailwind CSS v4. One page (`app/page.tsx`). Already has all sections written — hero, 3-feature cards, founder story, roadmap (Now/Soon/Pro), waitlist form.

**AI-generated feel to fix:** The current page has emoji icons (📷 📈 🧠), a perfectly symmetrical 3-column feature grid, and no real imagery. These are the primary culprits.

**Aesthetic target:** Personal / indie — feels founder-built, warm, honest. Liam's story is genuinely compelling. The Liam story section is already good — lean into that energy across the whole page.

**Email capture:** Loops.so already wired in code, just needs `LOOPS_FORM_URL` replaced with real endpoint. Free tier, clean API for SaaS waitlists.

**Company context:** Liam is forming BolusBrain Ltd tomorrow and filing a trademark. The site going live is part of establishing the brand publicly.

## Constraints

- **Tech stack**: Next.js + Tailwind — stay within this, no framework switch
- **Scope**: Single page only — launch fast, iterate later
- **Timeline**: Live ASAP — Ltd company forming tomorrow, want presence day one
- **Dependencies**: Need real app screenshots from Liam before screenshot section can be completed

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Loops.so for email capture | Free, purpose-built for waitlists, already in codebase | — Pending |
| Framer Motion for animations | Industry standard for Next.js, lightweight, subtle use only | — Pending |
| Lucide React for icons | Consistent with Next.js ecosystem, replaces emojis | — Pending |
| Vercel for deployment | Zero-config Next.js hosting, free tier sufficient | — Pending |

---
*Last updated: 2026-03-18 after initialization*
