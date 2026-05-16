export default function calculateSavingsGoal(targetAmount, currentSavings, annualReturnPct, years) {
  const r = annualReturnPct / 100 / 12;
  const n = years * 12;
  const growth = Math.pow(1 + r, n);
  const monthlyContribution = r === 0
    ? (targetAmount - currentSavings) / n
    : (targetAmount - currentSavings * growth) * r / (growth - 1);
  const totalContributions = monthlyContribution * n;
  const totalInterestEarned = targetAmount - currentSavings - totalContributions;
  return { targetAmount, currentSavings, annualReturnPct, years, monthlyContribution, totalContributions, totalInterestEarned };
}
