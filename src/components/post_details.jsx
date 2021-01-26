import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { PostsContext } from "../context";
export default function PostDetails() {
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState({});
  const { state } = useContext(PostsContext);
  useEffect(() => {
    const filterPosts = state.posts.filter((data) => data.id == id);
    setSinglePost(...filterPosts);
  }, []);
  if (typeof singlePost.title !== "undefined") {
    return (
      <div className="pt-80 px-6">
        <div className="posts-details">
          <div className="card">
            <h2 className="text-capitalize">{singlePost.title}</h2>
            <div className="card-bo">
              <p>{singlePost.body}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mt-6 px-6">
        <div className="posts-details">
          <div className="card">
            <h3>Loading............</h3>
          </div>
        </div>
      </div>
    );
  }
}
