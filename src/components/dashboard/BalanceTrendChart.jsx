import { useUser } from "../../context/UserContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BalanceTrendChart = () => {
  const { charts } = useUser();
  return (
    <div className="p-4 m-3 flex flex-col bg-white rounded shadow-md lg:w-[50%] lg:mt-6 focus:outline-none border-none">
      <style>
        {`
        *:focus {
            outline: none !important;
        }
      `}
      </style>
      <h3 className="text-gray-700 font-medium mb-2 text-center text-2xl">
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
            tick={{ fontSize: 14, angle: -45, textAnchor: "end" }}
            style={{ pointerEvents: "none" }}
          />
          <YAxis tick={{ fontSize: 14 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#4bec04"
            strokeWidth={2}
            dot={{ r: 4 }}
            style={{ pointerEvents: "none" }}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ff0202"
            onFocus={(e) => e.target.blur()}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceTrendChart;
