const Pagination = ({ currentPage, totalPages, onPageChange, rowsPerPage, setRowsPerPage }) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <div>
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className="border rounded px-2 py-1 focus:ring-primary"
        >
          {[5, 10, 20, 50].map((n) => (
            <option key={n} value={n}>{n} rows</option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 items-center">
        <button
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-100"
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>

        <span className="text-sm text-gray-600">
          Page {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-100"
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
