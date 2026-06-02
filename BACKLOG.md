# MotoGP Riders App — Task Backlog

## Pending


## In Progress


## Done

### TASK-005 — Championship standings: clickable rider rows
`StandingsTable` now accepts `riders` and `onSelectRider` props. Rows where the rider's number exists in the riders array get `cursor:pointer`, yellow hover highlight, and underlined name. Clicking calls `onSelectRider(num)` which sets `page="riders"` and `selected=num` in App, opening the rider's detail view directly. Rows with no matching rider are non-interactive and don't crash.

---

### TASK-004 — Full CRUD editing for all records (auth-ready)
`usePersistedState` hook persists all three datasets (riders, venues, races) to localStorage. `isAdmin = true` flag wraps all edit controls. Inline edit forms for riders (with career table), venues (with culture/stats fields), and races (P1/P2/P3 podium fields). Add/delete with inline confirmation dialogs. Reset-to-defaults buttons in each section.

---

### TASK-003 — Venue detail view (image, description, stats, winners per year)
Expanded `venues.js` with `img`, `description`, `stats` (length, corners, direction, lap record, capacity), and `culture` fields for all 28 circuits. Added `VenueDetail` component: circuit hero image, stats panel (black/yellow), description card, Local Culture card (yellow top border), and Winners table from `races.js`. Venue rows are clickable (cursor:pointer, yellow hover); edit/delete buttons stop propagation. Responsive: panels stack vertically on mobile.

---

### TASK-002 — Race results data file + Season Results page
Created `src/races.js` with 357 race entries covering every MotoGP premier-class round 2005–2024 (20 seasons). Added `SeasonsView` component with stats bar (Races/Seasons/Winners), year-pill selector (2024…2005), and a table showing Round#, Race name, Date, P1/P2/P3 with medal icons. Replaced the ComingSoon placeholder in App.js. Responsive: date column hidden on mobile.

---

### TASK-001 — Venues data file + Venues page
Created `src/venues.js` with 28 circuits (2005–2024 MotoGP calendar). Added `VenuesView` component with search input, stats bar (Circuits / Active / Retired / Countries), and a styled table (Circuit, City, Country with flag, First GP year, Active/Retired badge). Wired into the existing Venues nav tab in App.js.
