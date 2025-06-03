import { useQuery } from "@tanstack/react-query";
import "./index.scss";
import { getTopMovies } from "../../api/movieGets";
import { MovieListView } from "..";

export const TopMovies = () => {
  const topMovies = useQuery({
    queryFn: () => getTopMovies(),
    queryKey: ["top-movie"],
  });

  switch (topMovies.status) {
    case "error":
      return <div>{topMovies.error.message}</div>;

    case "success":
      return (
        <section className="top-movies">
          <div className="container">
            <h2 className="top-movies__title">Топ 10 фильмов</h2>
            <MovieListView movieList={topMovies.data} mainPageStatus={true} />
          </div>
        </section>
      );
  }
};
