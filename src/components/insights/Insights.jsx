const insights = [
  {
    label: "Highest Income",
    value: "Dec ($4,500)",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    label: "Top Expense",
    value: "Food ($1,200)",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    label: "Savings Goal",
    value: "80% Completed",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
];

const Insights = () => {
  return (
    <div className="flex md:flex-row gap-4 p-4">
      {insights.map((item, i) => (
        <div
          key={i}
          className={`p-4 rounded-xl shadow-sm border ${item.bg} flex flex-1 flex-col text-center`}
        >
          <span className="text-xs font-bold uppercase opacity-70">
            {item.label}
          </span>
          <span className={`text-lg font-bold ${item.color}`}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Insights;
