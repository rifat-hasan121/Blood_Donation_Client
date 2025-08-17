import { useEffect, useState } from "react";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ErrorElement from "../Shared/ErrorElement";

export default function OurDonor() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://assaingment-12-server-iota.vercel.app/all-users", {
      credentials: "include", // jwt cookie পাঠানোর দরকার হলে রাখো
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch users");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <LoadingSpinner/>
    );
  }

  if (error) {
    return <ErrorElement/>
  }

  return (
    <div className="px-4 py-10 mt-28 max-w-4/5 mx-auto">
      

      {users.length === 0 ? (
        <ErrorElement message="No donors found" />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition duration-300"
            >
              {/* Cover Photo */}
              <div className="relative h-32 bg-gray-200">
                {user.coverPhoto ? (
                  <img
                    src={user.coverPhoto}
                    alt={`${user.name} cover`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-indigo-200 to-purple-200"></div>
                )}

                {/* Profile Photo */}
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/100"}
                    alt={user.name}
                    className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                  />
                </div>
              </div>

              {/* User Info */}
              <div className="pt-12 pb-6 text-center px-4">
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500 capitalize">
                  Role: {user.role}
                </p>
                <p
                  className={`mt-2 text-sm font-medium ${
                    user.status === "active" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  Status: {user.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
