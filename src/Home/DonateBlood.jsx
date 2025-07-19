import React from 'react';
import { Link } from 'react-router';

const DonateBlood = () => {
    return (
      <div className="w-11/12 md:max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-8 py-24">
        {/* left div */}
        <div>
          <div className="badge bg-red-500 border-none text-white my-4">
            Save Lives Today
          </div>
          <div>
            <h3 className="text-4xl sm:text-5xl font-bold leading-tight mb-4 text-gray-900">
              Why Donate <span className="text-red-500">Blood</span>?
            </h3>
            <p className="text-lg sm:text-xl mb-6 text-gray-700">
              Every drop counts. Discover how your donation can save up to{" "}
              <span className="font-bold text-red-600">3 lives</span> and make a
              lasting impact in your community.
            </p>
          </div>
          {/* btn div */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <button className="px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg bg-red-600 hover:bg-red-700 text-white shadow-red-600/30">
              Learn More{" "}
            </button>
            <Link to="/payment">
              <button className="px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                Donate Now
              </button>
            </Link>
          </div>
          <div className="mt-8 p-6 rounded-xl bg-white/50 backdrop-blur-sm">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-2">
                <p className="text-2xl font-bold text-red-600">1M</p>
                <p className="text-sm text-gray-600">Lives Saved</p>
              </div>
              <div className="p-2">
                <p className="text-2xl font-bold text-red-600">15min</p>
                <p className="text-sm text-gray-600">Process Time</p>
              </div>
              <div className="p-2">
                <p className="text-2xl font-bold text-red-600">60%</p>
                <p className="text-sm text-gray-600">More Needed</p>
              </div>
            </div>
          </div>
        </div>
        {/* right image div */}
        <div className="lg:w-1/2 relative aos-init aos-animate">
          <div className="grid grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:z-10 hover:-rotate-2 hover:scale-110 shadow-xl">
              <img
                src="https://i.ibb.co/n84788wm/luann-hunt-X20g2-GQs-Vd-A-unsplash.jpg"
                alt=""
                className="w-full h-48 sm:h-56 object-cover"
              />
            </div>
            {/* 2 */}
            <div className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:z-10 hover:-rotate-2 hover:scale-110 shadow-xl">
              <img
                src="https://i.ibb.co/v693dJ83/obi-PMnb-Mc-Jeftk-unsplash.jpg"
                alt=""
                className="w-full h-48 sm:h-56 object-cover"
              />
            </div>
            {/* 3 */}
            <div className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:z-10 hover:-rotate-2 hover:scale-110 shadow-xl">
              <img
                src="https://i.ibb.co/S4Hg3QRp/trnava-university-o-Xb-IT5-Hn-Qb-Q-unsplash.jpg"
                alt=""
                className="w-full h-48 sm:h-56 object-cover"
              />
            </div>
            {/* 4 */}
            <div className="relative rounded-2xl overflow-hidden transition-all duration-500 hover:z-10 hover:-rotate-2 hover:scale-110 shadow-xl">
              <img
                src="https://i.ibb.co/CK4WP6pT/mufid-majnun-j-KE8n32-EVs-unsplash.jpg"
                alt=""
                className="w-full h-48 sm:h-56 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    );
};

export default DonateBlood;