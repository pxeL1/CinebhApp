import fetchData from "services/fetching/fetchData";

export default async function Delete(
  url: string,
  queryParams?: URLSearchParams,
) {
  const res = await fetchData(url, "DELETE", queryParams);

  if (!res.ok) {
    throw new Error();
  }
}
