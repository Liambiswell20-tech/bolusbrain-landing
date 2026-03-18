# Requirements: BolusBrain Landing Page

**Defined:** 2026-03-18
**Core Value:** Get T1D users on the waitlist — every signup is a person who believed in the product before it launched.

## v1 Requirements

### Design & Visual Polish

- [ ] **DSGN-01**: Logo is centred in the nav and visually larger (not left-aligned at 200px)
- [ ] **DSGN-02**: Headings use Geist font (already in Next.js 15+) with editorial weight — no default system font feel
- [ ] **DSGN-03**: Feature section emoji icons (📷 📈 🧠) replaced with Lucide React SVG icons
- [ ] **DSGN-04**: Feature section layout breaks the symmetrical 3-column grid — staggered or alternating layout
- [ ] **DSGN-05**: Real BolusBrain app screenshots integrated into the page (at minimum one hero/feature screenshot)
- [ ] **DSGN-06**: Framer Motion entrance animations on key sections (hero, features, founder story) — subtle scroll-in/fade, not flashy

### Email Capture

- [ ] **EMAIL-01**: Loops.so account created and `LOOPS_FORM_URL` environment variable configured
- [ ] **EMAIL-02**: Waitlist form submits successfully to Loops.so and user sees confirmation state
- [ ] **EMAIL-03**: Form handles errors gracefully — network failure shows "Something went wrong. Try again."

### Deployment

- [ ] **DEPLOY-01**: Project deployed to Vercel with production build passing
- [ ] **DEPLOY-02**: bolusbrain.app custom domain configured in Vercel and resolving correctly
- [ ] **DEPLOY-03**: `LOOPS_FORM_URL` environment variable set in Vercel production environment

## v2 Requirements

### Trust & Conversion

- **TRUST-01**: Social proof section — early tester testimonials or T1D community quotes
- **TRUST-02**: Privacy policy page linked from footer
- **TRUST-03**: Terms of service page linked from footer
- **TRUST-04**: Cookie consent banner (required for UK/EU)

### Content

- **CONT-01**: Blog or updates section — post when major features ship
- **CONT-02**: Press kit / media assets page

## Out of Scope

| Feature | Reason |
|---------|--------|
| Custom email backend / database | Loops.so handles storage — no custom DB needed for v1 |
| Authentication | Pre-launch waitlist only — no accounts |
| App demo or interactive features | Screenshots sufficient for v1 |
| Multiple pages | Single landing page only — launch fast |
| Analytics beyond Vercel built-in | Add post-launch once there's traffic to measure |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| DSGN-01 | Phase 1 | Pending |
| DSGN-02 | Phase 1 | Pending |
| DSGN-03 | Phase 1 | Pending |
| DSGN-04 | Phase 1 | Pending |
| DSGN-05 | Phase 1 | Pending |
| DSGN-06 | Phase 1 | Pending |
| EMAIL-01 | Phase 2 | Pending |
| EMAIL-02 | Phase 2 | Pending |
| EMAIL-03 | Phase 2 | Pending |
| DEPLOY-01 | Phase 3 | Pending |
| DEPLOY-02 | Phase 3 | Pending |
| DEPLOY-03 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 12 total
- Mapped to phases: 12
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-18*
