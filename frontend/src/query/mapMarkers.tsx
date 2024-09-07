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
    console.info('Fetching marks...')
    await new Promise((r) => setTimeout(r, 500))
    return axios
        .get<MapMarker[]>('http://localhost:8080/marks').then((res) => res.data)
}