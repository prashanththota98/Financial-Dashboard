import { useMemo } from "react";
import { useUser } from "../../context/UserContext";
import { useSystem } from "../../context/SystemContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";
import { FormatCurrency } from "../../utils/FormatCurrency";

const COLORS = ["#4f46e5", "#e11d48", "#f59e0b", "#10b981", "#6366f1"];

const CategoryPieChart = () => {
  const { transactions } = useUser();
  const { darkMode } = useSystem();
  const currentMonth = new Date().getMonth() + 1;

  const categoryData = useMemo(() => {
    return Object.values(
      transactions
        .filter((tx) => tx.type === "Expense")
        .filter((tx) => new Date(tx.date).getMonth() + 1 === currentMonth)
        .reduce((acc, tx) => {
          if (!acc[tx.category])
            acc[tx.category] = { name: tx.category, value: 0 };
          acc[tx.category].value += tx.amount;
          return acc;
        }, {}),
    );
  }, [transactions]);

  const totalExpense = categoryData.reduce((sum, curr) => sum + curr.value, 0);
  if (!categoryData || categoryData.length === 0) {
    return (
      <p
        className={`h-[250px] ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-300"} p-4 m-3 rounded-xl shadow-md mt-4 lg:mt-6 lg:w-[50%] focus:outline-none border-none flex  flex-col items-center justify-center`}
      >
        No expense data available
      </p>
    );
  }
  return (
    <div
      className={`${darkMode ? "bg-gray-800" : "bg-gray-300"} p-4 m-3 flex flex-col rounded-xl shadow-md mt-4 lg:mt-6 lg:w-[50%] focus:outline-none border-none animate-fadeIn animate-slideUp`}
    >
      <h3
        className={` ${darkMode ? "text-gray-300" : "text-gray-800"} font-medium mb-2 text-2xl text-center`}
      >
        {`Spending Breakdown (${new Date().toLocaleString("default", { month: "long" })})`}
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            innerRadius={50}
            fill="#8884d8"
            label={false}
            stroke="none"
          >
            {categoryData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="none"
              />
            ))}
            <Label
              value={`${FormatCurrency(Math.round(totalExpense))}`}
              position="center"
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                fill: darkMode ? "#E5E7EB" : "#1F2937",
              }}
            />
          </Pie>
          <Tooltip
            formatter={(value) => FormatCurrency(value)}
            contentStyle={{
              fontSize: "12px",
              padding: "4px",
              border: "none",
              backgroundColor: darkMode ? "#1F2937" : "#ffffff",
            }}
            itemStyle={{ fontSize: "12px" }}
          />
          <Legend
            layout="horizontal"
            align="center"
            verticalAlign="bottom"
            iconSize={15}
            wrapperStyle={{
              fontSize: "15px",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
