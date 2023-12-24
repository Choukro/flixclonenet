import axios from "axios";

export const jsonPlaceholderAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});
