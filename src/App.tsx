import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components";
import {
  MainPage,
  GenrePage,
  GenresPage,
  MoviePage,
  ProfilePage,
} from "./pages";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { queryClient } from "./api/queryClient";
import { profileFetch } from "./api/authFetch";
import { useDispatch } from "react-redux";
import { setFavorites, setProfile } from "./store/slices";
import { useEffect } from "react";
import { getFavoriteMovies } from "./api/favoritesMovies";

function App() {
  const dispatch = useDispatch();
  const meQuery = useQuery(
    {
      queryFn: () => profileFetch(),
      queryKey: ["profile"],
      retry: 0,
    },
    queryClient
  );
  const favoritesQuery = useQuery(
    {
      queryFn: () => getFavoriteMovies(),
      queryKey: ["favorites"],
      retry: 0,
    },
    queryClient
  );

  useEffect(() => {
    if (favoritesQuery.status === "success") {
      dispatch(setFavorites(favoritesQuery.data));
    } else if (favoritesQuery.isError) {
      dispatch(setFavorites(null));
    }
  }, [
    favoritesQuery.status,
    favoritesQuery.data,
    favoritesQuery.isError,
    dispatch,
  ]);

  useEffect(() => {
    if (meQuery.status === "success") {
      dispatch(setProfile(meQuery.data));
    } else if (meQuery.isError) {
      dispatch(setProfile(null));
    }
  }, [meQuery.status, meQuery.data, meQuery.isError, dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/genres" element={<GenresPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/movie/:movieId" element={<MoviePage />} />
            <Route path="/genres/:genreName" element={<GenrePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
