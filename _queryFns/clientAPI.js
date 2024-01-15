import { API_KEY, LANG } from "../_utils/constants.js";
import { jsonPlaceholderAxios } from "../_utils/jsonPlaceholderAxios.js";

// utilise 'sleep' pour simuler des api longue
//const sleep = t => new Promise(resolve => setTimeout(resolve, t))

export const clientApi = async (endpoint) => {
  const page = 1;
  const startChar = endpoint.includes("?") ? `&` : `?`;
  const keyLang = `${startChar}api_key=${API_KEY}&language=${LANG}&page=${page}`;
  return jsonPlaceholderAxios
    .get(`/${endpoint}${keyLang}`)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        const err = {
          ...error.response,
          message: error.response?.data?.status_message,
        };
        return Promise.reject(err);
      } else {
        return Promise.reject(error);
      }
    });
};
