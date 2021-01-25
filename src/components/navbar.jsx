import React from "react";
import "../assets/scss/navbar.scss";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="navbar-wrapper">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">All Posts</Link>
          </li>
          <li>
            <Link to="/users">All Users</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
