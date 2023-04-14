const key = "1ac72cafede944aa8fe405c9f3680551";
const baseURL = "https://api.rawg.io/api";
const getGamesOptions = {
  method: "GET",
  headers: {
    "content-type": "application/json",
  },
};
let page = 1;

const getRequest = (additionalUrl, options) => {
  return fetch(`${baseURL}${additionalUrl}key=${key}`, options).then((res) =>
    res.ok ? res.json() : new Error(res)
  );
};

export const refreshPage = () => {
  page = 1;
};

export const getGamesRequest = (params) =>
  getRequest(`/games?page=${page++}&${params}&`, getGamesOptions);
