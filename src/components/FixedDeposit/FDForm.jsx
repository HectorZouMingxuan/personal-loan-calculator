import { useState } from "react";
import calculateFD from "../../utils/calculateFD";
import formatCurrency from "../../utils/formatCurrency";

function FDForm() {
  const [principal, setPrincipal] = useState("");
  const [tenure, setTenure] = useState("");
  const [rate, setRate] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const p = Number(principal), t = Number(tenure), r = Number(rate);
    if (!principal || !tenure || !rate) { setError("Please fill in all fields."); setResult(null); return; }
    if (p < 1000) { setError("Minimum deposit is RM 1,000."); setResult(null); return; }
    if (t < 1 || t > 60) { setError("Tenure must be 1–60 months."); setResult(null); return; }
    if (r < 0.1 || r > 10) { setError("Rate must be 0.1–10% p.a."); setResult(null); return; }
    setError(""); setResult(calculateFD(p, t, r));
  };

  const handleReset = () => { setPrincipal(""); setTenure(""); setRate(""); setError(""); setResult(null); };

  return (
    <>
      <div className="main-grid">
        <section className="card">
          <h2>Fixed Deposit</h2>
          <p className="card-subtitle">Calculate interest earned on your fixed deposit.</p>
          <div className="form-group">
            <label htmlFor="fd-principal">Deposit Amount</label>
            <div className="input-wrapper"><span className="input-prefix">RM</span>
              <input id="fd-principal" type="number" placeholder="e.g. 10000" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
            </div>
            <p className="helper-text">Minimum: RM 1,000</p>
          </div>
          <div className="form-group">
            <label htmlFor="fd-tenure">Tenure</label>
            <div className="input-wrapper">
              <input id="fd-tenure" type="number" placeholder="e.g. 12" value={tenure} onChange={(e) => setTenure(e.target.value)} />
              <span className="input-suffix">months</span>
            </div>
            <p className="helper-text">1 to 60 months</p>
          </div>
          <div className="form-group">
            <label htmlFor="fd-rate">Interest Rate</label>
            <div className="input-wrapper">
              <input id="fd-rate" type="number" placeholder="e.g. 3.5" value={rate} onChange={(e) => setRate(e.target.value)} />
              <span className="input-suffix">% p.a.</span>
            </div>
          </div>
          <div className="button-row">
            <button type="button" className="primary-btn" onClick={handleCalculate}>Calculate</button>
            <button type="button" className="secondary-btn" onClick={handleReset}>Reset</button>
          </div>
          {error && <p className="error-text">{error}</p>}
        </section>

        <section className="card result-card">
          <h2>FD Summary</h2>
          <p className="card-subtitle">Your estimated maturity breakdown.</p>
          <div className="result-grid">
            <div className="result-item result-item--highlight">
              <span>Maturity Amount</span>
              <strong>{result ? formatCurrency(result.maturityAmount) : "—"}</strong>
            </div>
            <div className="result-item"><span>Interest Earned</span><strong>{result ? formatCurrency(result.interestEarned) : "—"}</strong></div>
            <div className="result-item"><span>Annual Rate</span><strong>{result ? `${result.ratePercent}%` : "—"}</strong></div>
            <div className="result-item"><span>Tenure</span><strong>{result ? `${result.tenureMonths}m` : "—"}</strong></div>
          </div>
          {!result && <p className="result-empty">Enter deposit details and press Calculate.</p>}
        </section>
      </div>

      {result && (
        <div className="secondary-grid">
          <section className="card">
            <h2>Breakdown</h2>
            <div className="details-list">
              <div className="detail-row"><span>Principal</span><strong>{formatCurrency(result.principal)}</strong></div>
              <div className="detail-row"><span>Tenure</span><strong>{result.tenureMonths} months ({(result.tenureMonths / 12).toFixed(2)} yrs)</strong></div>
              <div className="detail-row"><span>Rate</span><strong>{result.ratePercent}% p.a.</strong></div>
              <div className="detail-row"><span>Method</span><strong>Simple Interest</strong></div>
            </div>
          </section>
          <section className="card">
            <h2>Formula</h2>
            <p className="muted-text">Interest = Principal × Rate × Time (years)</p>
            <p className="muted-text" style={{ marginTop: "12px" }}>Malaysian banks use simple interest for FD calculations.</p>
          </section>
        </div>
      )}
    </>
  );
}

export default FDForm;
