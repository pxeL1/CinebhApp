import get from "./Get.ts";
import {Page} from "../../models/Page.ts";

export default async function fetchPage<T>(url: string, page: number, size: number) {
    url = url + "?page=" + page + "&size=" + size;

    return await get<Page<T>>(url).then((res) => res);
}