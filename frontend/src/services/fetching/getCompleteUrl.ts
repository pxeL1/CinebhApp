export default function getCompleteUrl(
  url: string,
  queryParams?: URLSearchParams,
) {
  return (
    import.meta.env.VITE_BASE_URL +
    url +
    (queryParams ? `?${queryParams.toString()}` : "")
  );
}
