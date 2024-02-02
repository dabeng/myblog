import { useState, useEffect } from "react";

export default function Pagination({ total, pageSize = 5 }) {
  const [currentPage, setCurrentPage] = useState(1);

  let isNextBtnDisabled = currentPage * pageSize >= total;
  let isPrevBtnDisabled = currentPage === 1;

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const nextPage = (e) => {
    setCurrentPage(currentPage + 1);
  };

  const gotoPage = (e) => {
    setCurrentPage(parseInt(e.target.textContent));
  };

  return (
    <nav
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <button
        className="button pagination-previous"
        onClick={!isPrevBtnDisabled ? previousPage : undefined}
        disabled={isPrevBtnDisabled}
      >
        Previous
      </button>
      <button
        className="button pagination-next"
        onClick={!isNextBtnDisabled ? nextPage : undefined}
        disabled={isNextBtnDisabled}
      >
        Next page
      </button>
      <ul className="pagination-list">
        {
          Array(Math.ceil(total / pageSize))
            .fill(0)
            .map((v, index) => (
              <li key={index}>
                <a
                  className={
                    "pagination-link" +
                    (index + 1 === currentPage ? " is-current" : "")
                  }
                  aria-label={"Goto page " + (index + 1)}
                  aria-current={index + 1 === currentPage ? "page" : undefined}
                  onClick={gotoPage}
                >
                  {index + 1}
                </a>
              </li>
            ))
        }
      </ul>
    </nav>
  );
};