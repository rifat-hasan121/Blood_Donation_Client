import React from "react";
import { FaHandHoldingHeart, FaHospitalAlt } from "react-icons/fa";
import { Link } from "react-router";

const HeroDonateCard = () => {
  
 
  return (
    <div className="max-w-3xl mx-auto my-10 md:px-6">
      <div className="bg-red-300 dark:bg-red-900 rounded-2xl p-8 text-center shadow-lg">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
          Be Someone's Hero Today
        </h2>
        <p className="mt-3 text-white/90 text-base md:text-lg">
          Join our community of life-savers in just an hour.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/payment">
            <button className="flex items-center justify-center gap-2 px-5 py-3 bg-white text-red-600 font-semibold rounded-full border border-red-500 hover:bg-red-50 hover:scale-105 transition-all duration-300 shadow-sm">
              <FaHandHoldingHeart className="text-lg" />
              Donate Now
            </button>
          </Link>
          <button className="flex items-center justify-center gap-2 px-5 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 hover:scale-105 transition-all duration-300 shadow-sm">
            <FaHospitalAlt className="text-lg" />
            Find a Center
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroDonateCard;
