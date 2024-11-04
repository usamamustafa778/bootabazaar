import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import classnames from "classnames";

const Pagination = ({
  currentPage,
  handlePageChange,
  totalPages,
  className,
}) => {
  const getPageNumbers = () => {
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 2);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex items-center ${className || "text-white"}`}>
      <span className="mx-2 whitespace-nowrap">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="h-8 w-8 rounded-full hover:bg-white hover:text-black transition-all flex items-center justify-center disabled:cursor-not-allowed"
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={classnames("px-3 py-1 rounded-full mx-1 transition-all", {
            "bg-gray-800 dark:bg-white dark:text-black text-white":
              currentPage === page,
            "dark:bg-gray-800 dark:text-white hover:bg-white dark:hover:bg-white hover:text-black dark:hover:text-black":
              currentPage !== page,
          })}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="h-8 w-8 rounded-full hover:bg-white hover:text-black transition-all flex items-center justify-center disabled:cursor-not-allowed"
        disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
