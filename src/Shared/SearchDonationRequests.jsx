import { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const SearchDonationRequests = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const axiosSecure=useAxiosSecure()

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await axiosSecure.get(
        "https://assaingment-12-server-iota.vercel.app/donation-requests"
      );

      const filtered = res.data.filter(
        (request) =>
          request?.status === "Pending" &&
          (request?.district
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
            request?.bloodGroup
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            request?.name?.toLowerCase().includes(searchQuery.toLowerCase()))
      );

      setResults(filtered);
    } catch (err) {
      console.log(err);
      setError("Failed to fetch donation requests");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        🔍 Search Donation Requests
      </h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by district, blood group, or name"
          className="input input-bordered w-full bg-gray-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="btn btn-primary w-full md:w-auto"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {results.length > 0 ? (
        <div className="grid gap-4">
          {results.map((req) => {
            console.log(req); // এখানে req টা প্রতিটি iteration এ console হবে

            return (
              <div
                key={req._id}
                className="border p-4 rounded-lg shadow bg-white"
              >
                <h3 className="text-lg font-bold">{req.name}</h3>
                <p>
                  <strong>Blood Group:</strong> {req.bloodGroup}
                </p>
                <p>
                  <strong>District:</strong> {req.recipientDistrict}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(req.createdAt).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        !loading && (
          <p className="text-center text-gray-500">No results to display</p>
        )
      )}
    </div>
  );
};

export default SearchDonationRequests;
