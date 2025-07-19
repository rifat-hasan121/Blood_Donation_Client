import React from 'react';
import Banner from './Banner';
import Blogs from './Blogs';
import DonateBlood from './DonateBlood';
import BloodDonateRequests from './BloodDonateRequests';
import WhyDonate from './WhyDonate';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
      <>
        <Helmet>
          <title>Home | Blood Donation </title>
       </Helmet>
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
          <section className="bg-red-300 dark:bg-gray-500">
            <DonateBlood />
          </section>
          {/* requested donation */}
          <section className="bg-red-100 dark:bg-gray-600">
            <div>
              <h3 className="text-4xl text-red-500 dark:text-red-800 md:text-3xl font-bold text-center py-12">
                Urgent Blood Donation Requests
              </h3>
            </div>
            <BloodDonateRequests />
          </section>
          {/* why donate */}
          <section>
            <div>
              <WhyDonate />
            </div>
          </section>
        </div>
      </>
    );
};

export default Home;