import { useEffect, useState } from "react";

export default function usePagination(initialSize: number) {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(initialSize);

  function nextPage() {
    setPageNumber(pageNumber + 1);
  }

  function previousPage() {
    setPageNumber(pageNumber - 1);
  }

  useEffect(() => {}, []);

  return { pageNumber, pageSize, nextPage, previousPage, setPageSize };
}
