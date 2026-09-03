# OVERSHARED

A mobile-first, installable password security learning game. Four fictional investigations turn public social posts into teachable moments about personal information, password reuse, MFA, and workplace disclosure.

Cloned and adapted from [jrsherlock/password-security-awareness](https://github.com/jrsherlock/password-security-awareness), starting at `cd3a612`. The original character names and social-post images are retained. The interface, game flow, accessible transcripts, assessment, scoring, persistence, and PWA support are new.

## Run

Requires Node.js 22.12+ (or a supported newer release).

```sh
npm ci
npm run dev
```

Open http://localhost:5188. For a production build with offline support:

```sh
npm run build
npm run preview -- --port 4188
```

Open http://localhost:4188. Installation and service workers require HTTPS or localhost. A plain HTTP LAN address is useful for layout previews but will not offer PWA installation.

## The game

- Four cases, twelve original social posts, approximately twelve minutes.
- Inspect every post and correctly log relevant evidence or rule out a distraction.
- Assemble a fictional password using the exposed hint and evidence board.
- Answer an applied protection question to close the case.
- Earn up to 300 XP per case. Additional password attempts cost 15 XP, hints 25 XP, and additional protection attempts 20 XP. Every completed case earns at least 100 XP.
- Revisit evidence, consult the security playbook, and download a Markdown field report.
- No real passwords, accounts, analytics, or external data submission. Progress stays in local storage on the current browser/device.

The case timestamps are archived story details. Answers intentionally accept capitalization differences and common separators; real password systems generally do not. Accessible transcripts add clarifying context where the original image is ambiguous (for example, the JD abbreviation). This is a self-paced learning experience, not a security tool or verified certification.

## PWA and deployment

The build uses relative asset URLs, hash navigation, and a scope-relative manifest/service worker. It can be served at a domain root or a GitHub Pages repository subdirectory. All shipped images, fonts, and game assets are cached after the first successful online load. Learners are prompted when a new edition is available.

A manual GitHub Pages workflow is included in `.github/workflows/deploy.yml`. In the repository settings select **Pages → GitHub Actions**, then run **Deploy OVERSHARED**. No deployment or push has been performed as part of this local rebuild.

On iOS, open the HTTPS site in Safari and choose **Share → Add to Home Screen**. On supported desktop/Android browsers, use the browser install control or the in-game **Install game** button. Device installation itself should be checked on physical target devices before a broad rollout.

## Validation

```sh
npm test
npx playwright install chromium webkit
npm run test:e2e
```

Unit tests cover normalization, scoring, corrupt storage, and state validation. Browser tests cover all case journeys, wrong answers and hints, persistence, downloads, responsive overflow, dialogs, WCAG A/AA automated checks, and production offline reload. Chromium uses offline network emulation; both browser engines also reload the subdirectory app after its origin server is stopped. Automated accessibility checks complement, rather than replace, assistive-technology user testing.

## Project structure

- `src/screens/`: case library, investigation, playbook, and learner report.
- `src/components/ui.jsx`: shared accessible dialog, icons, and wordmark.
- `src/App.jsx`: routing, persistence, installation, and app shell.
- `src/data.js`: learning content and case configuration.
- `src/game.js`: pure scoring and validated persistence helpers.
- `src/images/`: original project evidence, with source attribution retained.
- `src/styles.css`: responsive visual system and reduced-motion/print behavior.
- `docs/facilitator-guide.md`: objectives, facilitation, and rollout limitations.

Security guidance: [CISA Secure Our World](https://www.cisa.gov/secure-our-world). Fonts: Barlow Condensed and DM Sans, self-hosted under the SIL Open Font License; see `public/fonts/`.
