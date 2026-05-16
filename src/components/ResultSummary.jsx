import formatCurrency from "../utils/formatCurrency";

function ResultSummary({ result }) {
  return (
    <section className="card result-card">
      <h2>Result Summary</h2>
      <p className="card-subtitle">Your estimated repayment breakdown.</p>

      <div className="result-grid">
        <div className="result-item result-item--highlight">
          <span>Monthly Repayment</span>
          <strong>{result ? formatCurrency(result.monthlyPayment) : "—"}</strong>
        </div>
        <div className="result-item">
          <span>Applied Rate</span>
          <strong>{result ? `${(result.appliedRate * 100).toFixed(1)}%` : "—"}</strong>
        </div>
        <div className="result-item">
          <span>Total Repayment</span>
          <strong>{result ? formatCurrency(result.totalPayment) : "—"}</strong>
        </div>
        <div className="result-item">
          <span>Total Interest</span>
          <strong className={result ? "value--interest" : ""}>
            {result ? formatCurrency(result.totalInterest) : "—"}
          </strong>
        </div>
      </div>

      {!result && (
        <p className="result-empty">Enter your loan details and press Calculate to see results.</p>
      )}
    </section>
  );
}

export default ResultSummary;
