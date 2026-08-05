# Roll Model Golf — Asset Pack

Tagline: One Flip. One Roll. One Choice.

Contents:
- `index.html`: standalone working Roll Model Golf demo
- `results.json`: manifest for all 12 outcomes
- `png/`: 12 app-ready PNG result cards (1080×1350)
- `svg/`: 12 scalable vector result cards

To test:
1. Keep the folder structure intact.
2. Open `index.html` in a browser.
3. Press **Randomize My Round**.

App integration:
- Load `results.json`.
- Randomly select Heads/Tails and a die value from 1–6.
- Find the profile matching `coinResult` and `dieRoll`.
- Display the `image` or `svg` asset path.

The standalone demo uses `crypto.getRandomValues()` where available.
