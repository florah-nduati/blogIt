import React from 'react';
import { useQuery } from 'react-query';
import './library.css'
import BlogPreview from '../../components/blogPreview/blogPreview';
import blogs from '../../data/blogs';
import { Link } from "react-router-dom";
import apiBase from '../utils/api';

function Library() {
     const { isLoading, isError, error, data} = useQuery({
      queryKey: ["allBlogs"],
      queryFn: async () =>{
        const response = await fetch(`${apiBase}/Blogs`, {credentials: "include"});
        if (response.ok === false){
          const error = await response.json();
          throw new Error(error.message);
        }
        const data = await response.json();
        return data;
      }
    })

    if (isLoading) {
      return(
        <h2 className="loading-text">Loading...</h2>
      )
    } 
    if (isError) {
      return(
        <h2 className="error-text">{error.message}</h2>
      )
    }

    return (
      <div className="library">
      <div className="library-container">
        <h2>blogs</h2>
        <div className="library-content">
          {data && data.map((blog, i) => (
            <BlogPreview
              key={i}
              title={blog.title}
              authorName={`${blog.user.firstName} ${blog.user.lastName}`}
              featuredImage={blog.featuredImage}
              excerpt={blog.excerpt}
              body={blog.body}
              visibility={blog.visibility}
              id={blog.id}
            />
          ))}

          {blogs.map((blog, i) => (
            <BlogPreview
              key={i}
              title={blog.title}
              authorName={`${blog.user.firstName} ${blog.user.lastName}`}
              featuredImage={blog.featuredImage}
              excerpt={blog.excerpt}
              body={blog.body}
              visibility={blog.visibility}
              id={blog.id}
            />
          ))}
        </div>
      </div>
      </div>
    );
}

export default Library;
