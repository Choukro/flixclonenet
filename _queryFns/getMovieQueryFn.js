import { clientApi } from "./clientAPI.js";
import { getRandomType, getRandomId } from "../_utils/helper.js";

// export const getMovieQueryFn = async (type, id) => clientApi(`${type}/${id}`);

export const getMovieQueryFn = async (inputType, inputId) => {
  const type = inputType || getRandomType();
  const defaultMovieId = inputId || getRandomId(type);
  return clientApi(`${type}/${defaultMovieId}`);
};
