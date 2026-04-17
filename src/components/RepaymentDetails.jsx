import formatCurrency from "../utils/formatCurrency";

function RepaymentDetails({ result }) {
  return (
    <section className="card">
      <h2>Repayment Details</h2>

      {!result ? (
        <div className="details-list">
          <div className="detail-row">
            <span>Calculation Method</span>
            <strong>Flat-rate estimation</strong>
          </div>
          <div className="detail-row">
            <span>Repayment Type</span>
            <strong>Monthly installment</strong>
          </div>
          <div className="detail-row">
            <span>Interest Assignment</span>
            <strong>Based on amount tier</strong>
          </div>
          <div className="detail-row">
            <span>Status</span>
            <strong>Waiting for input</strong>
          </div>
        </div>
      ) : (
        <div className="details-list">
          <div className="detail-row">
            <span>Loan Amount</span>
            <strong>{formatCurrency(result.amount)}</strong>
          </div>
          <div className="detail-row">
            <span>Loan Tenure</span>
            <strong>{result.years} years</strong>
          </div>
          <div className="detail-row">
            <span>Total Months</span>
            <strong>{result.totalMonths} months</strong>
          </div>
          <div className="detail-row">
            <span>Rate Band</span>
            <strong>{result.rateLabel}</strong>
          </div>
          <div className="detail-row">
            <span>Calculation Method</span>
            <strong>Flat-rate estimation</strong>
          </div>
        </div>
      )}
    </section>
  );
}

export default RepaymentDetails;