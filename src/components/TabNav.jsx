const TABS = [
  { id: "loan",    label: "Loan Calculator" },
  { id: "fd",      label: "Fixed Deposit" },
  { id: "savings", label: "Savings Goal" },
  { id: "cc",      label: "Credit Card" },
  { id: "fx",      label: "Currency" },
  { id: "epf",     label: "EPF Planner" },
  { id: "budget",  label: "Budget Tracker" },
];

function TabNav({ activeTab, onTabChange }) {
  return (
    <nav className="tab-nav-bar">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`tab-nav-btn${activeTab === tab.id ? " tab-nav-btn--active" : ""}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export default TabNav;
