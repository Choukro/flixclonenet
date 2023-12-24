import { clientApi } from "./clientAPI.js";

export const getSearchMoviesQueryFn = async (query) => {
  return clientApi(`search/multi?query=${query}`);
};
