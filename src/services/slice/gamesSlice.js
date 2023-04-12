import { createSlice } from "@reduxjs/toolkit";
import { fakeGameRequest } from "../../API";

const initialState = {
  status: null,
  data: [],
  visible: [],
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
        loaded: 40,
        status: "success",
        data: action.payload,
        visible: action.payload,
      };
    },
    fitlerByPlatform: (state, action) => {
      const { type } = action.payload;
      const loaded = 40;
      if (type === "ALL") {
        return { ...state, visible: state.data, loaded };
      } else if (type === "PC") {
        const visible = state.data.filter(({ platform }) => {
          return platform === "PC (Windows)";
        });
        return { ...state, visible, loaded };
      } else if (type === "BROWSER") {
        const visible = state.data.filter(({ platform }) => {
          return platform === "Web Browser";
        });
        return { ...state, visible, loaded };
      }
    },
    loadMore: (state, action) => {
      const loaded = state.loaded + 40;
      return { ...state, loaded };
    },
    setDefaultAmount: (state, action) => {
      return { ...state, loaded: 40 };
    },
    searchGames: (state, action) => {
      const { searchValue } = action.payload;
      const visible = state.data.filter((game) => {
        return (
          game.title.toLowerCase().indexOf(searchValue.toLowerCase()) === 0
        );
      });
      return { ...state, visible };
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
  fitlerByPlatform,
  loadMore,
  setDefaultAmount,
  searchGames,
  setMouseOver,
  setStatusLoading,
  setStatusError,
} = gamesSlice.actions;

export const getGamesList = () => {
  return async (dispatch) => {
    dispatch(setStatusLoading());
    fakeGameRequest()
      .then((data) => {
        dispatch(setGamesData(data));
      })
      .catch(() => {
        dispatch(setStatusError());
      });
  };
};

export default gamesSlice.reducer;
