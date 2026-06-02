# Test Scripts — MotoGP Riders App

_Last updated: 2026-06-02 (updated for Meet the Team feature)_
_Update this file whenever a new feature is added or an existing one changes._

---

## TS-001 — App loads without errors
**Type:** Manual (browser)
**Steps:**
1. Open http://localhost:3000
2. Check the browser console (F12 → Console) for any red errors
**Expected:** No errors. Hero banner visible with "MOTOGP RIDERS" title.

---

## TS-002 — Navigation tabs work
**Type:** Manual (browser)
**Steps:**
1. Click "Riders" tab → should show rider cards grid
2. Click "Seasons" tab → should show year pills and race table
3. Click "Venues" tab → should show circuits table
4. Click "Dear George" tab → should show diary table
5. Click the "MOTOGP RIDERS" title → should return to Riders tab
**Expected:** Each tab shows correct content. Active tab has yellow underline.

---

## TS-003 — Riders tab: search filters correctly
**Type:** Manual (browser)
**Steps:**
1. Go to Riders tab
2. Type "marc" in the search box
3. Check results — should show Marc Márquez (and any other Marc)
4. Type "Ducati" — should show only Ducati riders
5. Clear the search — all riders should reappear
6. Type "zzzzz" — should show "No riders found" message
**Expected:** Filtering works on name, team, and nationality.

---

## TS-004 — Rider data integrity
**Type:** Automated (code check)
**Checks:**
- Every rider has: num, fn, ln, nat, flag, team, career array
- No two riders share the same race number
- Every career entry has: year, team, cls, pos
- cls values are only: MotoGP, Moto2, Moto3, 125cc, 250cc, 500cc
**Run:** Testing Agent checks `src/riders.js` directly

---

## TS-005 — Rider detail view
**Type:** Manual (browser)
**Steps:**
1. Click any rider card
2. Verify: rider name, team, nationality tag, race number tag visible
3. Verify: career history table shows with correct columns (Season, Team, Class, Result)
4. Verify: champion seasons show 🥇 in gold text
5. Click "← Back to all riders" — should return to grid
**Expected:** Detail view renders correctly and back button works.

---

## TS-006 — Seasons tab: year selection
**Type:** Manual (browser)
**Steps:**
1. Go to Seasons tab
2. Verify year pills show 2024 down to 2005 (20 seasons)
3. Click 2024 — table should show ~20 rounds
4. Click 2005 — table should show ~17 rounds
5. Verify each row has: round #, race name, date, winner (with flag), 2nd, 3rd
**Expected:** Year pills filter correctly. All columns populated.

---

## TS-007 — Race data integrity
**Type:** Automated (code check)
**Checks:**
- Every race has: year, round, name, venue, date, p1, p2, p3
- Every p1/p2/p3 has: rider (string), num, nat, flag
- Years covered: 2005–2024
- No duplicate round numbers within the same year
**Run:** Testing Agent checks `src/races.js` directly

---

## TS-008 — Venues tab: table and search
**Type:** Manual (browser)
**Steps:**
1. Go to Venues tab
2. Verify stats bar shows: Circuits, Active, Retired, Countries counts
3. Type "Italy" in search — should show Italian circuits only
4. Clear search — all circuits return
5. Type "zzzzz" — should show "No circuits found"
**Expected:** Search works. Stats bar accurate.

---

## TS-009 — Venue detail view
**Type:** Manual (browser)
**Steps:**
1. Go to Venues tab
2. Click any circuit row
3. Verify: circuit photo loads (or hides gracefully if broken URL)
4. Verify: Track Stats panel shows (length, corners, direction, lap record)
5. Verify: Description panel shows text
6. Verify: Local Culture panel shows (if data present)
7. Verify: Winners table shows race results for that circuit
8. Click "← Back to all venues" — returns to table
**Expected:** All panels render. Back button works.

---

## TS-010 — Venue data integrity
**Type:** Automated (code check)
**Checks:**
- Every venue has: id, name, city, country, flag, firstGP, active (boolean)
- No duplicate venue IDs
- firstGP is a number between 1900 and 2030
**Run:** Testing Agent checks `src/venues.js` directly

---

## TS-011 — CRUD: Edit a rider
**Type:** Manual (browser)
**Steps:**
1. Go to Riders tab
2. Hover over any rider card — ✏️ pencil icon should appear (top right of card)
3. Click the pencil — edit form should open above the grid
4. Change the team name
5. Click Save — card should reflect the new team name
6. Refresh the page — change should persist (localStorage)
**Expected:** Edit saves and persists across page reload.

---

