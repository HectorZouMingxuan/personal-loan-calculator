import { useState } from "react";
import { RATES } from "../../data/exchangeRates";

const CURRENCIES = Object.keys(RATES);
const ALL = ["MYR", ...CURRENCIES];

const label = (c) => c === "MYR" ? "Malaysian Ringgit" : RATES[c].label;
const symbol = (c) => c === "MYR" ? "RM" : RATES[c].symbol;

function convert(val, from, to) {
  if (!val || isNaN(val)) return "";
  const inMYR = from === "MYR" ? Number(val) : Number(val) * RATES[from].rate;
  const result = to === "MYR" ? inMYR : inMYR / RATES[to].rate;
  return result.toFixed(to === "JPY" ? 0 : 2);
}

function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("MYR");
  const [to, setTo] = useState("USD");
  const converted = convert(amount, from, to);

  return (
    <>
      <div className="main-grid">
        <section className="card">
          <h2>Currency Converter</h2>
          <p className="card-subtitle">Convert MYR to and from major currencies.</p>
          <div className="form-group">
            <label htmlFor="fx-from">From</label>
            <select id="fx-from" className="styled-select" value={from} onChange={(e) => setFrom(e.target.value)}>
              {ALL.map((c) => <option key={c} value={c}>{c} — {label(c)}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="fx-amount">Amount ({symbol(from)})</label>
            <div className="input-wrapper"><span className="input-prefix">{symbol(from)}</span>
              <input id="fx-amount" type="number" placeholder="e.g. 100" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="fx-to">To</label>
            <select id="fx-to" className="styled-select" value={to} onChange={(e) => setTo(e.target.value)}>
              {ALL.map((c) => <option key={c} value={c}>{c} — {label(c)}</option>)}
            </select>
          </div>
          <div className="button-row">
            <button type="button" className="secondary-btn" style={{ flex: 1 }} onClick={() => { setFrom(to); setTo(from); }}>⇅ Swap</button>
          </div>
        </section>

        <section className="card result-card">
          <h2>Result</h2>
          <p className="card-subtitle">{label(from)} → {label(to)}</p>
          <div className="fx-result">
            <p className="fx-from">{amount ? `${symbol(from)} ${Number(amount).toLocaleString()}` : `${symbol(from)} —`}</p>
            <p className="fx-arrow">↓</p>
            <p className="fx-to">{converted ? `${symbol(to)} ${Number(converted).toLocaleString()}` : `${symbol(to)} —`}</p>
          </div>
        </section>
      </div>

      <section className="card" style={{ marginTop: "24px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
          <div>
            <h2 style={{ marginBottom: "4px" }}>Reference Rates (per 1 MYR)</h2>
            <p className="card-subtitle" style={{ marginBottom: 0 }}>For display purposes only.</p>
          </div>
          <span className="demo-notice">⚠ Static demo rates. Not for real financial transactions.</span>
        </div>
        <div className="rate-table">
          <div className="table-head"><span>Currency</span><span>Rate</span></div>
          {CURRENCIES.map((c) => (
            <div className="table-row" key={c}>
              <span>{c} — {RATES[c].label}</span>
              <strong>{(1 / RATES[c].rate).toFixed(c === "JPY" ? 2 : 4)} {RATES[c].symbol}</strong>
            </div>
          ))}
        </div>
        <p className="helper-text" style={{ marginTop: "14px" }}>Rates last updated: May 2025. Values are hardcoded for demo purposes and do not reflect live market rates.</p>
      </section>
    </>
  );
}

export default CurrencyConverter;
