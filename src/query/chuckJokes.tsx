import { queryOptions } from '@tanstack/react-query'
import axios from 'redaxios'

type ChuckJoke = {
    id: number
    value: string
}

export const jokeQueryOptions = queryOptions({
    queryKey: ['joke'],
    staleTime: 10 * 1000,
    queryFn: () => fetchJoke(),
})

const fetchJoke = async () => {
    console.info('Fetching joke...')
    await new Promise((r) => setTimeout(r, 500))
    return axios
        .get<ChuckJoke>('https://api.chucknorris.io/jokes/random').then((res) => res.data)
}