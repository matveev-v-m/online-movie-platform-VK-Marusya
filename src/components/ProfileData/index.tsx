import { useMutation } from "@tanstack/react-query";
import { IProfile, logout } from "../../api/authFetch";
import "./index.scss";
import { queryClient } from "../../api/queryClient";
import { useNavigate } from "react-router-dom";

interface ProfileDataProp {
  profile: IProfile;
}

export const ProfileData = ({ profile }: ProfileDataProp) => {
  const navigate = useNavigate();
  const profileInitials =
    profile.name.toLocaleUpperCase().slice(0, 1) +
    profile.surname.toLocaleUpperCase().slice(0, 1);

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    mutationKey: ["logout"],
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      navigate("/");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="profile-data">
      <ul className="profile-data__list">
        <li className="profile-data__list__item">
          <span className="profile-data__list__item__icon">
            {profileInitials}
          </span>
          <div className="profile-data__list__item__info">
            <span className="profile-data__list__item__info__label">
              Имя Фамилия
            </span>
            <span className="profile-data__list__item__info__naming">
              {profile.name} {profile.surname}
            </span>
          </div>
        </li>
        <li className="profile-data__list__item">
          <span className="profile-data__list__item__icon">
            <svg
              width="22"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 0C21.5523 0 22 0.44772 22 1V17.0066C22 17.5552 21.5447 18 21.0082 18H2.9918C2.44405 18 2 17.5551 2 17.0066V16H20V4.3L12 11.5L2 2.5V1C2 0.44772 2.44772 0 3 0H21ZM8 12V14H0V12H8ZM5 7V9H0V7H5ZM19.5659 2H4.43414L12 8.8093L19.5659 2Z"
                fill="white"
              />
            </svg>
          </span>
          <div className="profile-data__list__item__info">
            <span className="profile-data__list__item__info__label">
              Электронная почта
            </span>
            <span className="profile-data__list__item__info__naming">
              {profile.email}
            </span>
          </div>
        </li>
      </ul>
      <button
        className="profile-data__btn"
        onClick={handleLogout}
        disabled={logoutMutation.isPending}
      >
        Выйти из аккаунта
      </button>
    </div>
  );
};
