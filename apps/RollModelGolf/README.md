# Roll Model Golf — Asset Pack

Tagline: One Flip. One Roll. One Choice.

Gameplay notes:
- All listed values are made-up total-distance gameplay targets.
- All distances are total distance, not carry.
- Printed numbers are game targets, not personal club recommendations.
- Rarity tiers are weighted and independently rolled: Common (50%), Rare (30%), Epic (15%), Legendary (5%).

Contents:
- `index.html`: standalone Roll Model Golf experience
- `results.json`: profile manifest and source-of-truth data
- `png/`: legacy PNG assets
- `svg/`: responsive dark-mode SVG result cards

Integration behavior:
- Load `results.json` (48 profiles: 2 genders x 6 age groups x 4 rarities).
- Independently roll coin (Heads/Female, Tails/Male), die (1-6), and rarity (Common/Rare/Epic/Legendary).
- Match and lock one profile by gender + age group + rarity for the full round until reset.
- Use the closest listed total distance and attempt that total with the assigned club.
- Putter is never a distance target but is always allowed on the putting surface.

Technical notes:
- The app uses cryptographically strong random values when available.
- SVG cards are mobile-first and scale via `viewBox` with CSS `width: 100%` and `height: auto`.
