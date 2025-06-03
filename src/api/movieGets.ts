import { z } from "zod";
import { BASE_URL } from "./urlConfig";
import { validateResponse } from "./validateResponse";

export const MovieScheme = z.object({
  id: z.number(),
  title: z.string(),
  originalTitle: z.string(),
  language: z.string().or(z.null()),
  releaseYear: z.number().or(z.null()),
  releaseDate: z.string().or(z.null()),
  genres: z.array(z.string()),
  plot: z.string().or(z.null()),
  runtime: z.number().or(z.null()),
  budget: z.string().or(z.null()),
  revenue: z.string().or(z.null()),
  homepage: z.string().or(z.null()),
  status: z.string().or(z.null()),
  posterUrl: z.string().or(z.null()),
  backdropUrl: z.string().or(z.null()),
  trailerUrl: z.string().or(z.null()),
  trailerYouTubeId: z.string().or(z.null()),
  tmdbRating: z.number(),
  searchL: z.string().or(z.null()),
  keywords: z.array(z.string()),
  countriesOfOrigin: z.array(z.string()),
  languages: z.array(z.string()).or(z.null()),
  cast: z.array(z.string()),
  director: z.string().or(z.null()),
  production: z.string().or(z.null()),
  awardsSummary: z.string().or(z.null()),
});

export type Movie = z.infer<typeof MovieScheme>;

export type MovieList = Movie[];
export interface MovieListGenreProps {
  genre: string;
}

export const MovieListScheme = z.array(MovieScheme);

export const getRandomMovie = (): Promise<Movie> =>
  fetch(`${BASE_URL}/movie/random`).then((res) => res.json());

export const getTopMovies = (): Promise<MovieList> =>
  fetch(`${BASE_URL}/movie/top10`).then((res) => res.json());

export const getMovie = (id: string): Promise<Movie> =>
  fetch(`${BASE_URL}/movie/${id}`)
    .then((res) => res.json())
    .then((data) => MovieScheme.parse(data));

export const getMovieListGenre = (
  genre: string,
  page: number
): Promise<MovieList> =>
  fetch(`${BASE_URL}/movie?genre=${genre}&count=10&page=${page}`)
    .then(validateResponse)
    .then((res) => res.json());

export const getMovieListTitle = (title: string): Promise<MovieList> =>
  fetch(`${BASE_URL}/movie?title=${title}&count=5`)
    .then(validateResponse)
    .then((res) => res.json())
    .then((data) => MovieListScheme.parse(data));
