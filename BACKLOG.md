# MotoGP Riders App — Task Backlog

## Pending


## In Progress


## Done

### TASK-002 — Race results data file + Season Results page
Created `src/races.js` with 357 race entries covering every MotoGP premier-class round 2005–2024 (20 seasons). Added `SeasonsView` component with stats bar (Races/Seasons/Winners), year-pill selector (2024…2005), and a table showing Round#, Race name, Date, P1/P2/P3 with medal icons. Replaced the ComingSoon placeholder in App.js. Responsive: date column hidden on mobile.

---

### TASK-001 — Venues data file + Venues page
Created `src/venues.js` with 28 circuits (2005–2024 MotoGP calendar). Added `VenuesView` component with search input, stats bar (Circuits / Active / Retired / Countries), and a styled table (Circuit, City, Country with flag, First GP year, Active/Retired badge). Wired into the existing Venues nav tab in App.js.

---

### TASK-003 — Venue detail view (image, description, stats, winners per year)
**Depends on:** TASK-001 ✅ done. Implement winners section only if `races.js` exists — otherwise show a placeholder.

#### 1 — Expand venues.js with extra fields
Add to every venue object in `src/venues.js`:
```js
img: "https://upload.wikimedia.org/...",  // Wikimedia Commons aerial/trackside photo URL
description: "2–3 sentence factual description — history, character, location.",
stats: {
  length: 5.380,           // track length in km
  corners: 16,             // total corners
  direction: "clockwise",  // or "anti-clockwise"
  lapRecord: "1:45.787",   // fastest MotoGP lap time
  lapRecordRider: "Marc Márquez",
  lapRecordYear: 2019,
  capacity: 90000,         // approximate grandstand capacity
}
```
Use accurate data from Wikipedia. Use free Wikimedia Commons image URLs.

#### 2 — Clickable venue rows
Each row in the Venues table gets cursor:pointer and yellow hover highlight. Clicking opens VenueDetail. Add "← Back to all venues" button (same pattern as RiderDetail).

#### 3 — VenueDetail layout
- Full-width circuit photo (max-height 260px, object-fit cover)
- Circuit name, city, country, active/retired badge
- Two-panel row: TRACK STATS (black panel, yellow left border) + DESCRIPTION (white card)
  - Stats: Length, Corners, Direction, Lap Record, Record holder + year, Capacity
- WINNERS AT THIS CIRCUIT table: Year | Race | 🥇 Winner | 🥈 P2 | 🥉 P3 (from races.js)

#### 4 — Styling rules
- Stats panel: `.stat` pattern (black bg, yellow left border)
- Winners table: `.career-table` style, winner name in yellow
- Responsive: stats + description stack vertically on mobile

**Additional field for TASK-003:** Add a `culture` field to each venue in `venues.js`:
```js
culture: "2–3 sentences about the local culture, food, traditions, or what makes visiting this race destination unique — e.g. nightlife in Mugello, the atmosphere at Assen's 'Cathedral of Speed', the heat and colour of Sepang."
```
Display this in the VenueDetail view as a third panel below the stats/description row, titled **"LOCAL CULTURE"**, styled as a white card with a yellow top border.

---

### TASK-004 — Full CRUD editing for all records (auth-ready)

Make every data entity in the app editable, creatable, and deletable. No authentication yet — all edit controls are visible to everyone. The architecture must be designed so auth can be dropped in later with minimal changes.

---

#### Architecture

**1 — Move all data into React state with localStorage persistence**

In `App.js`, replace static imports with stateful versions:
```js
import { useState, useEffect } from "react";
import defaultRiders from "./riders";
import defaultVenues from "./venues";
import defaultRaces from "./races";  // once available

function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch { return defaultValue; }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);
  return [state, setState];
}

// In App():
const [riders, setRiders] = usePersistedState('mgp_riders', defaultRiders);
const [venues, setVenues] = usePersistedState('mgp_venues', defaultVenues);
const [races,  setRaces]  = usePersistedState('mgp_races',  defaultRaces);
```

Pass setter functions down to child components that need them.

**2 — Auth-ready admin flag**
```js
const isAdmin = true; // TODO: replace with auth check
```
Wrap ALL edit controls in `{isAdmin && ...}`. This is the only change needed when auth is added.

---

#### Edit controls per entity

**RIDERS**
- Edit button on each RiderCard (pencil icon, top-right corner, visible on hover)
- Clicking opens an inline RiderEditForm (replaces the card, or opens below it):
  - Fields: First Name, Last Name, Nationality, Flag emoji, Race Number, Team
  - Career entries: editable table rows (year, team, class dropdown, position)
  - Add career row button ("+ Add season")
  - Delete career row button per row
  - Save / Cancel buttons
- "＋ Add New Rider" button above the rider grid
- Delete rider button in RiderDetail view (with "Are you sure?" confirmation)

**VENUES**
- Edit button on each venue row (visible on hover)
- Opens VenueEditForm:
  - Fields: Name, Address, City, Country, Flag, First GP year, Active toggle
  - TASK-003 fields if present: img URL, description, culture text, stats (length, corners, direction, lap record, record rider, record year, capacity)
  - Save / Cancel
- "＋ Add New Venue" button above the venues table
- Delete venue button in VenueDetail (with confirmation)

**RACES** (once races.js exists)
- Edit button on each race row in the Season Results table
- Opens RaceEditForm:
  - Fields: Round #, Race Name, Venue (dropdown from venues), Date
  - P1 / P2 / P3: rider name, number, nationality, flag
  - Save / Cancel
- "＋ Add New Race" button above the season table
- Delete race button per row (with confirmation)

---

#### Styling rules for edit controls
- Edit/Delete icons: small (16px), appear on row/card hover — do not clutter the default view
- Edit icon: pencil ✏️ or a minimal SVG, coloured `var(--muted)`, turns `var(--yellow)` on hover
- Delete icon: ✕, coloured `var(--muted)`, turns `#e03` on hover
- Forms: white card background, same border/radius as existing cards
- Save button: black background, yellow text, yellow border
- Cancel button: transparent, muted border
- Confirmation dialogs: inline (not browser `confirm()`), small banner below the button: "Delete this record? [Confirm] [Cancel]"

---

#### Reset to defaults
Add a small "Reset to default data" link in the footer of each section. This calls `localStorage.removeItem(key)` and resets state to the imported JS file defaults. Useful for dev/testing.
