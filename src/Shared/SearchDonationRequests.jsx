import { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const districtsAndUpazilas = {
  Dhaka: [
    "Savar",
    "Dhamrai",
    "Keraniganj",
    "Nawabganj",
    "Demra",
    "Tongi",
    "Shibpur",
    "Siddhirganj",
    "Narayanganj",
  ],
  Chittagong: [
    "Patiya",
    "Sitakunda",
    "Boalkhali",
    "Rangunia",
    "Anwara",
    "Fatikchhari",
    "Mirsharai",
    "Lohagara",
    "Banshkhali",
    "Sandwip",
  ],
  Rajshahi: [
    "Paba",
    "Durgapur",
    "Charghat",
    "Bagha",
    "Mohonpur",
    "Tanore",
    "Godagari",
    "Shibganj",
    "Niamatpur",
  ],
  Khulna: [
    "Batiaghata",
    "Dacope",
    "Dumuria",
    "Koyra",
    "Terokhada",
    "Paikgachha",
    "Kalaroa",
    "Shyamnagar",
    "Assasuni",
  ],
  Barishal: [
    "Bakerganj",
    "Barisal Sadar",
    "Agailjhara",
    "Muladi",
    "Banaripara",
    "Wazirpur",
    "Gournadi",
    "Uzirpur",
    "Kalapara",
  ],
  Sylhet: [
    "Moulvibazar",
    "Rajnagar",
    "Juri",
    "Kulaura",
    "Sreemangal",
    "Fenchuganj",
    "Balaganj",
    "Gowainghat",
    "Companiganj",
  ],
  Rangpur: [
    "Kurigram",
    "Gaibandha",
    "Lalmonirhat",
    "Nilphamari",
    "Rangpur Sadar",
    "Kachdana",
    "Pirganj",
    "Pirgachha",
    "Badarganj",
  ],
  Khagrachari: [
    "Dighinala",
    "Lakshmipur",
    "Manikchhari",
    "Mahalchhari",
    "Madhupur",
    "Mohalchhari",
    "Khagrachhari Sadar",
  ],
  Comilla: [
    "Laksam",
    "Titas",
    "Muradnagar",
    "Debidwar",
    "Monohorgonj",
    "Kamalnagar",
    "Comilla Sadar",
    "Nangalkot",
  ],
  Jessore: [
    "Abhaynagar",
    "Chaugachha",
    "Keshabpur",
    "Jessore Sadar",
    "Benapole",
    "Shashibhushon",
    "Bagherpara",
    "Jhikargachha",
  ],
  Mymensingh: [
    "Mymensingh Sadar",
    "Trishal",
    "Haluaghat",
    "Fulbaria",
    "Phulpur",
    "Gafargaon",
    "Nandail",
    "Bhaluka",
    "Kishoreganj",
  ],
  Noakhali: [
    "Begumganj",
    "Chatkhil",
    "Companiganj",
    "Senbagh",
    "Haimchar",
    "Noakhali Sadar",
    "Chhagalnaiya",
  ],
  Madaripur: ["Madaripur Sadar", "Shibchar", "Rajoir", "Kalkini", "Lohajang"],
  Shariatpur: [
    "Shariatpur Sadar",
    "Naria",
    "Gosairhat",
    "Bhedarganj",
    "Zinzira",
    "Chandpur",
  ],
  Chuadanga: [
    "Chaudanga",
    "Maheshpur",
    "Shyamnagar",
    "Bhandaria",
    "Khanjahan Ali",
    "Bagerhat",
  ],
  Sunamganj: [
    "Jagannathpur",
    "Chhatak",
    "Dasmina",
    "Shalla",
    "Sadar",
    "Moulvibazar",
  ],
  Bogura: [
    "Sadar",
    "Sherpur",
    "Shibganj",
    "Gabtali",
    "Kahaloo",
    "Khetlal",
    "Dhunat",
    "Nandigram",
  ],
};

const SearchDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await axiosSecure.get("/donation-requests");
      const query = searchQuery.toLowerCase();

      const filtered = res.data.filter((request) => {
        if (request.status !== "Pending") return false;

        const nameMatch = request.name?.toLowerCase().includes(query);
        const bloodGroupMatch = request.bloodGroup
          ?.toLowerCase()
          .includes(query);
        let districtMatch = false;
        let upazilaMatch = false;

        for (const district in districtsAndUpazilas) {
          if (
            district.toLowerCase() === query &&
            request.recipientDistrict.toLowerCase() === district.toLowerCase()
          ) {
            districtMatch = true;
          }

          const upazilas = districtsAndUpazilas[district];
          if (
            upazilas.includes(request.recipientUpazila) ||
            upazilas.some(
              (upz) =>
                upz.toLowerCase() === request.recipientUpazila.toLowerCase()
            )
          ) {
            if (district.toLowerCase() === query) {
              districtMatch = true;
            }
          }

          if (
            upazilas.some((upz) => upz.toLowerCase() === query) &&
            request.recipientUpazila.toLowerCase() === query
          ) {
            upazilaMatch = true;
          }
        }

        return districtMatch || upazilaMatch || nameMatch || bloodGroupMatch;
      });

      setResults(filtered);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch donation requests");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-gray-800 dark:text-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        🔍 Search Donation Requests
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by district, upazila, blood group, or name"
          className="input input-bordered w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button
          onClick={handleSearch}
          className="btn btn-primary w-full md:w-auto transition-all"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-center">⏳ Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((req) => (
            <div
              key={req._id}
              className="border p-4 rounded-lg shadow bg-white dark:bg-gray-900"
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
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No results to display
          </p>
        )
      )}
    </div>
  );
};

export default SearchDonationRequests;
