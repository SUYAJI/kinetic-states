# Testing

`npm run test:unit` covers the magnetic field's deterministic interaction math.

`npm run test:e2e` checks boot, study titles, document scrolling, Scroll Inertia page traversal, keyboard focus, touch sizing, remote-image fallback, reduced motion, and two observable interaction states in Chromium.

Motion-heavy studies are not pixel-tested. Their physical character is reviewed manually because spring timing and pointer trajectories are intentionally expressive rather than deterministic.
