import { useUser } from "../../context/UserContext";
import { useState } from "react";

const TransactionList = () => {
  const { transactions, role, setTransactions } = useUser();
  const [editingId, setEditingId] = useState(null);
  const [editTx, setEditTx] = useState({});

  const saveEdit = (id) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === id ? { ...editTx, id, amount: Number(editTx.amount) } : tx,
      ),
    );
    setEditingId(null);
    setEditTx({});
  };

  return (
    <div className="p-4 m-3 bg-white rounded shadow-md overflow-x-auto">
      <h3 className="text-gray-700 font-medium mb-4 text-2xl text-center">
        Transactions
      </h3>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Amount</th>
            {role === "Admin" && <th className="p-2 border">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-gray-50">
              {["date", "name", "category", "type", "amount"].map((field) => (
                <td className="p-2 border" key={field}>
                  {editingId === tx.id ? (
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
                        className="border rounded p-1 w-24"
                      />
                    ) : (
                      <input
                        type="text"
                        value={editTx[field]}
                        onChange={(e) =>
                          setEditTx((prev) => ({
                            ...prev,
                            [field]: e.target.value,
                          }))
                        }
                        className="border rounded p-1"
                      />
                    )
                  ) : field === "amount" ? (
                    `Rs.${tx[field].toFixed(2)}`
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
                        onClick={() => setEditingId(null)}
                        className="text-red-600 font-semibold"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(tx.id);
                        setEditTx({ ...tx });
                      }}
                      className="text-blue-600 font-semibold"
                    >
                      Edit
                    </button>
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
