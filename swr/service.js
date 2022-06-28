import useSWR from "swr";

const apiUrl = "http://127.0.0.1:8000"

const fetcher = (url,method = "GET") => fetch( url ,{
    method : method,
    headers: {
        accept: "application/json",
        "Content-Type": "application/json",
    },
}).then((res) => res.json())

export function GetMissionByUserId (id) {
    const { data, error } = useSWR(apiUrl + "/api/missions?user=" + id, fetcher)

    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

export function GetUserBy (id) {
    const { data, error } = useSWR(apiUrl + "/api/users/" + id, fetcher)

    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

export function GetCategories () {
    const { data, error } = useSWR(apiUrl + "/api/categories", fetcher)
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}


export function GetFromUri(uri){
    const { data, error } = useSWR(apiUrl + uri, fetcher)

    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

