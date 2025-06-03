import { BASE_URL, defaultConfig } from "./urlConfig";
import { validateResponse } from "./validateResponse";

interface RegisterUserProps {
  email: string;
  password: string;
  name: string;
  surname: string;
}

export const registerUser = ({
  email,
  password,
  name,
  surname,
}: RegisterUserProps) => {
  return fetch(`${BASE_URL}/user`, {
    method: "POST",
    headers: defaultConfig.headers,
    credentials: "include",
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
      surname: surname,
    }),
  })
    .then(validateResponse)
    .then(() => undefined);
};

export const login = (email: string, password: string): Promise<void> => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: defaultConfig.headers,
    credentials: "include",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(validateResponse)
    .then(() => undefined);
};

export const logout = () => {
  return fetch(`${BASE_URL}/auth/logout`, {
    credentials: "include",
  }).then((res) => res.json());
};

export interface IProfile {
  favorites: string[];
  surname: string;
  name: string;
  email: string;
}

export const profileFetch = (): Promise<IProfile> => {
  return fetch(`${BASE_URL}/profile`, {
    credentials: "include",
  }).then((res) => res.json());
};
