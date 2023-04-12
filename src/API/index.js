import fakeApiData from "../services/fakeApiData";

export const fakeGameRequest = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fakeApiData.slice());
    }, 2000);
  });
};
