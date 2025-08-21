import React from 'react';

const RecentBlog = () => {
    return (
      <div className="container mx-auto p-4 py-24">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-red-500 mb-2">
            RECENT BLOG
          </h1>
          <div className="flex justify-center items-center mb-4">
          </div>
          <p className="text-gray-600 mb-6">
            Latest news and statements regarding giving blood, blood processing
            and supply.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <img
                src="https://wp.bwlthemes.com/wp_reddrop_buddies/wp-content/uploads/2014/11/blog_1-1-645x430.jpg"
                alt="Blood Connects Us All in a Soul"
                className="w-full h-48 object-cover rounded mb-2"
              />
              <p className="text-red-600 text-sm mb-1">
                © 15, November 2014 ◎ 0 Comments
              </p>
              <h2 className="text-xl font-semibold mb-2">
                BLOOD CONNECTS US ALL IN A SOUL
              </h2>
              <p className="text-gray-600">
                Blood is the most precious gift that anyone can give to another
                person. Donating blood not only saves the life also donors.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <img
                src="https://wp.bwlthemes.com/wp_reddrop_buddies/wp-content/uploads/2014/11/blog_3-645x430.jpg"
                alt="Why Should I Donate Blood ?"
                className="w-full h-48 object-cover rounded mb-2"
              />
              <p className="text-red-600 text-sm mb-1">
                © 15, November 2014 ◎ 0 Comments
              </p>
              <h2 className="text-xl font-semibold mb-2">
                WHY SHOULD I DONATE BLOOD ?
              </h2>
              <p className="text-gray-600">
                Blood is the most precious gift that anyone can give to another
                person. Donating blood not only saves the life also donors.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <img
                src="https://wp.bwlthemes.com/wp_reddrop_buddies/wp-content/uploads/2014/11/blog_2-1-645x430.jpg"
                alt="Give Blood and Save Three Lives"
                className="w-full h-48 object-cover rounded mb-2"
              />
              <p className="text-red-600 text-sm mb-1">
                © 21, February 2017 ◎ 0 Comments
              </p>
              <h2 className="text-xl font-semibold mb-2">
                GIVE BLOOD AND SAVE THREE LIVES
              </h2>
              <p className="text-gray-600">
                Blood is the most precious gift that anyone can give to another
                person. Donating blood not only saves the life also donors.
              </p>
            </div>
          </div>
          {/* <button className="mt-6 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-300">
            LOAD MORE BLOG
          </button> */}
        </div>
      </div>
    );
};

export default RecentBlog;