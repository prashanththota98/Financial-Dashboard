import { useUser } from "../../context/UserContext";

const SummaryCards = () => {
  const { summaries } = useUser();
  console.log(summaries);
  return (
    <div className="flex md:flex-row gap-4 p-4">
      {summaries.map((item) => (
        <div
          key={item.id}
          className="flex-1 border rounded-lg shadow-md p-4 bg-white text-center"
        >
          <h3 className="text-sm font-medium text-gray-500">{item.label}</h3>
          <p className="text-lg font-bold text-gray-900">
            {item.value.toLocaleString()}
          </p>
          {item.trend && (
            <p
              className={`text-sm font-semibold ${
                item.isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {item.trend}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
