import formatCurrency from "../utils/formatCurrency";

function ResultSummary({ result }) {
  return (
    <section className="card">
      <h2>Result Summary</h2>

      <div className="summary-grid">
        <div className="summary-item">
          <span>Applied Rate</span>
          <strong>{result ? `${(result.appliedRate * 100).toFixed(1)}% p.a.` : "-"}</strong>
        </div>

        <div className="summary-item">
          <span>Monthly Repayment</span>
          <strong>{result ? formatCurrency(result.monthlyPayment) : "RM 0.00"}</strong>
        </div>

        <div className="summary-item">
          <span>Total Repayment</span>
          <strong>{result ? formatCurrency(result.totalPayment) : "RM 0.00"}</strong>
        </div>

        <div className="summary-item">
          <span>Total Interest</span>
          <strong>{result ? formatCurrency(result.totalInterest) : "RM 0.00"}</strong>
        </div>
      </div>
    </section>
  );
}

export default ResultSummary;