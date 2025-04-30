import { useEffect, useState } from "react";
import fetchData from "services/fetching/fetchData";

export interface FetchDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export default function useFetchData<T>(
  url: string,
  queryParams?: URLSearchParams,
): FetchDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchData(url, "GET", queryParams)
      .then((response) => {
        setLoading(false);
        setData(response.data);
      })
      .catch((error: Error) => {
        setError(error);
      });
  }, [url, queryParams]);

  return { data, loading, error };
}
