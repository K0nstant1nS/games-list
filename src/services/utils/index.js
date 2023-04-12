export const getParam = (param, string) => {
  let paramString = string.slice(1);
  if (!paramString) {
    return undefined;
  }

  paramString = paramString
    .split("&")
    .find((item) => item.indexOf(param) === 0);

  if (!paramString) {
    return undefined;
  }

  return paramString.split("=")[1];
};

export const compareDate = (firstDate, secondDate) => {
  firstDate = firstDate.split("-");
  secondDate = secondDate.split("-");
  return new Date(...firstDate) - new Date(...secondDate);
};
