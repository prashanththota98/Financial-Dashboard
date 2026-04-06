import { useUser } from "../../context/UserContext";
import { useMemo } from "react";
import { FormatCurrency } from "../../utils/FormatCurrency";
import { useSystem } from "../../context/SystemContext";

const Insights = () => {
  const { transactions } = useUser();
  const { darkMode } = useSystem();

  const calculatedInsights = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];
    const monthlySummary = transactions.reduce((acc, curr) => {
      const monthName = new Date(curr.date).toLocaleString("en-IN", {
        month: "short",
        year: "numeric",
      });
      if (!acc[monthName]) {
        acc[monthName] = { income: 0, expense: 0 };
      }
      if (curr.type === "Income") {
        acc[monthName].income += curr.amount;
      } else {
        acc[monthName].expense += curr.amount;
      }
      return acc;
    }, {});

    const monthlyArray = Object.entries(monthlySummary).map(([name, data]) => ({
      name,
      ...data,
    }));

    const topMonth = [...monthlyArray].sort((a, b) => b.income - a.income)[0];

    const categoryTotal = transactions
      .filter((exp) => exp.type === "Expense")
      .reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
      }, {});

    const topCategory = Object.entries(categoryTotal).sort(
      (a, b) => b[1] - a[1],
    );
    const topPair = topCategory[0] || ["N/A", 0];

    const leastCategory = Object.entries(categoryTotal).sort(
      (a, b) => a[1] - b[1],
    );
    const leastPair = leastCategory[0] || ["N/A", 0];

    const totalIncome = transactions
      .filter((total) => total.type === "Income")
      .reduce((sum, curr) => sum + curr.amount, 0);

    const totalExpense = transactions
      .filter((total) => total.type === "Expense")
      .reduce((sum, curr) => sum + curr.amount, 0);

    const savingsRate =
      totalIncome > 0
        ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100)
        : 0;

    return [
      {
        label: "Highest Income Month",
        value: `${topMonth.name} ${FormatCurrency(topMonth.income)}`,
        color: "text-green-600",
      },
      {
        label: "Top Spending Area",
        value: `${topPair[0]} ${FormatCurrency(topPair[1])}`,
        color: "text-red-600",
      },
      {
        label: "Least Spending Area",
        value: `${leastPair[0]} ${FormatCurrency(leastPair[1])}`,
        color: "text-yellow-600",
      },
      {
        label: "Savings Efficiency",
        value: `${savingsRate}% of income`,
        color: "text-blue-600",
      },
    ];
  }, [transactions]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-4 gap-4 animate-fadeIn animate-slideUp">
      {calculatedInsights.length === 0 ? (
        <div
          className={`${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-300 text-gray-800"} w-full p-6 rounded-xl text-center shadow-md`}
        >
          No Insight available
        </div>
      ) : (
        calculatedInsights.map((item, i) => (
          <div
            key={i}
            className={`${darkMode ? "bg-gray-800" : "bg-gray-300"} p-6 rounded-2xl border-none shadow-sm flex flex-1 flex-col items-center justify-center transition-all hover:scale-[1.02]  cursor-default hover:scale-105 hover:-translate-y-0.5 transform  duration-300 hover:shadow-xl`}
          >
            <span
              className={`text-[10px] font-bold uppercase tracking-widest ${darkMode ? "text-gray-200" : "text-gray-900"} mb-1`}
            >
              {item.label}
            </span>
            <p className={`text-xl font-black ${item.color}`}>{item.value}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Insights;
