import { loanRates } from "../data/loanRates";

function RateTable() {
  return (
    <section className="card">
      <h2>Interest Rate Tiers</h2>
      <div className="rate-table">
        <div className="table-head">
          <span>Loan Amount Range</span>
          <span>Annual Rate</span>
        </div>

        {loanRates.map((item) => (
          <div className="table-row" key={item.label}>
            <span>{item.label}</span>
            <strong>{(item.rate * 100).toFixed(1)}%</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RateTable;