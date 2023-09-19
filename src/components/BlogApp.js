import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './BlogApp.scss';
import Posts from './Posts';
import Drafts from './Drafts';
import Home from './Home';
const BlogApp = () => {


    return (
        <>

            <Router>

                {/* Navigation Links */}
                <nav>

                    <ul>
                        <li>
                            <h1>BlogOn</h1>
                        </li>
                        <li>
                            <Link to="/posts">Posts</Link>

                            <Link to="/drafts">Drafts</Link>
                        </li>
                    </ul>
                </nav>

                {/* Route Configuration */}
                <Routes>
                    <Route path="/posts"
                        element={<Posts />}>
                    </Route>
                    <Route path="/drafts"
                        element={<Drafts />}>
                    </Route>

                    {/* Default route or a landing page */}
                    <Route path="/" element={<Home />}></Route>
                </Routes>


            </Router>



        </>
    );
};

export default BlogApp;