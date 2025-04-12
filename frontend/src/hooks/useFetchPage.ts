import {Page} from "../models/Page.ts";
import {useEffect, useState} from "react";
import fetchPage from "../services/fetching/fetchPage.ts";

export default function useFetchPage<T>(url: string, pageNumber: number, pageSize: number) {
    const [page, setPage] = useState<Page<T>>({
        content: [],
        pageable: {},
        totalPages: 0,
        totalElements: 0,
        last: false,
        size: 0,
        number: 0,
        sort: {},
        numberOfElements: 0,
        first: false,
        empty: true
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetchPage<T>(url, pageNumber, pageSize).then(
            response => {
                if(response.status) {
                    setLoading(false);
                    setPage(response.data);
                } else {
                    setError(new Error(`Could not fetch page ${url}`));
                }
            }
        ).catch(error => setError(error));
    }, [url, pageNumber, pageSize]);

    return { page, loading, error };
}