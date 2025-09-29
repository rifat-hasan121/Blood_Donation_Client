import React from 'react';

const DonationProcess = () => {
    return (
      <div className="container mx-auto p-4 py-24">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-red-500 mb-4">
          DONATION PROCESS
        </h1>
        <p className="text-center text-gray-600 mb-6">
          The donation process from the time you arrive center until the time
          you leave
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <img
              src="https://templates.bwlthemes.com/blood_donation/v_2/images/process_1.jpg"
              alt="Registration"
              className="w-full h-48 object-cover mb-4 rounded hover:scale-105 transition-transform duration-300"
            />
            <div className="bg-red-500 text-white text-3xl font-bold w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
              1
            </div>
            <h2 className="text-xl font-semibold mb-2">REGISTRATION</h2>
            <p className="text-gray-600">
              You need to complete a very simple registration form. Which
              contains all the required contact information to enter the
              donation process.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <img
              src="https://templates.bwlthemes.com/blood_donation/v_2/images/process_2.jpg"
              alt="Screening"
              className="w-full h-48 object-cover mb-4 rounded hover:scale-105 transition-transform duration-300"
            />
            <div className="bg-red-500 text-white text-3xl font-bold w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
              2
            </div>
            <h2 className="text-xl font-semibold mb-2">SCREENING</h2>
            <p className="text-gray-600">
              A drop of blood from your finger will take for simple test to
              ensure that your blood iron levels are proper enough for donation
              process.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <img
              src="https://templates.bwlthemes.com/blood_donation/v_2/images/process_3.jpg"
              alt="Donation"
              className="w-full h-48 object-cover mb-4 rounded hover:scale-105 transition-transform duration-300"
            />
            <div className="bg-red-500 text-white text-3xl font-bold w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4">
              3
            </div>
            <h2 className="text-xl font-semibold mb-2">DONATION</h2>
            <p className="text-gray-600">
              After ensuring and passed screening test successfully you will be
              directed to a donor bed for donation. It will take only 6-10
              minutes.
            </p>
          </div>
        </div>
      </div>
    );
};

export default DonationProcess;