import React from "react";
import "./Pagination.css";

export default function Pagination({
  recipesPerPage,
  recipes,
  pagination,
  currentPage,
}) {
  const pageNum = [];
  for (let i = 1; i <= Math.ceil(recipes / recipesPerPage); i++) {
    pageNum.push(i);
  }
  return (
    <div>
      <ul className="pagination">
        {pageNum &&
          pageNum.map((num) => (
            <li key={num}>
              <button
                className="pagination-button"
                key={num}
                onClick={() => pagination(num)}
                style={
                  num === currentPage
                    ? {
                        backgroundColor: "black",
                        color: "white",
                        border: "1px solid #777db8",
                      }
                    : {}
                }
              >
                {num}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
