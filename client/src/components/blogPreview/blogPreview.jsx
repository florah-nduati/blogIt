import React from "react";
import { Link } from "react-router-dom";
import "./blogPreview.css";

function BlogPreview({ title, authorName, featuredImage, excerpt, visibility, id }) {
  return (
    <div className="blog-preview">
    
      {featuredImage && (
        <img src={featuredImage} alt={title} className="blog-preview-image" />
      )}

    
      <div className="blog-preview-content">
        <h3 className="blog-preview-title">{title}</h3>
        <p className="blog-preview-author">By {authorName}</p>

       
        <p className="blog-preview-excerpt">{excerpt}</p>
        <p className="blog-preview-visibility">{visibility === "public" ? "Public" : "Private"}</p>

       
        <Link to={`/blog/${id}`} className="read-more-link">
          Read More
        </Link>
      </div>
    </div>
  );
}

export default BlogPreview;
