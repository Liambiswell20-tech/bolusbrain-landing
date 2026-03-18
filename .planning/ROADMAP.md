# Roadmap: BolusBrain Landing Page

## Overview

Three phases take an AI-generated-feeling Next.js page to a live, conversion-ready waitlist site. Phase 1 fixes the visual identity — the thing visitors judge in two seconds. Phase 2 makes the email form actually work. Phase 3 puts it on the internet at bolusbrain.app with everything wired up.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Design & Visual Polish** - Make the page feel founder-built, not AI-generated
- [ ] **Phase 2: Email Capture Integration** - Wire up Loops.so so waitlist signups actually land
- [ ] **Phase 3: Deployment & Go-Live** - Ship to bolusbrain.app with production config

## Phase Details

### Phase 1: Design & Visual Polish
**Goal**: The page looks and feels like a real indie founder built it — not a scaffold output
**Depends on**: Nothing (first phase)
**Requirements**: DSGN-01, DSGN-02, DSGN-03, DSGN-04, DSGN-05, DSGN-06
**Success Criteria** (what must be TRUE):
  1. Visitor sees the BolusBrain logo centred and prominent in the nav — not tucked left at small size
  2. Headings use Geist with editorial weight — page feels typographically intentional
  3. Feature section has no emoji icons and no perfectly symmetrical 3-column grid
  4. At least one real BolusBrain screenshot is visible on the page
  5. Sections fade or slide in on scroll — subtle, not distracting
**Plans**: TBD

### Phase 2: Email Capture Integration
**Goal**: A visitor who enters their email on the waitlist form is actually captured in Loops.so
**Depends on**: Phase 1
**Requirements**: EMAIL-01, EMAIL-02, EMAIL-03
**Success Criteria** (what must be TRUE):
  1. Submitting the form with a valid email results in that email appearing in the Loops.so dashboard
  2. After a successful submission the form shows a confirmation state (not a blank reset)
  3. Submitting with no network connection shows "Something went wrong. Try again." without crashing
**Plans**: TBD

### Phase 3: Deployment & Go-Live
**Goal**: bolusbrain.app resolves to the live site with email capture working end-to-end in production
**Depends on**: Phase 2
**Requirements**: DEPLOY-01, DEPLOY-02, DEPLOY-03
**Success Criteria** (what must be TRUE):
  1. Visiting bolusbrain.app in a browser loads the landing page with no errors
  2. Submitting the waitlist form on the live site delivers the email to Loops.so (env var set in Vercel)
  3. Vercel production build passes with no build errors
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Design & Visual Polish | 0/? | Not started | - |
| 2. Email Capture Integration | 0/? | Not started | - |
| 3. Deployment & Go-Live | 0/? | Not started | - |
