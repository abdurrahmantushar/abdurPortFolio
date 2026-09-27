import axios from "axios";
import { BaseUrl } from "./Summry_api";

export const Axios = axios.create({
  baseURL: BaseUrl,
});