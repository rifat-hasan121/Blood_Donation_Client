import React from 'react';
import SearchBar from './SearchBar';
import { PiTimer } from "react-icons/pi";
import blog1 from '../assets/images/blog1.jpg'
import blog2 from '../assets/images/10336128_4438751.jpg'
import blog3 from '../assets/images/27577819_ravi24_may_8.jpg'

const Blogs = () => {
    return (
      <div className="max-w-6xl mx-auto py-24">
        <div className="flex flex-col justify-center items-center text-center">
          <h3 className="text-xl my-6 md:text-5xl font-bold text-red-700">
            Blood Donation Blogs
          </h3>
          <p className="text-gray-400 text-lg">
            Discover inspiring stories, latest news, and valuable information
            about blood donation
          </p>
          {/* search bar */}
          <div className="max-w-5xl my-6">
            <SearchBar />
          </div>
          {/* blogs cards */}
          <div className="flex flex-col md:flex-row gap-6 my-6">
            <div className="max-w-sm mx-auto bg-gray-200 dark:bg-gray-700 dark:text-white text-black rounded-2xl shadow-lg pb-12 overflow-hidden transition hover:shadow-xl hover:text-red-500">
              <img
                src={blog1} // Replace with actual image path or use an import
                alt="world blood donation day"
                className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              />
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span className="text-red-500 font-semibold uppercase">
                    Development
                  </span>
                  <span className="flex items-center gap-1">
                    <PiTimer />4 min read
                  </span>
                </div>
                <h2 className="text-lg mt-4 font-semibold leading-tight">
                  The Best Ways to Do Market Research For Your Business Plan.
                </h2>
              </div>
            </div>
            <div className="max-w-sm mx-auto bg-gray-200 dark:bg-gray-700 dark:text-white text-dark rounded-2xl shadow-lg pb-12 overflow-hidden transition hover:shadow-xl hover:text-red-500">
              <img
                src={blog2} // Replace with actual image path or use an import
                alt="world blood donation day"
                className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              />
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span className="text-red-500 font-semibold uppercase">
                    Development
                  </span>
                  <span className="flex items-center gap-1">
                    <PiTimer />4 min read
                  </span>
                </div>
                <h2 className="text-lg mt-4 font-semibold leading-tight">
                  The Best Ways to Do Market Research For Your Business Plan.
                </h2>
              </div>
            </div>
            <div className="max-w-sm mx-auto bg-gray-200 dark:bg-gray-700 dark:text-white text-black rounded-2xl shadow-lg pb-12 overflow-hidden transition hover:shadow-xl hover:text-red-500">
              <img
                src={blog3} // Replace with actual image path or use an import
                alt="world blood donation day"
                className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
              />
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span className="text-red-500 font-semibold uppercase">
                    Development
                  </span>
                  <span className="flex items-center gap-1">
                    <PiTimer />4 min read
                  </span>
                </div>
                <h2 className="text-lg mt-4 font-semibold leading-tight">
                  The Best Ways to Do Market Research For Your Business Plan.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Blogs;