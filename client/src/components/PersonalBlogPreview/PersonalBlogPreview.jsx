import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PersonalBlogPreview.css';

function PersonalBlogPreview({ id, title, excerpt }) {
    const navigate = useNavigate();

    function handleEditingRedirect() {
        if (!id) return;
        navigate(`/edit/${id}`);
    }

    return (
        <div className="blog-preview">
            <div className="blog-header">
                <h2 className="blog-title">{title}</h2>
            </div>
            <p className="blog-excerpt">{excerpt}</p>
            <div className="blog-actions">
                <button className="update-button" onClick={handleEditingRedirect}>
                    <span>Update</span>
                </button>
                <button className="delete-button" onClick={handleEditingRedirect}>
                    <span>Delete</span>
                </button>
            </div>
        </div>
    );
}

export default PersonalBlogPreview;
