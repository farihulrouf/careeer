// import request from "../request";
import axios from "axios";

const request = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {},
  validateStatus: function (status) {
    return true;
  },
});
const baseURL = "/auth";
export const login = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let { role, email, password } = data;
      if (!role) reject("role is missing");
      if (!email) reject("email is missing");
      if (!password) reject("password is missing");
      let response = await request.post(`${baseURL}/${role}/login`, data);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const loginWithSSO = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!key) reject("key is missing");

      let response = await request.post(
        `${baseURL}/${"employee"}/login_with_sso`,
        {
          key,
          email: "adarsh@elcarreira.com",
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const currentUser = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!token) reject("token is required");
      let response = await request.get(`${baseURL}/current/employee`, {
        headers: { authorization: token },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const logout = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!token) reject("token is required");
      let response = await request.post(
        `${baseURL}/employee/logout`,
        {},
        {
          headers: { authorization: token },
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
