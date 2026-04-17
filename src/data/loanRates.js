export const loanRates = [
  {
    min: 5000,
    max: 20000,
    rate: 0.08,
    label: "RM 5,000 - RM 20,000",
  },
  {
    min: 20001,
    max: 50000,
    rate: 0.07,
    label: "RM 20,001 - RM 50,000",
  },
  {
    min: 50001,
    max: 100000,
    rate: 0.065,
    label: "RM 50,001 - RM 100,000",
  },
];

export function getRateByAmount(amount) {
  return loanRates.find((item) => amount >= item.min && amount <= item.max) || null;
}