import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AboutMovie, DscrMovie, Loader } from "../../components";
import { getMovie } from "../../api/movieGets";

export const MoviePage = () => {
  const { movieId } = useParams();

  const movie = useQuery({
    queryFn: () => getMovie(movieId ? movieId : ""),
    queryKey: ["movie", `${movieId}`],
  });

  switch (movie.status) {
    case "pending":
      return <Loader />;

    case "error":
      return <div>{movie.error.message}</div>;

    case "success":
      return (
        <>
          <AboutMovie movie={movie.data} />
          <DscrMovie movie={movie.data} />
        </>
      );
  }
};
