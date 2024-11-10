import { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import apiBase from "../utils/api";
import useUserStore from "../store/userStore";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [visibility, setVisibility] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null); // File to upload
  const [imageUrl, setImageUrl] = useState(""); // Uploaded image URL
  const [error, setError] = useState("");
  const setUser = useUserStore((state) => state.setUser);
  const titleCharLimit = 100;
  const excerptCharLimit = 500;

  const { blogId } = useParams();
  const navigate = useNavigate();

  // Fetch the existing blog data
  const { isLoading, isError, error: queryError } = useQuery({
    queryKey: ["updateBlog"],
    queryFn: async () => {
      const response = await fetch(`${apiBase}/blogs/${blogId}`, {
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      setTitle(data.title);
      setExcerpt(data.excerpt);
      setBody(data.body);
      setVisibility(data.visibility);
      setImageUrl(data.featuredImage); // Load existing image URL
      return data;
    },
  });

  // Mutation to update blog
  const { mutate, isLoading: updateIsLoading } = useMutation({
    mutationFn: async (updatedBlog) => {
      const response = await fetch(`${apiBase}/blogs/${blogId}`, {
        method: "PUT",
        body: JSON.stringify(updatedBlog),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      return response.json();
    },
    onSuccess: () => {
      navigate(`/blog/${blogId}`);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  // Image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "v5fhffpd");
    formData.append("cloud_name", "dbxiinf5v");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dbxiinf5v/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setImageUrl(data.secure_url);
    } catch (error) {
      setError("Error uploading image");
      console.error("Error uploading image:", error);
    }
  };

  const handleSubmitBlogs = (e) => {
    e.preventDefault();
    if (!title || !excerpt || !body || (visibility !== "private" && visibility !== "public")) {
      setError("Please fill in all required fields with valid values.");
      return;
    }

    const blogs = {
      title,
      excerpt,
      body,
      visibility,
      featuredImage: imageUrl, // Use Cloudinary image URL
    };

    mutate(blogs);
  };

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>{queryError.message}</h2>;

  return (
    <div className="write-page">
      <h2>Update Blog</h2>
      <form onSubmit={handleSubmitBlogs} className="write-form">
        {error && <p className="error-message">{error}</p>}

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
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your content here..."
          required
        />

        <label>Featured Image:</label>
        <input type="file" onChange={handleImageUpload} />
        {imageUrl && <img src={imageUrl} alt="Selected" width="100" />}

        <button type="submit" className="submit-btn" disabled={updateIsLoading}>
          {updateIsLoading ? "Please wait..." : "Publish"}
        </button>
      </form>
    </div>
  );
};

export default Edit;


