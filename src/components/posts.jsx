import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PostsContext } from "../context";
import "../assets/scss/posts.scss";
export default function Posts() {
  const { state, dispatch } = useContext(PostsContext);
  const [postsData, setPostsData] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const view_posts_data = postsData.slice(0, postsPerPage);
  useEffect(() => {
    setPostsData(state.posts);
  }, []);

  const handleLoadMore = () => {
    setPostsPerPage((prevState) => {
      return prevState * 2;
    });
  };

  if (view_posts_data.length > 0) {
    return (
      <div className="posts-wrapper mt-5">
        <h2>All Posts</h2>
        <ul className="posts-lists">
          {view_posts_data.map((posts) => (
            <li key={posts.id}>
              <Link to={`post_details/${posts.id}`}>{posts.title}</Link>
            </li>
          ))}
        </ul>
        {postsPerPage < postsData.length && (
          <div className="load-more-btn">
            <button
              className="btn load-more-btn mt-3"
              onClick={() => handleLoadMore()}
            >
              Load More Posts
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="posts-wrapper">
        <h2>Loading.........</h2>
      </div>
    );
  }
}
