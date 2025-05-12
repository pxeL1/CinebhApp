import getCompleteUrl from "services/fetching/getCompleteUrl";

export default async function fetchData(
  url: string,
  method: string,
  queryParams?: URLSearchParams,
  body?: object,
) {
  const defaultHeaders = new Headers({ "Content-Type": "application/json" });
  const completeUrl: string = getCompleteUrl(url, queryParams);

  const response = await fetch(completeUrl, {
    method: method,
    headers: defaultHeaders,
    body: JSON.stringify(body) ?? null,
    credentials: "include",
  });

  return { data: await response.json(), ok: response.ok };
}
