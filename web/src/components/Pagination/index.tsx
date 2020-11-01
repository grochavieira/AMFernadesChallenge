import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import "./styles.scss";

interface PaginationProps {
  setCurrentPage(pageNumber: number): void;
  goBack(): void;
  goForward(): void;
  totalItems: number;
  currentPage: number;
  limitPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  setCurrentPage,
  goBack,
  goForward,
  totalItems,
  currentPage,
  limitPerPage,
}) => {
  const [pageIndex, setPageIndex] = useState<any>([]);
  const pages = Math.ceil(totalItems / limitPerPage);

  useEffect(() => {
    generatePagination();
  }, [pages, currentPage]);

  function generatePagination() {
    const saveIndex = [];
    if (pages <= 5) {
      for (let i = 1; i <= pages; i++) {
        saveIndex.push(i);
      }
      setPageIndex(saveIndex);
    } else {
      saveIndex.push(1);
      saveIndex.push(2);

      let initialPage = 3;

      if (currentPage > 6) {
        initialPage = currentPage - 2;
        saveIndex.push("...");
      }

      for (let i = initialPage; i < pages - 2 && i <= currentPage + 1; i++) {
        saveIndex.push(i);
      }

      if (currentPage < pages - 5) {
        saveIndex.push("...");
      }

      saveIndex.push(pages - 1);
      saveIndex.push(pages);
      setPageIndex(saveIndex);
    }
  }

  if (totalItems === 0) {
    return <div></div>;
  }

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={goBack}
        className="pagination__back page-btn"
      >
        <FiArrowLeft />
      </button>
      {/* <button className="pagination__item page-btn">1</button>
      <button className="pagination__item page-btn">2</button>
      <button className="pagination__item page-btn">3</button>
      <button className="pagination__item page-btn">4</button> */}
      {pageIndex.map((page: any) => (
        <button
          onClick={
            page !== "..."
              ? () => {
                  setCurrentPage(page);
                  window.scrollTo(0, 0);
                }
              : () => {}
          }
          className={
            page !== currentPage
              ? "pagination__item page-btn"
              : "pagination__item page-btn selected"
          }
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === pages}
        onClick={goForward}
        className="pagination__go page-btn"
      >
        <FiArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
