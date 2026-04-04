import { useMemo } from "react";
import { useUser } from "../../context/UserContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#4f46e5", "#e11d48", "#f59e0b", "#10b981", "#6366f1"];

const CategoryPieChart = () => {
  const { transactions } = useUser();

  const categoryData = useMemo(() => {
    return Object.values(
      transactions
        .filter((tx) => tx.type === "Expense")
        .reduce((acc, tx) => {
          if (!acc[tx.category])
            acc[tx.category] = { name: tx.category, value: 0 };
          acc[tx.category].value += tx.amount;
          return acc;
        }, {}),
    );
  }, [transactions]);
  return (
    <div className=" p-4 m-3 flex flex-col bg-white rounded shadow-md mt-4 lg:mt-6 lg:w-[50%] focus:outline-none border-none">
      <h3 className="text-gray-700 font-medium mb-2 text-2xl text-center">
        Spending Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={250} focusable={false}>
        <PieChart>
          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            cx="35%"
            cy="55%"
            outerRadius={90}
            fill="#8884d8"
            label
            stroke="none"
            activeIndex={-1}
            tabIndex={-1}
            isAnimationActive={true}
            onMouseEnter={() => {}}
            onFocus={(e) => e.target.blur()}
          >
            {categoryData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="none"
                tabIndex={-1}
                style={{ outline: "none" }}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconSize={15}
            wrapperStyle={{ fontSize: "15px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
