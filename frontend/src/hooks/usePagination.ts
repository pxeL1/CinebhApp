import { useState } from "react";

export default function usePagination(initialSize: number, initialPage = 0) {
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialSize);

  function nextPage() {
    setPageNumber(pageNumber + 1);
  }

  function previousPage() {
    setPageNumber(pageNumber - 1);
  }

  return {
    pageNumber,
    pageSize,
    nextPage,
    previousPage,
    setPageSize,
    setPageNumber,
  };
}
