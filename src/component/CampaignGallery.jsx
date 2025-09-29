import React from 'react';

const CampaignGallery = () => {
    return (
      <div className="container mx-auto p-4 py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-red-500 mb-4">
          CAMPAIGN GALLERY
        </h1>
        <p className="text-center text-gray-600 mb-8">
          our prestigious voluntary work on campaigns by the team
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <img
            src="https://templates.bwlthemes.com/blood_donation/v_2/images/gallery_3.jpg"
            alt="Campaign 1"
            className="w-full h-80 object-cover rounded hover:scale-105 hover:-rotate-2 transition-transform duration-300"
          />
          <img
            src="https://templates.bwlthemes.com/blood_donation/v_2/images/gallery_2.jpg"
            alt="Campaign 2"
            className="w-full h-80 object-cover rounded hover:scale-105 hover:-rotate-2 transition-transform duration-300"
          />
          <img
            src="https://templates.bwlthemes.com/blood_donation/v_2/images/gallery_6.jpg"
            alt="Campaign 3"
            className="w-full h-80 object-cover rounded hover:scale-105 hover:-rotate-2 transition-transform duration-300"
          />
          <img
            src="https://templates.bwlthemes.com/blood_donation/v_2/images/gallery_1.jpg"
            alt="Campaign 4"
            className="w-full h-80 object-cover rounded hover:scale-105 hover:-rotate-2 transition-transform duration-300"
          />
          <img
            src="https://templates.bwlthemes.com/blood_donation/v_2/images/gallery_1.jpg"
            alt="Campaign 5"
            className="w-full h-80 object-cover rounded hover:scale-105 hover:-rotate-2 transition-transform duration-300"
          />
          <img
            src="https://templates.bwlthemes.com/blood_donation/v_2/images/gallery_4.jpg"
            alt="Campaign 6"
            className="w-full h-80 object-cover rounded hover:scale-105 hover:-rotate-2 transition-transform duration-300"
          />
        </div>
      </div>
    );
};

export default CampaignGallery;