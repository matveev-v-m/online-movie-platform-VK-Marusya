import { BASE_URL } from "./urlConfig"

type GenreList = string[]

export const genreFetch = (): Promise<GenreList> => fetch(`${BASE_URL}/movie/genres`).then(res => res.json());