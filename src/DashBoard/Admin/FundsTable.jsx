import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { axiosSecure } from "../../Hooks/useAxiosSecure";

const FundsTable = () => {
  const [funds, setFunds] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

 const fetchFunds = async (page = 1) => {
   setLoading(true);
   try {
     const res = await axiosSecure.get(`/funds?page=${page}&limit=10`);
     setFunds(res.data.funds);
     setTotalPages(res.data.totalPages);
     setCurrentPage(res.data.currentPage);
   } catch (error) {
     console.error("Failed to load funds:", error);
   } finally {
     setLoading(false);
   }
 };

  useEffect(() => {
    fetchFunds(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchFunds(page);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User Funding</h2>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full bg-white ">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="bg-gray-300 dark:bg-gray-600 dark:text-white px-4 py-2">
                  #
                </th>
                <th className="bg-gray-300 dark:bg-gray-600 dark:text-white px-4 py-2">
                  Name
                </th>
                <th className="bg-gray-300 dark:bg-gray-600 dark:text-white px-4 py-2">
                  Email
                </th>
                <th className="bg-gray-300 dark:bg-gray-600 dark:text-white px-4 py-2">
                  Amount (৳)
                </th>
                <th className="bg-gray-300 dark:bg-gray-600 dark:text-white px-4 py-2">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {funds.map((fund, index) => (
                <tr key={fund._id}>
                  <td className="bg-gray-200 dark:bg-gray-500 dark:text-white px-4 py-2">
                    {(currentPage - 1) * 10 + index + 1}
                  </td>
                  <td className="bg-gray-200 dark:bg-gray-500 dark:text-white px-4 py-2">
                    {fund.name}
                  </td>
                  <td className="bg-gray-200 dark:bg-gray-500 dark:text-white px-4 py-2">
                    {fund.email}
                  </td>
                  <td className="bg-gray-200 dark:bg-gray-500 dark:text-white px-4 py-2">
                    {fund.amount}
                  </td>
                  <td className="bg-gray-200 dark:bg-gray-500 dark:text-white px-4 py-2">
                    {format(new Date(fund.date), "PPP")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center gap-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          ⬅ Prev
        </button>

        <span className="px-4 py-2 bg-blue-50 text-blue-700 font-semibold rounded shadow-sm">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default FundsTable;
