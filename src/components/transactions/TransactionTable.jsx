import TransactionRow from "./TransactionRow";

const TransactionTable = ({
  filteredTransactions,
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
    <table
      className={`w-full text-left border-collapse h-full ${
        darkMode ? "bg-gray-800" : "bg-gray-300"
      }`}
    >
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
            <td
              colSpan={role === "Admin" ? 6 : 5}
              className={`text-center ${darkMode ? "text-gray-300" : "text-gray-800"} h-5`}
            >
              No transactions available
            </td>
          </tr>
        )}
        {filteredTransactions.map((tx) => (
          <TransactionRow
            key={tx.id}
            tx={tx}
            role={role}
            editingId={editingId}
            setEditingId={setEditingId}
            editTx={editTx}
            setEditTx={setEditTx}
            saveEdit={saveEdit}
            handleDelete={handleDelete}
            darkMode={darkMode}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
