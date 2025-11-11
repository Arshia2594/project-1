import { useState, useMemo } from "react";
import Pagination from "../ui/Pagination";

const withTable = (WrappedComponent) => {
    return function EnhancedTable({ data = [], columns = [], onRowClick }) {
        const [search, setSearch] = useState("");
        const [currentPage, setCurrentPage] = useState(1);
        const [rowsPerPage, setRowsPerPage] = useState(10);

        const filteredData = useMemo(() => {
            return data.filter((row) =>
                columns.some((col) =>
                    String(row[col.accessor])
                        .toLowerCase()
                        .includes(search.toLowerCase())
                )
            );
        }, [data, columns, search]);

        const totalPages = Math.ceil(filteredData.length / rowsPerPage);

        const paginatedData = filteredData.slice(
            (currentPage - 1) * rowsPerPage,
            currentPage * rowsPerPage
        );

        return (
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="border border-border px-4 py-2 rounded-lg w-64 bg-surface focus:ring-2 focus:ring-primary outline-none"
                />


                <WrappedComponent data={paginatedData} columns={columns} onRowClick={onRowClick} />

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages || 1}
                    onPageChange={setCurrentPage}
                    rowsPerPage={rowsPerPage}
                    setRowsPerPage={setRowsPerPage}
                />
            </div>
        );
    };
};

export default withTable;
