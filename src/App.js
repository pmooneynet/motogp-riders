import { useState, useEffect } from "react";
import defaultRiders from "./riders";
import defaultVenues from "./venues";
import defaultRaces from "./races";
import standings2024 from "./standings";
import "./App.css";

// ---------------------------------------------------------------------------
// localStorage persistence hook
// ---------------------------------------------------------------------------
function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch { return defaultValue; }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

// ---------------------------------------------------------------------------
// Shared constants
// ---------------------------------------------------------------------------
const CLASS_OPTIONS = ["MotoGP", "Moto2", "Moto3", "125cc", "250cc", "500cc"];
const EMPTY_RIDER  = { num: "", fn: "", ln: "", nat: "", flag: "", team: "", career: [] };
const EMPTY_VENUE  = { id: "", name: "", city: "", country: "", flag: "", firstGP: "", active: true, culture: "" };
const EMPTY_ENTRY  = { rider: "", num: "", nat: "", flag: "" };
const EMPTY_DIARY  = { id: "", date: "", venueId: "", text: "" };

// ---------------------------------------------------------------------------
// ClsBadge
// ---------------------------------------------------------------------------
const ClsBadge = ({ c }) => {
  const map = { MotoGP: "motogp", Moto2: "moto2", Moto3: "moto3", "125cc": "moto3", "500cc": "moto3", "250cc": "moto2" };
  return <span className={`cls-badge ${map[c] || ""}`}>{c}</span>;
};

// ---------------------------------------------------------------------------
// Nav
// ---------------------------------------------------------------------------
function Nav({ page, setPage, onHome }) {
  return (
    <nav className="hero-nav">
      <button className={`nav-link ${page === "riders" ? "nav-active" : ""}`}
        onClick={() => { setPage("riders"); onHome(); }}>Riders</button>
      <button className={`nav-link ${page === "seasons" ? "nav-active" : ""}`}
        onClick={() => setPage("seasons")}>Seasons</button>
      <button className={`nav-link ${page === "venues" ? "nav-active" : ""}`}
        onClick={() => setPage("venues")}>Venues</button>
      <button className={`nav-link ${page === "george" ? "nav-active" : ""}`}
        onClick={() => setPage("george")}>Dear George</button>
    </nav>
  );
}

