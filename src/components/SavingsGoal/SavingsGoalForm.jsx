import { useState } from "react";
import calculateSavingsGoal from "../../utils/calculateSavingsGoal";
import formatCurrency from "../../utils/formatCurrency";

function SavingsGoalForm() {
  const [target, setTarget] = useState("");
  const [current, setCurrent] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const t = Number(target), c = Number(current), r = Number(rate), y = Number(years);
    if (!target || !current || !rate || !years) { setError("Please fill in all fields."); setResult(null); return; }
    if (t <= 0 || c < 0 || r < 0 || y <= 0) { setError("Enter valid positive values."); setResult(null); return; }
    if (c >= t) { setError("Current savings must be less than target."); setResult(null); return; }
    if (y < 1 || y > 40) { setError("Years must be 1–40."); setResult(null); return; }
    if (r > 30) { setError("Return rate must be 30% or less."); setResult(null); return; }
    const res = calculateSavingsGoal(t, c, r, y);
    if (res.monthlyContribution < 0) { setError("Current savings already exceed target at this rate."); setResult(null); return; }
    setError(""); setResult(res);
  };

  const handleReset = () => { setTarget(""); setCurrent(""); setRate(""); setYears(""); setError(""); setResult(null); };

  return (
    <>
      <div className="main-grid">
        <section className="card">
          <h2>Savings Goal</h2>
          <p className="card-subtitle">Find out how much to save monthly to reach your goal.</p>
          <div className="form-group">
            <label htmlFor="sg-target">Target Amount</label>
            <div className="input-wrapper"><span className="input-prefix">RM</span>
              <input id="sg-target" type="number" placeholder="e.g. 50000" value={target} onChange={(e) => setTarget(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="sg-current">Current Savings</label>
            <div className="input-wrapper"><span className="input-prefix">RM</span>
              <input id="sg-current" type="number" placeholder="e.g. 5000" value={current} onChange={(e) => setCurrent(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="sg-rate">Expected Annual Return</label>
            <div className="input-wrapper">
              <input id="sg-rate" type="number" placeholder="e.g. 4.0" value={rate} onChange={(e) => setRate(e.target.value)} />
              <span className="input-suffix">% p.a.</span>
            </div>
            <p className="helper-text">Use 0% for no-return savings</p>
          </div>
          <div className="form-group">
            <label htmlFor="sg-years">Time to Goal</label>
            <div className="input-wrapper">
              <input id="sg-years" type="number" placeholder="e.g. 5" value={years} onChange={(e) => setYears(e.target.value)} />
              <span className="input-suffix">years</span>
            </div>
          </div>
          <div className="button-row">
            <button type="button" className="primary-btn" onClick={handleCalculate}>Calculate</button>
            <button type="button" className="secondary-btn" onClick={handleReset}>Reset</button>
          </div>
          {error && <p className="error-text">{error}</p>}
        </section>

        <section className="card result-card">
          <h2>Goal Summary</h2>
          <p className="card-subtitle">Your monthly savings plan.</p>
          <div className="result-grid">
            <div className="result-item result-item--highlight">
              <span>Monthly Contribution</span>
              <strong>{result ? formatCurrency(result.monthlyContribution) : "—"}</strong>
            </div>
            <div className="result-item"><span>Total Contributions</span><strong>{result ? formatCurrency(result.totalContributions) : "—"}</strong></div>
            <div className="result-item"><span>Interest Earned</span><strong>{result ? formatCurrency(result.totalInterestEarned) : "—"}</strong></div>
            <div className="result-item"><span>Target</span><strong>{result ? formatCurrency(result.targetAmount) : "—"}</strong></div>
          </div>
          {!result && <p className="result-empty">Enter your goal details and press Calculate.</p>}
        </section>
      </div>

      {result && (
        <div className="secondary-grid">
          <section className="card">
            <h2>Plan Details</h2>
            <div className="details-list">
              <div className="detail-row"><span>Current Savings</span><strong>{formatCurrency(result.currentSavings)}</strong></div>
              <div className="detail-row"><span>Duration</span><strong>{result.years} years ({result.years * 12} months)</strong></div>
              <div className="detail-row"><span>Annual Return</span><strong>{result.annualReturnPct}% p.a.</strong></div>
              <div className="detail-row"><span>Method</span><strong>Compound (Monthly)</strong></div>
            </div>
          </section>
          <section className="card">
            <h2>How It Works</h2>
            <p className="muted-text">Uses the PMT formula to find the periodic payment needed to reach a future savings target with compound interest applied monthly.</p>
          </section>
        </div>
      )}
    </>
  );
}

export default SavingsGoalForm;
