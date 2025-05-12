import fetchData from "services/fetching/fetchData";

export default async function post<T>(
  url: string,
  body?: object,
  queryParams?: URLSearchParams,
) {
  const res = await fetchData(url, "POST", queryParams, body);

  if(!res.ok) {
    throw new Error(res.data.message);
  }

  return res.data as T;
}
