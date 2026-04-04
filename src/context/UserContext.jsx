import { createContext, useContext, useState } from "react";
import { transactionsData } from "../data/Mockdata";

const getSummary = (transactions) => {
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    if (t.type.toLowerCase() === "income") income += t.amount;
    else expense += t.amount;
  });

  return [
    {
      id: 1,
      label: "Total Balance",
      value: income - expense,
      trend: "+12.5%",
      isPositive: true,
    },
    {
      id: 2,
      label: "Monthly Income",
      value: income,
      trend: "+3.2%",
      isPositive: true,
    },
    {
      id: 3,
      label: "Monthly Expenses",
      value: expense,
      trend: "-1.8%",
      isPositive: false,
    },
  ];
};

const getMonthlyChartData = (transactions) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyData = months.map((month, index) => {
    const monthNumber = index + 1; // 1 for Jan, 2 for Feb
    const monthlyTransactions = transactions.filter(
      (t) => new Date(t.date).getMonth() + 1 === monthNumber,
    );

    let income = 0;
    let expense = 0;

    monthlyTransactions.forEach((t) => {
      if (t.type.toLowerCase() === "income") income += t.amount;
      else expense += t.amount;
    });

    return { name: month, income, expense };
  });

  return monthlyData;
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(transactionsData);
  const summaries = getSummary(transactions);
  const charts = getMonthlyChartData(transactions);
  const [role, setRole] = useState("viewer");
  return (
    <UserContext.Provider
      value={{
        transactions,
        charts,
        summaries,
        role,
        setRole,
        setTransactions,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
