import { FC, useCallback, useEffect, useState } from "react";
import { MovieList } from "../../api/movieGets";
import "./index.scss";
import { Link, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteFavoriteMovie } from "../../api/favoritesMovies";
import { queryClient } from "../../api/queryClient";

interface MovieListView {
  movieList: MovieList;
  mainPageStatus?: boolean;
  deleteFlag?: boolean;
}

export const MovieListView: FC<MovieListView> = ({
  movieList,
  mainPageStatus = false,
  deleteFlag = false,
}) => {
  const { pathname } = useLocation();
  const [movieId, setMovieId] = useState<number | null>(null);

  const deleteFavoriteMovieMutate = useMutation({
    mutationFn: () => deleteFavoriteMovie(String(movieId)),
    mutationKey: ["favorites", `${movieId}`],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  useEffect(() => {
    if (movieId) deleteFavoriteMovieMutate.mutate();
  }, [movieId]);

  const handleDeleteMovie = useCallback((id: number) => {
    setMovieId(id);
  }, []);

  return (
    <ul
      className={`movie-list ${
        !pathname.includes("/genres") && "movie-list-mobile"
      }`}
    >
      {movieList &&
        movieList.map((movie, index) => {
          return (
            <li className="movie-list__item" key={index}>
              {deleteFlag && (
                <button
                  className="movie-list__item__btn"
                  onClick={() => handleDeleteMovie(movie.id)}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.99873 5.5865L11.9485 0.636719L13.3627 2.05093L8.41293 7.0007L13.3627 11.9504L11.9485 13.3646L6.99873 8.4149L2.04899 13.3646L0.634766 11.9504L5.58453 7.0007L0.634766 2.05093L2.04899 0.636719L6.99873 5.5865Z"
                      fill="black"
                    />
                  </svg>
                </button>
              )}
              <Link to={`/movie/${movie.id}`}>
                {mainPageStatus && (
                  <span className="movie-list__item__number">{index + 1}</span>
                )}
                <img
                  className="movie-list__item__img"
                  src={movie.posterUrl ? movie.posterUrl : "/no-image.jpg"}
                  alt="movie"
                />
              </Link>
            </li>
          );
        })}
    </ul>
  );
};
