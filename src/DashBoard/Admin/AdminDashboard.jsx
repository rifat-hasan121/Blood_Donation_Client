import React, { useEffect, useState } from "react";
import { FaUsers, FaHandHoldingUsd, FaTint } from "react-icons/fa";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalBloodRequests: 0,
    totalFunding: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin-stats")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Error fetching admin stats:", err);
      });
  }, []);

  const cardData = [
    {
      id: 1,
      title: "Total Donors",
      count: stats.totalDonors,
      icon: <FaUsers className="text-4xl text-primary" />,
      color: "bg-gradient-to-r from-cyan-500 to-blue-500",
    },
    {
      id: 2,
      title: "Total Funding",
      count: stats.totalFunding || "$0", // Placeholder if not implemented
      icon: <FaHandHoldingUsd className="text-4xl text-primary" />,
      color: "bg-gradient-to-r from-green-400 to-green-600",
    },
    {
      id: 3,
      title: "Blood Requests",
      count: stats.totalBloodRequests,
      icon: <FaTint className="text-4xl text-primary" />,
      color: "bg-gradient-to-r from-rose-400 to-red-500",
    },
  ];

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-primary">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Manage donors, funding, and blood donation requests efficiently.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cardData.map((item) => (
          <div
            key={item.id}
            className={`card shadow-xl text-white ${item.color}`}
          >
            <div className="card-body flex items-center justify-center text-center space-y-4">
              <div>{item.icon}</div>
              <h2 className="text-2xl font-bold">{item.count}</h2>
              <p className="text-lg">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
