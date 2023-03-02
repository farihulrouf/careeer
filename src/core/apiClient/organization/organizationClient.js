import request from "../request";
const baseURL = "/organizations";
export const getTools = (header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(`${baseURL}/tools`, { headers: header });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const addTool = (data = {}, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(`${baseURL}/tools`, data, {
        headers: header,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getOnboardingStatus = (orgId, employeeId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/onboarding`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const updateOnboardingStatus = (
  data = {},
  orgId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.put(
        `${baseURL}/${orgId}/employees/${employeeId}/onboarding`,
        data,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const uploadProfilePicture = (
  data = {},
  orgId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.put(
        `${baseURL}/${orgId}/employees/${employeeId}/profilePicture`,
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
export const removeProfilePicture = (orgId, employeeId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.delete(
        `${baseURL}/${orgId}/employees/${employeeId}/profilePicture`,
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
export const getOnboardingHistory = (orgId, employeeId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/onboardinghistory`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getEmployeeDetails = (orgId, employeeId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/details`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const updateEmployeeDetails = (
  data = {},
  orgId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.put(
        `${baseURL}/${orgId}/employees/${employeeId}/details`,
        data,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getEmployeeEducationDetails = (orgId, employeeId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/education`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const updateEmployeeEducationDetails = (
  data = {},
  orgId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(
        `${baseURL}/${orgId}/employees/${employeeId}/education`,
        data,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteEmployeeEducationDetails = (
  educationId,
  orgId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.delete(
        `${baseURL}/${orgId}/employees/${employeeId}/education/${educationId}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getEmployeeCertificatesDetails = (
  orgId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/certificates`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const viewCertificates = (orgId, employeeId, ImageKey, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/resource?resourceKey=${ImageKey}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateEmployeeCertificatesDetails = (
  data = {},
  orgId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(
        `${baseURL}/${orgId}/employees/${employeeId}/certificates`,
        data,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteEmployeeCertificatesDetails = (
  certificateId,
  orgId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.delete(
        `${baseURL}/${orgId}/employees/${employeeId}/certificate/${certificateId}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getEmployeeExperiencesDetails = (
  orgId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/experiences`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const updateEmployeeExperiencesDetails = (
  data = {},
  orgId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(
        `${baseURL}/${orgId}/employees/${employeeId}/experiences`,
        data,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteEmployeeExperiencesDetails = (
  experienceId,
  orgId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.delete(
        `${baseURL}/${orgId}/employees/${employeeId}/experiences/${experienceId}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteEmployeeExperienceTool = (
  toolId,
  experienceId,
  orgId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.delete(
        `${baseURL}/${orgId}/employees/${employeeId}/experiences/${experienceId}/tool/${toolId}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getEmployeeProjectsDetails = (orgId, employeeId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/projects`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const updateEmployeeProjectsDetails = (
  data = {},
  orgId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(
        `${baseURL}/${orgId}/employees/${employeeId}/projects`,
        data,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteEmployeeProjectsDetails = (
  projectId,
  orgId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.delete(
        `${baseURL}/${orgId}/employees/${employeeId}/projects/${projectId}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteEmployeeProjectTool = (
  toolId,
  projectId,
  orgId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.delete(
        `${baseURL}/${orgId}/employees/${employeeId}/projects/${projectId}/tool/${toolId}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getSkills = (filterBy, searchKey, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/skills?filterBy=${filterBy}&searchKey=${searchKey}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getEmployeeSkillsDetails = (orgId, employeeId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/skills`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const updateEmployeeSkillsDetails = (
  data = {},
  orgId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(
        `${baseURL}/${orgId}/employees/${employeeId}/skills`,
        data,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteEmployeeSkillsDetails = (
  skillId,
  orgId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.delete(
        `${baseURL}/${orgId}/employees/${employeeId}/skills/${skillId}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getSkillsOptions = (orgId, employeeId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/designationskills`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const addSkill = (data, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(`${baseURL}/skills`, data, {
        headers: header,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const updateEmployeeStatus = (
  data = {},
  orgId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.put(
        `${baseURL}/${orgId}/employees/${employeeId}/employeeStatus`,
        data,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getManagerTeamGeneralFeedback = (
  orgId,
  managerId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/manager/${managerId}/generalfeedbackteam`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getManagerEmployeeGeneralFeedbackDetails = (
  orgId,
  managerId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/manager/${managerId}/generalfeedbackskills?employeeId=${employeeId}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateGeneralFeedback = (
  data = {},
  orgId,
  managerId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(
        `${baseURL}/${orgId}/manager/${managerId}/generalfeedback?employeeId=${employeeId}`,
        data,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getManagerTeam = (orgId, managerId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/manager/${managerId}/employees`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateManagerTeam = (data = {}, orgId, managerId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(
        `${baseURL}/${orgId}/manager/${managerId}/employee`,
        data,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getDepartments = (orgId, filter = "", header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/departments${filter && "?filter=" + filter}`,
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

export const getDesignations = (orgId, department = "", header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/designations${
          (department && "?departmentId=" + department.id) || ""
        }`,
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

export const getManagerSubordinates = (
  department = "",
  designation = "",
  search = "",
  orgId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/manager/${employeeId}/subordinates?${
          "searchKey=" +
          search +
          ((department && "&departmentId=" + department.id) || "") +
          ((designation && "&designationId=" + designation.id) || "")
        }`,
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

export const removeManagerTeamEmployee = (
  employeeId,
  orgId,
  managerId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.delete(
        `${baseURL}/${orgId}/manager/${managerId}/employee`,
        {
          data: {
            employeeId,
          },
          headers: header,
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const updateManagerTeamEmployee = (
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.delete(
        // `${baseURL}/${orgId}/manager/${managerId}/employee`,
        `${baseURL}/employee`,
        {
          data: {
            employeeId,
          },
          headers: header,
        }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getOrganizationManagers = (
  orgId,
  searchKey,
  department,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/managers?searchKey=${searchKey}&department=${department}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const saveDepartmentHead = (
  orgId,
  departmentId,
  data = {},
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(
        `${baseURL}/${orgId}/department/${departmentId}/head`,
        data,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getManagerDetails = (orgId, employeeId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employee/${employeeId}/managers`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getLeaderboardRegions = (orgId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(`${baseURL}/${orgId}/regions`, {
        headers: header,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getCareerpathDetails = (orgId, employeeId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/careerpath/detail`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getCareerpathDesignations = (orgId, employeeId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/careerpath`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getDesignationsSkills = (orgId, employeeId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/designationskills`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getSkillComparisonDetails = (
  orgId,
  employeeId,
  designationId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/skillgap?designationId=${designationId}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const requestCareerpath = (
  orgId,
  employeeId,
  forwardDesignationId,
  data = {},
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(
        `${baseURL}/${orgId}/employees/${employeeId}/careerpathrequest?designationId=${forwardDesignationId}`,
        data,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getCourses = (
  orgId,
  employeeId,
  skillTypeId,
  isPaid,
  limit,
  offset,
  designationId,
  filter,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/courses?skillType=${skillTypeId}&isPaid=${isPaid}&limit=${limit}&offset=${offset}&designationId=${designationId}&filter=${filter}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateLikeCourse = (
  orgId,
  employeeId,
  courseId,
  data = {},
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(
        `${baseURL}/${orgId}/employees/${employeeId}/courses/${courseId}/approvalRequest`,
        data,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const requestCourseApproval = (
  orgId,
  employeeId,
  courseId,
  data = {},
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(
        `${baseURL}/${orgId}/employees/${employeeId}/courses/${courseId}/approval`,
        data,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const sendLeaderboardFavourite = (
  data = {},
  orgId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.put(
        `${baseURL}/${orgId}/employees/${employeeId}/favourite`,
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

export const getEmployeeGenralFeedback = (orgId, employeeId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employee/${employeeId}/allgeneralfeedback`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getEmployeeGoalsFeedback = (
  orgId,
  employeeId,
  userRole,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/${userRole}/${employeeId}/goals`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getManagerEmployeeGoalsFeedback = (
  orgId,
  managerId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/manager/${managerId}/employeegoals?employeeId=${employeeId}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getManagerEmployeeGoalsFeedbacknew = (
  orgId,
  managerId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/goals/`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getEmployeeGoalsFeedbackStatus = (
  orgId,
  employeeId,
  goalId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/goalsfeedbackstatus?goalId=${goalId}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const requestGoalFeedback = (
  orgId,
  employeeId,
  data = {},
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(
        `${baseURL}/${orgId}/employees/${employeeId}/goalsfeedback`,
        data,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllEmployeeGoalsFeedback = (
  orgId,
  employeeId,
  month,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employee/${employeeId}/allfeedback?month=${month}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getGoalsFeedbackComments = (
  orgId,
  employeeId,
  goalId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employee/${employeeId}/allcomments?goalId=${goalId}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getManagerEmployeeAllGoalsFeedback = (
  orgId,
  managerId,
  month,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/manager/${managerId}/allfeedback?month=${month}&employeeId=${employeeId}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getManagerEmployeeAllGeneralFeedback = (
  orgId,
  managerId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/manager/${managerId}/allgeneralfeedback?employeeId=${employeeId}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getGoalTypes = (orgId, managerId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/manager/${managerId}/goaltypes`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const saveManagerGoalDetails = (
  orgId,
  managerId,
  data = {},
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(
        `${baseURL}/${orgId}/manager/${managerId}/goals`,
        data,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getManagerEmployeesGoalsFeedback = (
  orgId,
  managerId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/manager/${managerId}/goalsfeedbackEmployees`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getEmployeeRequestGoalsFeedback = (
  orgId,
  managerId,
  employeeId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/manager/${managerId}/goalsfeedback?employeeId=${employeeId}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateManagerEmployeeGoalsFeedback = (
  orgId,
  managerId,
  data = {},
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.put(
        `${baseURL}/${orgId}/manager/${managerId}/goalsfeedback`,
        data,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getRequestCourseApproval = (
  orgId,
  userRole,
  employeeId,
  offset,
  limit,
  search,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/${userRole}/${employeeId}/courseapprovals?offset=${offset}&limit=${limit}&search=${search}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getManagerRequestCourseApproval = (
  orgId,
  userRole,
  employeeId,
  status,
  deptValue,
  searchKey,
  offset,
  limit,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(searchKey);
      let response = await request.get(
        `${baseURL}/${orgId}/${userRole}/${employeeId}/courseapprovals?approvalStatus=${status}&department=${deptValue}&searchKey=${searchKey}&offset=${offset}&limit=${limit}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateRequestCourseApproval = (
  orgId,
  userRole,
  employeeId,
  data = {},
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.put(
        `${baseURL}/${orgId}/${userRole}/${employeeId}/courseapprovals`,
        data,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getCareerpathRequestList = (orgId, employeeId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/manager/${employeeId}/careerpathrequest/list`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateCareerpathRequest = (
  orgId,
  employeeId,
  data = {},
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.put(
        `${baseURL}/${orgId}/manager/${employeeId}/careerpathrequest`,
        data,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getEmployeeCareerpathRequest = (
  orgId,
  employeeId,
  careerPathApprovalId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/manager/${employeeId}/careerpathrequest/${careerPathApprovalId}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getFilterOption = (orgId, viewType, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/filter?view=${viewType}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getUserManagementSearch = (
  orgId,
  offset,
  limit,
  role,
  search,
  filter = "",
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees?offset=${offset}&limit=${limit}&roleType=${role}${
          (search && `&searchKey=${search}`) || ""
        }${filter && "&" + filter}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getUserManagementEmployeeDetails = (
  orgId,
  offset,
  limit,
  role,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees?offset=${offset}&limit=${limit}&roleType=${role}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAddAdminSearch = (orgId, search, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/nonadmins?searchKey=${search}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAdminAccessTypes = (orgId, empId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/accesstypes?employeeId=${empId}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAddAdminTierList = (orgId, tierTypeId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/tierslist?tierTypeId=${tierTypeId}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const createAdmin = (orgId, empId, orgTierId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(
        `${baseURL}/${orgId}/createadmin?employeeId=${empId}&organizationTierId=${orgTierId}`,
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

export const getEmployeeCurriculums = (orgId, employeeId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/curriculum`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getEmployeeCurriculumObjectives = (
  orgId,
  employeeId,
  curriculumId,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/employees/${employeeId}/curriculum/${curriculumId}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getManagerDashboardGoals = (orgId, employeeId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/manager/${employeeId}/goals`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getDashboardKPI = (orgId, role, employeeId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `dashboard/${orgId}/${role}/${employeeId}/dashboardKPI`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllDepartments = (orgId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `organizations/${orgId}/departments`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const createDepartment = (orgId, data = {}, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(
        `${baseURL}/${orgId}/addDepartment`,data,
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
export const getDashboardAssessments = (
  orgId,
  role,
  employeeId,
  durationInMonths,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `dashboard/${orgId}/${role}/${employeeId}/assessmentQuotaMetrics?durationInMonths=${durationInMonths}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getDashboardCriticalGapMetrics = (
  orgId,
  role,
  employeeId,
  durationInMonths,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `dashboard/${orgId}/${role}/${employeeId}/criticalGapMetrics?durationInMonths=${durationInMonths}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getDashboardSkillImprovementMetrics = (
  orgId,
  role,
  employeeId,
  durationInMonths,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `dashboard/${orgId}/${role}/${employeeId}/skillImprovementMetrics?durationInMonths=${durationInMonths}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export const getActivities = (
  orgId,
  role,
  employeeId,
  durationInMonths,
  header = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `dashboard/${orgId}/${role}/${employeeId}/activityCount?durationInMonths=${durationInMonths}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getAlldesignctionByID = (orgId,depID, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `organizations/${orgId}/department/${depID}/designations/`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllSkills = (orgId,designID, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `organizations/${orgId}/designations/${designID}/skill/`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getUpwordCarrerPath = (orgId,depID,levelID, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `organizations/${orgId}/department/${depID}/designations/?upwardLevelId=${levelID}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getLateralCarrerPath = (orgId, depID, levelID, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `organizations/${orgId}/department/${depID}/designations?lateralLevelId=${levelID}`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const getAllMetaDataDetails = (orgId, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `organizations/${orgId}/designationsmetadata`,
        { headers: header }
      );
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
export const createdesigntion = (orgId,depID, data = {}, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(
        `${baseURL}/${orgId}/department/${depID}/addDesignations/`,data,
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

export const createSkiils = (orgId,designID, data = {}, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(
        `${baseURL}/${orgId}/designations/${designID}/addSkillToDesignation/`,data,
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

export const EditSkills = (orgId,depID, data = {}, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.put(
        `${baseURL}/${orgId}/skill/${depID}/`,data,
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

export const GetAllupworddetailsByDesigntionID = (orgId,depID = {}, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/designations/${depID}/carrierpath/`,
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
export const GetAllCitiesList = (orgId = {}, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/cityList/`,
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

export const GetAllLocationList = (orgId,cityId = {}, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/location/${cityId}`,
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

export const GetManagerList = (orgId = {}, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/managerList/`,
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
export const AddOrgEmployee = (orgId,data = {}, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.post(
        `${baseURL}/${orgId}/addOrgEmployee/`,data,
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

export const GetAllorgRole = (orgId,data = {}, header = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await request.get(
        `${baseURL}/${orgId}/orgRole/`,
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


