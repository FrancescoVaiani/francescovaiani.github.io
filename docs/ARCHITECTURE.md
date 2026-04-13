# Architecture

## High-Level Technical Architecture

- Static front-end application (no required backend runtime)
- Content-first structure with one canonical data source for screen and print output
- Presentation layer organized into reusable sections (hero, timeline, case studies, media, contact)
- Internationalization layer supporting complete EN/IT content variants
- Styling split between screen UI and dedicated `@media print` rules for CV/PDF layout
- Design tokens sourced from `/design-system/tokens` to keep visual consistency
- Accessibility and responsiveness as first-class constraints across desktop and mobile
