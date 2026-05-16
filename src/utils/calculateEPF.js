export default function calculateEPF(monthlySalary, currentBalance, age, retirementAge, dividendRate = 5.5) {
  const years = retirementAge - age;
  const monthlyContribution = monthlySalary * 0.24;
  const annualContribution = monthlyContribution * 12;
  const r = dividendRate / 100;
  const growth = Math.pow(1 + r, years);
  const fvCurrentBalance = currentBalance * growth;
  const fvContributions = annualContribution * ((growth - 1) / r);
  const projectedBalance = fvCurrentBalance + fvContributions;
  const totalContributions = annualContribution * years;
  const totalDividends = projectedBalance - currentBalance - totalContributions;
  return {
    monthlySalary, currentBalance, age, retirementAge, years, dividendRate,
    monthlyContribution,
    employeeMonthly: monthlySalary * 0.11,
    employerMonthly: monthlySalary * 0.13,
    totalContributions, totalDividends, projectedBalance,
  };
}
