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
import { FormatCurrency } from "../../utils/FormatCurrency";

const BalanceTrendChart = () => {
  const { charts } = useUser();
  const { darkMode } = useSystem();
  return (
    <div
      className={`p-4 m-3 flex flex-col ${darkMode ? "bg-gray-800" : "bg-gray-300"} rounded shadow-md lg:w-[50%] lg:mt-6 focus:outline-none border-none`}
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
              angle: -45,
              textAnchor: "end",
              fill: darkMode ? "#E5E7EB" : "#1F2937",
            }}
            style={{ pointerEvents: "none" }}
          />
          <YAxis
            tick={{ fontSize: 14, fill: darkMode ? "#E5E7EB" : "#1F2937" }}
          />
          <Line type="monotone" dataKey="expense" stroke="#ff0202" />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#4bec04"
            strokeWidth={2}
            dot={{ r: 4 }}
            style={{ pointerEvents: "none" }}
          />

          <Tooltip formatter={(value) => FormatCurrency(value)} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceTrendChart;
