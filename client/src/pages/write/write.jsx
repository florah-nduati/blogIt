import { useState, useEffect}from "react";
import {useParams, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import apiBase from "../utils/api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; 
import axios from "axios";
import "./Write.css";

const WritePage = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  
  const titleCharLimit = 100;
  const excerptCharLimit = 250;

 
  const handleImageUpload = (e) => {
    setFeaturedImage(e.target.files[0]);
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !excerpt || !body || !featuredImage) {
      setError("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("body", body);
    formData.append("featuredImage", featuredImage);

    try {
      const response = await axios.post("http://localhost:3000/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        navigate(`/blogs/${response.data.id}`); // Redirect to post detail page
      }
    } catch (err) {
      console.error(err);
      setError("Failed to publish the blog. Please try again.");
    }
  };

  return (
    <div className="write-page">
      <h2>Create a New Blog Post</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="write-form">
        {error && <p className="error-message">{error}</p>}

        {/* Featured Image Upload */}
        <label>Featured Image (required):</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} required />

        {/* Title Input */}
        <label>Title (required):</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your title here"
          maxLength={titleCharLimit}
          required
        />
        <small>{title.length}/{titleCharLimit} characters</small>

        {/* Excerpt Input */}
        <label>Excerpt (required):</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Enter excerpt here..."
          maxLength={excerptCharLimit}
          required
        />
        <small>{excerpt.length}/{excerptCharLimit} characters</small>

        {/* Body Input with Rich Text Editor */}
        <label>Body (required):</label>
        <ReactQuill
          theme="snow"
          value={body}
          onChange={setBody}
          placeholder="Write your content here..."
        />

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Publish</button>
      </form>
    </div>
  );
};

export default WritePage;
