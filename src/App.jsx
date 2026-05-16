import { useState } from "react";
import Header from "./components/Header";
import TabNav from "./components/TabNav";
import LoanForm from "./components/LoanForm";
import ResultSummary from "./components/ResultSummary";
import RateTable from "./components/RateTable";
import RepaymentDetails from "./components/RepaymentDetails";
import AmortizationTable from "./components/AmortizationTable";
import FDForm from "./components/FixedDeposit/FDForm";
import SavingsGoalForm from "./components/SavingsGoal/SavingsGoalForm";
import CreditCardForm from "./components/CreditCard/CreditCardForm";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import EPFForm from "./components/EPF/EPFForm";
import BudgetTracker from "./components/BudgetTracker/BudgetTracker";
import FooterNote from "./components/FooterNote";
import validateInputs from "./utils/validateInputs";
import calculateLoan from "./utils/calculateLoan";

function App() {
  const [activeTab, setActiveTab] = useState("loan");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanYears, setLoanYears] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const validationMessage = validateInputs(loanAmount, loanYears);
    if (validationMessage) { setErrorMessage(validationMessage); setResult(null); return; }
    const calculatedResult = calculateLoan(Number(loanAmount), Number(loanYears));
    if (!calculatedResult) { setErrorMessage("Unable to calculate. Please check your inputs."); setResult(null); return; }
    setErrorMessage("");
    setResult(calculatedResult);
  };

  const handleReset = () => { setLoanAmount(""); setLoanYears(""); setErrorMessage(""); setResult(null); };

  return (
    <div className="app-shell">
      <main className="page-container">
        <Header />
        <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "loan" && (
          <>
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
            {result && <AmortizationTable result={result} />}
          </>
        )}

        {activeTab === "fd"      && <FDForm />}
        {activeTab === "savings" && <SavingsGoalForm />}
        {activeTab === "cc"      && <CreditCardForm />}
        {activeTab === "fx"      && <CurrencyConverter />}
        {activeTab === "epf"     && <EPFForm />}
        {activeTab === "budget"  && <BudgetTracker />}

        <FooterNote />
      </main>
    </div>
  );
}

export default App;
