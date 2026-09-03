# OVERSHARED

A mobile-first reimagining of the cloned Password Security Awareness project.

## Experience

Four short, independently available investigations preserve the original characters and images. Learners inspect three posts, distinguish relevant details from distractions, assemble a fictional password, and choose a protective action. Cases cover personal information, aggregation across social platforms, false anonymity/MFA, and accidental workplace disclosure.

The visual identity combines condensed editorial typography, warm paper, orange action accents, and a collage of evidence. Case covers use original vector-like CSS compositions. Motion respects reduced-motion preferences. Local fonts and images allow offline use.

## Learning and assessment

Each case requires all three posts to be reviewed correctly and a correct protection decision. Feedback explains the inference and its relevance. Transcripts make tiny text in the original screenshots accessible. Time is approximate; there is no countdown or life system. Hints and retry penalties are modest and completion earns at least 100 XP. A field report distinguishes local practice completion from verified certification.

## Architecture

React and Vite replace the older Create React App stack. `data.js` owns case content, `game.js` owns persistence validation and scoring, and the files in `src/screens/` own presentation and interaction. `App.jsx` provides the routing and app shell. Hash routes work on GitHub Pages without rewrites. All state stays local; actual password guesses are not persisted. The versioned storage payload is validated on load. A Workbox service worker precaches the built app, fonts, icons, and evidence. Updates are prompted rather than silently disrupting a case. The manifest supports installation under either a root or subdirectory URL.

## Validation

Unit checks cover scoring, normalization, and malformed storage. Browser tests cover all four case paths, feedback, save/resume, navigation, dialog keyboard behavior, responsive overflow, accessibility, installation metadata, and offline reload. The production build is served from a subdirectory as an explicit GitHub Pages check.
