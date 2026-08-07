# Roll Play Golf — A Golf RPG

Roll Play Golf randomizes one golfer role, reveals three unique rarity versions of that same role, and lets the player role-play the selected character for a full or partial golf round.

## RPG loop

1. Roll one gender and age archetype.
2. Choose Common, Rare, Epic, or Legendary from three weighted rarity choices.
3. Play using that character's modeled club distances and recommended tee color.
4. Complete distance, short-game, and putting quests.
5. Subtract earned rewards from gross strokes for the Roll Play Score.

## Character archetypes

- Junior Prodigy — Age 10
- Rising Competitor — Ages 18–29
- Prime Player — Ages 30–44
- Veteran Shotmaker — Ages 45–59
- Senior Strategist — Ages 60–74
- Timeless Technician — Ages 75+

## Distance model

`profile-model.js` is the runtime source of truth for all 48 character profiles: two genders × six age groups × four rarities.

Driver anchors are based on current real-world distance categories. The rest of each bag uses documented male/female club-ratio shapes and speed-band minimum gaps. Club targets are modeled total-distance gameplay profiles, not personalized club recommendations.

Source categories used to establish the model:

- Arccos 2026 amateur driving-distance categories
- TrackMan tour club-distance and gapping shapes
- PGA TOUR driver benchmark
- PGA TOUR Champions elite-veteran driver benchmark

The model enforces descending club distances and minimum adjacent gaps. The repaired Male Ages 45–59 Legendary profile is:

| Club | Target |
|---|---:|
| Driver | 278 yd |
| 3-Wood | 246 yd |
| 5-Wood | 228 yd |
| H1 / 2-Iron | 217 yd |
| 3-Iron | 207 yd |
| 4-Iron | 197 yd |
| 5-Iron | 187 yd |
| 6-Iron | 177 yd |
| 7-Iron | 167 yd |
| 8-Iron | 156 yd |
| 9-Iron | 143 yd |
| PW | 131 yd |
| GW | 117 yd |
| SW | 103 yd |
| LW | 89 yd |

Its internal modeled course length is 6,350 yards, which is presented to the player as **Blue Tees**.

## Tee-color recommendations

The app keeps the modeled course-length value internally and presents a simple tee color to the player:

| Modeled course length | Player-facing tee |
|---|---|
| 4,000 yd or less | Red Tees |
| 4,050–5,000 yd | Gold / Yellow Tees |
| 5,050–5,800 yd | White Tees |
| 5,850–6,500 yd | Blue Tees |
| Above 6,500 yd | Black Tees |

These labels follow the game's general forward-to-back tee progression. Actual golf-course tee colors vary, so players should use the equivalent forward, standard, championship, or back tee when a course uses different colors.

## Printable physical character cards

`Print Character Cards` renders a dedicated poker-card version of every character card:

- Finished card size: **2.5 × 3.5 inches**
- Paper: **US Letter, portrait**
- Layout: **3 columns × 3 rows**
- Cards per sheet: **9**
- Full 48-card set: **6 sheets**
- Print at **100% / Actual Size**
- Thin card outlines act as cutting guides

The printable card is generated from the same live profile data as gameplay and includes the character, rarity, tee color, distance quest, all club targets, putting quest, and short-game quest.

## Mechanics preserved

- Existing rarity weights, target windows, and stroke rewards
- Driver off-the-deck substitute rule
- Around-the-Green Rule of 10–14 calculator
- Chip proximity quests
- Putting values from 0–7 and zero-putt hole-outs
- Prorated putting bonus for partial rounds
- Starting-hole selection, shotgun sequencing, and automatic advancement after putting
- Per-hole gross scoring, penalties, scorecard, history, and undo
- Existing local-storage key and locked-round distance snapshots

Character cards are rendered dynamically from the active profile data, preventing card distances from drifting away from gameplay values.

## Files

- `index.html` — application shell
- `styles.css` — responsive and print presentation
- `profile-model.js` — character profiles, distance model, and tee-color model
- `app-core.js` — state, RPG roll, scoring summaries, persistence
- `app-ui.js` — cards, scorecard, hole navigator, distance quests
- `app-actions.js` — short game, putting, round controls, initialization
- `print-and-tee.js` — poker-size print cards and tee-color display integration
- `DISTANCE_MODEL_AUDIT.md` — validation summary and anchor table
