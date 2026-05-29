import { useState } from "react";
import riders from "./riders";
import venues from "./venues";
import races from "./races";
import standings2024 from "./standings";
import "./App.css";

const ClsBadge = ({ c }) => {
  const map = { MotoGP: "motogp", Moto2: "moto2", Moto3: "moto3", "125cc": "moto3", "500cc": "moto3", "250cc": "moto2" };
  return <span className={`cls-badge ${map[c] || ""}`}>{c}</span>;
};

function Nav({ page, setPage, onHome }) {
  return (
    <nav className="hero-nav">
      <button
        className={`nav-link ${page === "riders" ? "nav-active" : ""}`}
        onClick={() => { setPage("riders"); onHome(); }}
      >Riders</button>
      <button
        className={`nav-link ${page === "seasons" ? "nav-active" : ""}`}
        onClick={() => setPage("seasons")}
      >Seasons</button>
      <button
        className={`nav-link ${page === "venues" ? "nav-active" : ""}`}
        onClick={() => setPage("venues")}
      >Venues</button>
    </nav>
  );
}

function StandingsTable() {
  return (
    <div className="standings-panel">
      <div className="standings-header">
        <span className="standings-title">2024 Championship</span>
        <span className="standings-final">Final</span>
      </div>
      <table className="standings-table">
        <thead>
          <tr><th>#</th><th>Rider</th><th>Pts</th></tr>
        </thead>
        <tbody>
          {standings2024.map((s) => (
            <tr key={s.pos} className={s.pos === 1 ? "s-champion" : ""}>
              <td className="s-pos">
                {s.pos === 1
                  ? <span aria-label="Champion">🏆</span>
                  : s.pos}
              </td>
              <td className="s-rider">
                <span className="s-flag" aria-hidden="true">{s.flag}</span>
                <span className="s-name">{s.name}</span>
              </td>
              <td className="s-pts">{s.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RiderCard({ rider, onClick }) {
  const gpSeasons = rider.career.filter((s) => s.cls === "MotoGP").length;
  return (
    <button className="rider-card" onClick={onClick}>
      <div className="card-num">{rider.num}</div>
      <div className="card-name">
        <span className="card-fn">{rider.fn} </span>{rider.ln}
      </div>
      <div className="card-team">{rider.team}</div>
      <div className="card-tags">
        <span className="tag tag-nat">{rider.flag} {rider.nat}</span>
        <span className="tag tag-num">#{rider.num}</span>
        <span className="tag">{gpSeasons} GP seasons</span>
      </div>
    </button>
  );
}

function RiderDetail({ rider, onBack }) {
  const initials = rider.fn[0] + rider.ln[0];
  const champs = rider.career.filter((s) => s.pos.includes("🥇")).length;
  const gpSeasons = rider.career.filter((s) => s.cls === "MotoGP").length;
  return (
    <div className="detail">
      <button className="back-btn" onClick={onBack}>← Back to all riders</button>
      <div className="rider-header">
        <div className="header-bg-num">{rider.num}</div>
        <div className="header-top">
          <div className="rider-badge">{initials}</div>
          <div>
            <div className="detail-name"><span className="detail-fn">{rider.fn} </span>{rider.ln}</div>
            <div className="detail-team">{rider.team}</div>
            <div className="detail-tags">
              <span className="tag tag-nat">{rider.flag} {rider.nat}</span>
              <span className="tag tag-num">#{rider.num}</span>
              <span className="tag">{gpSeasons} MotoGP seasons</span>
              {champs > 0 && <span className="tag tag-gold">🏆 {champs} title{champs > 1 ? "s" : ""}</span>}
            </div>
          </div>
        </div>
      </div>
      <h2 className="section-title">Career History</h2>
      <div className="table-wrap">
        <table className="career-table">
          <thead>
            <tr><th>Season</th><th>Team</th><th>Class</th><th>Result</th></tr>
          </thead>
          <tbody>
            {rider.career.map((s) => (
              <tr key={s.year + s.cls}>
                <td className="year">{s.year}</td>
                <td>{s.team}</td>
                <td><ClsBadge c={s.cls} /></td>
                <td className={s.pos.includes("🥇") ? "gold" : "muted"}>{s.pos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RidersView({ selected, setSelected }) {
  const [query, setQuery] = useState("");

  const filtered = riders.filter((r) => {
    const q = query.toLowerCase();
    return r.fn.toLowerCase().includes(q) || r.ln.toLowerCase().includes(q) ||
      r.team.toLowerCase().includes(q) || r.nat.toLowerCase().includes(q);
  });

  const teams = new Set(riders.map((r) => r.team)).size;
  const nations = new Set(riders.map((r) => r.nat)).size;

  const selectedRider = selected !== null ? riders.find((r) => r.num === selected) : null;

  if (selectedRider) {
    return <RiderDetail rider={selectedRider} onBack={() => setSelected(null)} />;
  }

  return (
    <>
      <div className="search-wrap">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          className="search-input"
          type="search"
          placeholder="Search rider name, team or nationality…"
          aria-label="Search riders by name, team or nationality"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="stats-bar">
        <div className="stat"><div className="stat-n red">{riders.length}</div><div className="stat-l">Riders</div></div>
        <div className="stat"><div className="stat-n red">{teams}</div><div className="stat-l">Teams</div></div>
        <div className="stat"><div className="stat-n red">{nations}</div><div className="stat-l">Nations</div></div>
      </div>
      {filtered.length === 0 ? (
        <div className="no-results">No riders found</div>
      ) : (
        <div className="grid">
          {filtered.map((r) => (
            <RiderCard key={r.num} rider={r} onClick={() => setSelected(r.num)} />
          ))}
        </div>
      )}
    </>
  );
}

function VenuesView() {
  const [query, setQuery] = useState("");

  const filtered = venues.filter((v) => {
    const q = query.toLowerCase();
    return v.name.toLowerCase().includes(q) ||
      v.city.toLowerCase().includes(q) ||
      v.country.toLowerCase().includes(q);
  });

  const activeCount = venues.filter((v) => v.active).length;
  const retiredCount = venues.length - activeCount;
  const countryCount = new Set(venues.map((v) => v.country)).size;

  return (
    <>
      <div className="search-wrap">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          className="search-input"
          type="search"
          placeholder="Search circuit name, city or country…"
          aria-label="Search circuits by name, city or country"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="stats-bar">
        <div className="stat"><div className="stat-n red">{venues.length}</div><div className="stat-l">Circuits</div></div>
        <div className="stat"><div className="stat-n red">{activeCount}</div><div className="stat-l">Active</div></div>
        <div className="stat"><div className="stat-n red">{retiredCount}</div><div className="stat-l">Retired</div></div>
        <div className="stat"><div className="stat-n red">{countryCount}</div><div className="stat-l">Countries</div></div>
      </div>
      {filtered.length === 0 ? (
        <div className="no-results">No circuits found</div>
      ) : (
        <div className="table-wrap">
          <table className="venues-table">
            <thead>
              <tr>
                <th>Circuit</th>
                <th>City</th>
                <th>Country</th>
                <th>First GP</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => (
                <tr key={v.id}>
                  <td className="v-name">{v.name}</td>
                  <td className="v-city">{v.city}</td>
                  <td className="v-country"><span className="v-flag">{v.flag}</span>{v.country}</td>
                  <td className="v-year">{v.firstGP}</td>
                  <td>
                    <span className={`status-badge ${v.active ? "status-active" : "status-retired"}`}>
                      {v.active ? "Active" : "Retired"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

const SEASONS = Array.from(new Set(races.map((r) => r.year))).sort((a, b) => b - a);

function RiderCell({ entry, medal }) {
  return (
    <span className="race-rider-cell">
      <span className={`medal medal-${medal}`}>{medal === 1 ? "🥇" : medal === 2 ? "🥈" : "🥉"}</span>
      <span className="race-rider-flag">{entry.flag}</span>
      <span className={medal === 1 ? "race-winner" : ""}>{entry.rider}</span>
    </span>
  );
}

function SeasonsView() {
  const [year, setYear] = useState(SEASONS[0]);
  const seasonRaces = races.filter((r) => r.year === year);
  const uniqueWinners = new Set(races.map((r) => r.p1.rider)).size;

  return (
    <>
      <div className="stats-bar">
        <div className="stat"><div className="stat-n red">{races.length}</div><div className="stat-l">Races</div></div>
        <div className="stat"><div className="stat-n red">{SEASONS.length}</div><div className="stat-l">Seasons</div></div>
        <div className="stat"><div className="stat-n red">{uniqueWinners}</div><div className="stat-l">Winners</div></div>
      </div>
      <div className="season-pills" role="group" aria-label="Select season">
        {SEASONS.map((y) => (
          <button
            key={y}
            className={`season-pill ${y === year ? "season-pill-active" : ""}`}
            onClick={() => setYear(y)}
            aria-pressed={y === year}
          >
            {y}
          </button>
        ))}
      </div>
      <div className="section-title">{year} Season — {seasonRaces.length} rounds</div>
      {seasonRaces.length === 0 ? (
        <div className="no-results">No races found for {year}</div>
      ) : (
        <div className="table-wrap">
          <table className="races-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Race</th>
                <th>Date</th>
                <th>🥇 Winner</th>
                <th>🥈 2nd</th>
                <th>🥉 3rd</th>
              </tr>
            </thead>
            <tbody>
              {seasonRaces.map((r) => (
                <tr key={r.round}>
                  <td className="race-round">{r.round}</td>
                  <td className="race-name">{r.name}</td>
                  <td className="race-date">{r.date}</td>
                  <td><RiderCell entry={r.p1} medal={1} /></td>
                  <td><RiderCell entry={r.p2} medal={2} /></td>
                  <td><RiderCell entry={r.p3} medal={3} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function ComingSoon({ label }) {
  return (
    <div className="coming-soon">
      <div className="coming-soon-icon" aria-hidden="true">🏍️</div>
      <div className="coming-soon-title">{label}</div>
      <div className="coming-soon-sub">This section is being built — check back soon.</div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("riders");
  const [selected, setSelected] = useState(null);

  const handleHome = () => setSelected(null);

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header className="hero">
        <p className="hero-label">Riders Encyclopedia</p>
        <h1
          className="hero-title home-link"
          role="button"
          tabIndex={0}
          onClick={() => { setPage("riders"); handleHome(); }}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { setPage("riders"); handleHome(); } }}
        >
          MOTO<span className="red">GP</span> RIDERS
        </h1>
        <Nav page={page} setPage={setPage} onHome={handleHome} />
      </header>

      <div className="page-layout">
        <aside className="standings-aside" aria-label="2024 Championship standings">
          <StandingsTable />
        </aside>
        <main className="main-content" id="main-content">
          {page === "riders"  && <RidersView selected={selected} setSelected={setSelected} />}
          {page === "seasons" && <SeasonsView />}
          {page === "venues"  && <VenuesView />}
        </main>
      </div>
    </div>
  );
}
