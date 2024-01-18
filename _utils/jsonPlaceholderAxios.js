import axios from "axios";
import {API_URL} from "./constants.js";

export const jsonPlaceholderAxios = axios.create({
  baseURL:API_URL,
});
