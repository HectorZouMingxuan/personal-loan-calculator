import { useState } from "react";
import calculateCreditCard from "../../utils/calculateCreditCard";
import formatCurrency from "../../utils/formatCurrency";

function CreditCardForm() {
  const [balance, setBalance] = useState("");
  const [rate, setRate] = useState("");
  const [payment, setPayment] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const b = Number(balance), r = Number(rate), p = Number(payment);
    if (!balance || !rate || !payment) { setError("Please fill in all fields."); setResult(null); return; }
    if (b <= 0 || r <= 0 || p <= 0) { setError("All values must be greater than zero."); setResult(null); return; }
    if (r > 30) { setError("Interest rate must be 30% or less."); setResult(null); return; }
    setError(""); setResult(calculateCreditCard(b, r, p));
  };

  const handleReset = () => { setBalance(""); setRate(""); setPayment(""); setError(""); setResult(null); };

  const years = result && !result.neverPaysOff ? Math.floor(result.months / 12) : 0;
  const remMonths = result && !result.neverPaysOff ? result.months % 12 : 0;

  return (
    <>
      <div className="main-grid">
        <section className="card">
          <h2>Credit Card Payoff</h2>
          <p className="card-subtitle">See how long it takes to clear your credit card balance.</p>
          <div className="form-group">
            <label htmlFor="cc-balance">Outstanding Balance</label>
            <div className="input-wrapper"><span className="input-prefix">RM</span>
              <input id="cc-balance" type="number" placeholder="e.g. 5000" value={balance} onChange={(e) => setBalance(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="cc-rate">Annual Interest Rate</label>
            <div className="input-wrapper">
              <input id="cc-rate" type="number" placeholder="e.g. 18" value={rate} onChange={(e) => setRate(e.target.value)} />
              <span className="input-suffix">% p.a.</span>
            </div>
            <p className="helper-text">Typical credit cards: 15–18% p.a.</p>
          </div>
          <div className="form-group">
            <label htmlFor="cc-payment">Monthly Payment</label>
            <div className="input-wrapper"><span className="input-prefix">RM</span>
              <input id="cc-payment" type="number" placeholder="e.g. 300" value={payment} onChange={(e) => setPayment(e.target.value)} />
            </div>
            {result?.minPayment && <p className="helper-text">Minimum payment (~2%): {formatCurrency(result.minPayment)}/month</p>}
          </div>
          <div className="button-row">
            <button type="button" className="primary-btn" onClick={handleCalculate}>Calculate</button>
            <button type="button" className="secondary-btn" onClick={handleReset}>Reset</button>
          </div>
          {error && <p className="error-text">{error}</p>}
        </section>

        <section className="card result-card">
          <h2>Payoff Summary</h2>
          <p className="card-subtitle">Your estimated debt clearance timeline.</p>
          {result?.neverPaysOff ? (
            <>
              <p className="error-text" style={{ fontSize: "15px", marginTop: 0 }}>Payment too low to cover interest — you will never pay this off.</p>
              <p className="muted-text" style={{ marginTop: "12px" }}>Increase your payment above {formatCurrency(result.minPayment)}/month.</p>
            </>
          ) : (
            <div className="result-grid">
              <div className="result-item result-item--highlight">
                <span>Payoff Time</span>
                <strong>{result ? `${years > 0 ? years + "y " : ""}${remMonths}m` : "—"}</strong>
              </div>
              <div className="result-item"><span>Total Interest</span><strong className={result ? "value--interest" : ""}>{result ? formatCurrency(result.totalInterest) : "—"}</strong></div>
              <div className="result-item"><span>Total Paid</span><strong>{result ? formatCurrency(result.totalPaid) : "—"}</strong></div>
              <div className="result-item"><span>Months</span><strong>{result ? result.months : "—"}</strong></div>
            </div>
          )}
          {!result && <p className="result-empty">Enter your balance details and press Calculate.</p>}
        </section>
      </div>

      {result && !result.neverPaysOff && (
        <div className="secondary-grid">
          <section className="card">
            <h2>Breakdown</h2>
            <div className="details-list">
              <div className="detail-row"><span>Original Balance</span><strong>{formatCurrency(result.balance)}</strong></div>
              <div className="detail-row"><span>Monthly Payment</span><strong>{formatCurrency(result.monthlyPayment)}</strong></div>
              <div className="detail-row"><span>Annual Rate</span><strong>{result.annualRatePct}% p.a.</strong></div>
              <div className="detail-row"><span>Method</span><strong>Reducing Balance</strong></div>
            </div>
          </section>
          <section className="card">
            <h2>Tip</h2>
            <p className="muted-text">Paying more than the minimum each month dramatically reduces total interest paid. Doubling your payment can cut payoff time by more than half.</p>
          </section>
        </div>
      )}
    </>
  );
}

export default CreditCardForm;
