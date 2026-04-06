/**
 * Component: Summarycards
 * Description: Displays summary cards for total balance, current month Income, last month income, and present month expenses
 * Highlight positive and negative balances with color coding
 */

import { useUser } from "../../context/UserContext";
import { FormatCurrency } from "../../utils/FormatCurrency";
import { useSystem } from "../../context/SystemContext";

const SummaryCards = () => {
  const { summaries } = useUser();
  const { darkMode } = useSystem();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 animate-fadeIn">
      {summaries.map((item) => (
        <div
          key={item.id}
          className={`${darkMode ? "bg-gray-800" : "bg-gray-300"} ${item.value > 0 && item.label !== "Monthly Expenses" ? (darkMode ? "text-green-600" : "text-green-900") : item.label === "Monthly Expenses" ? (darkMode ? "text-red-600" : "text-red-600") : darkMode ? "text-red-600" : "text-red-500"}
          flex-1 border-none rounded-lg shadow-md p-4 text-center hover:scale-105 hover:-translate-y-0.5 transform transition-all duration-300 hover:shadow-xl animate-slideUp`}
        >
          <h3
            className={`text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-900"}`}
          >
            {item.label}
          </h3>
          <p className={`text-lg font-bold `}>{FormatCurrency(item.value)}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
