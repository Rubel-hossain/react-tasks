import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/scss/users.scss";
export default function Users() {
  const [usersData, setUsersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("desc");
  const [postsPerPage, setPostsPerPage] = useState(10);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsersData(data.slice(0, postsPerPage));
      });
  }, [postsPerPage]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key) => {
    function compareValues(key, order = "asc") {
      return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0;
        }

        const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
        const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return order === "desc" ? comparison * -1 : comparison;
      };
    }
    if (sortType == "desc") {
      setSortType("asc");
    } else if (sortType == "asc") {
      setSortType("desc");
    }
    usersData.sort(compareValues(key, sortType));
  };

  const handlePostsNumber = (e) => {
    let value = e.target.value;

    setPostsPerPage(value);
    console.log(value);
  };

  if (usersData.length > 0) {
    return (
      <div className="users-wrapper pt-80 px-6 text-center">
        <h2>All Users</h2>
        <div className="tables-control">
          <div className="table-search">
            <input
              type="search"
              className="form-control"
              placeholder="search"
              onChange={handleSearch}
              value={searchTerm}
            />
          </div>
          <form onChange={(e) => handlePostsNumber(e)}>
            <select name="select_posts_number" id="select_posts_number">
              <option value="10">All</option>
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="7">7</option>
              <option value="9">9</option>
            </select>
          </form>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>Name: </th>
              <th onClick={() => handleSort("email")}>Email: </th>
              <th>Website: </th>
              <th>Username: </th>
            </tr>
          </thead>
          <tbody>
            {usersData
              .filter((users) => {
                if (searchTerm.length == 0 || null) {
                  return users;
                } else if (
                  users.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  users.email
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  users.website
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  users.username
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return users;
                }
              })
              .map((users) => (
                <tr key={users.id}>
                  <td>
                    <Link to={`/single_user/${users.id}/${users.name}`}>
                      {users.name}
                    </Link>
                  </td>
                  <td>{users.email}</td>
                  <td>{users.website}</td>
                  <td>{users.username}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div className="users-wrapper pt-80 px-6">
        <h2>Loading ............</h2>
      </div>
    );
  }
}
