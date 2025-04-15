export default async function get<T>(
  url: string,
  queryParams?: URLSearchParams,
) {
  const completeUrl: string =
    import.meta.env.VITE_BASE_URL + url + "?" + queryParams?.toString();
  const res = await fetch(completeUrl, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json" }),
  });

  return (await res.json()) as T;
}
