import get from "./Get";
import { Page } from "models/Page";

export default async function fetchPage<T>(
  url: string,
  page: number,
  size: number,
  queryParams?: URLSearchParams,
) {
  const completeQueryParams = new URLSearchParams({ page: page.toString(), size: size.toString() });
  queryParams?.forEach((value, key) => {
    completeQueryParams.append(key, value);
  })

  return await get<Page<T>>(
    url,
    completeQueryParams,
  );
}
