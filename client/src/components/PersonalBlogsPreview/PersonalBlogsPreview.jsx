import React from 'react';
import { useQuery } from 'react-query';
import PersonalBlogPreview from '../PersonalBlogPreview/PersonalBlogPreview';
import { Link } from 'react-router-dom';
import apiBase from '../../pages/utils/api';
import usePersonalBlogsStore from '../../store/personalBlogsStore';
import './PersonalBlogsPreview.css';

function PersonalBlogsPreview() {
    const blogs = usePersonalBlogsStore((state) => state.blogs);
    const setBlogs = usePersonalBlogsStore(state => state.setBlogs);

    const { isLoading, isError, error } = useQuery({
        queryKey: ["personalBlogs"],
        queryFn: async () => {
            const response = await fetch(`${apiBase}/blogs/user`, { credentials: "include" });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            const data = await response.json();
            return data;
        },
        onSuccess: (data) => {
            setBlogs(data);   
        }
    });

    if (isLoading) {
        return (
            <h2 className="loading">Loading...</h2>
        );
    }

    if (isError) {
        return (
            <h2 className="error">{error.message}</h2>
        );
    }

    if (blogs.length <= 0) {
        return (
            <div className="no-blogs">
                <h3>You don't have any blogs</h3>
                <Link to="/write" className="create-link">Create one</Link>
            </div>
        );
    }

    return (
        <React.Fragment>
            <h2 className="header">Your Personal Blogs</h2>
            <div className="blogs-container">
                {blogs.map((blog, i) => (
                    <PersonalBlogPreview 
                        key={i} 
                        id={blog.id} // Use blog.id here
                        title={blog.title} 
                        excerpt={blog.excerpt} 
                        className="blog-preview" 
                    />
                ))}
            </div>    
        </React.Fragment>
    );
}

export default PersonalBlogsPreview;

  