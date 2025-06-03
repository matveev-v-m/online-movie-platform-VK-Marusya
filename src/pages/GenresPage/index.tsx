import { useQuery } from "@tanstack/react-query";
import "./index.scss";
import { genreFetch } from "../../api/genreFetch";
import { Link } from "react-router-dom";

export const GenresPage = () => {
  const genres = useQuery({
    queryFn: () => genreFetch(),
    queryKey: ["genres"],
  });

  return (
    <section className="genres">
      <div className="container">
        <h1 className="genres__title">Жанры фильмов</h1>
        <ul className="genres__list">
          {genres.data?.map((genre) => (
            <li
              key={genre}
              style={{ backgroundImage: `url(./${genre}.jpg)` }}
              className="genres__list__item"
            >
              <Link
                className="genres__list__item__link"
                to={`/genres/${genre}`}
              >
                <span className="genres__list__item__link__span">
                  {genre.toLocaleUpperCase().slice(0, 1) +
                    genre.toLocaleLowerCase().slice(1)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
