import { useState } from "react";
import calculateEPF from "../../utils/calculateEPF";
import formatCurrency from "../../utils/formatCurrency";

function EPFForm() {
  const [salary, setSalary] = useState("");
  const [balance, setBalance] = useState("");
  const [age, setAge] = useState("");
  const [retireAge, setRetireAge] = useState("60");
  const [dividendRate, setDividendRate] = useState("5.5");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const s = Number(salary), b = Number(balance), a = Number(age), r = Number(retireAge), d = Number(dividendRate);
    if (!salary || !balance || !age) { setError("Please fill in all required fields."); setResult(null); return; }
    if (s <= 0 || b < 0 || a <= 0) { setError("Enter valid positive values."); setResult(null); return; }
    if (a < 18 || a >= r) { setError(`Age must be 18+ and less than retirement age (${r}).`); setResult(null); return; }
    if (r < 40 || r > 75) { setError("Retirement age must be 40–75."); setResult(null); return; }
    if (d < 1 || d > 15) { setError("Dividend rate must be 1–15%."); setResult(null); return; }
    setError(""); setResult(calculateEPF(s, b, a, r, d));
  };

  const handleReset = () => { setSalary(""); setBalance(""); setAge(""); setRetireAge("60"); setDividendRate("5.5"); setError(""); setResult(null); };

  return (
    <>
      <div className="main-grid">
        <section className="card">
          <h2>EPF Retirement Planner</h2>
          <p className="card-subtitle">Project your EPF balance at retirement (Employee 11% + Employer 13%).</p>
          <div className="form-group">
            <label htmlFor="epf-salary">Monthly Gross Salary</label>
            <div className="input-wrapper"><span className="input-prefix">RM</span>
              <input id="epf-salary" type="number" placeholder="e.g. 5000" value={salary} onChange={(e) => setSalary(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="epf-balance">Current EPF Balance</label>
            <div className="input-wrapper"><span className="input-prefix">RM</span>
              <input id="epf-balance" type="number" placeholder="e.g. 30000" value={balance} onChange={(e) => setBalance(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="epf-age">Current Age</label>
            <div className="input-wrapper">
              <input id="epf-age" type="number" placeholder="e.g. 30" value={age} onChange={(e) => setAge(e.target.value)} />
              <span className="input-suffix">yrs</span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="epf-retire">Retirement Age</label>
            <div className="input-wrapper">
              <input id="epf-retire" type="number" placeholder="60" value={retireAge} onChange={(e) => setRetireAge(e.target.value)} />
              <span className="input-suffix">yrs</span>
            </div>
            <p className="helper-text">Standard EPF retirement age: 60</p>
          </div>
          <div className="form-group">
            <label htmlFor="epf-div">EPF Dividend Rate</label>
            <div className="input-wrapper">
              <input id="epf-div" type="number" placeholder="5.5" value={dividendRate} onChange={(e) => setDividendRate(e.target.value)} />
              <span className="input-suffix">% p.a.</span>
            </div>
            <p className="helper-text">Historical average ~5–6%. Recent: 5.5% (2024)</p>
          </div>
          <div className="button-row">
            <button type="button" className="primary-btn" onClick={handleCalculate}>Calculate</button>
            <button type="button" className="secondary-btn" onClick={handleReset}>Reset</button>
          </div>
          {error && <p className="error-text">{error}</p>}
        </section>

        <section className="card result-card">
          <h2>Projected Balance</h2>
          <p className="card-subtitle">Your estimated EPF at retirement.</p>
          <div className="result-grid">
            <div className="result-item result-item--highlight">
              <span>At Retirement</span>
              <strong>{result ? formatCurrency(result.projectedBalance) : "—"}</strong>
            </div>
            <div className="result-item"><span>Total Dividends</span><strong>{result ? formatCurrency(result.totalDividends) : "—"}</strong></div>
            <div className="result-item"><span>Total Contributed</span><strong>{result ? formatCurrency(result.totalContributions) : "—"}</strong></div>
            <div className="result-item"><span>Years Left</span><strong>{result ? `${result.years} yrs` : "—"}</strong></div>
          </div>
          {!result && <p className="result-empty">Enter your details and press Calculate.</p>}
        </section>
      </div>

      {result && (
        <div className="secondary-grid">
          <section className="card">
            <h2>Monthly Contributions</h2>
            <div className="details-list">
              <div className="detail-row"><span>Your Contribution (11%)</span><strong>{formatCurrency(result.employeeMonthly)}</strong></div>
              <div className="detail-row"><span>Employer (13%)</span><strong>{formatCurrency(result.employerMonthly)}</strong></div>
              <div className="detail-row"><span>Total Monthly</span><strong>{formatCurrency(result.monthlyContribution)}</strong></div>
              <div className="detail-row"><span>Dividend Rate</span><strong>{result.dividendRate}% p.a.</strong></div>
            </div>
          </section>
          <section className="card">
            <h2>About EPF</h2>
            <p className="muted-text">EPF (Kumpulan Wang Simpanan Pekerja) is Malaysia's mandatory retirement savings scheme. Contributions earn annual dividends declared by EPF.</p>
            <p className="muted-text" style={{ marginTop: "12px" }}>Assumes constant salary and dividend rate throughout the period.</p>
          </section>
        </div>
      )}
    </>
  );
}

export default EPFForm;
