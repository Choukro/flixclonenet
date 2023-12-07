import { clientApi } from "./clientAPI.js";

export const getMoviesFilterQueryFn = async (type, filter, param) => {
  const endpointLatest = `${type}/upcoming`;
  const endpointPopular = `${type}/popular`;
  const endpointTopRated = `${type}/top_rated`;
  const endpointGenre = `discover/${type}?with_genres=${param}`;
  const endpointTrending = `trending/${type}/day`;

  let endpoint;
  switch (filter) {
    case "populaire":
      endpoint = endpointPopular;
      break;
    case "latest":
      endpoint = endpointLatest;
      break;
    case "toprated":
      endpoint = endpointTopRated;
      break;
    case "genre":
      endpoint = endpointGenre;
      break;
    case "trending":
      endpoint = endpointTrending;
      break;
    default:
      throw new Error("Type non supporté");
  }
  return clientApi(`${endpoint}`) ?? [];
};
