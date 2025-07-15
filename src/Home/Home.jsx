import React from 'react';
import Banner from './Banner';
import Blogs from './Blogs';
import DonateBlood from './DonateBlood';
import BloodDonateRequests from './BloodDonateRequests';
import WhyDonate from './WhyDonate';

const Home = () => {
    return (
      <div className="w-full">
        {/* banner section */}
        <section className="w-full">
          <Banner />
        </section>
        {/* blogs section */}
        <section className="bg-gray-200 dark:bg-gray-400">
          <Blogs />
        </section>
        {/* donate section */}
        <section className="bg-red-200 dark:bg-gray-400">
          <DonateBlood />
        </section>
        {/* requested donation */}
        <section className="bg-red-100">
          <div>
            <h3 className='text-xl md:text-3xl font-bold text-center py-12'>Urgent Blood Donation Requests</h3>
          </div>
          <BloodDonateRequests />
        </section>
        {/* why donate */}
        <section>
          <div>
            <WhyDonate/>
          </div>
        </section>
      </div>
    );
};

export default Home;