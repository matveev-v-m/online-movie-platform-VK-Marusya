import { useState } from "react";
import "./index.scss";
import { ProfileData, MovieListView, Loader } from "../../components";
import { useProfileState } from "../../api/selectors";
import { useQuery } from "@tanstack/react-query";
import { getFavoriteMovies } from "../../api/favoritesMovies";

export const ProfilePage = () => {
  const [menu, setMenu] = useState("избранные");
  const profile = useProfileState();

  const movieList = useQuery({
    queryFn: () => getFavoriteMovies(),
    queryKey: ["favorites"],
  });

  const handleFavorite = () => {
    setMenu("избранные");
  };

  const handleSettings = () => {
    setMenu("настройки");
  };

  switch (movieList.status) {
    case "pending":
      return <Loader />;

    case "error":
      return <div>{movieList.error.message}</div>;

    case "success":
      return (
        <section className="profile">
          <div className="container">
            <h1 className="profile__title">Мой аккаунт</h1>
            <div className="profile__wrap">
              <div className="profile__wrap__menu">
                <button
                  className={`profile__wrap__menu__btn ${
                    menu === "избранные" && "active"
                  }`}
                  onClick={handleFavorite}
                >
                  <svg
                    className="profile__wrap__menu__btn__icon"
                    width="20"
                    height="19"
                    viewBox="0 0 20 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.5 0C17.5376 0 20 2.5 20 6C20 13 12.5 17 10 18.5C7.5 17 0 13 0 6C0 2.5 2.5 0 5.5 0C7.35997 0 9 1 10 2C11 1 12.64 0 14.5 0ZM10.9339 15.6038C11.8155 15.0485 12.61 14.4955 13.3549 13.9029C16.3337 11.533 18 8.9435 18 6C18 3.64076 16.463 2 14.5 2C13.4241 2 12.2593 2.56911 11.4142 3.41421L10 4.82843L8.5858 3.41421C7.74068 2.56911 6.5759 2 5.5 2C3.55906 2 2 3.6565 2 6C2 8.9435 3.66627 11.533 6.64514 13.9029C7.39 14.4955 8.1845 15.0485 9.0661 15.6038C9.3646 15.7919 9.6611 15.9729 10 16.1752C10.3389 15.9729 10.6354 15.7919 10.9339 15.6038Z"
                      fill="white"
                    />
                  </svg>
                  <span className="profile__wrap__menu__btn__text">
                    Избранные фильмы
                  </span>
                  <span className="profile-mobile">Избранное</span>
                </button>
                <button
                  className={`profile__wrap__menu__btn ${
                    menu === "настройки" && "active"
                  }`}
                  onClick={handleSettings}
                >
                  <svg
                    className="profile__wrap__menu__btn__icon"
                    width="16"
                    height="21"
                    viewBox="0 0 16 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 21C0 16.5817 3.58172 13 8 13C12.4183 13 16 16.5817 16 21H14C14 17.6863 11.3137 15 8 15C4.68629 15 2 17.6863 2 21H0ZM8 12C4.685 12 2 9.315 2 6C2 2.685 4.685 0 8 0C11.315 0 14 2.685 14 6C14 9.315 11.315 12 8 12ZM8 10C10.21 10 12 8.21 12 6C12 3.79 10.21 2 8 2C5.79 2 4 3.79 4 6C4 8.21 5.79 10 8 10Z"
                      fill="white"
                    />
                  </svg>
                  <span className="profile__wrap__menu__btn__text">
                    Настройка аккаунта
                  </span>
                  <span className="profile-mobile">Настройки</span>
                </button>
              </div>
              {menu === "настройки" ? (
                <ProfileData profile={profile} />
              ) : movieList.data.length !== 0 ? (
                <MovieListView movieList={movieList.data} deleteFlag={true} />
              ) : (
                <h2 className="profile__wrap__menu__empty-list">Список пуст</h2>
              )}
            </div>
          </div>
        </section>
      );
  }
};
