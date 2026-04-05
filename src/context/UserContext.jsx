import { createContext, useContext, useEffect, useState } from "react";
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
      isPositive: true,
    },
    {
      id: 2,
      label: "Monthly Income",
      value: income,
      isPositive: true,
    },
    {
      id: 3,
      label: "Monthly Expenses",
      value: expense,
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
    const monthNumber = index + 1;
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
  // const [transactions, setTransactions] = useState(transactionsData);
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("saved_Transactions");
    if (saved !== null) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Local stotage empty", e);
        return transactionsData;
      }
    }
    return transactionsData;
  });

  useEffect(() => {
    localStorage.setItem("saved_Transactions", JSON.stringify(transactions));
  }, [transactions]);
  const summaries = getSummary(transactions);

  const charts = getMonthlyChartData(transactions);
  const [role, setRole] = useState("Viewer");
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
