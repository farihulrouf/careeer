import request from "./request";

export const getNotifications = (employeeId, limit, offset, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `/notifications/employee/${employeeId}?limit=${limit}&offset=${offset}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const viewNotifications = (employeeId, data = {}, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(
        `/notifications/employee/${employeeId}/viewed`,
        data,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const readNotifications = (employeeId, data = {}, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(
        `/notifications/employee/${employeeId}/read`,
        data,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
