import { useState } from "react";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import apiBase from "../utils/api";
import useUserStore from "../store/userStore";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [visibility, setVisibility] = useState(""); 
  const [error, setError] = useState("");  // Add error state
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const titleCharLimit = 100;
  const excerptCharLimit = 500;
 
  const { blogId } = useParams();

  const { isLoading, isError, error: queryError, data } = useQuery({
    queryKey: ["updateBlog" ],
    queryFn: async () => {
      const response = await fetch(`${apiBase}/blogs/${blogId}`, {
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      // Set data to form fields when the request is successful
      setTitle(data.title);
      setExcerpt(data.excerpt);
      setBody(data.body);
      setVisibility(data.visibility);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !excerpt || !body || (visibility !== "private" && visibility !== "public")) {
      setError("Please fill in all required fields with valid values.");
      return;
    }

    const blog = {
      title,
      excerpt,
      body,
      visibility,
    };

    // Submit the blog data here (e.g., make an API call to update the blog)
  };

  if (isLoading) return <h2>Loading...</h2>;  // Handle loading state
  if (isError) return <h2>{queryError.message}</h2>;  // Handle error state

  return (
    <div className="write-page">
      <h2>Update Blog</h2>
      <form onSubmit={handleSubmit} className="write-form">
        {error && <p className="error-message">{error}</p>}  {/* Show form validation errors */}

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
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
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

export default Edit;
