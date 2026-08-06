# Roll Play Golf Distance Model Audit

**Model:** `roll-play-distance-v1`

The application generates 48 modeled total-distance character profiles from driver anchors, gender-specific club ratios, and speed-band minimum gaps.

## Coverage

- 2 genders
- 6 age archetypes
- 4 rarities
- 48 unique profiles
- 15 club targets per profile

## Driver anchors

| Character | Female C/R/E/L | Male C/R/E/L |
|---|---|---|
| Junior Prodigy | 115 / 140 / 165 / 190 | 140 / 170 / 200 / 230 |
| Rising Competitor | 145 / 180 / 220 / 255 | 181 / 215 / 244 / 305 |
| Prime Player | 140 / 175 / 215 / 250 | 180 / 215 / 245 / 305 |
| Veteran Shotmaker | 130 / 160 / 195 / 225 | 175 / 205 / 235 / 278 |
| Senior Strategist | 115 / 145 / 175 / 200 | 160 / 190 / 220 / 255 |
| Timeless Technician | 100 / 125 / 150 / 170 | 145 / 170 / 195 / 220 |

C/R/E/L means Common, Rare, Epic, and Legendary.

## Minimum adjacent gaps

| Driver band | Woods | Long clubs | Mid irons | Scoring irons | Wedges |
|---|---:|---:|---:|---:|---:|
| Under 150 | 7 | 4 | 4 | 4 | 5 |
| 150–209 | 10 | 6 | 6 | 7 | 8 |
| 210–269 | 14 | 8 | 8 | 9 | 10 |
| 270+ | 18 | 10 | 10 | 11 | 12 |

## Validation results

- Profile count: **48**
- Duplicate role/rarity combinations: **0**
- Missing club values: **0**
- Equal or reversed adjacent clubs: **0**
- Smallest adjacent gap: **4 yards**
- Smallest 9-Iron/PW gap: **4 yards**
- Character cards and gameplay read the same runtime profile objects
- Active rounds store a club-distance snapshot so a model update cannot change a round already in progress

## Repaired example

`male-45-59-legendary` now uses:

- Driver: 278
- 7-Iron: 167
- 9-Iron: 143
- PW: 131
- 9-Iron/PW gap: 12
- Tee yardage: 6,350

The former 127-yard 9-Iron and 125-yard PW combination is no longer present.

## Source categories

The source categories establish realistic anchors and bag shapes; the individual full-bag profiles are modeled gameplay targets rather than direct measured averages.

- Arccos 2026 amateur driving-distance categories
- TrackMan tour club-distance and gapping shapes
- PGA TOUR driver benchmark
- PGA TOUR Champions elite-veteran driver benchmark
