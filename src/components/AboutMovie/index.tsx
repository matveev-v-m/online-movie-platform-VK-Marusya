import { FC, useState } from "react";
import { Movie } from "../../api/movieGets";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../api/queryClient";
import { MovieTopInfo, Trailer, LikeButton } from "..";

export interface MovieProps {
  movie: Movie;
  mainPageStatus?: boolean;
}

export const AboutMovie: FC<MovieProps> = ({
  movie,
  mainPageStatus = false,
}) => {
  const [trailerModalState, setTrailerModalState] = useState(false);

  const navigate = useNavigate();

  const handleAboutFilmBtn = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleBtnTrailerOpen = () => {
    setTrailerModalState(true);
  };

  const handleBtnUpdateMovie = () => {
    queryClient.invalidateQueries({ queryKey: ["random-movie"] });
  };

  const movieLink = movie.trailerUrl?.split("watch?v=")[1];

  return (
    <section className="about-movie">
      <Trailer
        trailerModalState={trailerModalState}
        setTrailerModalState={setTrailerModalState}
        movieLink={movieLink}
        movieTitle={movie.title}
      />
      <div className="container">
        <div className="about-movie__card">
          <div className="about-movie__card__left">
            <MovieTopInfo movie={movie} />
            <h2 className="about-movie__card__left__title">{movie.title}</h2>
            <p className="about-movie__card__left__plot">{movie.plot}</p>
            <div
              className={`about-movie__card__left__btn-block card-btns ${
                !mainPageStatus && "btn-nowrap"
              }`}
            >
              <button
                className={`card-btns__item trailer-btn ${
                  !mainPageStatus && "about-film-page"
                }`}
                onClick={handleBtnTrailerOpen}
              >
                Трейлер
              </button>
              <div
                className={`card-btns-second ${
                  !mainPageStatus && "about-film-card-btns-second"
                }`}
              >
                {mainPageStatus && (
                  <button
                    className="card-btns__item about-film-btn"
                    onClick={handleAboutFilmBtn}
                  >
                    О фильме
                  </button>
                )}
                <LikeButton movieId={movie.id} />
                {mainPageStatus && (
                  <button
                    className="card-btns__item refresh-btn"
                    onClick={handleBtnUpdateMovie}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 2C12.7486 2 15.1749 3.38626 16.6156 5.5H14V7.5H20V1.5H18V3.99936C16.1762 1.57166 13.2724 0 10 0C4.47715 0 0 4.47715 0 10H2C2 5.58172 5.58172 2 10 2ZM18 10C18 14.4183 14.4183 18 10 18C7.25144 18 4.82508 16.6137 3.38443 14.5H6V12.5H0V18.5H2V16.0006C3.82381 18.4283 6.72764 20 10 20C15.5228 20 20 15.5228 20 10H18Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
          <img
            className="about-movie__img"
            src={movie.posterUrl ? movie.posterUrl : "/no-image.jpg"}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};
