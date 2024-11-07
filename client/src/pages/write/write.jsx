import { useState } from "react";
import { useMutation } from "react-query";
import {  useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import apiBase from "../utils/api";
import useUserStore from "../store/userStore";
import "./Write.css";

const Write = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [visibility, setVisibility] = useState(""); 
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const titleCharLimit = 100;
  const excerptCharLimit = 500;

  const { mutate, isLoading } = useMutation({
    mutationFn: async (blog) => {
      
        const response = await fetch(`${apiBase}/blogs`, {
          method: "POST",
          body: JSON.stringify(blog),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }

        const data = await response.json();
        return data;
      
    },
    onSuccess: (data) =>{
      setUser(data);
      setError("published the blog successfully");
      setTimeout(() => navigate(`/blog/${data.id}`), 1000);
    },

    onError: () => setError("failed to publish the blog, please try again."),
    
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !excerpt || !body || !featuredImage || (visibility !== "private" && visibility !== "public")) {
      setError("Please fill in all required fields with valid values.");
      return;
    }

    const blog = {
      title,
      excerpt,
      body,
      featuredImage,
      visibility,
    };

    mutate(blog);
  };

  return (
    <div className="write-page">
      <h2>Create a New Blog Post</h2>
      <form onSubmit={handleSubmit} className="write-form">
        {error && <p className="error-message">{error}</p>}

        <label>Featured Image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} required />

        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your title here"
          maxLength={titleCharLimit}
          required
        />
        <small>{title.length}/{titleCharLimit} characters</small>

        <label>Excerpt:</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Enter excerpt here..."
          maxLength={excerptCharLimit}
          required
        />
        <small>{excerpt.length}/{excerptCharLimit} characters</small>

        <label>Visibility:</label>
        <select value={visibility} onChange={(e) => setVisibility(e.target.value)} required>
          <option value="">Choose a visibility</option>
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>

        <label>Body:</label>
        <ReactQuill
        value={body}
        onChange={setBody}
        placeholder="Write your content here..."
        modules={{
          toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
          ],
        }}
      />

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? "Please wait..." : "Publish"}
        </button>
      </form>
    </div>
  );
};

export default Write;





