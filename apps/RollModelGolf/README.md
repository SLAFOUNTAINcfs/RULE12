# Roll Model Golf — Asset Pack

Tagline: One Flip. One Roll. One Choice.

Gameplay notes:
- All listed values are made-up total-distance gameplay targets.
- All distances are total distance, not carry.
- Printed numbers are game targets, not personal club recommendations.

Contents:
- `index.html`: standalone Roll Model Golf experience
- `results.json`: profile manifest and source-of-truth data
- `png/`: legacy PNG assets
- `svg/`: responsive dark-mode SVG result cards

Integration behavior:
- Load `results.json`.
- Flip once (Heads/Female, Tails/Male) and roll once (die 1–6).
- Lock one matching profile for the full round until reset.
- Use the closest listed total distance and attempt that total with the assigned club.

Technical notes:
- The app uses cryptographically strong random values when available.
- SVG cards are mobile-first and scale via `viewBox` with CSS `width: 100%` and `height: auto`.
