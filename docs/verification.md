# Verification — 2026-09-03

- Production build: passed. App, evidence, fonts, and icons total approximately 2.2 MB.
- Unit tests: 4 passed (normalization, scoring, storage failure, persisted-state validation).
- Browser tests: 12 passed across Chromium and mobile WebKit (iPhone 13 emulation).
- All four cases completed through evidence, password, and protective-action decisions in both engines.
- Wrong-answer feedback, hint penalties, local progress across reload, and report download verified.
- Responsive overflow checks passed at widths 320, 390, 768, and 1440 CSS pixels.
- Axe WCAG A/AA automated checks passed for home, case, evidence dialog, playbook, and progress screens.
- Manifest, service-worker activation, precache, and local fonts verified.
- Chromium offline emulation passed. Both browser engines loaded the game and evidence from cache after the subdirectory origin server was shut down. WebKit's `setOffline` simulation produced an internal navigation error, so its cache-only navigation was tested using origin shutdown instead.
- Dependency audit: zero reported vulnerabilities.
- Git whitespace/error check: passed.

Physical iOS/Android installation and assistive-technology user testing have not been performed. The source is prepared for HTTPS hosting; no public deployment was made.

Preview captures are in `docs/previews/`.
