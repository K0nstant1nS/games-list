import { configureStore, compose, combineReducers } from "@reduxjs/toolkit";
import gamesReducer from "./slice/gamesSlice";

const store = configureStore({
  reducer: {
    gamesReducer,
  },
  devTools: true,
});

export default store;
