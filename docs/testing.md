# Testing

`npm run test:unit` runs a small Vitest suite for deterministic interaction math used by the magnetic field.

`npm run test:e2e` runs representative Chromium checks for application boot, study titles, document scrolling, Scroll Inertia page traversal, keyboard focus, touch sizing, restored remote imagery with a failure fallback, reduced motion, and two observable interaction states.

Motion-heavy studies are not pixel-tested. Their physical character is reviewed manually because spring timing and pointer trajectories are intentionally expressive rather than deterministic.
