import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// ---------------------------------------------------------------------------
// localStorage mock — prevents actual storage reads/writes from polluting tests
// ---------------------------------------------------------------------------
beforeEach(() => {
  const store = {};
  jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => store[key] ?? null);
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation((key, value) => { store[key] = value; });
  jest.spyOn(Storage.prototype, 'removeItem').mockImplementation((key) => { delete store[key]; });
});

afterEach(() => {
  jest.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Navigation — each nav button renders the correct view
// ---------------------------------------------------------------------------
describe('Navigation', () => {
  test('app starts on the Riders view', () => {
    render(<App />);
    expect(screen.getByRole('searchbox', { name: /search riders/i })).toBeInTheDocument();
  });

  test('clicking Seasons nav tab shows the seasons table', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /^seasons$/i }));
    expect(screen.getByRole('group', { name: /select season/i })).toBeInTheDocument();
  });

  test('clicking Venues nav tab shows the venues table', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /^venues$/i }));
    expect(screen.getByRole('searchbox', { name: /search circuits/i })).toBeInTheDocument();
  });

  test('clicking Dear George nav tab shows the diary view', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /dear george/i }));
    expect(screen.getByRole('button', { name: /\+ new entry/i })).toBeInTheDocument();
  });

  test('clicking Riders nav tab returns to the riders view', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /^seasons$/i }));
    await userEvent.click(screen.getByRole('button', { name: /^riders$/i }));
    expect(screen.getByRole('searchbox', { name: /search riders/i })).toBeInTheDocument();
  });

  test('clicking the hero title returns to the riders list from a rider detail', async () => {
    render(<App />);
    // Navigate to standings and click a rider row to open detail
    const standingsAside = screen.getByRole('complementary', { name: /2024 championship standings/i });
    const martinRow = within(standingsAside).getByText('J. Martín').closest('tr');
    await userEvent.click(martinRow);
    expect(screen.getByRole('button', { name: /← back to all riders/i })).toBeInTheDocument();

    // Click the hero title — "MOTO" and "GP" are separate text nodes so the accessible name has a space
    await userEvent.click(screen.getByRole('button', { name: /moto\s*gp\s*riders/i }));
    expect(screen.getByRole('searchbox', { name: /search riders/i })).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Riders view — rider cards render and search/filter works
// ---------------------------------------------------------------------------
describe('Riders view', () => {
  test('rider cards are visible on the grid', () => {
    render(<App />);
    // Both Márquez brothers are in the data — use getAllByText
    expect(screen.getAllByText('Márquez').length).toBeGreaterThan(0);
  });

  test('search box filters riders by last name', async () => {
    render(<App />);
    const search = screen.getByRole('searchbox', { name: /search riders/i });
    await userEvent.type(search, 'Bagnaia');
    expect(screen.getByText('Bagnaia')).toBeInTheDocument();
    // Martín should be gone
    expect(screen.queryByText('Martín')).not.toBeInTheDocument();
  });

  test('search box filters riders by team name', async () => {
    render(<App />);
    const search = screen.getByRole('searchbox', { name: /search riders/i });
    await userEvent.type(search, 'Ducati Lenovo');
    // Bagnaia rides for Ducati Lenovo Team
    expect(screen.getByText('Bagnaia')).toBeInTheDocument();
    expect(screen.queryByText('Márquez')).not.toBeInTheDocument();
  });

  test('search with no match shows "No riders found"', async () => {
    render(<App />);
    const search = screen.getByRole('searchbox', { name: /search riders/i });
    await userEvent.type(search, 'zzznomatch');
    expect(screen.getByText(/no riders found/i)).toBeInTheDocument();
  });

  test('clicking a rider card navigates to the rider detail view', async () => {
    render(<App />);
    // Find Bagnaia's card button
    const card = screen.getByRole('button', { name: (_, el) =>
      el.className?.includes('rider-card') && el.textContent?.includes('Bagnaia')
    });
    await userEvent.click(card);
    expect(screen.getByRole('button', { name: /← back to all riders/i })).toBeInTheDocument();
    expect(screen.getByText(/Career History/i)).toBeInTheDocument();
  });

  test('back button on rider detail returns to the grid', async () => {
    render(<App />);
    const card = screen.getByRole('button', { name: (_, el) =>
      el.className?.includes('rider-card') && el.textContent?.includes('Bagnaia')
    });
    await userEvent.click(card);
    await userEvent.click(screen.getByRole('button', { name: /← back to all riders/i }));
    expect(screen.getByRole('searchbox', { name: /search riders/i })).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Championship standings — clickable rows navigate to rider detail
// ---------------------------------------------------------------------------
describe('Championship standings', () => {
  test('standings panel is always visible with rider names', () => {
    render(<App />);
    const aside = screen.getByRole('complementary', { name: /2024 championship standings/i });
    expect(within(aside).getByText('J. Martín')).toBeInTheDocument();
    expect(within(aside).getByText('F. Bagnaia')).toBeInTheDocument();
  });

  test('champion row has a trophy icon', () => {
    render(<App />);
    const aside = screen.getByRole('complementary', { name: /2024 championship standings/i });
    expect(within(aside).getByLabelText('Champion')).toBeInTheDocument();
  });

  test('clicking a standings row for a known rider opens their detail', async () => {
    render(<App />);
    const aside = screen.getByRole('complementary', { name: /2024 championship standings/i });
    const martinRow = within(aside).getByText('J. Martín').closest('tr');
    await userEvent.click(martinRow);
    // Rider detail should show Martin's full name
    expect(screen.getByText('Martín')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /← back to all riders/i })).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Venues view — venues table renders and search works
// ---------------------------------------------------------------------------
describe('Venues view', () => {
  test('venues table renders at least one circuit row', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /^venues$/i }));
    // Losail is the first venue in the default data
    expect(screen.getByText('Losail International Circuit')).toBeInTheDocument();
  });

  test('search box filters venues by circuit name', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /^venues$/i }));
    const search = screen.getByRole('searchbox', { name: /search circuits/i });
    await userEvent.type(search, 'Losail');
    expect(screen.getByText('Losail International Circuit')).toBeInTheDocument();
    // Portimão should not appear
    expect(screen.queryByText('Autodromo Internacional do Algarve')).not.toBeInTheDocument();
  });

  test('search box filters venues by country', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /^venues$/i }));
    const search = screen.getByRole('searchbox', { name: /search circuits/i });
    await userEvent.type(search, 'Qatar');
    expect(screen.getByText('Losail International Circuit')).toBeInTheDocument();
  });

  test('search with no match shows "No circuits found"', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /^venues$/i }));
    const search = screen.getByRole('searchbox', { name: /search circuits/i });
    await userEvent.type(search, 'zzznomatch');
    expect(screen.getByText(/no circuits found/i)).toBeInTheDocument();
  });

  test('clicking a venue row opens the venue detail view', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /^venues$/i }));
    const row = screen.getByText('Losail International Circuit').closest('tr');
    await userEvent.click(row);
    expect(screen.getByRole('button', { name: /← back to all venues/i })).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Seasons view — seasons table renders and year pill selector works
