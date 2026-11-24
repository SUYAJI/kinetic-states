# Kinetic States

Kinetic States is a collection of ten browser-based interaction studies exploring how cursor movement, inertia, attraction, delay, velocity, hover, selection, and scrolling can change the perceived behavior of an interface.

## Live demo

[Explore the ten interaction studies](https://kinetic-states.vercel.app/).

## Studies

- **Inertia:** pointer lag and approach.
- **Magnetic:** proximity attraction.
- **Delay:** sustained-presence activation.
- **Repulsion:** negative force around an element.
- **Elastic:** tension, stretch, and return.
- **Parallax:** layered depth response.
- **Scroll Inertia:** native momentum in a compact field.
- **Selection Gravity:** proximity-driven field distortion.
- **Temporal Hover:** dwell-based activation.
- **Velocity Shift:** movement velocity as directional bias.

## Interaction context

Several studies investigate fine-pointer dynamics. Touch navigation remains normal, controls retain keyboard focus, and reduced-motion settings limit involuntary movement.

## Stack

React, TypeScript, Vite, Motion, Vitest, and Playwright.

## Accessibility and resilience

The project includes keyboard focus states, touch-safe behavior, responsive layouts, reduced-motion handling, and a custom cursor limited to appropriate fine-pointer environments. It does not claim formal accessibility certification.

## Development

```bash
npm ci
npm run dev
npm run typecheck
npm run build
npm run check
npm run test:e2e
```

## Provenance

Kinetic States began as a Figma Make prototype. The public version keeps the ten studies while removing unused exported UI code and tightening input, motion, and layout behavior.

## Attribution

See [ATTRIBUTIONS.md](ATTRIBUTIONS.md).
