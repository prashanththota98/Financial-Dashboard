import { LucideDelete } from "lucide-react";
import { FormatCurrency } from "../../utils/FormatCurrency";

const TransactionRow = ({
  tx,
  role,
  editingId,
  setEditingId,
  editTx,
  setEditTx,
  saveEdit,
  handleDelete,
  darkMode,
}) => {
  return (
    <tr
      key={tx.id}
      className={`${
        darkMode ? "text-gray-300" : "text-gray-700"
      } ${darkMode ? "hover:bg-slate-500" : "hover:bg-gray-400"}`}
    >
      {["date", "name", "category", "type", "amount"].map((field) => (
        <td className="p-2 border" key={field}>
          {editingId === tx.id && role === "Admin" ? (
            field === "type" ? (
              <select
                value={editTx[field]}
                onChange={(e) =>
                  setEditTx((prev) => ({ ...prev, [field]: e.target.value }))
                }
                className="border rounded p-1 outline-none"
              >
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            ) : field === "amount" ? (
              <input
                type="number"
                value={editTx[field]}
                onChange={(e) =>
                  setEditTx((prev) => ({ ...prev, [field]: e.target.value }))
                }
                className="border rounded p-1 w-24 outline-none"
              />
            ) : (
              <span>{tx[field]}</span>
            )
          ) : field === "amount" ? (
            FormatCurrency(tx[field])
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
  );
};

export default TransactionRow;
