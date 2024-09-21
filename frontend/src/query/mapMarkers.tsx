import { queryOptions } from '@tanstack/react-query'
import axios from 'redaxios'

type MapMarker = {
    id: number
    title: string
    lat: number
    lng: number
}

export const mapMarksQueryOptions = queryOptions({
    queryKey: ['marks'],
    staleTime: 10 * 1000,
    queryFn: () => fetchMarks(),
})

const fetchMarks = async () => {
    console.info('Fetching marks...' + import.meta.env.VITE_API_BASE_HOST)
    const apiBaseHost = !import.meta.env.VITE_API_BASE_HOST ? "http://localhost:8080" : import.meta.env.VITE_API_BASE_HOST
    await new Promise((r) => setTimeout(r, 500))
    return axios
        .get<MapMarker[]>(`${apiBaseHost}/marks`).then((res) => res.data)
}