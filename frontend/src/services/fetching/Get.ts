export default async function get<T>(url: string) {
    url = import.meta.env.VITE_BASE_URL + url;
    const res = await fetch(url, {
        method: 'GET',
        headers: new Headers({'Content-Type': 'application/json'})
    })

    if(res.ok) {
        const resJson: T = await res.json();
        return {data: resJson, status: res.ok};
    } else {
        return {data: {}, status: res.ok};
    }
}