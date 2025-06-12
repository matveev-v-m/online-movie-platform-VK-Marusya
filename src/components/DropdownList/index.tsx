import { useQuery } from "@tanstack/react-query";
import { getMovieListTitle } from "../../api/movieGets";
import "./index.scss";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { MovieTopInfo } from "..";

interface DropdownListProp {
  searchTitle: string;
  setSearchTitle: React.Dispatch<React.SetStateAction<string>>;
  setSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchOpen: boolean;
}

export const DropdownList: FC<DropdownListProp> = ({
  searchTitle,
  setSearchTitle,
  setSearchOpen,
  searchOpen,
}) => {
  const handleClearInputValue = () => {
    setSearchTitle("");
    setSearchOpen(false);
  };

  useEffect(() => {
    if (searchTitle)
      document
        .querySelector("body")
        ?.addEventListener("click", handleClearInputValue);
    return () => {
      document
        .querySelector("body")
        ?.removeEventListener("click", handleClearInputValue);
    };
  }, [searchTitle]);

  const searchMovies = useQuery({
    queryFn: () => getMovieListTitle(searchTitle),
    queryKey: ["search-movies", searchTitle],
  });

  switch (searchMovies.status) {
    case "error":
      return <div>{searchMovies.error.message}</div>;

    case "success":
      return (
        <div className="drop-down">
          <ul className={`drop-down__list ${searchOpen && "drop-down-mobile"}`}>
            {searchMovies.data.length !== 0 ? (
              searchMovies.data.map((movie) => (
                <li className="drop-down__list__item" key={movie.id}>
                  <Link
                    className="drop-down__list__item__link"
                    to={`/movie/${movie.id}`}
                    onClick={handleClearInputValue}
                  >
                    <img
                      className="drop-down__list__item__link__img"
                      src={movie.posterUrl ? movie.posterUrl : "/no-image.jpg"}
                      alt=""
                    />
                    <div className="drop-down__list__item__link__wrap">
                      <MovieTopInfo movie={movie} />
                      <span className="drop-down__list__item__link__wrap__title">
                        {movie.title}
                      </span>
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <p className="drop-down__list__item" style={{ fontSize: 18 }}>
                Фильм не найден
              </p>
            )}
          </ul>
        </div>
      );
  }
};
