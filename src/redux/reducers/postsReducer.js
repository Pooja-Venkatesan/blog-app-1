// src/redux/reducers/postReducer.js

const initialState = {
    posts: [], // Your initial state here
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_POST':
            // Add logic to add a new post to the state
            return {
                ...state,
                posts: [...state.posts, action.payload],
            };
        case 'REMOVE_POST':
            // Add logic to remove a post from the state
            return {
                ...state,
                posts: state.posts.filter((post) => post.id !== action.payload),
            };
        case 'UPDATE_POST':
            // Add logic to update a post in the state
            const updatedPosts = state.posts.map((post) => {
                if (post.id === action.payload.id) {
                    return {
                        ...post,
                        ...action.payload.updatedPost,
                    };
                }
                return post;
            });
            return {
                ...state,
                posts: updatedPosts,
            };
        default:
            return state;
    }
};

export default postReducer;
