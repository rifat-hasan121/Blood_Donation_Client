import React from 'react';
import Banner from './Banner';
import Blogs from './Blogs';

const Home = () => {
    return (
        <div className='w-full'>
            {/* banner section */}
        <section className='w-full'>
          <Banner />
            </section>
            {/* blogs section */}
            <section className='bg-gray-200'>
                <Blogs/>
            </section>
      </div>
    );
};

export default Home;