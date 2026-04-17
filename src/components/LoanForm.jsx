function LoanForm({
  loanAmount,
  loanYears,
  onAmountChange,
  onYearsChange,
  onCalculate,
  onReset,
  errorMessage,
}) {
  return (
    <section className="card">
      <h2>Loan Input</h2>

      <div className="form-group">
        <label htmlFor="loanAmount">Loan Amount (RM)</label>
        <input
          id="loanAmount"
          type="number"
          placeholder="e.g. 10000"
          value={loanAmount}
          onChange={(e) => onAmountChange(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="loanYears">Loan Tenure (Years)</label>
        <input
          id="loanYears"
          type="number"
          placeholder="e.g. 2"
          value={loanYears}
          onChange={(e) => onYearsChange(e.target.value)}
        />
      </div>

      <p className="helper-text">
        Supported amount: RM 5,000 - RM 100,000 | Supported tenure: 2 - 6 years
      </p>

      <div className="button-row">
        <button type="button" className="primary-btn" onClick={onCalculate}>
          Calculate
        </button>
        <button type="button" className="secondary-btn" onClick={onReset}>
          Reset
        </button>
      </div>

      <p className="muted-small">
        This calculator provides an estimated repayment based on fixed-rate tiers.
      </p>

      {errorMessage && <p className="error-text">{errorMessage}</p>}
    </section>
  );
}

export default LoanForm;