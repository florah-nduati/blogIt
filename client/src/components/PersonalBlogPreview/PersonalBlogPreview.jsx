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
        mutationKey: ['deletedBlog', id],
        mutationFn: async (blogId) => {
            try {
                console.log("Attempting to delete blog with ID:", blogId); // Log ID being deleted
                const response = await fetch(`${apiBase}/blogs/${blogId}`, {
                    method: 'DELETE',
                    credentials: 'include',
                });

                console.log("Full response:", response); // Log the full response for debugging

                if (!response.ok) {
                    // Handle non-OK responses more gracefully
                    const errorData = await response.json().catch(() => ({ message: "Failed to parse error response" }));
                    console.error("Delete error:", errorData);
                    throw new Error(errorData.message || "Unknown error occurred");
                }

                const data = await response.json();
                console.log("Deletion successful:", data);
                return data;

            } catch (error) {
                console.error("Fetch error during deletion:", error);
                throw error;
            }
        },
        onSuccess: () => {
            console.log("Deletion successful, removing blog from UI");
            setBlogs(blogs.filter((blog) => blog.id !== id)); // Remove the deleted blog from the state
            setSuccessMessage('Blog deleted successfully');
            queryClient.invalidateQueries('personalBlogs'); // Invalidate and refetch the blog list

            setTimeout(() => setSuccessMessage(''), 2000);
        },
        onError: (error) => {
            console.error("Error in delete mutation:", error.message); // Log full error details
            setErrorMessage(error.message || "Something went wrong during deletion");
            setTimeout(() => setErrorMessage(''), 3000);
        },
    });

    const handleEditingRedirect = () => {
        if (!id) return;
        navigate(`/edit/${id}`);
    };

    const handleDelete = () => {
        if (!id) {
            setErrorMessage('Blog ID is missing!');
            return;
        }

        console.log('Initiating delete for blog with ID:', id); // Log ID before deletion
        mutate(id); // Pass the ID to the mutation function
    };

    return (
        <div className="blogs">
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
                <button
                    className="delete-button"
                    disabled={isLoading}
                    onClick={handleDelete}
                >
                    <span>{isLoading ? 'Please wait...' : 'Delete'}</span>
                </button>
            </div>
        </div>
        </div>
    );
}

export default PersonalBlogPreview;









