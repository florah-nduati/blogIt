import React from 'react';
import './fullBlog.css';
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import apiBase from '../utils/api';

function FullBlog() {

  const { id } = useParams();
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["note"],
    queryFn: async () => {
      const response = await fetch(`${apiBase}/blogs/${id}`, { credentials: "include" });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const data = await response.json();
      console.log(data);
      return data;
    }
  });

  if (isLoading) {
    return <h2>Loading, please wait...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className='blog'>
    <div className="blog-post">
      <h1 className="blog-title">{data && data.title}</h1>
      <p>by {data && data.user.firstName} {data && data.user.lastName}</p>

      {data && data.featuredImage && (
        <img src={data.featuredImage} alt={data.title} className="blog-featured-image" />
      )}

      <p className="blog-excerpt">{data && data.excerpt}</p>
      <p className="blog-body">{data && data.body}</p>
      
      <div className="blog-meta">
        <span className="blog-created">Created: {new Date(data && data.createdAt).toLocaleDateString()}</span>
        <span className="blog-updated">Updated: {new Date(data && data.updatedAt).toLocaleDateString()}</span>
      </div>
    </div>
    </div>
  );
}

export default FullBlog;
