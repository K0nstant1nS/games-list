import { createSlice } from "@reduxjs/toolkit";
import { getGamesRequest } from "../../API";

const initialState = {
  status: null,
  data: [],
  requestParams: "",
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setGamesData: (state, action) => {
      return {
        ...state,
        status: "success",
        data: action.payload,
      };
    },
    loadMore: (state, action) => {
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    },
    setStatusError: (state, action) => {
      return { ...state, status: "error" };
    },
    setStatusLoading: (state, action) => {
      return { ...state, status: "loading" };
    },
    setRequestParams: (state, action) => {
      return { ...state, requestParams: action.payload };
    },
  },
});

export const {
  setGamesData,
  loadMore,
  setStatusLoading,
  setStatusError,
  setRequestParams,
} = gamesSlice.actions;

export const getGamesList = (params = "") => {
  return async (dispatch) => {
    dispatch(setStatusLoading());
    getGamesRequest(params)
      .then((data) => {
        dispatch(setGamesData(data.results));
      })
      .catch(() => {
        dispatch(setStatusError());
      });
  };
};

export const getNextGamesPage = (a, params) => {
  return async (dispatch) => {
    getGamesRequest(params).then((data) => {
      a.isTrue = true;
      dispatch(loadMore(data.results));
    });
  };
};

export default gamesSlice.reducer;
