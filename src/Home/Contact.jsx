import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendEmail = () => {
    const { name, email, message } = formData;
    const mailtoLink = `mailto:your-email@example.com?subject=New Message from ${name}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;
    window.location.href = mailtoLink;
  };

  return (
    <>
      <Helmet>
        <title>Contact | Blood Donation </title>
      </Helmet>
      <div className="py-24 md:py-48">
        <div className="max-w-lg  mx-auto p-8 rounded-lg shadow-lg border border-red-400 bg-red-100 dark:bg-gray-900 dark:border-gray-700">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-center text-red-700 dark:text-red-400 mb-6">
              Get in Touch
            </h2>

            {/* Form */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="p-3 border border-red-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 w-full"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="p-3 border border-red-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 w-full"
                value={formData.email}
                onChange={handleChange}
              />
              <textarea
                name="message"
                rows="5"
                placeholder="Your Message"
                required
                className="p-3 border border-red-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-red-500 w-full"
                value={formData.message}
                onChange={handleChange}
              />

              {/* Send Button */}
              <button
                onClick={handleSendEmail}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-md transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
