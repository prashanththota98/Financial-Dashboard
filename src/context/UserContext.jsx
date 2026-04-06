import { createContext, useContext, useEffect, useState } from "react";
import { transactionsData } from "../data/Mockdata";

const getSummary = (transactions) => {
  let income = 0;
  let expense = 0;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;

  let currentMonthIncome = 0;
  let currentMonthExpense = 0;
  let lastMonthIncome = 0;
  let lastMonthExpense = 0;

  transactions.forEach((t) => {
    const transactionMonth = new Date(t.date).getMonth() + 1;
    const transactionYear = new Date(t.date).getFullYear();

    if (t.type.toLowerCase() === "income") {
      income += t.amount;
      if (
        transactionMonth === currentMonth &&
        transactionYear === currentDate.getFullYear()
      ) {
        currentMonthIncome += t.amount;
      }
      if (
        transactionMonth === lastMonth &&
        transactionYear === currentDate.getFullYear()
      ) {
        lastMonthIncome += t.amount;
      }
    } else if (t.type.toLowerCase() === "expense") {
      expense += t.amount;
      if (
        transactionMonth === currentMonth &&
        transactionYear === currentDate.getFullYear()
      ) {
        currentMonthExpense += t.amount;
      }
      if (
        transactionMonth === lastMonth &&
        transactionYear === currentDate.getFullYear()
      ) {
        lastMonthExpense += t.amount;
      }
    }
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
      label: "last Month Income",
      value: lastMonthIncome,
      isPositive: true,
    },
    {
      id: 3,
      label: "Current Month Income",
      value: currentMonthIncome,
      isPositive: true,
    },
    {
      id: 4,
      label: "Monthly Expenses",
      value: currentMonthExpense,
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
