import { createSlice } from "@reduxjs/toolkit";
import { getGamesRequest } from "../../API";

const initialState = {
  status: null,
  data: [],
  loaded: 0,
  mouseOver: undefined,
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGamesData: (state, action) => {
      return {
        ...state,
        loaded: 1,
        status: "success",
        data: action.payload,
      };
    },
    loadMore: (state, action) => {
      return {
        ...state,
        data: [...state.data, ...action.payload],
        loaded: state.loaded + 1,
      };
    },
    setMouseOver: (state, action) => {
      return { ...state, mouseOver: action.payload };
    },
    setStatusError: (state, action) => {
      return { ...state, status: "error" };
    },
    setStatusLoading: (state, action) => {
      return { ...state, status: "loading" };
    },
  },
});

export const {
  setGamesData,
  loadMore,
  setMouseOver,
  setStatusLoading,
  setStatusError,
} = gamesSlice.actions;

export const getGamesList = () => {
  return async (dispatch) => {
    dispatch(setStatusLoading());
    getGamesRequest()
      .then((data) => {
        dispatch(setGamesData(data.results));
      })
      .catch(() => {
        dispatch(setStatusError());
      });
  };
};

export const getNextGamesPage = (a) => {
  return async (dispatch) => {
    getGamesRequest().then((data) => {
      a.isTrue = true;
      dispatch(loadMore(data.results));
    });
  };
};

export default gamesSlice.reducer;
