const Table = ({ data, columns, onRowClick }) => {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="w-full text-sm text-gray-700">
        <thead className="bg-gray-100 uppercase text-xs text-gray-600">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className="px-4 py-3 text-left border-b">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr
                key={idx}
                onClick={() => onRowClick && onRowClick(row)}
                className="hover:bg-primaryLight/10 transition cursor-pointer"
              >
                {columns.map((col) => (
                  <td key={col.accessor} className="px-4 py-3 border-b">
                    {row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="py-6 text-center text-gray-500"
              >
                No Records Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
