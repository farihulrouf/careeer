import request from "../request";
const baseURL = "/leaderboard/org";

export const getLeaderboardCircleData = (
  orgId,
  employeeId,
  scopeType,
  referenceId,
  header = {},
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/?scopeType=${scopeType}&organizationRole=Employee&referenceId=${referenceId}`,
        { headers: header },
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllLeaderboardEmployees = (
  orgId,
  employeeId,
  scopeType,
  referenceId,
  offset,
  limit,
  searchKey,
  header = {},
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/list?scopeType=${scopeType}&organizationRole=Employee&referenceId=${referenceId}&offset=${offset}&limit=${limit}&searchKey=${searchKey}`,
        { headers: header },
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getLeaderboardTopFiveRanks = (
  orgId,
  employeeId,
  scopeType,
  referenceId,
  header = {},
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/topfive?scopeType=${scopeType}&organizationRole=Employee&referenceId=${referenceId}`,
        { headers: header },
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const searchLeaderboardEmployees = (
  orgId,
  employeeId,
  searchKey,
  header = {},
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/search?name=${searchKey}`,
        { headers: header },
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getLeaderboardEmployeeDetails = (
  orgId,
  employeeId,
  header = {},
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/details`,
        { headers: header },
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getDashboardLeaderboardTopAndNearerDetails = (
  orgId,
  employeeId,
  referenceId,
  header = {},
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/dashboardDetails?scopeType=root&organizationRole=Employee&referenceId=${referenceId}`,
        { headers: header },
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
