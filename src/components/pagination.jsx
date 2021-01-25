import React from "react";

export default function Pagination({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((numbers) => (
          <li className="page-item" key={numbers}>
            <a
              className={
                currentPage == numbers ? "page-link active" : "page-link"
              }
              href="#"
              onClick={(e) => paginate(numbers, e)}
            >
              {numbers}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