// ---------------------------------------------------------------------------
describe('Seasons view', () => {
  test('season pills are rendered for available years', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /^seasons$/i }));
    const pillGroup = screen.getByRole('group', { name: /select season/i });
    // There should be multiple year pills
    const pills = within(pillGroup).getAllByRole('button');
    expect(pills.length).toBeGreaterThan(1);
  });

  test('clicking a year pill updates the season heading', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /^seasons$/i }));
    const pillGroup = screen.getByRole('group', { name: /select season/i });
    const pills = within(pillGroup).getAllByRole('button');

    // Find a pill that is NOT already active and click it
    const inactivePill = pills.find((p) => p.getAttribute('aria-pressed') === 'false');
    expect(inactivePill).toBeTruthy();
    const targetYear = inactivePill.textContent;
    await userEvent.click(inactivePill);

    expect(screen.getByRole('heading', { name: new RegExp(`${targetYear} Season`) })).toBeInTheDocument();
  });

  test('active pill has aria-pressed="true"', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /^seasons$/i }));
    const pillGroup = screen.getByRole('group', { name: /select season/i });
    const activePills = within(pillGroup).getAllByRole('button', { pressed: true });
    expect(activePills).toHaveLength(1);
  });

  test('season table shows race names for the selected year', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /^seasons$/i }));
    // Scope to main content to avoid matching the standings table in the aside
    const main = screen.getByRole('main');
    const table = within(main).getByRole('table');
    const rows = within(table).getAllByRole('row');
    // At least header + one data row
    expect(rows.length).toBeGreaterThan(1);
  });
});

