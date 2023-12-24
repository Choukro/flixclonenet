import { clientApi } from "./clientAPI.js";

export const getMoviesFilterQueryFn = async (type, filter, param) => {
  const endpointLatest = `${type}/upcoming`;
  const endpointPopular = `${type}/popular`;
  const endpointTopRated = `${type}/top_rated`;
  const endpointGenre = `discover/${type}?with_genres=${param}`;
  const endpointTrending = `trending/${type}/day`;
  const endpointNowPlaying = `${type}/now_playing`;
  const endpointOnTheAir = `${type}/on_the_air`;

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
    case "now_playing":
      endpoint = endpointNowPlaying;
      break;
    case "on_the_air":
      endpoint = endpointOnTheAir;
      break;
    default:
      throw new Error("Type non supporté");
  }
  return clientApi(`${endpoint}`) ?? [];
};
