import React, { useEffect } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaHeart,
  FaHospital,
  FaHeartbeat,
  FaHandsHelping,
} from "react-icons/fa";
import { FaHandHoldingHeart } from "react-icons/fa";
import HeroDonateCard from "./HeroDonateCard";

const WhyDonate = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const benefits = [
    {
      title: "Saves Lives",
      text: "A single donation can save up to three lives, making an enormous impact on those in need.",
      icon: <FaHeart className="text-red-600 text-4xl" />,
    },
    {
      title: "Helps Hospitals & Patients",
      text: "Blood donations ensure hospitals have a steady supply for emergency surgeries, accidents, and critical illnesses.",
      icon: <FaHospital className="text-red-600 text-4xl" />,
    },
    {
      title: "Boosts Your Health",
      text: "Donating blood can improve heart health, balance iron levels, and stimulate new blood cell production.",
      icon: <FaHeartbeat className="text-red-600 text-4xl" />,
    },
    {
      title: "A Simple, Safe Process",
      text: "The donation process is quick, safe, and conducted by trained professionals, ensuring donor and recipient safety.",
      icon: <FaHandsHelping className="text-red-600 text-4xl" />,
    },
  ];

  return (
    <section className=" py-24 px-6 bg-red-50 dark:bg-gray-400">
      {/* Header */}
      <div
        className="max-w-4xl mx-auto flex flex-col justify-center items-center text-center"
        data-aos="fade-up"
      >
        <h2 className="text-4xl font-bold text-red-700 dark:text-red-800 border-b-4 border-red-500 inline-block pb-2">
          About Blood Donation
        </h2>
        <p className="mt-6 text-lg text-gray-700">
          Blood donation is a selfless act that saves millions of lives every
          year. By donating blood, you can help patients suffering from severe
          injuries, surgeries, anemia, cancer, and other medical conditions.
        </p>

        <Link to="/payment">
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-red-500 dark:bg-red-800 hover:bg-red-600 text-white rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 border-none my-6">
            <FaHandHoldingHeart className="text-xl animate-pulse" />
            Donate Now
          </button>
        </Link>
      </div>

      {/* Benefits */}
      <div className="mt-12 max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {benefits.map((item, index) => (
          <div
            key={index}
            data-aos="zoom-in"
            data-aos-delay={index * 200}
            className="relative rounded-lg shadow-md p-6 text-center group transition-all duration-300 z-10 bg-white dark:bg-gray-300"
          >
            {/* Hover Border */}
            <div className="absolute inset-0 rounded-lg border-2 border-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-0"></div>

            {/* Icon */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white p-3 rounded-full shadow-md z-20">
              {item.icon}
            </div>

            {/* Title */}
            <h3 className="mt-8 text-xl font-bold text-red-700 z-10 relative">
              {item.title}
            </h3>

            {/* Text */}
            <p className="mt-4 text-gray-600 text-sm z-10 relative">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center" data-aos="fade-up">
        <HeroDonateCard />
      </div>
    </section>
  );
};

export default WhyDonate;