// ---------------------------------------------------------------------------
// StandingsTable
// ---------------------------------------------------------------------------
function StandingsTable({ riders, onSelectRider }) {
  return (
    <div className="standings-panel">
      <div className="standings-header">
        <span className="standings-title">2024 Championship</span>
        <span className="standings-final">Final</span>
      </div>
      <table className="standings-table">
        <thead><tr><th>#</th><th>Rider</th><th>Pts</th></tr></thead>
        <tbody>
          {standings2024.map((s) => {
            const hasRider = riders.some((r) => r.num === s.num);
            return (
              <tr
                key={s.pos}
                className={`${s.pos === 1 ? "s-champion" : ""} ${hasRider ? "s-clickable" : ""}`}
                onClick={hasRider ? () => onSelectRider(s.num) : undefined}
                title={hasRider ? `View ${s.name} detail` : undefined}
              >
                <td className="s-pos">{s.pos === 1 ? <span aria-label="Champion">🏆</span> : s.pos}</td>
                <td className="s-rider">
                  <span className="s-flag" aria-hidden="true">{s.flag}</span>
                  <span className="s-name">{s.name}</span>
                </td>
                <td className="s-pts">{s.pts}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ===========================================================================
// RIDERS
// ===========================================================================

function RiderEditForm({ rider, isNew, onSave, onCancel, onDelete }) {
  const [form, setForm] = useState({ ...rider, career: rider.career ? [...rider.career] : [] });
  const [confirmDelete, setConfirmDelete] = useState(false);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const updateCareer = (idx, field, value) =>
    setForm(f => ({ ...f, career: f.career.map((e, i) => i === idx ? { ...e, [field]: value } : e) }));

  const removeCareer = (idx) =>
    setForm(f => ({ ...f, career: f.career.filter((_, i) => i !== idx) }));

  const addCareer = () =>
    setForm(f => ({ ...f, career: [{ year: new Date().getFullYear(), team: "", cls: "MotoGP", pos: "" }, ...f.career] }));

  const canSave = String(form.num).trim() && form.fn.trim() && form.ln.trim();

  const handleSave = () => {
    if (!canSave) return;
    onSave({ ...form, num: Number(form.num) });
  };

  return (
    <div className="edit-form">
      <div className="form-title">{isNew ? "New rider" : `Editing: ${rider.fn} ${rider.ln}`}</div>

      <div className="form-row">
        <div className="form-group form-group-sm">
          <label className="form-label">Race #</label>
          <input className="form-input" type="number" value={form.num} onChange={set("num")} />
        </div>
        <div className="form-group form-group-sm">
          <label className="form-label">Flag</label>
          <input className="form-input" value={form.flag} onChange={set("flag")} />
        </div>
        <div className="form-group">
          <label className="form-label">First name</label>
          <input className="form-input" value={form.fn} onChange={set("fn")} />
        </div>
        <div className="form-group">
          <label className="form-label">Last name</label>
          <input className="form-input" value={form.ln} onChange={set("ln")} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Nationality</label>
          <input className="form-input" value={form.nat} onChange={set("nat")} />
        </div>
        <div className="form-group form-group-wide">
          <label className="form-label">Team</label>
          <input className="form-input" value={form.team} onChange={set("team")} />
        </div>
      </div>

      <div className="form-section">
        <div className="form-section-header">
          <span>Career history</span>
          <button className="btn-add-row" onClick={addCareer}>+ Add season</button>
        </div>
        {form.career.length > 0 && (
          <div className="form-table-wrap">
            <table className="career-table form-career-table">
              <thead>
                <tr><th>Year</th><th>Team</th><th>Class</th><th>Result</th><th></th></tr>
              </thead>
              <tbody>
                {form.career.map((e, i) => (
                  <tr key={i}>
                    <td><input className="form-input form-input-xs" type="number" value={e.year} onChange={(ev) => updateCareer(i, "year", ev.target.value)} /></td>
                    <td><input className="form-input" value={e.team} onChange={(ev) => updateCareer(i, "team", ev.target.value)} /></td>
                    <td>
                      <select className="form-select" value={e.cls} onChange={(ev) => updateCareer(i, "cls", ev.target.value)}>
                        {CLASS_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </td>
                    <td><input className="form-input" value={e.pos} onChange={(ev) => updateCareer(i, "pos", ev.target.value)} /></td>
                    <td><button className="btn-row-delete" onClick={() => removeCareer(i)} aria-label="Remove season">✕</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="form-actions">
        <button className="btn-save" onClick={handleSave} disabled={!canSave}>Save</button>
        <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        {!isNew && (
          confirmDelete
            ? <span className="delete-confirm">
                Delete this rider?{" "}
                <button className="btn-confirm-delete" onClick={() => onDelete(rider.num)}>Yes, delete</button>{" "}
                <button className="btn-cancel" onClick={() => setConfirmDelete(false)}>No</button>
              </span>
            : <button className="btn-delete" onClick={() => setConfirmDelete(true)}>Delete rider</button>
        )}
      </div>
    </div>
  );
}

function RiderCard({ rider, onView, onEdit, isAdmin }) {
  const gpSeasons = rider.career.filter((s) => s.cls === "MotoGP").length;
  return (
    <div className="rider-card-wrap">
      <button className="rider-card" onClick={onView}>
        <div className="card-num">{rider.num}</div>
        <div className="card-name"><span className="card-fn">{rider.fn} </span>{rider.ln}</div>
        <div className="card-team">{rider.team}</div>
        <div className="card-tags">
          <span className="tag tag-nat">{rider.flag} {rider.nat}</span>
          <span className="tag tag-num">#{rider.num}</span>
          <span className="tag">{gpSeasons} GP seasons</span>
        </div>
      </button>
      {isAdmin && (
        <button className="card-edit-btn" onClick={onEdit} aria-label={`Edit ${rider.fn} ${rider.ln}`}>✏️</button>
      )}
    </div>
  );
}

function RiderDetail({ rider, onBack, onDelete, isAdmin }) {
  const initials = rider.fn[0] + rider.ln[0];
  const champs = rider.career.filter((s) => s.pos.includes("🥇")).length;
  const gpSeasons = rider.career.filter((s) => s.cls === "MotoGP").length;
  const [confirmDelete, setConfirmDelete] = useState(false);

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
          <thead><tr><th>Season</th><th>Team</th><th>Class</th><th>Result</th></tr></thead>
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
      {isAdmin && (
        <div className="detail-admin">
          {confirmDelete
            ? <span className="delete-confirm">
                Delete {rider.fn} {rider.ln}?{" "}
                <button className="btn-confirm-delete" onClick={() => onDelete(rider.num)}>Yes, delete</button>{" "}
                <button className="btn-cancel" onClick={() => setConfirmDelete(false)}>No</button>
              </span>
            : <button className="btn-delete" onClick={() => setConfirmDelete(true)}>Delete rider</button>}
        </div>
      )}
    </div>
  );
}

function RidersView({ riders, setRiders, isAdmin, selected, setSelected }) {
  const [query, setQuery] = useState("");
  const [editingNum, setEditingNum] = useState(null);
  const [addingRider, setAddingRider] = useState(false);

  const filtered = riders.filter((r) => {
    const q = query.toLowerCase();
    return r.fn.toLowerCase().includes(q) || r.ln.toLowerCase().includes(q) ||
      r.team.toLowerCase().includes(q) || r.nat.toLowerCase().includes(q);
  });

  const teams = new Set(riders.map((r) => r.team)).size;
  const nations = new Set(riders.map((r) => r.nat)).size;
  const selectedRider = selected !== null ? riders.find((r) => r.num === selected) : null;

  const saveRider = (updated) => {
    setRiders(rs => rs.map(r => r.num === updated.num ? updated : r));
    setEditingNum(null);
  };

  const addRider = (newRider) => {
    setRiders(rs => [...rs, newRider]);
    setAddingRider(false);
  };

  const deleteRider = (num) => {
    setRiders(rs => rs.filter(r => r.num !== num));
    setEditingNum(null);
    setSelected(null);
  };

  if (selectedRider) {
    return (
      <RiderDetail
        rider={selectedRider}
        onBack={() => setSelected(null)}
        onDelete={deleteRider}
        isAdmin={isAdmin}
      />
    );
  }

  return (
    <>
      <div className="search-wrap">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          className="search-input" type="search"
          placeholder="Search rider name, team or nationality…"
          aria-label="Search riders by name, team or nationality"
          value={query} onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="stats-bar">
        <div className="stat"><div className="stat-n red">{riders.length}</div><div className="stat-l">Riders</div></div>
        <div className="stat"><div className="stat-n red">{teams}</div><div className="stat-l">Teams</div></div>
        <div className="stat"><div className="stat-n red">{nations}</div><div className="stat-l">Nations</div></div>
      </div>

      {isAdmin && (
        <div className="section-actions">
          <button className="btn-add" onClick={() => { setAddingRider(true); setEditingNum(null); }}>+ Add new rider</button>
          <button className="btn-reset" onClick={() => { if (window.confirm("Reset all riders to defaults?")) { setRiders(defaultRiders); setEditingNum(null); setAddingRider(false); } }}>Reset to defaults</button>
        </div>
      )}

      {(addingRider || editingNum !== null) && (
        <RiderEditForm
          rider={addingRider ? EMPTY_RIDER : riders.find(r => r.num === editingNum)}
          isNew={addingRider}
          onSave={addingRider ? addRider : saveRider}
          onCancel={() => { setAddingRider(false); setEditingNum(null); }}
          onDelete={deleteRider}
        />
      )}

      {filtered.length === 0 ? (
        <div className="no-results">No riders found</div>
      ) : (
        <div className="grid">
          {filtered.map((r) => (
            <RiderCard
              key={r.num}
              rider={r}
              onView={() => setSelected(r.num)}
              onEdit={() => { setEditingNum(r.num); setAddingRider(false); }}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      )}
    </>
  );
}

// ===========================================================================
// VENUES
// ===========================================================================

function VenueDetail({ venue, races, onBack }) {
  const venueRaces = races.filter((r) => r.venue === venue.id).sort((a, b) => b.year - a.year);

  return (
    <div className="detail">
      <button className="back-btn" onClick={onBack}>← Back to all venues</button>

      <div className="venue-hero">
        <img
          src={venue.img}
          alt={`${venue.name} aerial view`}
          className="venue-hero-img"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        <div className="venue-hero-info">
          <div className="venue-hero-name">{venue.name}</div>
          <div className="venue-hero-sub">
            <span className="v-flag">{venue.flag}</span>
            {venue.city}, {venue.country}
            <span className={`status-badge ${venue.active ? "status-active" : "status-retired"}`}>
              {venue.active ? "Active" : "Retired"}
            </span>
          </div>
        </div>
      </div>

      <div className="venue-panels">
        <div className="venue-stats-card">
          <h2 className="section-title">Track Stats</h2>
          {venue.stats && <>
            <div className="venue-stat-row"><span>Length</span><span className="venue-stat-val">{venue.stats.length} km</span></div>
            <div className="venue-stat-row"><span>Corners</span><span className="venue-stat-val">{venue.stats.corners}</span></div>
            <div className="venue-stat-row"><span>Direction</span><span className="venue-stat-val">{venue.stats.direction}</span></div>
            <div className="venue-stat-row"><span>Lap Record</span><span className="venue-stat-val">{venue.stats.lapRecord}</span></div>
            <div className="venue-stat-row"><span>Record Holder</span><span className="venue-stat-val">{venue.stats.lapRecordRider} ({venue.stats.lapRecordYear})</span></div>
            <div className="venue-stat-row"><span>Capacity</span><span className="venue-stat-val">{venue.stats.capacity.toLocaleString()}</span></div>
          </>}
        </div>
        <div className="venue-desc-card">
          <h2 className="section-title">Circuit</h2>
          <p className="venue-panel-text">{venue.description || "No description available."}</p>
        </div>
      </div>

      {venue.culture && (
        <div className="venue-culture-card">
          <h2 className="section-title">Local Culture</h2>
          <p className="venue-panel-text">{venue.culture}</p>
        </div>
      )}

      <h2 className="section-title venue-winners-title">Winners at this Circuit</h2>
      {venueRaces.length === 0 ? (
        <div className="no-results">No race results recorded for this circuit</div>
      ) : (
        <div className="table-wrap">
          <table className="career-table">
            <thead>
              <tr><th>Year</th><th>Race</th><th>🥇 Winner</th><th>🥈 2nd</th><th>🥉 3rd</th></tr>
            </thead>
            <tbody>
              {venueRaces.map((r) => (
                <tr key={`${r.year}-${r.round}`}>
                  <td className="year">{r.year}</td>
                  <td>{r.name}</td>
                  <td className="venue-winner">{r.p1.flag} {r.p1.rider}</td>
                  <td className="muted">{r.p2.flag} {r.p2.rider}</td>
                  <td className="muted">{r.p3.flag} {r.p3.rider}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function VenueEditRow({ venue, isNew, onSave, onCancel, colSpan }) {
  const [form, setForm] = useState({
    id: venue.id || "",
    name: venue.name || "",
    city: venue.city || "",
    country: venue.country || "",
    flag: venue.flag || "",
    firstGP: venue.firstGP || "",
    active: venue.active !== undefined ? venue.active : true,
    culture: venue.culture || "",
  });

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));
  const canSave = form.name.trim() && form.city.trim() && form.country.trim();

  const handleSave = () => {
    if (!canSave) return;
    const id = isNew
      ? form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
      : form.id;
    onSave({ ...form, id, firstGP: Number(form.firstGP) });
  };

  return (
    <tr className="edit-row">
      <td colSpan={colSpan || 99}>
        <div className="inline-edit-form">
          <div className="form-title">{isNew ? "New venue" : `Editing: ${venue.name}`}</div>
          <div className="form-row">
            <div className="form-group form-group-wide">
              <label className="form-label">Circuit name</label>
              <input className="form-input" value={form.name} onChange={set("name")} />
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <input className="form-input" value={form.city} onChange={set("city")} />
            </div>
            <div className="form-group">
              <label className="form-label">Country</label>
              <input className="form-input" value={form.country} onChange={set("country")} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group form-group-sm">
              <label className="form-label">Flag</label>
              <input className="form-input" value={form.flag} onChange={set("flag")} />
            </div>
            <div className="form-group form-group-sm">
              <label className="form-label">First GP year</label>
              <input className="form-input" type="number" value={form.firstGP} onChange={set("firstGP")} />
            </div>
            <div className="form-group form-group-check">
              <label className="form-label">Active</label>
              <input type="checkbox" className="form-checkbox" checked={form.active}
                onChange={(e) => setForm(f => ({ ...f, active: e.target.checked }))} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Cultural information</label>
            <textarea className="form-input form-textarea" rows={3} value={form.culture} onChange={set("culture")}
              placeholder="Local culture, food, traditions, atmosphere…" />
          </div>
          <div className="form-actions">
            <button className="btn-save" onClick={handleSave} disabled={!canSave}>Save</button>
            <button className="btn-cancel" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </td>
    </tr>
  );
}

function VenuesView({ venues, setVenues, races, isAdmin }) {
  const [query, setQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [addingVenue, setAddingVenue] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const selectedVenue = selectedId ? venues.find((v) => v.id === selectedId) : null;
  if (selectedVenue) {
    return <VenueDetail venue={selectedVenue} races={races} onBack={() => setSelectedId(null)} />;
  }

  const filtered = venues.filter((v) => {
    const q = query.toLowerCase();
    return v.name.toLowerCase().includes(q) || v.city.toLowerCase().includes(q) || v.country.toLowerCase().includes(q);
  });

  const activeCount = venues.filter((v) => v.active).length;
  const retiredCount = venues.length - activeCount;
  const countryCount = new Set(venues.map((v) => v.country)).size;

  const saveVenue = (updated) => {
    setVenues(vs => vs.map(v => v.id === updated.id ? updated : v));
    setEditingId(null);
  };

  const addVenue = (newVenue) => {
    setVenues(vs => [...vs, newVenue]);
    setAddingVenue(false);
  };

  const deleteVenue = (id) => {
    setVenues(vs => vs.filter(v => v.id !== id));
    setDeletingId(null);
  };

  const colCount = isAdmin ? 6 : 5;

  return (
    <>
      <div className="search-wrap">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input className="search-input" type="search"
          placeholder="Search circuit name, city or country…"
          aria-label="Search circuits by name, city or country"
          value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="stats-bar">
        <div className="stat"><div className="stat-n red">{venues.length}</div><div className="stat-l">Circuits</div></div>
        <div className="stat"><div className="stat-n red">{activeCount}</div><div className="stat-l">Active</div></div>
        <div className="stat"><div className="stat-n red">{retiredCount}</div><div className="stat-l">Retired</div></div>
        <div className="stat"><div className="stat-n red">{countryCount}</div><div className="stat-l">Countries</div></div>
      </div>

      {isAdmin && (
        <div className="section-actions">
          <button className="btn-add" onClick={() => { setAddingVenue(true); setEditingId(null); }}>+ Add new venue</button>
          <button className="btn-reset" onClick={() => { if (window.confirm("Reset all venues to defaults?")) { setVenues(defaultVenues); setEditingId(null); setAddingVenue(false); } }}>Reset to defaults</button>
        </div>
      )}

      {filtered.length === 0 && !addingVenue ? (
        <div className="no-results">No circuits found</div>
      ) : (
        <div className="table-wrap">
          <table className="venues-table">
            <thead>
              <tr>
                <th>Circuit</th><th>City</th><th>Country</th><th>First GP</th><th>Status</th>
                {isAdmin && <th className="th-actions"></th>}
              </tr>
            </thead>
            <tbody>
              {addingVenue && (
                <VenueEditRow venue={EMPTY_VENUE} isNew colSpan={colCount}
                  onSave={addVenue} onCancel={() => setAddingVenue(false)} />
              )}
              {filtered.map((v) => (
                editingId === v.id
                  ? <VenueEditRow key={v.id} venue={v} colSpan={colCount}
                      onSave={saveVenue} onCancel={() => setEditingId(null)} />
                  : <tr key={v.id} className="venues-row" onClick={() => setSelectedId(v.id)}>
                      <td className="v-name">{v.name}</td>
                      <td className="v-city">{v.city}</td>
                      <td className="v-country"><span className="v-flag">{v.flag}</span>{v.country}</td>
                      <td className="v-year">{v.firstGP}</td>
                      <td>
                        <span className={`status-badge ${v.active ? "status-active" : "status-retired"}`}>
                          {v.active ? "Active" : "Retired"}
                        </span>
                      </td>
                      {isAdmin && (
                        <td className="td-actions" onClick={(e) => e.stopPropagation()}>
                          {deletingId === v.id
                            ? <span className="delete-confirm">
                                Delete?{" "}
                                <button className="btn-confirm-delete" onClick={() => deleteVenue(v.id)}>Yes</button>{" "}
                                <button className="btn-cancel" onClick={() => setDeletingId(null)}>No</button>
                              </span>
                            : <>
                                <button className="row-edit-btn" onClick={() => { setEditingId(v.id); setAddingVenue(false); }} aria-label={`Edit ${v.name}`}>✏️</button>
                                <button className="row-delete-btn" onClick={() => setDeletingId(v.id)} aria-label={`Delete ${v.name}`}>✕</button>
                              </>
                          }
                        </td>
                      )}
                    </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

// ===========================================================================
// SEASONS / RACES
// ===========================================================================

function RiderCell({ entry, medal }) {
  return (
    <span className="race-rider-cell">
      <span className={`medal medal-${medal}`}>{medal === 1 ? "🥇" : medal === 2 ? "🥈" : "🥉"}</span>
      <span className="race-rider-flag">{entry.flag}</span>
      <span className={medal === 1 ? "race-winner" : ""}>{entry.rider}</span>
    </span>
  );
}

function EntryFields({ label, value, onChange }) {
  const set = (field) => (e) => onChange({ ...value, [field]: e.target.value });
  return (
    <div className="entry-fields">
      <div className="entry-label">{label}</div>
      <div className="form-row">
        <div className="form-group form-group-wide">
          <label className="form-label">Rider name</label>
          <input className="form-input" value={value.rider} onChange={set("rider")} />
        </div>
        <div className="form-group form-group-sm">
          <label className="form-label">#</label>
          <input className="form-input" type="number" value={value.num} onChange={set("num")} />
        </div>
        <div className="form-group">
          <label className="form-label">Nationality</label>
          <input className="form-input" value={value.nat} onChange={set("nat")} />
        </div>
        <div className="form-group form-group-sm">
          <label className="form-label">Flag</label>
          <input className="form-input" value={value.flag} onChange={set("flag")} />
        </div>
      </div>
    </div>
  );
}

function RaceEditRow({ race, isNew, venues, selectedYear, onSave, onCancel, colSpan }) {
  const [form, setForm] = useState({
    year: race.year || selectedYear || new Date().getFullYear(),
    round: race.round || "",
    name: race.name || "",
    venue: race.venue || "",
    date: race.date || "",
    p1: race.p1 ? { ...race.p1 } : { ...EMPTY_ENTRY },
    p2: race.p2 ? { ...race.p2 } : { ...EMPTY_ENTRY },
    p3: race.p3 ? { ...race.p3 } : { ...EMPTY_ENTRY },
  });

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));
  const canSave = String(form.round).trim() && form.name.trim();

  const handleSave = () => {
    if (!canSave) return;
    onSave({ ...form, round: Number(form.round), year: Number(form.year), p1: { ...form.p1, num: Number(form.p1.num) }, p2: { ...form.p2, num: Number(form.p2.num) }, p3: { ...form.p3, num: Number(form.p3.num) } });
  };

  return (
    <tr className="edit-row">
      <td colSpan={colSpan || 99}>
        <div className="inline-edit-form">
          <div className="form-title">{isNew ? "New race" : `Editing: Round ${race.round} — ${race.name}`}</div>
          <div className="form-row">
            <div className="form-group form-group-sm">
              <label className="form-label">Round #</label>
              <input className="form-input" type="number" value={form.round} onChange={set("round")} />
            </div>
            <div className="form-group form-group-wide">
              <label className="form-label">Race name</label>
              <input className="form-input" value={form.name} onChange={set("name")} />
            </div>
            <div className="form-group">
              <label className="form-label">Date</label>
              <input className="form-input" type="date" value={form.date} onChange={set("date")} />
            </div>
            <div className="form-group">
              <label className="form-label">Venue</label>
              <select className="form-select" value={form.venue} onChange={set("venue")}>
                <option value="">— select —</option>
                {venues.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
              </select>
            </div>
          </div>
          <div className="entry-grid">
            <EntryFields label="🥇 Winner" value={form.p1} onChange={(v) => setForm(f => ({ ...f, p1: v }))} />
            <EntryFields label="🥈 2nd" value={form.p2} onChange={(v) => setForm(f => ({ ...f, p2: v }))} />
            <EntryFields label="🥉 3rd" value={form.p3} onChange={(v) => setForm(f => ({ ...f, p3: v }))} />
          </div>
          <div className="form-actions">
            <button className="btn-save" onClick={handleSave} disabled={!canSave}>Save</button>
            <button className="btn-cancel" onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </td>
    </tr>
  );
}

function SeasonsView({ races, setRaces, venues, isAdmin }) {
  const SEASONS = Array.from(new Set(races.map((r) => r.year))).sort((a, b) => b - a);
  const [year, setYear] = useState(SEASONS[0] || new Date().getFullYear());
  const [editingRace, setEditingRace] = useState(null);
  const [addingRace, setAddingRace] = useState(false);
  const [deletingRace, setDeletingRace] = useState(null);

  const seasonRaces = races
    .filter((r) => r.year === year)
    .sort((a, b) => a.round - b.round);

  const uniqueWinners = new Set(races.map((r) => r.p1.rider)).size;
  const colCount = isAdmin ? 7 : 6;

  const raceKey = (r) => `${r.year}-${r.round}`;

  const saveRace = (updated) => {
    setRaces(rs => rs.map(r => raceKey(r) === raceKey(updated) ? updated : r));
    setEditingRace(null);
  };

  const addRace = (newRace) => {
    setRaces(rs => [...rs, newRace]);
    setAddingRace(false);
  };

  const deleteRace = (key) => {
    setRaces(rs => rs.filter(r => raceKey(r) !== key));
    setDeletingRace(null);
  };

  return (
    <>
      <div className="stats-bar">
        <div className="stat"><div className="stat-n red">{races.length}</div><div className="stat-l">Races</div></div>
        <div className="stat"><div className="stat-n red">{SEASONS.length}</div><div className="stat-l">Seasons</div></div>
        <div className="stat"><div className="stat-n red">{uniqueWinners}</div><div className="stat-l">Winners</div></div>
      </div>

      <div className="season-pills" role="group" aria-label="Select season">
        {SEASONS.map((y) => (
          <button key={y} className={`season-pill ${y === year ? "season-pill-active" : ""}`}
            onClick={() => { setYear(y); setEditingRace(null); setAddingRace(false); }}
            aria-pressed={y === year}>{y}</button>
        ))}
      </div>

      {isAdmin && (
        <div className="section-actions">
          <button className="btn-add" onClick={() => { setAddingRace(true); setEditingRace(null); }}>+ Add new race</button>
          <button className="btn-reset" onClick={() => { if (window.confirm("Reset all race data to defaults?")) { setRaces(defaultRaces); setEditingRace(null); setAddingRace(false); } }}>Reset to defaults</button>
        </div>
      )}

      <h2 className="section-title">{year} Season — {seasonRaces.length} rounds</h2>

      {seasonRaces.length === 0 && !addingRace ? (
        <div className="no-results">No races found for {year}</div>
      ) : (
        <div className="table-wrap">
          <table className="races-table">
            <thead>
              <tr>
                <th>#</th><th>Race</th><th>Date</th><th>🥇 Winner</th><th>🥈 2nd</th><th>🥉 3rd</th>
                {isAdmin && <th className="th-actions"></th>}
              </tr>
            </thead>
            <tbody>
              {addingRace && (
                <RaceEditRow race={{}} isNew venues={venues} selectedYear={year} colSpan={colCount}
                  onSave={addRace} onCancel={() => setAddingRace(false)} />
              )}
              {seasonRaces.map((r) => {
                const key = raceKey(r);
                return editingRace === key
                  ? <RaceEditRow key={key} race={r} venues={venues} selectedYear={year} colSpan={colCount}
                      onSave={saveRace} onCancel={() => setEditingRace(null)} />
                  : <tr key={key}>
                      <td className="race-round">{r.round}</td>
                      <td className="race-name">{r.name}</td>
                      <td className="race-date">{r.date}</td>
                      <td><RiderCell entry={r.p1} medal={1} /></td>
                      <td><RiderCell entry={r.p2} medal={2} /></td>
                      <td><RiderCell entry={r.p3} medal={3} /></td>
                      {isAdmin && (
                        <td className="td-actions">
                          {deletingRace === key
                            ? <span className="delete-confirm">
                                Delete?{" "}
                                <button className="btn-confirm-delete" onClick={() => deleteRace(key)}>Yes</button>{" "}
                                <button className="btn-cancel" onClick={() => setDeletingRace(null)}>No</button>
                              </span>
                            : <>
                                <button className="row-edit-btn" onClick={() => { setEditingRace(key); setAddingRace(false); }} aria-label={`Edit round ${r.round}`}>✏️</button>
                                <button className="row-delete-btn" onClick={() => setDeletingRace(key)} aria-label={`Delete round ${r.round}`}>✕</button>
                              </>
                          }
                        </td>
                      )}
                    </tr>;
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

// ===========================================================================
// DearGeorgeView
// ===========================================================================

function DearGeorgeView({ entries, setEntries, venues }) {
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding]       = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [form, setForm] = useState(EMPTY_DIARY);

  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));

  const openAdd = () => {
    setForm({ ...EMPTY_DIARY, id: Date.now().toString() });
    setAdding(true);
    setEditingId(null);
  };

  const openEdit = (entry) => {
    setForm({ ...entry });
    setEditingId(entry.id);
    setAdding(false);
  };

  const cancelForm = () => { setAdding(false); setEditingId(null); };

  const saveForm = () => {
    if (!form.date || !form.text.trim()) return;
    if (adding) {
      setEntries(es => [...es, form]);
    } else {
      setEntries(es => es.map(e => e.id === form.id ? form : e));
    }
    cancelForm();
  };

  const deleteEntry = (id) => {
    setEntries(es => es.filter(e => e.id !== id));
    setDeletingId(null);
  };

  const venueById = (id) => venues.find(v => v.id === id);

  const entryForm = (
    <tr>
      <td colSpan={4} className="diary-form-cell">
        <div className="diary-form">
          <div className="diary-form-row">
            <label className="diary-label" htmlFor="diary-date">Date</label>
            <input id="diary-date" type="date" className="diary-date-input"
              value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
          </div>
          <div className="diary-form-row">
            <label className="diary-label" htmlFor="diary-venue">Location</label>
            <select id="diary-venue" className="diary-select"
              value={form.venueId} onChange={e => setForm(f => ({ ...f, venueId: e.target.value }))}>
              <option value="">— no location —</option>
              {[...venues].sort((a, b) => a.name.localeCompare(b.name)).map(v => (
                <option key={v.id} value={v.id}>{v.flag} {v.name}</option>
              ))}
            </select>
          </div>
          <div className="diary-form-row diary-form-row--full">
            <label className="diary-label" htmlFor="diary-text">Entry</label>
            <textarea id="diary-text" className="diary-textarea"
              rows={8} placeholder="Dear George…"
              value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))} />
          </div>
          <div className="diary-form-actions">
            <button className="btn-add" onClick={saveForm}>Save</button>
            <button className="btn-cancel" onClick={cancelForm}>Cancel</button>
          </div>
        </div>
      </td>
    </tr>
  );

  return (
    <>
      <div className="stats-bar">
        <div className="stat"><div className="stat-n red">{entries.length}</div><div className="stat-l">Entries</div></div>
      </div>
      <div className="section-actions">
        <button className="btn-add" onClick={openAdd}>+ New entry</button>
      </div>
      <div className="table-wrap">
        <table className="diary-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Location</th>
              <th>Entry</th>
              <th className="th-actions"></th>
            </tr>
          </thead>
          <tbody>
            {adding && entryForm}
            {sorted.length === 0 && !adding && (
              <tr><td colSpan={4} className="no-results">No entries yet</td></tr>
            )}
            {sorted.map(entry =>
              editingId === entry.id ? (
                <tr key={entry.id}>{entryForm.props.children}</tr>
              ) : (
                <tr key={entry.id} className="diary-row">
                  <td className="diary-date">{entry.date}</td>
                  <td className="diary-venue">
                    {entry.venueId
                      ? <>{venueById(entry.venueId)?.flag} {venueById(entry.venueId)?.name}</>
                      : <span className="text-muted">—</span>}
                  </td>
                  <td className="diary-text">{entry.text}</td>
                  <td className="td-actions">
                    {deletingId === entry.id
                      ? <span className="delete-confirm">
                          Delete?{" "}
                          <button className="btn-confirm-delete" onClick={() => deleteEntry(entry.id)}>Yes</button>{" "}
                          <button className="btn-cancel" onClick={() => setDeletingId(null)}>No</button>
                        </span>
                      : <>
                          <button className="btn-edit" onClick={() => openEdit(entry)}>Edit</button>{" "}
                          <button className="btn-delete" onClick={() => setDeletingId(entry.id)}>Delete</button>
                        </>
                    }
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ===========================================================================
// ComingSoon / App
// ===========================================================================


export default function App() {
  const [riders, setRiders] = usePersistedState("mgp_riders", defaultRiders);
  const [venues, setVenues] = usePersistedState("mgp_venues", defaultVenues);
  const [races,  setRaces]  = usePersistedState("mgp_races",  defaultRaces);
  const [diary,  setDiary]  = usePersistedState("mgp_diary",  []);
  const isAdmin = true;

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
          <StandingsTable
            riders={riders}
            onSelectRider={(num) => { setPage("riders"); setSelected(num); }}
          />
        </aside>
        <main className="main-content" id="main-content">
          {page === "riders"  && <RidersView riders={riders} setRiders={setRiders} isAdmin={isAdmin} selected={selected} setSelected={setSelected} />}
          {page === "seasons" && <SeasonsView races={races} setRaces={setRaces} venues={venues} isAdmin={isAdmin} />}
          {page === "venues"  && <VenuesView venues={venues} setVenues={setVenues} races={races} isAdmin={isAdmin} />}
          {page === "george"  && <DearGeorgeView entries={diary} setEntries={setDiary} venues={venues} />}
        </main>
      </div>
    </div>
  );
}
