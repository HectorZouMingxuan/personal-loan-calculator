import { useState } from "react";
import formatCurrency from "../../utils/formatCurrency";

const DEFAULT_CATEGORIES = [
  { id: 1, name: "Housing / Rent",    amount: "" },
  { id: 2, name: "Food & Groceries",  amount: "" },
  { id: 3, name: "Transport",         amount: "" },
  { id: 4, name: "Utilities",         amount: "" },
  { id: 5, name: "Entertainment",     amount: "" },
  { id: 6, name: "Healthcare",        amount: "" },
];

let nextId = 7;

function BudgetTracker() {
  const [income, setIncome] = useState("");
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [newName, setNewName] = useState("");
  const [calculated, setCalculated] = useState(false);

  const totalExpenses = categories.reduce((s, c) => s + (Number(c.amount) || 0), 0);
  const netIncome = Number(income) - totalExpenses;
  const savingsRate = income > 0 ? (netIncome / Number(income)) * 100 : 0;
  const surplus = netIncome >= 0;

  const updateAmount = (id, val) => { setCategories((p) => p.map((c) => c.id === id ? { ...c, amount: val } : c)); setCalculated(false); };
  const addCategory = () => { const n = newName.trim(); if (!n) return; setCategories((p) => [...p, { id: nextId++, name: n, amount: "" }]); setNewName(""); };
  const removeCategory = (id) => setCategories((p) => p.filter((c) => c.id !== id));

  return (
    <>
      <div className="main-grid">
        <section className="card">
          <h2>Monthly Budget</h2>
          <p className="card-subtitle">Track your income and expenses to see your financial health.</p>

          <div className="form-group">
            <label htmlFor="bt-income">Monthly Income</label>
            <div className="input-wrapper"><span className="input-prefix">RM</span>
              <input id="bt-income" type="number" placeholder="e.g. 5000" value={income} onChange={(e) => { setIncome(e.target.value); setCalculated(false); }} />
            </div>
          </div>

          <div className="bt-section-label">Expense Categories</div>
          <div className="bt-categories">
            {categories.map((cat) => (
              <div className="bt-row" key={cat.id}>
                <span className="bt-name">{cat.name}</span>
                <input type="number" className="bt-input" placeholder="0" value={cat.amount} onChange={(e) => updateAmount(cat.id, e.target.value)} />
                <button type="button" className="bt-remove" onClick={() => removeCategory(cat.id)}>✕</button>
              </div>
            ))}
          </div>

          <div className="bt-add-row">
            <input type="text" className="bt-add-input" placeholder="Add category…" value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addCategory()} />
            <button type="button" className="secondary-btn" onClick={addCategory}>+ Add</button>
          </div>

          <div className="button-row" style={{ marginTop: "16px" }}>
            <button type="button" className="primary-btn" onClick={() => setCalculated(true)}>Calculate</button>
            <button type="button" className="secondary-btn" onClick={() => { setIncome(""); setCategories(DEFAULT_CATEGORIES.map((c) => ({ ...c, amount: "" }))); setNewName(""); setCalculated(false); }}>Reset</button>
          </div>
        </section>

        <section className="card result-card">
          <h2>Summary</h2>
          <p className="card-subtitle">Your monthly financial picture.</p>
          <div className="result-grid">
            <div className="result-item result-item--highlight">
              <span>{surplus ? "Monthly Surplus" : "Monthly Deficit"}</span>
              <strong style={{ color: surplus ? "#34d399" : "#f87171" }}>{formatCurrency(Math.abs(netIncome))}</strong>
            </div>
            <div className="result-item"><span>Income</span><strong>{income ? formatCurrency(Number(income)) : "—"}</strong></div>
            <div className="result-item"><span>Total Expenses</span><strong className="value--interest">{formatCurrency(totalExpenses)}</strong></div>
            <div className="result-item">
              <span>Savings Rate</span>
              <strong style={{ color: savingsRate >= 20 ? "#34d399" : savingsRate >= 10 ? "#fbbf24" : "#f87171" }}>
                {calculated && income ? `${savingsRate.toFixed(1)}%` : "—"}
              </strong>
            </div>
          </div>
        </section>
      </div>

      {calculated && income && (
        <div className="secondary-grid">
          <section className="card">
            <h2>Expense Breakdown</h2>
            <div className="details-list">
              {categories.filter((c) => Number(c.amount) > 0).map((cat) => (
                <div className="detail-row" key={cat.id}>
                  <span>{cat.name}</span>
                  <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                    <span style={{ fontSize: "12px", color: "#3d6080" }}>{income ? ((Number(cat.amount) / Number(income)) * 100).toFixed(1) + "%" : ""}</span>
                    <strong>{formatCurrency(Number(cat.amount))}</strong>
                  </div>
                </div>
              ))}
              {categories.filter((c) => Number(c.amount) > 0).length === 0 && <p className="muted-text">No expenses entered.</p>}
            </div>
          </section>
          <section className="card">
            <h2>50/30/20 Guide</h2>
            <div className="details-list">
              <div className="detail-row"><span>Needs (50%)</span><strong>{income ? formatCurrency(Number(income) * 0.5) : "—"}</strong></div>
              <div className="detail-row"><span>Wants (30%)</span><strong>{income ? formatCurrency(Number(income) * 0.3) : "—"}</strong></div>
              <div className="detail-row"><span>Savings (20%)</span><strong>{income ? formatCurrency(Number(income) * 0.2) : "—"}</strong></div>
              <div className="detail-row"><span>Status</span><strong style={{ color: surplus ? "#34d399" : "#f87171" }}>{surplus ? "On Track" : "Over Budget"}</strong></div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default BudgetTracker;
