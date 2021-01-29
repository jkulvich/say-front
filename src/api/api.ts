/*
Server API
 */

import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://say.over.red/api",
  timeout: 1000 * 10
});

export default class API {}
