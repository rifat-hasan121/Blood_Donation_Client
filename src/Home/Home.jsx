import React from 'react';
import Banner from './Banner';
import Blogs from './Blogs';
import DonateBlood from './DonateBlood';

const Home = () => {
    return (
        <div className='w-full'>
            {/* banner section */}
        <section className='w-full'>
          <Banner />
            </section>
            {/* blogs section */}
            <section className='bg-gray-200 dark:bg-gray-400'>
                <Blogs/>
            </section>
            {/* donate section */}
            <section className='bg-red-200 dark:bg-gray-400'>
                <DonateBlood/>
            </section>
      </div>
    );
};

export default Home;