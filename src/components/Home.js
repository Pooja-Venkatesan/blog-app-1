import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost, removePost, updatePost, editPost } from '../redux/actions/postActions';
import './BlogApp.scss';

const Home = ({ posts, addPost, removePost, updatePost, editPost }) => {

    const [newPost, setNewPost] = useState({
        id: '',
        title: '',
        author: '',
        date_published: '',
        content: '',
        imageUrl: '',
        isDraft: false,
    });

    const [editingPost, setEditingPost] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost({
            ...newPost,
            [name]: value,
        });
    };

    const handlePost = () => {
        if (validatePostFields()) {
            const id = Date.now().toString();
            const currentDate = new Date().toLocaleDateString();
            const post = {
                ...newPost,
                id,
                date_published: currentDate,
                isDraft: false,
            };
            addPost(post);
            resetForm();
        }
    };

    const handleSaveAsDraft = () => {
        if (validatePostFields()) {
            const id = Date.now().toString();
            const currentDate = new Date().toLocaleDateString();
            const draft = {
                ...newPost,
                id,
                date_published: currentDate,
                isDraft: true,
            };
            addPost(draft);
            resetForm();
        }
    };

    const validatePostFields = () => {
        return newPost.title && newPost.author && newPost.content;
    };

    const resetForm = () => {
        setNewPost({
            id: '',
            title: '',
            author: '',
            date_published: '',
            content: '',
            imageUrl: '',
            isDraft: false,
        });
        setEditingPost(null); // Clear editing state
    };

    const handleEdit = (post) => {
        setEditingPost(post); // Set the post to edit
        setNewPost({ ...post }); // Populate the form with the post's data
    };

    const handleUpdate = () => {
        if (validatePostFields()) {
            // Create a new draft post with the updated data
            const updatedDraft = {
                ...newPost,
                isDraft: true,
            };
            // Dispatch the updatePost action with the post ID and updated draft
            updatePost(editingPost.id, updatedDraft);
            setEditingPost(null); // Clear the editing state
            resetForm(); // Reset the form
        }
    };



    return (

        <div className="container">

            <form>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newPost.title}
                    onChange={handleInputChange}
                    className="input"
                />
                <input
                    type="text"
                    name="author"
                    placeholder="Author"
                    value={newPost.author}
                    onChange={handleInputChange}
                    className="input"
                />
                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={newPost.imageUrl}
                    onChange={handleInputChange}
                    className="input"
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    value={newPost.content}
                    onChange={handleInputChange}
                    className="textarea"
                />
                {editingPost ? (
                    <>
                        <button type="button" onClick={handleUpdate} className=" post-button edit-button remove-button">
                            Update Draft
                        </button>
                        <button type="button" onClick={handlePost} className="post-button edit-button remove-button">
                            Post
                        </button>
                    </>
                ) : (
                    <>
                        <button type="button" onClick={handlePost} className="post-button">
                            Post
                        </button>
                        <button type="button" onClick={handleSaveAsDraft} className="draft-button">
                            Save as Draft
                        </button>
                    </>
                )}
            </form>

            <ul className="post-list">
                {posts.map((post) => (
                    <li key={post.id} className="post">
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-info">
                            Author: {post.author} | Date Published: {post.date_published}
                        </p>
                        <img src={post.imageUrl} alt={post.title} className="post-image" />
                        <p className="post-content">{post.content}</p>
                        {post.isDraft && (
                            <>
                                <button onClick={() => handleEdit(post)} className="edit-button remove-button">
                                    Edit
                                </button>
                                <button onClick={() => removePost(post.id)} className="remove-button">
                                    Remove
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>

        </div>
    )
}


const mapStateToProps = (state) => ({
    posts: state.posts.posts,
});

export default connect(mapStateToProps, { addPost, removePost, updatePost, editPost })(Home);