import { clientApi } from "./clientAPI.js";

export const getMoviesQueryFn = async (type, id) => clientApi(`${type}/${id}`);
