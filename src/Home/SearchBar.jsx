// SearchBar.jsx
import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <label className="input input-bordered border-red-600 flex items-center gap-8 w-full bg-white dark:bg-gray-700">
        <FaSearch
          className="text-gray-400"
          size={20}
          style={{ color: "#EA2F14" }}
        />
        <input
          type="text"
          className="grow bg-white dark:bg-gray-700 text-black dark:text-white"
          placeholder="Search here..."
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default SearchBar;
