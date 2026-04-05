import { useUser } from "../../context/UserContext";
import { useEffect, useMemo, useState } from "react";
import { FormatCurrency } from "../../utils/FormatCurrency";
import { Download, LucideDelete } from "lucide-react";
import { useSystem } from "../../context/SystemContext";

const TransactionList = () => {
  const { transactions, role, setTransactions } = useUser();
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [editTx, setEditTx] = useState({});
  const { darkMode } = useSystem();

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
        (listItem) =>
          (listItem.name || "").toLowerCase().includes(search.toLowerCase()) ||
          (listItem.category || "")
            .toLowerCase()
            .includes(search.toLowerCase()),
      );
    }

    if (filterBy !== "All") {
      data = data.filter(
        (listItem) => listItem.type.toLowerCase() === filterBy.toLowerCase(),
      );
    }

    if (sortBy === "amount-asc") {
      data.sort((a, b) => a.amount - b.amount);
    }
    if (sortBy === "amount-desc") {
      data.sort((a, b) => b.amount - a.amount);
    }
    if (sortBy === "date-asc") {
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    if (sortBy === "date-desc") {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction",
    );
    if (!confirmDelete) return;
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setEditTx({});
    }
  };

  const exportCSV = () => {
    if (!filteredTransactions || filteredTransactions.length === 0) return;
    const header = ["Date", "Name", "Category", "Type", "Amount"];
    const rows = filteredTransactions.map((listItem) => [
      listItem.date,
      listItem.name,
      listItem.category,
      listItem.type,
      listItem.amount,
    ]);
    const csvContent = [header, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transactions.csv";
    link.click();
  };

  return (
    <div className={` m-3 rounded shadow-md overflow-x-auto`}>
      <h3
        className={`font-medium ml-2 text-2xl ${darkMode ? "text-gray-300" : "text-gray-700"}`}
      >
        Transactions
      </h3>

      <div
        className={`flex flex-wrap gap-3 p-2 mb-4 justify-between ${darkMode ? "text-gray-300" : "text-gray-700"}`}
      >
        <input
          type="text"
          placeholder="search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />

        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
          className={`border p-2 rounded ${darkMode ? "bg-gray-800" : "bg-gray-300"}`}
        >
          <option value="All">All</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={`${darkMode ? "bg-gray-800" : "bg-gray-300"} border p-2 rounded`}
        >
          <option value="">Sort By</option>
          <option value="amount-asc">Amount ↑</option>
          <option value="amount-desc">Amount ↓</option>
          <option value="date-asc">Date ↑</option>
          <option value="date-desc">Date ↓</option>
        </select>

        <button onClick={exportCSV}>
          <Download />
        </button>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Amount</th>
            {role === "Admin" && <th className="p-2 border">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length === 0 && (
            <tr>
              <td colSpan={role === "Admin" ? 6 : 5}>
                No transactions available
              </td>
            </tr>
          )}
          {filteredTransactions.map((tx) => (
            <tr
              key={tx.id}
              className={`${darkMode ? "text-gray-300" : "text-gray-700"} ${darkMode ? "hover:bg-slate-500" : "hover:bg-gray-400"}`}
            >
              {["date", "name", "category", "type", "amount"].map((field) => (
                <td className="p-2 border " key={field}>
                  {editingId === tx.id && role === "Admin" ? (
                    field === "type" ? (
                      <select
                        value={editTx[field]}
                        onChange={(e) =>
                          setEditTx((prev) => ({
                            ...prev,
                            [field]: e.target.value,
                          }))
                        }
                        className="border rounded p-1"
                      >
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                      </select>
                    ) : field === "amount" ? (
                      <input
                        type="number"
                        value={editTx[field]}
                        onChange={(e) =>
                          setEditTx((prev) => ({
                            ...prev,
                            [field]: e.target.value,
                          }))
                        }
                        className={` border rounded p-1 w-24`}
                      />
                    ) : (
                      <span>{tx[field]}</span>
                    )
                  ) : field === "amount" ? (
                    `${FormatCurrency(tx[field])}`
                  ) : (
                    tx[field]
                  )}
                </td>
              ))}
              {role === "Admin" && (
                <td className="p-2 border">
                  {editingId === tx.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(tx.id)}
                        className="text-green-600 font-semibold mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditTx({});
                        }}
                        className="text-red-600 font-semibold"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          setEditingId(tx.id);
                          setEditTx({ ...tx });
                        }}
                        className="text-blue-600 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(tx.id)}
                        disabled={editingId === tx.id}
                      >
                        <LucideDelete className="text-red-400" />
                      </button>
                    </div>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
