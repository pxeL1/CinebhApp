import getAllHeaders from "services/fetching/getAllHeaders";
import getCompleteUrl from "services/fetching/getCompleteUrl";

export default async function get<T>(
  url: string,
  queryParams?: URLSearchParams,
) {
  const completeUrl: string = getCompleteUrl(url, queryParams);
  const res = await fetch(completeUrl, {
    method: "GET",
    headers: getAllHeaders(),
  });

  if(!res.ok) {
    throw new Error();
  }

  return (await res.json()) as T;
}
