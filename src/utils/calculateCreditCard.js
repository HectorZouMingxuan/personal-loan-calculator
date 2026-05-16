export default function calculateCreditCard(balance, annualRatePct, monthlyPayment) {
  const r = annualRatePct / 100 / 12;
  const minPayment = Math.max(balance * 0.02, 50);
  if (monthlyPayment <= balance * r) return { neverPaysOff: true, minPayment };
  let remaining = balance, totalInterest = 0, months = 0;
  while (remaining > 0 && months < 600) {
    const interest = remaining * r;
    totalInterest += interest;
    remaining = remaining + interest - monthlyPayment;
    if (remaining < 0) remaining = 0;
    months++;
  }
  return { neverPaysOff: false, months, totalInterest, totalPaid: balance + totalInterest, minPayment, balance, monthlyPayment, annualRatePct };
}
