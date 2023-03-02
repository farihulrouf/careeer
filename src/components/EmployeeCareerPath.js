import React, { Component } from "react";
import CareerPathDesignationTree from "./CareerPathDesignationTree";
import CareerPage from "../pages/CareerPath/CareerPage";
import {
  getCareerpathDetails,
  getSkillComparisonDetails,
} from "../core/apiClient/organization/organizationClient";
import { decryptData } from "../utils/encryptDecrypt";
import { message } from "antd";
class EmployeeCareerPath extends Component {
  state = {
    skillsChartDetails: [],
    requestModel: {
      managerName: "",
      title: "Career Path Request",
      subTitle: "Your manager",
    },
  };

  async componentDidMount() {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);

    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await getCareerpathDetails(orgId, employeeId, {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          let id = data.employeeDetails.currentDesignationId;
          this.setState({ careerPathDetail: data });
          this.loadSkillComparisonChart(id);
        }
        document.toggleLoading();
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
        document.toggleLoading();
      }
    }
  }

  loadSkillComparisonChart = async (designationId) => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await getSkillComparisonDetails(
          orgId,
          employeeId,
          designationId,
          {
            Authorization: token,
          }
        );
        let skillsChartDetails = [];
        if (status >= 200 && status < 300) {
          if (data.skillCounter) {
            const entries = Object.entries(data.skillCounter);
            for (const [type, count] of entries) {
              let skillValue = "";
              let skillCounterKeyList = {
                skillType: "",
                totalSkills: "",
                requiredSkills: "",
                gainedSkills: "",
                requiredSkillsPercentage: "",
                gainedSkillsPercentage: "",
              };

              skillValue =
                type === "technicalSkills"
                  ? "Technical Skills"
                  : type === "functionalSkills"
                  ? "Functional Skills"
                  : type === "interpersonalSkills"
                  ? "Interpersonal Skills"
                  : "Stakeholder Skills";

              skillCounterKeyList.skillType = skillValue;
              skillCounterKeyList.totalSkills = count.totalSkills;
              skillCounterKeyList.requiredSkills = count.requiredSkills;
              skillCounterKeyList.gainedSkills = count.gainedSkills;
              skillCounterKeyList.level = count.level;
              skillCounterKeyList.skillStatus = count.skillStatus
              skillCounterKeyList.requiredSkillsPercentage =
                count.requiredSkillsPercentage;
                skillCounterKeyList.skillStatus = count.skillStatus;
              skillCounterKeyList.gainedSkillsPercentage =
                count.gainedSkillsPercentage;
              skillsChartDetails.push(skillCounterKeyList);
            }
            this.setState({ skillsChartDetails });
          }
        }
        document.toggleLoading();
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
        document.toggleLoading();
      }
    }
  };

  render() {
    return (
      <div
        style={{
          background: "#F8F8F8",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: "Open Sans Semibold",
            fontSize: 18,
            margin: "18px 0 0 25px",
            color: "#303030",
          }}
        >
          Career Path
        </div>
        <div>
          <CareerPathDesignationTree {...this.state} />
        </div>
        <div style={{ marginTop: 56 }}>
          <CareerPage
            careerPathDetail={this.state.careerPathDetail}
            skillsChartDetails={this.state.skillsChartDetails}
            loadSkillComparisonChart={this.loadSkillComparisonChart}
          />
        </div>
      </div>
    );
  }
}

export default EmployeeCareerPath;
