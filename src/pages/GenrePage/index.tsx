import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieListGenre } from "../../api/movieGets";
import { MovieListView } from "../../components";
import "./index.scss";

export const GenrePage = () => {
  const navigate = useNavigate();

  const handleBtnBack = () => {
    navigate("/genres");
  };
  const { genreName } = useParams();

  const title =
    genreName &&
    genreName.toLocaleUpperCase().slice(0, 1) +
      genreName.toLocaleLowerCase().slice(1);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["movies", genreName],
    queryFn: ({ pageParam = 1 }) =>
      getMovieListGenre(genreName ? genreName : "", pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const allMovies = data?.pages.flat() || [];

  switch (status) {
    case "error":
      return <div>{error.message}</div>;

    case "success":
      return (
        <section className="genre">
          <div className="container">
            <h2 className="genre__title">
              <button
                className="genre__title__btn-back"
                onClick={handleBtnBack}
              >
                <svg
                  width="14"
                  height="22"
                  viewBox="0 0 14 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.04701 11.0012L13.2967 19.2507L10.9397 21.6077L0.333008 11.0012L10.9397 0.394531L13.2967 2.75155L5.04701 11.0012Z"
                    fill="white"
                  />
                </svg>
                <span className="genre__title__span">{title}</span>
              </button>
            </h2>
            <MovieListView movieList={allMovies} />
            {hasNextPage && (
              <button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className="genre__load-btn"
              >
                {isFetchingNextPage ? "Загрузка..." : "Показать еще"}
              </button>
            )}
          </div>
        </section>
      );
  }
};
