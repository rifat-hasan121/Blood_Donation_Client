import React from 'react';
import Banner from './Banner';
import Blogs from './Blogs';
import DonateBlood from './DonateBlood';
import BloodDonateRequests from './BloodDonateRequests';
import WhyDonate from './WhyDonate';
import { Helmet } from 'react-helmet-async';
import DonationProcess from '../component/DonationProcess';
import CampaignGallery from '../component/CampaignGallery';
import JoinSaveLife from '../component/JoinSaveLife';
import OurSponsors from '../component/OurSponsors';
import RecentBlog from '../component/RecentBlog';

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
          {/* blood donation process */}
          <section className="bg-white dark:bg-gray-500">
           <DonationProcess/>
          </section>
          {/* campaign gallery */}
          <section className='bg-red-300 dark:bg-gray-500'>
            <CampaignGallery/>
          </section>
          {/* join save life */}
          <section className='bg-red-100 dark:bg-gray-600'>
            <JoinSaveLife/>
          </section>
          {/* requested donation */}
          <section className="bg-red-100 dark:bg-gray-600">
            <div>
              <h3 className="text-4xl text-red-500 dark:text-red-800 md:text-3xl font-bold text-center py-24">
                Urgent Blood Donation Requests
              </h3>
            </div>
            <BloodDonateRequests />
          </section>
          {/* our sponsor */}
          <section >
            <OurSponsors/>
          </section>
          {/* recent blogs */}
          <section className='bg-red-300 dark:bg-gray-600'>
            <RecentBlog/>
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