import React, { useState, useEffect, useContext, useReducer } from "react";
import { useParams, Link } from "react-router-dom";
import Pagination from "./pagination";
import { PostsContext } from "../context";
import { postsReducer } from "../context";
import "../assets/scss/pagination.scss";
import "../assets/scss/single_user.scss";
import { v4 as uuidv4 } from "uuid";
export default function SingleUser() {
  const { id, user_name } = useParams();
  const [post, setPost] = useState({
    userId: id,
    id: uuidv4(),
    title: "",
    body: "",
  });
  const {
    state: { currentPost = {} },
    dispatch,
  } = useContext(PostsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const { state } = useContext(PostsContext);

  // get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = state.posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber, e) => {
    setCurrentPage(pageNumber);
    e.preventDefault();
  };

  useEffect(() => {
    if (currentPost.title) {
      setPost((prevState) => ({
        ...prevState,
        title: currentPost.title,
        body: currentPost.body,
      }));
    }
  }, [currentPost.id]);

  const handleSubmit = (e) => {
    if (currentPost.title) {
      dispatch({ type: "UPDATE_POST", payload: post });
    } else {
      dispatch({
        type: "ADD_POST",
        payload: post,
      });
      setPost({
        userId: "",
        id: "",
        title: "",
        body: "",
      });
    }
    setPost({
      userId: "",
      id: "",
      title: "",
      body: "",
    });
    e.preventDefault();
  };

  return (
    <div className="user-wrapper pt-80 px-6">
      <form className="post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          required
          name="title"
          value={post.title}
          onChange={(e) =>
            setPost((prevState) => ({ ...prevState, title: e.target.value }))
          }
        />
        <textarea
          name="body"
          id=""
          cols="30"
          rows="10"
          required
          value={post.body}
          onChange={(e) =>
            setPost((prevState) => ({ ...prevState, body: e.target.value }))
          }
        ></textarea>
        <button className="btn">
          {currentPost.title ? "Update Post" : "Add Post"}
        </button>
      </form>
      <div className="card">
        <h3>Author Name: {user_name}</h3>
      </div>
      <div className="posts-wrapper-2">
        <ul className="posts-lists">
          {currentPosts.map((posts) => (
            <li key={posts.id} className="d-flex align-items-center">
              <Link to={`/post_details/${posts.id}`}>{posts.title}</Link>
              <div className="user-action pl-2">
                <button
                  className="sm-btn btn-success"
                  onClick={() =>
                    dispatch({ type: "SET_CURRENT_POST", payload: posts })
                  }
                >
                  Edit
                </button>
                <button
                  className="sm-btn btn-danger ml-1"
                  onClick={() => dispatch({ type: "REMOVE", payload: posts })}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="pagination-wrapper mt-4">
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={state.posts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
