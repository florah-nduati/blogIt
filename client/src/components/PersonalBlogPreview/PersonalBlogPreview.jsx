import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import './PersonalBlogPreview.css';
import apiBase from '../../pages/utils/api';
import usePersonalBlogsStore from '../../store/personalBlogsStore';

function PersonalBlogPreview({ id, title, excerpt }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const blogs = usePersonalBlogsStore((state) => state.blogs);
    const setBlogs = usePersonalBlogsStore((state) => state.setBlogs);

    const { isLoading, mutate } = useMutation({
        mutationKey: ["deletedBlog"],
        mutationFn: async (id) => {
            const response = await fetch(`${apiBase}/blogs/${id}`, {
                method: "DELETE",
                credentials: "include"
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }
            const data = await response.json();
            return data;
        },
        onSuccess: () => {
            
            setBlogs(blogs.filter((blog) => blog.id !== id));
            
            setSuccessMessage("Blog deleted successfully");
            queryClient.invalidateQueries("personalBlogs");

            setTimeout(() => setSuccessMessage(''), 2000);
        },
        onError: (error) => {
            setErrorMessage(error.message);
            setTimeout(() => setErrorMessage(''), 3000);
        },
        enabled: false
    });

    function handleEditingRedirect() {
        if (!id) return;
        navigate(`/edit/${id}`);
    }

    function handleDelete() {
        mutate(blogId);  
    }

    return (
        <div className="blog-preview">
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="blog-header">
                <h2 className="blog-title">{title}</h2>
            </div>
            <p className="blog-excerpt">{excerpt}</p>
            <div className="blog-actions">
                <button className="update-button" onClick={handleEditingRedirect}>
                    <span>Update</span>
                </button>
                <button className="delete-button" disabled={isLoading} onClick={handleDelete}>
                    <span>{isLoading ? "Please wait..." : "Delete"}</span>
                </button>
            </div>
        </div>
    );
}

export default PersonalBlogPreview;


