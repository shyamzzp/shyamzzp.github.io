import { useEffect, useState } from "react";
import "./Print.css";

const ROWS = 4;
const COLS = 3;
const CELL_COUNT = ROWS * COLS;

const CATEGORIES = ["personal", "work", "other"] as const;
type Category = (typeof CATEGORIES)[number];

type Cell = {
  text: string;
  category: Category;
};

type SheetState = {
  date: string;
  cells: Cell[];
};

const emptyCells = (): Cell[] =>
  Array.from({ length: CELL_COUNT }, () => ({ text: "", category: "personal" }));

const formatDate = (offsetDays: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
};

const STORAGE_KEY = "print-planner-v1";

function Sheet({
  title,
  state,
  onChange,
}: {
  title: string;
  state: SheetState;
  onChange: (next: SheetState) => void;
}) {
  const updateCell = (index: number, patch: Partial<Cell>) => {
    const cells = state.cells.map((c, i) =>
      i === index ? { ...c, ...patch } : c
    );
    onChange({ ...state, cells });
  };

  return (
    <div className="sheet">
      <div className="sheet-header">
        <span className="sheet-title">{title}</span>
        <span className="sheet-date">
          <input
            type="date"
            value={state.date}
            onChange={(e) => onChange({ ...state, date: e.target.value })}
          />
        </span>
      </div>

      <div className="grid">
        {state.cells.map((cell, i) => (
          <div className="cell" data-category={cell.category} key={i}>
            <div className="cell-category">
              <select
                value={cell.category}
                onChange={(e) =>
                  updateCell(i, { category: e.target.value as Category })
                }
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              className="cell-textarea"
              placeholder="Task details…"
              value={cell.text}
              onChange={(e) => updateCell(i, { text: e.target.value })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Print() {
  const [today, setToday] = useState<SheetState>({
    date: formatDate(0),
    cells: emptyCells(),
  });
  const [tomorrow, setTomorrow] = useState<SheetState>({
    date: formatDate(1),
    cells: emptyCells(),
  });

  // Load any previously saved planner
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.today) setToday(parsed.today);
        if (parsed.tomorrow) setTomorrow(parsed.tomorrow);
      }
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ today, tomorrow }));
    } catch {
      /* ignore quota errors */
    }
  }, [today, tomorrow]);

  const handleClear = () => {
    setToday({ date: formatDate(0), cells: emptyCells() });
    setTomorrow({ date: formatDate(1), cells: emptyCells() });
  };

  return (
    <div className="print-page">
      <div className="print-toolbar">
        <h1>Daily Task Planner</h1>
        <div className="print-actions">
          <button className="print-btn secondary" onClick={handleClear}>
            Clear
          </button>
          <button className="print-btn" onClick={() => window.print()}>
            Print
          </button>
        </div>
      </div>

      <div className="sheets">
        <Sheet title="Today" state={today} onChange={setToday} />
        <Sheet title="Tomorrow" state={tomorrow} onChange={setTomorrow} />
      </div>
    </div>
  );
}

export default Print;
