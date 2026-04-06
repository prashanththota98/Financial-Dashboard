import BalanceTrendChart from "../components/dashboard/BalanceTrendChart";
import CategoryPieChart from "../components/dashboard/CategoricalPieChart";
import SummaryCards from "../components/dashboard/SummaryCards";
import Insights from "../components/insights/Insights";

const Dashboard = () => {
  return (
    <div className="h-full overflow-hidden">
      <SummaryCards />
      <div className="flex flex-col lg:flex-row">
        <BalanceTrendChart />
        <CategoryPieChart />
      </div>
      <Insights />
    </div>
  );
};

export default Dashboard;
