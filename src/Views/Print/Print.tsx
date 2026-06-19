import { useEffect, useState } from "react";
import "./Print.css";

const ROWS = 4;
const COLS = 3;
const CELL_COUNT = ROWS * COLS;

type Cell = {
  text: string;
  category: string;
};

type SheetState = {
  date: string;
  cells: Cell[];
};

const emptyCells = (): Cell[] =>
  Array.from({ length: CELL_COUNT }, () => ({ text: "", category: "" }));

const formatDate = (offsetDays: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
};

const STORAGE_KEY = "print-planner-v2";

function Sheet({
  state,
  onChange,
}: {
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
        <input
          className="sheet-date"
          type="date"
          value={state.date}
          onChange={(e) => onChange({ ...state, date: e.target.value })}
        />
      </div>

      <div className="grid">
        {state.cells.map((cell, i) => (
          <div className="cell" key={i}>
            <input
              className="cell-category"
              type="text"
              placeholder="Category"
              value={cell.category}
              onChange={(e) => updateCell(i, { category: e.target.value })}
            />
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

  // Export uses the browser's print dialog -> "Save as PDF".
  // The @page / @media print rules below produce clean A4 portrait pages.
  const handleExport = () => window.print();

  return (
    <div className="print-page">
      <div className="print-toolbar">
        <h1>Daily Task Planner</h1>
        <div className="print-actions">
          <button className="print-btn secondary" onClick={handleClear}>
            Clear
          </button>
          <button className="print-btn" onClick={handleExport}>
            Export PDF
          </button>
        </div>
      </div>

      <div className="sheets">
        <Sheet state={today} onChange={setToday} />
        <Sheet state={tomorrow} onChange={setTomorrow} />
      </div>
    </div>
  );
}

export default Print;
