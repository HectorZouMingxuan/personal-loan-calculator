export default function calculateFD(principal, tenureMonths, ratePercent) {
  const r = ratePercent / 100;
  const years = tenureMonths / 12;
  const interestEarned = principal * r * years;
  const maturityAmount = principal + interestEarned;
  return { principal, tenureMonths, ratePercent, interestEarned, maturityAmount };
}
