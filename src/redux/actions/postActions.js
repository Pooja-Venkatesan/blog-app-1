import { UPDATE_POST, ADD_POST, REMOVE_POST, EDIT_POST } from './actionTypes';

// Define your action creators
export const addPost = (post) => ({
    type: ADD_POST,
    payload: post,
});

export const removePost = (postId) => ({
    type: REMOVE_POST,
    payload: postId,
});

export const updatePost = (postId, updatedPost) => ({
    type: UPDATE_POST,
    payload: { postId, updatedPost },
});
export const editPost = (postId) => ({ // Define the editPost action
    type: EDIT_POST,
    payload: postId,
});
