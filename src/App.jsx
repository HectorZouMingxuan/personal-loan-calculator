import { useState } from "react";
import Header from "./components/Header";
import LoanForm from "./components/LoanForm";
import ResultSummary from "./components/ResultSummary";
import RateTable from "./components/RateTable";
import RepaymentDetails from "./components/RepaymentDetails";
import FooterNote from "./components/FooterNote";
import validateInputs from "./utils/validateInputs";
import calculateLoan from "./utils/calculateLoan";

function App() {
  const [loanAmount, setLoanAmount] = useState("");
  const [loanYears, setLoanYears] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const validationMessage = validateInputs(loanAmount, loanYears);

    if (validationMessage) {
      setErrorMessage(validationMessage);
      setResult(null);
      return;
    }

    const calculatedResult = calculateLoan(Number(loanAmount), Number(loanYears));

    if (!calculatedResult) {
      setErrorMessage("Unable to calculate the loan. Please check your inputs.");
      setResult(null);
      return;
    }

    setErrorMessage("");
    setResult(calculatedResult);
  };

  const handleReset = () => {
    setLoanAmount("");
    setLoanYears("");
    setErrorMessage("");
    setResult(null);
  };

  return (
    <div className="app-shell">
      <main className="page-container">
        <Header />

        <div className="main-grid">
          <LoanForm
            loanAmount={loanAmount}
            loanYears={loanYears}
            onAmountChange={setLoanAmount}
            onYearsChange={setLoanYears}
            onCalculate={handleCalculate}
            onReset={handleReset}
            errorMessage={errorMessage}
          />

          <ResultSummary result={result} />
        </div>

        <div className="secondary-grid">
          <RateTable />
          <RepaymentDetails result={result} />
        </div>

        <FooterNote />
      </main>
    </div>
  );
}

export default App;