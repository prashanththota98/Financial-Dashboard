import { useUser } from "../../context/UserContext";
import { useSystem } from "../../context/SystemContext";
import { useEffect, useMemo, useState } from "react";
import TransactionFilter from "./TransactionFilter";
import TransactionTable from "./TransactionTable";

const TransactionList = () => {
  const { transactions, role, setTransactions } = useUser();
  const { darkMode } = useSystem();

  const [editingId, setEditingId] = useState(null);
  const [editTx, setEditTx] = useState({});
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("All");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    if (role !== "Admin") {
      setEditingId(null);
      setEditTx({});
    }
  }, [role]);

  const filteredTransactions = useMemo(() => {
    let data = [...transactions];
    if (search) {
      data = data.filter(
        (tx) =>
          (tx.name || "").toLowerCase().includes(search.toLowerCase()) ||
          (tx.category || "").toLowerCase().includes(search.toLowerCase()),
      );
    }
    if (filterBy !== "All") {
      data = data.filter(
        (tx) => tx.type.toLowerCase() === filterBy.toLowerCase(),
      );
    }
    if (sortBy === "amount-asc") data.sort((a, b) => a.amount - b.amount);
    if (sortBy === "amount-desc") data.sort((a, b) => b.amount - a.amount);
    if (sortBy === "date-asc")
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sortBy === "date-desc")
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    return data;
  }, [transactions, search, filterBy, sortBy]);

  const saveEdit = (id) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id ? { ...editTx, id, amount: Number(editTx.amount) } : tx,
      ),
    );
    setEditingId(null);
    setEditTx({});
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditTx({});
    }
  };

  const exportCSV = () => {
    if (!filteredTransactions || filteredTransactions.length === 0) return;
    const header = ["Date", "Name", "Category", "Type", "Amount"];
    const rows = filteredTransactions.map((tx) => [
      tx.date,
      tx.name,
      tx.category,
      tx.type,
      tx.amount,
    ]);
    const csvContent = [header, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transactions.csv";
    link.click();
  };

  return (
    <div className={`m-3 rounded shadow-md overflow-x-auto min-h-full`}>
      <h3
        className={`font-medium ml-2 text-2xl ${darkMode ? "text-gray-300" : "text-gray-700"}`}
      >
        Transactions
      </h3>
      <TransactionFilter
        search={search}
        setSearch={setSearch}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        sortBy={sortBy}
        setSortBy={setSortBy}
        exportCSV={exportCSV}
        darkMode={darkMode}
      />
      <TransactionTable
        filteredTransactions={filteredTransactions}
        role={role}
        editingId={editingId}
        setEditingId={setEditingId}
        editTx={editTx}
        setEditTx={setEditTx}
        saveEdit={saveEdit}
        handleDelete={handleDelete}
        darkMode={darkMode}
      />
    </div>
  );
};

export default TransactionList;
