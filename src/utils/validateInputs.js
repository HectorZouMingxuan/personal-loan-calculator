export default function validateInputs(amount, years) {
  if (amount === "" || years === "") {
    return "Please fill in all fields.";
  }

  const parsedAmount = Number(amount);
  const parsedYears = Number(years);

  if (Number.isNaN(parsedAmount) || Number.isNaN(parsedYears)) {
    return "Please enter valid numeric values.";
  }

  if (parsedAmount < 5000 || parsedAmount > 100000) {
    return "Loan amount must be between RM 5,000 and RM 100,000.";
  }

  if (parsedYears < 2 || parsedYears > 6) {
    return "Loan tenure must be between 2 and 6 years.";
  }

  return "";
}