// ---------------------------------------------------------------------------
// Dear George diary — add, edit, and delete entries with confirmation
// ---------------------------------------------------------------------------
describe('Dear George diary', () => {
  test('empty state message is shown when there are no entries', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /dear george/i }));
    expect(screen.getByText(/no entries yet/i)).toBeInTheDocument();
  });

  test('clicking "+ New entry" opens the entry form', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /dear george/i }));
    await userEvent.click(screen.getByRole('button', { name: /\+ new entry/i }));
    expect(screen.getByLabelText(/^entry$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/dear george/i)).toBeInTheDocument();
  });

  test('cancel button closes the form without adding an entry', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /dear george/i }));
    await userEvent.click(screen.getByRole('button', { name: /\+ new entry/i }));
    await userEvent.click(screen.getByRole('button', { name: /^cancel$/i }));
    expect(screen.getByText(/no entries yet/i)).toBeInTheDocument();
  });

  test('adding a new entry saves it to the diary table', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /dear george/i }));
    await userEvent.click(screen.getByRole('button', { name: /\+ new entry/i }));

    // Fill in date
    const dateInput = screen.getByLabelText(/^date$/i);
    await userEvent.type(dateInput, '2024-11-17');

    // Fill in diary text
    const textArea = screen.getByPlaceholderText(/dear george/i);
    await userEvent.type(textArea, 'What a race at Valencia!');

    await userEvent.click(screen.getByRole('button', { name: /^save$/i }));

    // Entry should now be in the table
    expect(screen.getByText('What a race at Valencia!')).toBeInTheDocument();
    expect(screen.queryByText(/no entries yet/i)).not.toBeInTheDocument();
  });

  test('save button is guarded — form without text does not save', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /dear george/i }));
    await userEvent.click(screen.getByRole('button', { name: /\+ new entry/i }));

    // Provide date but no text, then try to save
    const dateInput = screen.getByLabelText(/^date$/i);
    await userEvent.type(dateInput, '2024-11-17');
    await userEvent.click(screen.getByRole('button', { name: /^save$/i }));

    // Form should still be visible (not saved)
    expect(screen.getByPlaceholderText(/dear george/i)).toBeInTheDocument();
  });

  test('editing an entry updates it in the table', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /dear george/i }));

    // Add an entry first
    await userEvent.click(screen.getByRole('button', { name: /\+ new entry/i }));
    const dateInput = screen.getByLabelText(/^date$/i);
    await userEvent.type(dateInput, '2024-11-17');
    const textArea = screen.getByPlaceholderText(/dear george/i);
    await userEvent.type(textArea, 'Original text here');
    await userEvent.click(screen.getByRole('button', { name: /^save$/i }));

    expect(screen.getByText('Original text here')).toBeInTheDocument();

    // Now edit it
    await userEvent.click(screen.getByRole('button', { name: /^edit$/i }));
    const editTextArea = screen.getByDisplayValue('Original text here');
    await userEvent.clear(editTextArea);
    await userEvent.type(editTextArea, 'Edited text here');
    await userEvent.click(screen.getByRole('button', { name: /^save$/i }));

    expect(screen.getByText('Edited text here')).toBeInTheDocument();
    expect(screen.queryByText('Original text here')).not.toBeInTheDocument();
  });

  test('deleting an entry requires confirmation before removal', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /dear george/i }));

    // Add an entry
    await userEvent.click(screen.getByRole('button', { name: /\+ new entry/i }));
    const dateInput = screen.getByLabelText(/^date$/i);
    await userEvent.type(dateInput, '2024-11-17');
    const textArea = screen.getByPlaceholderText(/dear george/i);
    await userEvent.type(textArea, 'Entry to be deleted');
    await userEvent.click(screen.getByRole('button', { name: /^save$/i }));

    // Click Delete — should show confirmation
    await userEvent.click(screen.getByRole('button', { name: /^delete$/i }));
    expect(screen.getByText(/delete\?/i)).toBeInTheDocument();

    // Confirm deletion
    await userEvent.click(screen.getByRole('button', { name: /^yes$/i }));
    expect(screen.queryByText('Entry to be deleted')).not.toBeInTheDocument();
    expect(screen.getByText(/no entries yet/i)).toBeInTheDocument();
  });

  test('cancelling a delete confirmation leaves the entry intact', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /dear george/i }));

    // Add an entry
    await userEvent.click(screen.getByRole('button', { name: /\+ new entry/i }));
    const dateInput = screen.getByLabelText(/^date$/i);
    await userEvent.type(dateInput, '2024-11-17');
    const textArea = screen.getByPlaceholderText(/dear george/i);
    await userEvent.type(textArea, 'Keep this entry');
    await userEvent.click(screen.getByRole('button', { name: /^save$/i }));

    // Click Delete, then No
    await userEvent.click(screen.getByRole('button', { name: /^delete$/i }));
    await userEvent.click(screen.getByRole('button', { name: /^no$/i }));

    expect(screen.getByText('Keep this entry')).toBeInTheDocument();
  });

  test('new entry form allows selecting a venue from the dropdown', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: /dear george/i }));
    await userEvent.click(screen.getByRole('button', { name: /\+ new entry/i }));

    const venueSelect = screen.getByRole('combobox', { name: /location/i });
    // Should have options beyond the default "— no location —"
    const options = within(venueSelect).getAllByRole('option');
    expect(options.length).toBeGreaterThan(1);
  });
});
