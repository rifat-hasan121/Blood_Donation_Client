// src/pages/Dashboard/ContentManagement.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const ContentManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosSecure.get("/blogs");
        setBlogs(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch blogs.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [axiosSecure]);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(blogs.filter((blog) => blog.status === statusFilter));
    }
  }, [blogs, statusFilter]);

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/blogs/${id}`);
      toast.success("Blog deleted.");
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete blog.");
    }
  };

  const togglePublish = async (blog) => {
    try {
      const newStatus = blog.status === "draft" ? "published" : "draft";
      await axiosSecure.put(`/blogs/${blog._id}`, { status: newStatus });

      toast.success(
        `Blog ${newStatus === "published" ? "published" : "unpublished"}.`
      );
      setBlogs((prev) =>
        prev.map((b) => (b._id === blog._id ? { ...b, status: newStatus } : b))
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status.");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <Link
          to="/dashboard/content-management/add-blog"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Blog
        </Link>
      </div>

      {/* Filter dropdown */}
      <div className="mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded bg-gray-200"
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Blogs list (card format) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="border rounded p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
              <p
                className="text-gray-700 text-sm mb-4 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
              <p className="text-sm mb-2">
                <span
                  className={`px-2 py-1 rounded ${
                    blog.status === "published"
                      ? "bg-green-500 text-white"
                      : "bg-yellow-500 text-white"
                  }`}
                >
                  {blog.status}
                </span>
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => togglePublish(blog)}
                  className={`px-3 py-1 rounded text-white ${
                    blog.status === "draft"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-yellow-600 hover:bg-yellow-700"
                  }`}
                >
                  {blog.status === "draft" ? "Publish" : "Unpublish"}
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default ContentManagement;
