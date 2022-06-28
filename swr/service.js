import useSWR from "swr";

const apiUrl = "http://127.0.0.1:8000/api/"

const fetcher = (url) => fetch( url ,{
    headers: {
        accept: "application/json",
        "Content-Type": "application/json",
    },
}).then((res) => res.json())

export function GetMissionByUserId (id) {
    const { data, error } = useSWR(apiUrl + "missions?user=" + id, fetcher)

    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}