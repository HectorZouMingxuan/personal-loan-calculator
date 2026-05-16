export default function calculateAmortization(result) {
  const { amount, totalMonths, monthlyPayment, totalInterest } = result;
  const monthlyPrincipal = amount / totalMonths;
  const monthlyInterest = totalInterest / totalMonths;
  const schedule = [];
  let balance = amount;

  for (let m = 1; m <= totalMonths; m++) {
    const closing = Math.max(0, balance - monthlyPrincipal);
    schedule.push({
      month: m,
      opening: balance,
      interest: monthlyInterest,
      principal: monthlyPrincipal,
      payment: monthlyPayment,
      closing,
    });
    balance = closing;
  }
  return schedule;
}
