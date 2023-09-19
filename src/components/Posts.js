import React from 'react';

const Posts = ({ posts }) => {
    return (
        <>

            <ul className="post-list">
                {posts.map((post) => (
                    <li key={post.id} className="post">
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-info">
                            Author: {post.author} | Date Published: {post.date_published}
                        </p>
                        <img src={post.imageUrl} alt={post.title} className="post-image" />
                        <p className="post-content">{post.content}</p>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Posts;
