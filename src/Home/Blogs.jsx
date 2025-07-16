import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { PiTimer } from "react-icons/pi";
import { axiosSecure } from "../Hooks/useAxiosSecure";

// HTML থেকে pure text বের করার helper
const extractText = (htmlString) => {
  const div = document.createElement("div");
  div.innerHTML = htmlString;
  return div.textContent || div.innerText || "";
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosSecure.get("/blogs");
        const publishedBlogs = res.data.filter(
          (blog) => blog.status === "published"
        );
        setBlogs(publishedBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const searchText = searchQuery.toLowerCase();
    return (
      blog.title?.toLowerCase().includes(searchText) ||
      extractText(blog.content)?.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="max-w-7xl mx-auto py-24">
      <div className="flex flex-col justify-center items-center text-center">
        <h3 className="text-xl my-6 md:text-5xl font-bold text-red-500">
          Blood Donation Blogs
        </h3>
        <p className="text-gray-400 text-lg">
          Discover inspiring stories, latest news, and valuable information
          about blood donation
        </p>

        {/* Search bar */}
        <div className="max-w-5xl my-6">
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Blogs cards */}
        {loading ? (
          <p>Loading blogs...</p>
        ) : filteredBlogs.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-6 my-6 flex-wrap justify-center">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="w-[384px] h-auto mx-auto bg-gray-200 dark:bg-gray-700 dark:text-white text-black rounded-2xl shadow-lg pb-12 overflow-hidden transition hover:shadow-xl hover:text-red-500"
              >
                <img
                  src={blog.thumbnail || "/placeholder.jpg"}
                  alt={blog.title}
                  className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                />
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span className="text-red-500 font-semibold uppercase">
                      {blog.category || "General"}
                    </span>
                    <span className="flex items-center gap-1">
                      <PiTimer />4 min read
                    </span>
                  </div>
                  <h2 className="text-lg mt-4 font-semibold leading-tight">
                    {blog.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
                    {extractText(blog.content)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No blogs found for your search.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;
