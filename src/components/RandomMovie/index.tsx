import { useQuery } from "@tanstack/react-query";
import { getRandomMovie } from "../../api/movieGets";
import { AboutMovie, Loader } from "..";

export const RandomMovie = () => {
  const randomMovie = useQuery({
    queryFn: getRandomMovie,
    queryKey: ["random-movie"],
  });

  switch (randomMovie.status) {
    case "pending":
      return <Loader />;

    case "error":
      return <div>{randomMovie.error.message}</div>;

    case "success":
      return <AboutMovie movie={randomMovie.data} mainPageStatus={true} />;
  }
};
