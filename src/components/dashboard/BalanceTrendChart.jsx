/**
 * Component: BalanceTrendChat
 * Description: visualize shows data income and expense monthly
 * Highlights: Handles fallback and darkmode
 * Others: used style to remove browser svg outline tried using tailwind focus and tabIndex -1 but they didnt worked
 */

import { useUser } from "../../context/UserContext";
import { useSystem } from "../../context/SystemContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FormatCurrency } from "../../utils/FormatCurrency"; // currenct formatter to rupees from utils

const BalanceTrendChart = () => {
  const { charts } = useUser();
  const { darkMode } = useSystem();

  const hasData = charts && charts.some((c) => c.income > 0 || c.expense > 0); //checking data if empty

  if (!hasData) {
    //handling empty data
    return (
      <p
        className={`h-[250px] ${darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-300"} p-4 m-3 rounded-xl shadow-md mt-4 lg:mt-6 lg:w-[50%] focus:outline-none border-none flex  flex-col items-center justify-center`}
      >
        No data available
      </p>
    );
  }

  return (
    <div
      className={`p-4 m-3 flex flex-col ${darkMode ? "bg-gray-800" : "bg-gray-300"} rounded-xl shadow-md lg:w-[50%] lg:mt-6 focus:outline-none border-none animate-slideUp animate-fadeIn`}
    >
      <style>
        {`
        *:focus {
            outline: none !important;
        }
      `}
      </style>
      <h3
        className={`${darkMode ? "text-gray-300" : "text-gray-800"} font-medium mb-2 text-center text-2xl`}
      >
        Balance Trend
      </h3>
      <ResponsiveContainer
        width="100%"
        height={250}
        style={{ outline: "none" }}
      >
        <LineChart
          data={charts}
          accessibilityLayer={false}
          style={{ outline: "none" }}
        >
          <XAxis
            dataKey="name"
            interval={0}
            tick={{
              fontSize: 14,
              angle: -45, //rotated names to avoid overlap
              textAnchor: "end",
              fill: darkMode ? "#E5E7EB" : "#1F2937",
            }}
            style={{ pointerEvents: "none" }}
          />
          <YAxis
            tick={{ fontSize: 14, fill: darkMode ? "#E5E7EB" : "#1F2937" }}
            tickFormatter={(value) => {
              if (value >= 1000) {
                return `${(value / 1000).toFixed()}k`;
              }
              return value;
            }}
          />

          <Line
            type="monotone"
            dataKey="income"
            stroke="#4bec04"
            strokeWidth={2}
            dot={{ r: 0 }} // removed dots to make lines look cleaner
            style={{ pointerEvents: "none" }}
          />

          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ff0202"
            strokeWidth={2}
            dot={{ r: 0 }}
            style={{ pointerEvents: "none" }}
          />

          <Tooltip
            formatter={(value) => FormatCurrency(value)}
            contentStyle={{
              fontSize: "12px",
              color: darkMode ? "#ffffff" : "#000000",
              padding: "4px",
              border: "none",
              backgroundColor: darkMode ? "#1F2937" : "#D1D5DB",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceTrendChart;
