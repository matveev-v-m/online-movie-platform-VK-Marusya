import { MovieList } from "./movieGets";
import { BASE_URL } from "./urlConfig";

import { defaultConfig } from "./urlConfig";

export const getFavoriteMovies = () => {
  return fetch(`${BASE_URL}/favorites`, {
    method: "GET",
    headers: defaultConfig.headers,
    credentials: "include",
  }).then((res) => res.json());
};

export const addFavoriteMovie = (id: string): Promise<MovieList> => {
  return fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    headers: defaultConfig.headers,
    body: JSON.stringify({ id: id }),
    credentials: "include",
  }).then((res) => res.json());
};

export const deleteFavoriteMovie = (id: string): Promise<MovieList> => {
  return fetch(`${BASE_URL}/favorites/${id}`, {
    method: "DELETE",
    headers: defaultConfig.headers,
    credentials: "include",
  }).then((res) => res.json());
};
