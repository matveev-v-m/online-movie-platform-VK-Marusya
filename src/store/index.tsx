import { configureStore } from "@reduxjs/toolkit";
import { favoritesReducer, modalReducer, profileReducer } from "./slices";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    profile: profileReducer,
    favorites: favoritesReducer,
  },
});
