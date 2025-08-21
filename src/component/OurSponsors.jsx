import React from 'react';

const OurSponsors = () => {
    return (
      <div className=" mx-auto p-4 py-24">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-red-500 mb-2">
            OUR SPONSORS
          </h1>
          <div className="flex justify-center items-center mb-4">
          </div>
          <p className="text-gray-600 mb-6">
            The sponsors who give their valuable amount to fulfill our mission.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <img
              src="https://wp.bwlthemes.com/wp_reddrop_buddies/wp-content/uploads/2016/11/logo_8-300x195.jpg"
              alt="Creatives"
              className="w-32 h-32 object-contain"
            />
            <img
              src="https://wp.bwlthemes.com/wp_reddrop_buddies/wp-content/uploads/2016/11/logo_7-300x195.jpg"
              alt="Vintage"
              className="w-32 h-32 object-contain"
            />
            <img
              src="https://wp.bwlthemes.com/wp_reddrop_buddies/wp-content/uploads/2016/11/logo_6-300x195.jpg"
              alt="Retro"
              className="w-32 h-32 object-contain"
            />
            <img
              src="https://wp.bwlthemes.com/wp_reddrop_buddies/wp-content/uploads/2016/11/logo_5-300x195.jpg"
              alt="Vintage"
              className="w-32 h-32 object-contain"
            />
            <img
              src="https://wp.bwlthemes.com/wp_reddrop_buddies/wp-content/uploads/2016/11/logo_4-300x195.jpg"
              alt="Hipster"
              className="w-32 h-32 object-contain"
            />
          </div>
        </div>
      </div>
    );
};

export default OurSponsors;