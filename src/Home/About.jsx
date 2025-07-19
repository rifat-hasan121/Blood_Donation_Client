import React, { useEffect } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet-async";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <Helmet>
        <title>About | Blood Donation </title>
      </Helmet>
      <section className="py-12 px-6 mt-14 bg-red-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-red-700 dark:text-red-400 border-b-4 border-red-500 inline-block pb-2">
            About Blood Donation
          </h2>
          <p className="mt-6 text-lg text-gray-700 dark:text-gray-300">
            Blood donation is a selfless act that saves millions of lives every
            year. By donating blood, you can help patients suffering from severe
            injuries, surgeries, anemia, cancer, and other medical conditions.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Saves Lives",
              text: "A single donation can save up to three lives, making an enormous impact on those in need.",
            },
            {
              title: "Helps Hospitals & Patients",
              text: "Blood donations ensure hospitals have a steady supply for emergency surgeries, accidents, and critical illnesses.",
            },
            {
              title: "Boosts Your Health",
              text: "Donating blood can improve heart health, balance iron levels, and stimulate new blood cell production.",
            },
            {
              title: "A Simple, Safe Process",
              text: "The donation process is quick, safe, and conducted by trained professionals, ensuring donor and recipient safety.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-all duration-300"
              data-aos="zoom-in"
              data-aos-delay={index * 200}
            >
              <h3 className="text-xl border-b p-4 font-semibold text-red-700 dark:text-red-400">
                {item.title}
              </h3>
              <p className="mt-3 p-4 bg-red-300 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center" data-aos="fade-up">
          <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">
            Be a Hero. Save a Life.
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
            Join us in making a difference. Find a donation center near you and
            help save lives today.
          </p>
          <Link to="/signUp">
            <button
              aria-label="Join as a donor"
              className="px-2 sm:px-4 py-2 sm:py-2 mt-4 bg-red-500 hover:bg-red-700 text-white text-lg rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              data-aos="flip-up"
              data-aos-delay="200"
            >
              Join as a Donor
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default About;
