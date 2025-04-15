import get from "./Get";
import { Page } from "models/Page";

export default async function fetchPage<T>(
  url: string,
  page: number,
  size: number,
) {
  return await get<Page<T>>(
    url,
    new URLSearchParams({ page: page.toString(), size: size.toString() }),
  );
}
