import { useSelector } from "react-redux";
import { IProfile } from "./authFetch";
import { MovieList } from "./movieGets";

interface StateProps {
  modal: boolean;
  profile: IProfile;
  favorites: MovieList;
}

export const useModalState = () =>
  useSelector((state: StateProps) => state.modal);

export const useProfileState = () =>
  useSelector((state: StateProps) => state.profile);

export const useFavoriteState = () =>
  useSelector((state: StateProps) => state.favorites);
