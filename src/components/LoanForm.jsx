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
      <h2>Loan Details</h2>
      <p className="card-subtitle">Enter your loan amount and tenure to calculate monthly repayment.</p>

      <div className="form-group">
        <label htmlFor="loanAmount">Loan Amount</label>
        <div className="input-wrapper">
          <span className="input-prefix">RM</span>
          <input
            id="loanAmount"
            type="number"
            placeholder="e.g. 30,000"
            value={loanAmount}
            onChange={(e) => onAmountChange(e.target.value)}
          />
        </div>
        <p className="helper-text">Range: RM 5,000 – RM 100,000</p>
      </div>

      <div className="form-group">
        <label htmlFor="loanYears">Loan Tenure</label>
        <div className="input-wrapper">
          <input
            id="loanYears"
            type="number"
            placeholder="e.g. 3"
            value={loanYears}
            onChange={(e) => onYearsChange(e.target.value)}
          />
          <span className="input-suffix">years</span>
        </div>
        <p className="helper-text">Range: 2 – 6 years</p>
      </div>

      <div className="button-row">
        <button type="button" className="primary-btn" onClick={onCalculate}>
          Calculate
        </button>
        <button type="button" className="secondary-btn" onClick={onReset}>
          Reset
        </button>
      </div>

      {errorMessage && <p className="error-text">{errorMessage}</p>}
    </section>
  );
}

export default LoanForm;
