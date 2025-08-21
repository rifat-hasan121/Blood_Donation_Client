import React from 'react';

const JoinSaveLife = () => {
    return (
      <div
        className="relative bg-gray-200  py-24 flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://templates.bwlthemes.com/blood_donation/v_2/images/testimony_feat_bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center text-red-500">
          <h1 className="text-4xl md:text-5xl font-bold mb-16 text-red-500">
            JOIN WITH US AND SAVE LIFE
          </h1>
          <div className="bg-white text-gray-800 flex gap-4 justify-center items-center p-6 rounded-lg shadow-lg max-w-2xl mx-auto">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-red-600">
                DONOR OPINION
              </h2>
              <p className="mb-2">
                I proudly donate blood on a regular basis because knowing I can
                make a difference to someone else's life makes me feel great.
                It’s a small act that brings immense joy, knowing I’m part of a
                life-saving chain. Seeing the impact firsthand inspires me to
                continue this meaningful contribution.
              </p>
              <p className="text-sm text-gray-600">- Brandon Munson</p>
              <p className="text-sm text-gray-600">CEO, BloodDonor USA</p>
            </div>
            <div>
              <img
                src="https://templates.bwlthemes.com/blood_donation/v_2/images/testimony_feat_img.jpg"
                alt="image"
              />
            </div>
          </div>
        </div>
      </div>
    );
};

export default JoinSaveLife;