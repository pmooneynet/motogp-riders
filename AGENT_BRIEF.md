# MotoGP Riders App — Agent Brief (Builder)

## Your Role
You are the **Builder Agent**. You write all application code.
Check `BUILDER_INBOX.md` for your current task from the Master Agent.
When you finish a task, clear `BUILDER_INBOX.md` and write a brief summary to `BUILDER_DONE.md`.

## Project
React app (Create React App) located at:
`/Users/paul/Documents/Claude/motogp-riders/`

Dev server runs on `http://localhost:3000` — hot reloads on file save.

## Key Files
- `src/App.js` — all React components and layout
- `src/App.css` — all styles
- `src/riders.js` — rider data (36 riders)

## Design System
Brand: MotoPG Podcast (motopg.fireside.fm)
- Background: `#f5f5f5` (light grey)
- Cards: `#ffffff` (white)
- Primary accent: `#FFCB05` (racing yellow)
- Text: `#0a0a0a` (near black)
- Dark panels (hero, stats, standings sidebar): `#0a0a0a`
- Font: Barlow Condensed (headings/numbers) + Barlow (body) — Google Fonts

## Current Features
1. **Hero** — black banner with yellow stripe, "MOTOGP RIDERS" title (clicking it returns to home)
2. **Navigation** — three tabs under the title: Riders | Seasons | Venues. Active tab has yellow underline. Controlled by `page` state in App().
3. **Championship standings sidebar** — left panel, 2024 final standings (22 riders + pts)
4. **Search** — filters rider cards by name, team, nationality
5. **Stats bar** — rider count, team count, nation count
6. **Rider card grid** — 36 riders, click to open detail
7. **Rider detail view** — career history table, back button
8. **ComingSoon placeholder** — shown for Seasons and Venues tabs until content is built

## Navigation Structure (App.js)
```jsx
// page state: "riders" | "seasons" | "venues"
const [page, setPage] = useState("riders");

// In render:
{page === "riders"  && <RidersView ... />}
{page === "seasons" && <ComingSoon label="Season Results" />}   // ← replace with SeasonsView
{page === "venues"  && <ComingSoon label="Venues" />}           // ← replace with VenuesView
```
When building Venues or Seasons, **replace the ComingSoon component** with the real view. Do not change the nav or hero.

## Data Structure (riders.js)
```js
{
  num: 93,           // race number (unique key)
  fn: "Marc",        // first name
  ln: "Márquez",     // last name
  nat: "Spain",      // nationality
  flag: "🇪🇸",       // flag emoji
  team: "...",       // current/last team
  career: [
    { year: 2024, team: "...", cls: "MotoGP", pos: "3rd" },
    // cls options: "MotoGP" | "Moto2" | "Moto3" | "125cc" | "250cc" | "500cc"
    // pos: use "🥇 Champion" for title years
  ]
}
```

## Standings Data (App.js — standings2024 array)
```js
{ pos: 1, num: 89, name: "J. Martín", flag: "🇪🇸", pts: 508 }
```

## How to Work the Backlog
1. Read `BACKLOG.md`
2. Move the first **Pending** task to **In Progress** — update the file
3. Implement the task by editing the source files
4. **After every change, run a full design + code quality review** (see standards below)
5. Fix any issues found before marking the task complete
6. Move the task to **Done** — update the file
7. Repeat until Pending is empty

## Standards — Apply to Every Change

### Code Quality
- Components must be small and single-purpose
- No inline styles — all styling via App.css CSS classes
- No duplicate logic — extract shared behaviour into reusable functions or components
- Prop names must be clear and consistent with existing conventions (e.g. `rider`, `onClick`)
- Data files (venues.js, races.js, riders.js) export a single default array — no side effects

### Design Best Practices
After every task, check the full app against these before marking Done:
- **Consistency** — new elements use the existing design tokens (--yellow, --black, --bg, --card, --border, --muted, Barlow/Barlow Condensed fonts)
- **Hierarchy** — headings use Barlow Condensed 700/900, body uses Barlow 400/500
- **Spacing** — follow the existing rhythm (1rem base, 1.5rem section gaps, 0.75rem inner padding)
- **Colour** — yellow (#FFCB05) for accents/highlights only, not large backgrounds; black for dark panels; white/light-grey for cards
- **Responsive** — every new view must work on mobile (max-width: 768px). Use flex-wrap or column stacking
- **Interactive states** — all clickable elements need a visible hover state matching the yellow accent pattern
- **Empty states** — every list/table needs a "no results" message
- **Accessibility** — buttons need clear labels, tables need thead, interactive elements need cursor:pointer
