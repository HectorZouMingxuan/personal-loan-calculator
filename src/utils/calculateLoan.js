import { getRateByAmount } from "../data/loanRates";

export default function calculateLoan(amount, years) {
  const rateInfo = getRateByAmount(amount);

  if (!rateInfo) {
    return null;
  }

  const appliedRate = rateInfo.rate;
  const totalMonths = years * 12;
  const totalInterest = amount * appliedRate * years;
  const totalPayment = amount + totalInterest;
  const monthlyPayment = totalPayment / totalMonths;

  return {
    amount,
    years,
    totalMonths,
    appliedRate,
    totalInterest,
    totalPayment,
    monthlyPayment,
    rateLabel: rateInfo.label,
  };
}