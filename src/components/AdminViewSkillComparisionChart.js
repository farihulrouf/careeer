import React, { Component } from "react";
import {
  getCareerpathDetails,
  getSkillComparisonDetails,
} from "../core/apiClient/organization/organizationClient";
import { decryptData } from "../utils/encryptDecrypt";
import SkillComparisonChart from "./SkillComparisonChart";
import styled from "styled-components";

const Div = styled.div`
  padding: 2.5% 5%;
  color: #303030;
  border-radius: inherit;
  .admin-skill-title {
    font-family: Open Sans Semibold;
    font-size: 1.143em;
  }
  .chart-div {
    display: flex;
    width: 60%;
    flex-direction: column;
    font-family: "Open Sans Regular";
  }
  .admin-skill-chart-container {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.875em;
    margin-top: 10px;
  }

  .admin-skill-chart-button-container {
    display: flex;
    color: rgb(119, 119, 119);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    margin-top: 15px;
    margin-bottom: 25px;
  }

  .admin-skill-chart-legend {
    font-size: 1em;
    display: flex;
    justify-content: space-around;
    margin-top: 15px;
    width: 100%;
    padding: 0px 15%;
  }
  .admin-skill-chart-button {
    width: 40%;
    font-family: "Open Sans Semibold";
    font-size: 1em;
    margin-top: 10px;
  }
`;

class AdminViewSkillComparisonChart extends Component {
  constructor(props) {
    super(props);
    this.state = { skillsChartDetails: [], isLoading: false };
  }

  async componentDidMount() {
    document.toggleLoading(true);
    let orgId = decryptData(localStorage.orgId),
      employeeId = this.props.selectedUser
        ? this.props.selectedUser
        : decryptData(localStorage.employeeId),
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
        document.message.error(
          "Unable to fetch details, please try after sometime"
        );
        document.toggleLoading();
      }
    }
  }

  loadSkillComparisonChart = async (designationId) => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = this.props.selectedUser
        ? this.props.selectedUser
        : decryptData(localStorage.employeeId),
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
              skillCounterKeyList.requiredSkillsPercentage =
                count.requiredSkillsPercentage;
                skillCounterKeyList.skillStatus = count.skillStatus
              skillCounterKeyList.gainedSkillsPercentage =
                count.gainedSkillsPercentage;
              skillsChartDetails.push(skillCounterKeyList);
            }
            this.setState({ skillsChartDetails });
          }
        }
        document.toggleLoading();
      } catch (error) {
        document.message.error(
          "Unable to fetch details, please try after sometime"
        );
        document.toggleLoading();
      }
    }
  };

  render() {
    return (
      <Div>
        <div className="admin-skill-title">Skill Gap Analysis</div>
        <div className="admin-skill-chart-container">
          {this.state.skillsChartDetails && (
            <SkillComparisonChart
              skillsChartData={this.state.skillsChartDetails}
              height="245px"
            />
          )}
        </div>
      </Div>
    );
  }
}

export default AdminViewSkillComparisonChart;
