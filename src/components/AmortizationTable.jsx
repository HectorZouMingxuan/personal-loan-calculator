import { useState } from "react";
import formatCurrency from "../utils/formatCurrency";
import calculateAmortization from "../utils/calculateAmortization";

function AmortizationTable({ result }) {
  const [open, setOpen] = useState(false);
  const schedule = open ? calculateAmortization(result) : [];

  return (
    <section className="card amort-card">
      <div className="amort-header">
        <h2>Amortization Schedule</h2>
        <button
          type="button"
          className="secondary-btn"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Hide Schedule ▴" : "View Schedule ▾"}
        </button>
      </div>

      {open && (
        <div className="amort-scroll">
          <table className="amort-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Opening Balance</th>
                <th>Interest</th>
                <th>Principal</th>
                <th>Monthly Payment</th>
                <th>Closing Balance</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.month}>
                  <td>{row.month}</td>
                  <td>{formatCurrency(row.opening)}</td>
                  <td>{formatCurrency(row.interest)}</td>
                  <td>{formatCurrency(row.principal)}</td>
                  <td>{formatCurrency(row.payment)}</td>
                  <td>{formatCurrency(row.closing)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AmortizationTable;
