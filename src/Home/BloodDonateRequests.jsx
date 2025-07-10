import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const BloodDonateRequests = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [donationRequests, setDonationRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all donation requests manually
  useEffect(() => {
    const fetchDonationRequests = async () => {
      setIsLoading(true);
      try {
        const { data } = await axiosSecure("/donation-requests");
        setDonationRequests(data);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDonationRequests();
  }, [axiosSecure]);

  // Log all donation requests
//   console.log("All Donation Requests:", donationRequests);

  // Filter pending requests
  const pendingRequests = donationRequests.filter(
    (request) => request.status === "Pending"
  );

  // Log pending requests
//   console.log("Pending Donation Requests:", pendingRequests);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  if (error) {
    return <div>Error fetching donation requests: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading donation requests...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      {pendingRequests.length === 0 ? (
        <p className="text-center">No pending donation requests available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingRequests.map((request) => (
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
                  <p className="text-sm opacity-90">📍 {request.fullAddress}</p>
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
      )}
    </div>
  );
};

export default BloodDonateRequests;
