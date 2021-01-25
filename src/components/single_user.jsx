import React, { useState, useEffect, useContext, useReducer } from "react";
import { useParams, Link } from "react-router-dom";
import Pagination from "./pagination";
import { PostsContext } from "../context";
import { todosReducer } from "../context";
import "../assets/scss/pagination.scss";
import "../assets/scss/single_user.scss";
import { v4 as uuidv4 } from "uuid";
export default function SingleUser() {
  const { id, user_name } = useParams();
  const [todo, setTodo] = useState("");
  const {
    state: { currentTodo = {} },
    dispatch,
  } = useContext(PostsContext);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const { state } = useContext(PostsContext);

  useEffect(() => {
    setPosts(state.todos.filter((data) => data.userId == id));
  }, [id]);

  // get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = state.todos.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber, e) => {
    setCurrentPage(pageNumber);
    e.preventDefault();
  };

  useEffect(() => {
    if (currentTodo.title) {
      setTodo(currentTodo.title);
    }
  }, [currentTodo.id]);

  const handleSubmit = (e) => {
    if (currentTodo.title) {
      dispatch({ type: "UPDATE_TODO", payload: todo });
    } else {
      dispatch({
        type: "ADD_TODO",
        payload: { userId: 9, id: 3, title: "title", body: "body" },
      });
    }
    setTodo("");
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
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        {/* <textarea
          name="body"
          id=""
          cols="30"
          rows="10"
          required
          value={}
          onChange={}
        ></textarea> */}
        <button className="btn">Add Post</button>
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
                    dispatch({ type: "SET_CURRENT_TODO", payload: posts })
                  }
                >
                  Edit
                </button>
                <button
                  className="sm-btn btn-danger ml-1"
                  onClick={() => dispatch({ type: "REMOVE", payload: todo })}
                >
                  Delete{" "}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="pagination-wrapper mt-4">
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
