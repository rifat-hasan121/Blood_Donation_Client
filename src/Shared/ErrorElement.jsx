import React from 'react';
import { Link } from 'react-router';

const ErrorElement = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-4">
        {/* Oops! with background image in text */}
        <h1
          className="text-8xl font-extrabold bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "url('https://i.ibb.co.com/rf48zshY/images-1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          Oops!
        </h1>

        {/* Error Message */}
        <h2 className="text-2xl font-bold mt-6">403 - FORBIDDEN</h2>
        <p className="text-base text-gray-600 mt-2">
          You do not have permissions to access this page.
        </p>

        {/* Button */}
        <Link to="/" className="mt-6">
          <button
            className="px-4 py-2 text-white font-bold rounded-lg shadow-xl text-xl shadow-blue-500/30"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/rf48zshY/images-1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            GO TO HOMEPAGE
          </button>
        </Link>
      </div>
    );
};

export default ErrorElement;