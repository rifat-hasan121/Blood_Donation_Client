import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const BloodDonateRequests = () => {
  const axiosSecure = useAxiosSecure();

  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [allDonationRequests, setAllDonationRequests] = useState([]); // All pending requests from backend
  const [filteredRequests, setFilteredRequests] = useState([]); // Filtered requests after search
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

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

  // Fetch all pending donation requests on mount
  useEffect(() => {
    const fetchDonationRequests = async () => {
      setIsLoading(true);
      try {
        const { data } = await axiosSecure.get("/donation-requests/user");
        // console.log("API data:", data);

        const pending = data.filter((r) => r.status === "Pending");
        setAllDonationRequests(pending);
        setFilteredRequests(pending);
       // show all by default
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDonationRequests();
  }, [axiosSecure]);

  // Handle form submit for search
  const handleSearch = (e) => {
    e.preventDefault();
    setShowAll(false);

    let filtered = allDonationRequests;

    if (bloodGroup) {
      filtered = filtered.filter((r) => r.bloodGroup === bloodGroup);
    }
    if (district) {
      filtered = filtered.filter((r) => r.recipientDistrict === district);
    }
    if (upazila) {
      filtered = filtered.filter((r) => r.recipientUpazila === upazila);
    }

    setFilteredRequests(filtered);
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const visibleRequests = showAll
    ? filteredRequests
    : filteredRequests.slice(0, 6);

  return (
    <div className="max-w-7xl px-4 mx-auto py-8">
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
      >
        {/* Blood Group */}
        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="border border-gray-300 p-3 rounded focus:outline-none"
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>

        {/* District */}
        <select
          value={district}
          onChange={(e) => {
            setDistrict(e.target.value);
            setUpazila("");
          }}
          className="border border-gray-300 p-3 rounded focus:outline-none"
        >
          <option value="">Select District</option>
          {Object.keys(districtsAndUpazilas).map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* Upazila */}
        <select
          value={upazila}
          onChange={(e) => setUpazila(e.target.value)}
          className="border border-gray-300 p-3 rounded focus:outline-none"
          disabled={!district}
        >
          <option value="">Select Upazila</option>
          {district &&
            districtsAndUpazilas[district]?.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
        </select>

        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Search
        </button>
      </form>

      {isLoading && <div>Loading donation requests...</div>}
      {error && (
        <div className="text-red-500">
          Error fetching donation requests: {error.message}
        </div>
      )}

      {!isLoading && filteredRequests.length === 0 && (
        <p className="text-center text-gray-600">
          No matching donation requests found.
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleRequests.map((request) => (
          <div
            key={request._id}
            className="border rounded-lg shadow-md bg-red-300/60 hover:shadow-lg group"
            data-aos="flip-left"
          >
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></div>

            <h2 className="font-semibold p-4 text-gray-800 text-2xl text-center border-b mb-4">
              {request.recipientName}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="bg-red-400/30 text-white p-4 shadow-sm">
                <p className="text-lg font-bold">
                  Blood Group:{" "}
                  <span className="text-xl">{request.bloodGroup}</span>
                </p>
                <p className="text-sm opacity-90">
                  📍 {request.recipientDistrict}, {request.recipientUpazila}
                </p>
              </div>

              <div className="bg-red-300 text-red-900 p-4 shadow-sm">
                <p className="text-lg font-bold">
                  📅 Date: {request.donationDate}
                </p>
                <p className="text-sm opacity-90">
                  ⏰ Time: {request.donationTime}
                </p>
              </div>
            </div>

            <div className="mt-4 p-4">
              <Link
                className="px-2 border-2 border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition duration-300"
                to={`/donation-request-details/${request._id}`}
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>

      {!showAll && filteredRequests.length > 6 && (
        <div className="text-center mt-6">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            onClick={() => setShowAll(true)}
          >
            See All Requests
          </button>
        </div>
      )}
    </div>
  );
};

export default BloodDonateRequests;
