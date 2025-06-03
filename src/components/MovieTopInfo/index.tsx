import { FC } from "react";
import { Movie } from "../../api/movieGets";
import "./index.scss";
import { formatMovieDuration } from "../../api/formatNumber";

export interface MovieTopInfoProps {
  movie: Movie;
}

export const MovieTopInfo: FC<MovieTopInfoProps> = ({ movie }) => {
  let ratingColor = "";

  const time = () => {
    if (movie.runtime) return formatMovieDuration(movie.runtime);
  };

  if (movie.tmdbRating >= 8) {
    ratingColor = "gold";
  } else if (movie.tmdbRating >= 7) {
    ratingColor = "green";
  } else if (movie.tmdbRating >= 6) {
    ratingColor = "gray";
  } else {
    ratingColor = "red";
  }

  return (
    <ul className="movie-info">
      <li
        className="movie-info__rating"
        style={{ backgroundColor: ratingColor }}
      >
        <svg
          className="movie-info__rating__svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.00105 12.1734L3.29875 14.8055L4.34897 9.51997L0.392578 5.86124L5.74394 5.22675L8.00105 0.333374L10.2581 5.22675L15.6095 5.86124L11.6531 9.51997L12.7033 14.8055L8.00105 12.1734Z"
            fill="white"
          />
        </svg>
        {movie.tmdbRating.toFixed(1)}
      </li>
      <li className="movie-info__item">{movie.releaseYear}</li>
      <li className="movie-info__item">{movie.genres[0]}</li>
      <li className="movie-info__item">{time()}</li>
    </ul>
  );
};
