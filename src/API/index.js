export const key = "1ac72cafede944aa8fe405c9f3680551";
const baseURL = "https://api.rawg.io/api";
const getGamesOptions = {
  method: "GET",
  headers: {
    "content-type": "application/json",
  },
};

const getRequest = (additionalUrl, options) => {
  return fetch(`${baseURL}${additionalUrl}`, options).then((res) =>
    res.ok ? res.json() : new Error(res)
  );
};

export const getGamesRequest = (params) => {
  return getRequest("/games?" + new URLSearchParams(params), getGamesOptions);
};

export const getGameRequest = (id) => {
  return getRequest(`/games/${id}?key=${key}`);
};
