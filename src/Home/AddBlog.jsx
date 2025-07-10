// src/pages/Dashboard/AddBlog.jsx
import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const editor = useRef(null);

  // Handle thumbnail upload to ImgBB
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
        setUploading(true);

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          {
            method: "POST",
            body: formData,
          }
        );
        

      const data = await response.json();
      if (data.success) {
        setThumbnailUrl(data.data.url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Image upload error.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !thumbnailUrl || !content) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const blogData = {
        title,
        thumbnail: thumbnailUrl,
        content,
        status: "draft",
        createdAt: new Date(),
      };

      await axiosSecure.post("/blogs", blogData);
      toast.success("Blog created successfully!");
      navigate("/dashboard/content-management");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create blog.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2">Thumbnail Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />
          {uploading && <p className="text-blue-600">Uploading image...</p>}
          {thumbnailUrl && (
            <img
              src={thumbnailUrl}
              alt="Thumbnail"
              className="mt-2 w-32 h-20 object-cover rounded"
            />
          )}
        </div>

        <div>
          <label className="block mb-2">Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
