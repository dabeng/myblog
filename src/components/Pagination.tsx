import { useState, useEffect } from "react";
import classNames from 'classnames';

export default function Pagination({ total, pageSize = 4, visibleSize = 5 }) {
  const [currentPage, setCurrentPage] = useState(1);
  let lastPage = Math.ceil(total / pageSize);
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
          Array(total >= visibleSize * pageSize ? visibleSize : lastPage)
            .fill(0)
            .map((v, index) => (
              <li key={index}>
                <a
                  className={classNames({
                    "pagination-link": true,
                    "is-current":
                    currentPage <= Math.ceil(visibleSize / 2)
                      ? currentPage === index + 1
                      : (currentPage > Math.ceil(visibleSize / 2) && lastPage - currentPage > Math.floor(visibleSize / 2)
                        ? currentPage === currentPage - Math.floor(visibleSize / 2) + index
                        : currentPage === lastPage - visibleSize + index + 1)
                  })}
                  aria-label={"Goto page " + (index + 1)}
                  aria-current={index + 1 === currentPage ? "page" : undefined}
                  onClick={gotoPage}
                >
                  {currentPage <= Math.ceil(visibleSize / 2) && index + 1}
                  {currentPage > Math.ceil(visibleSize / 2) && lastPage - currentPage > Math.floor(visibleSize / 2) && currentPage - Math.floor(visibleSize / 2) + index}
                  {lastPage - currentPage <= Math.floor(visibleSize / 2) && lastPage - visibleSize + index + 1}
                </a>
              </li>
            ))
        }
      </ul>
    </nav>
  );
};