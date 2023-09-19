import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost, removePost, updatePost, editPost } from '../redux/actions/postActions';
import './BlogApp.scss';
import Posts from './Posts';
import Drafts from './Drafts';

const BlogApp = ({ posts, addPost, removePost, updatePost, editPost }) => {
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

    // const handleUpdate = () => {
    //     if (validatePostFields()) {
    //         updatePost(editingPost.id, { ...newPost, isDraft: true });
    //         resetForm();
    //     }
    // };
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
            <h1 className="heading">Blog App</h1>
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
                        <button type="button" onClick={handleUpdate} className="edit-button">
                            Update Draft
                        </button>
                        <button type="button" onClick={handlePost} className="post-button">
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

            <div className="content-container">
                <div className="drafts-container">
                    <h2>Drafts</h2>
                    {/* <Drafts drafts={drafts} editDraft={handleEdit} removeDraft={removePost} /> */}
                </div>

                <div className="posts-container">
                    <h2>Posts</h2>
                    <Posts posts={posts} />
                </div>
            </div>

        </div>
    );
};

const mapStateToProps = (state) => ({
    posts: state.posts.posts.filter((post) => !post.isDraft),
    drafts: state.posts.posts.filter((post) => post.isDraft),
});

export default connect(mapStateToProps, { addPost, removePost, updatePost, editPost })(BlogApp);
