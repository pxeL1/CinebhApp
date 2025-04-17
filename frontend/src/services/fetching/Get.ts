import fetchData from "services/fetching/fetchData";

export default async function get<T>(
  url: string,
  queryParams?: URLSearchParams,
) {
  const res = await fetchData(url, "GET", queryParams);

  if (!res.ok) {
    throw new Error();
  }

  return (await res.json()) as T;
}
