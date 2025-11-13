
import { useState, useMemo } from "react";
import Pagination from "../ui/Pagination";
import Input from "../ui/Input";

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

                <div className="flex items-center gap-3">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                        <input
                            type="text"
                            placeholder="Type to search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="px-3 py-2 outline-none w-[250px] text-gray-700"
                        />
                        <button
                            onClick={() => setCurrentPage(1)}
                            className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 font-semibold"
                        >
                            Search
                        </button>
                    </div>
                </div>


                <WrappedComponent
                    data={paginatedData}
                    columns={columns}
                    onRowClick={onRowClick}
                />

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
