import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const request = axios.create({
  baseURL: API_URL,
  headers: {},
  validateStatus: function (status) {
    return true;
  },
});
export default request;
