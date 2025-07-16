// src/pages/Dashboard/AddBlog.jsx
import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { imageUpload } from "../Api/utlis";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const editor = useRef(null);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams(); // if id exists → edit mode

  // Load blog data if in edit mode
  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        try {
          const res = await axiosSecure.get(`/blogs`);
          const blog = res.data.find((b) => b._id === id);
          if (blog) {
            setTitle(blog.title);
            setThumbnailUrl(blog.thumbnail);
            setContent(blog.content);
            setIsEditMode(true);
          } else {
            toast.error("Blog not found");
            navigate("/dashboard/content-management");
          }
        } catch (err) {
          console.error(err);
          toast.error("Failed to load blog");
        }
      }
    };
    fetchBlog();
  }, [id, axiosSecure, navigate]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const uploadedImageUrl = await imageUpload(file);
      if (uploadedImageUrl) {
        setThumbnailUrl(uploadedImageUrl);
        toast.success("Image uploaded");
      } else {
        toast.error("Upload failed");
      }
    } catch (error) {
      toast.error("Upload error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !thumbnailUrl || !content) {
      toast.error("All fields are required");
      return;
    }

    const blogData = {
      title,
      thumbnail: thumbnailUrl,
      content,
      status: "draft",
      createdAt: new Date(),
    };

    try {
      if (isEditMode) {
        await axiosSecure.put(`/blogs/${id}`, {
          ...blogData,
          status: "draft", // optional: always reset status
        });
        toast.success("Blog updated successfully!");
      } else {
        await axiosSecure.post("/blogs", blogData);
        toast.success("Blog created as draft!");
      }

      navigate("/dashboard/content-management");
    } catch (error) {
      console.error(error);
      toast.error("Submission failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        {isEditMode ? "Edit Blog" : "Add Blog"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          {uploading && <p className="text-blue-600">Uploading...</p>}
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
          {isEditMode ? "Update Blog" : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
