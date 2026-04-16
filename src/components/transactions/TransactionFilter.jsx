/**
 * Component: TrasactionFilter
 * Description: handles inputs for search, filter, sorting and export csv
 */

import { Download } from "lucide-react";

const TransactionFilter = ({
  search,
  setSearch,
  filterBy,
  setFilterBy,
  sortBy,
  setSortBy,
  exportCSV,
  darkMode,
}) => {
  return (
    <div
      className={`flex flex-wrap gap-3 p-2 mb-4 justify-between ${
        darkMode ? "text-gray-300" : "text-gray-700"
      }`}
    >
      <input
        type="text"
        placeholder="Search by name or category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full md:w-1/3 placeholder-gray-500 outline-none"
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
  );
};

export default TransactionFilter;
