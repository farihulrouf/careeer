import request from "./request";

export const getAssessmentScore = (employeeId, skillType, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `/assessment/scores?employeeId=${employeeId}${
          skillType && "&skillType=" + skillType
        }`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAssessmentLink = (employeeId, skillType, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `/assessment/test/links?employeeId=${employeeId}${
          skillType && "&skillType=" + skillType
        }`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getSkillScore = (employeeId, header = {}) => {
  console.log({ header });
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `/assessment/skillscore?employeeId=${employeeId}`,
        {
          headers: header,
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAssessments = (employeeId, months, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `/assessment?employeeId=${employeeId}&months=${months}`,
        {
          headers: header,
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAssessmentReportUrl = (employeeId, key, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `/assessment/report/url?employeeId=${employeeId}&key=${key}`,
        {
          headers: header,
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getEmployeeActivities = (
  employeeId,
  offset,
  limit,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `/users/activities/${employeeId}?offset=${offset}&limit=${limit}`,
        {
          headers: header,
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const trackRoleSwitchActivities = (userId, data = {}, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(
        `/users/${userId}/trackRolesSwitch`,
        data,
        {
          headers: header,
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
