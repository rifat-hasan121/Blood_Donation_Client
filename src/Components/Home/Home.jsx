import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet-async";

const Home = () => {
    useEffect(() => {
      AOS.init({
        duration: 1000,
        once: false,
      });
    }, []);
    return (
      <div className="bg bg-gray-100">
        <Helmet>
          <title>BloodDonate | Donate your blood</title>
            </Helmet>
            <section className='container'>
                <div className='w-full'>
                    
                </div>
            </section>
      </div>
    );
};

export default Home;