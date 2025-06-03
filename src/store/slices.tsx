import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: false,
  reducers: {
    modalLoginState: (state) => (state = !state),
  },
});

const profileSlice = createSlice({
  name: "profile",
  initialState: null,
  reducers: {
    setProfile: (_, actions) => actions.payload,
  },
});

const favoritesSlise = createSlice({
  name: "favorites",
  initialState: null,
  reducers: {
    setFavorites: (_, actions) => actions.payload,
  },
});

export const { modalLoginState } = modalSlice.actions;
export const { setProfile } = profileSlice.actions;
export const { setFavorites } = favoritesSlise.actions;

export const modalReducer = modalSlice.reducer;
export const profileReducer = profileSlice.reducer;
export const favoritesReducer = favoritesSlise.reducer;