## TS-012 — CRUD: Edit a race result
**Type:** Manual (browser)
**Steps:**
1. Go to Seasons tab, select any year
2. Hover over any race row — ✏️ and ✕ icons should appear
3. Click ✏️ — inline edit form opens within the table
4. Change the winner name
5. Click Save — row should update
**Expected:** Edit form opens inline. Save updates the row.

---

## TS-013 — Dear George diary
**Type:** Manual (browser)
**Steps:**
1. Go to Dear George tab
2. Click "+ New entry"
3. Fill in a date, select a location, write some text
4. Click Save — entry should appear in the table
5. Click Edit on the entry — form re-opens with existing data
6. Click Delete → confirm → entry removed
**Expected:** Full create/edit/delete cycle works.

---

## TS-014 — Mobile responsiveness
**Type:** Manual (browser)
**Steps:**
1. Open browser DevTools (F12) → Toggle device toolbar (phone icon)
2. Set width to 375px (iPhone)
3. Check each tab: Riders, Seasons, Venues, Dear George
**Expected:**
- Standings sidebar stacks above main content
- Tables scroll horizontally (not cut off)
- Rider cards stack to single column
- No content overflows viewport

---

## TS-015 — Standings sidebar: click to rider
**Type:** Manual (browser)
**Steps:**
1. On any tab, click a rider name in the left standings panel
2. App should switch to Riders tab and open that rider's detail view
**Expected:** Clicking a standings entry navigates to the correct rider detail.

---

## TS-016 — Meet the Team tab: navigation
**Type:** Manual (browser)
**Steps:**
1. Click "Meet the Team" in the nav bar
2. Verify the tab becomes active (yellow underline)
3. Verify the page shows a stats bar ("Team Members") and a "+ Add team member" button
4. Verify "No team members yet" message shows when list is empty
**Expected:** Tab renders correctly. Active state visible. Empty state message shown.

---

## TS-017 — Meet the Team: add a member
**Type:** Manual (browser)
**Steps:**
1. Go to Meet the Team tab
2. Click "+ Add team member"
3. Fill in: Name = "Test Person", Role = "Test Role", Bio = "Some bio text"
4. Leave Photo URL blank
5. Click Save
6. Verify: card appears in the grid with initials badge (not a broken image)
7. Verify: role and bio text visible on the card
8. Verify: stats bar updates to show 1 Team Member
**Expected:** Card added with initials fallback. Stats bar increments.

---

## TS-018 — Meet the Team: photo URL and contact link
**Type:** Manual (browser)
**Steps:**
1. Add a team member with a valid Photo URL and a Contact URL (e.g. `mailto:test@example.com`)
2. Verify: photo image renders on the card
3. Verify: contact link shows the email address (not "Contact →") and is clickable
4. Add a member with an invalid Photo URL
5. Verify: broken image hides gracefully — initials badge appears instead
**Expected:** Photo loads or falls back cleanly. Contact link format correct.

---

## TS-019 — Meet the Team: edit a member
**Type:** Manual (browser)
**Steps:**
1. Go to Meet the Team tab (with at least one member)
2. Click the ✏️ pencil icon on a card (or click the card itself)
3. Verify: edit form opens pre-filled with existing data
4. Change the name and role
5. Click Save — card should update immediately
6. Refresh the page — changes should persist (localStorage)
**Expected:** Edit pre-fills correctly. Save updates card. Persists across reload.

---

## TS-020 — Meet the Team: delete a member
**Type:** Manual (browser)
**Steps:**
1. Go to Meet the Team tab (with at least one member)
2. Click the ✕ delete button on a card
3. Verify: "Delete?" confirmation appears on the card
4. Click "Yes" — card is removed from the grid
5. Click ✕ on another card, then click "No" — card should remain
**Expected:** Delete requires confirmation. Cancel leaves the card intact.

---

## TS-021 — Meet the Team: keyboard accessibility
**Type:** Manual (browser)
**Steps:**
1. Go to Meet the Team tab (with at least one member)
2. Tab to a team member card using the keyboard
3. Press Enter — edit form should open
4. Press Space on a focused card — edit form should open
**Expected:** Cards are keyboard-operable (role="button", tabIndex=0).

---

## TS-022 — Meet the Team: component structure (automated)
**Type:** Automated (code check)
**Checks:**
- `MeetTheTeamView` component present in `src/App.js`
- `TeamMemberForm` and `TeamMemberCard` sub-components present
- `EMPTY_TEAM` constant has fields: id, name, role, bio, photo, contact
- Nav includes "Meet the Team" tab (page = "team")
- `usePersistedState("mgp_team", [])` wired in App
- Page routing `page === "team" && <MeetTheTeamView>` present
- Photo fallback (initials badge) present in `TeamMemberCard`
- CRUD functions: addMember, saveMember, deleteMember all present
- Dear George tab still present (regression check)
**Run:** Testing Agent checks `src/App.js` directly
