import React, { Component } from "react";
import styled from "styled-components";
import CriticalGapAnalysisChart from "../../CriticalGapAnalysisCard";
import AdminManagerDashboardSkillPerformance from "../AdminManagerDashboardSkillPerformance";
import AdminManagerDashboardTeamGoalsList from "../AdminManagerDashboardTeamGoalsList";
import FeatureAdminManagerDashboardKPICard from "../FeatureAdminManagerDashboardKPICard";
import Target from "../../../assets/images/target.svg";
import BusinessGroup from "../../../assets/images/BusinessGroup.svg";
import Report from "../../../assets/images/report.svg";
import Team from "../../../assets/images/team.svg";
import CustomerMessage from "../../../assets/images/CustomerMessage.svg";
import Presentation from "../../../assets/images/presentation.svg";
import OverallPerformance from "../ManagerDashboardOverallPerformance";
import GlobalMap from "../../GlobalMap";
import { decryptData } from "../../../utils/encryptDecrypt";
import {
  getManagerDashboardGoals,
  getDashboardKPI,
  getDashboardAssessments,
  getDashboardCriticalGapMetrics,
  getDashboardSkillImprovementMetrics,
  getActivities
} from "../../../core/apiClient/organization/organizationClient";
import AdminManagerAssessmentCard from "../AdminManagerAssesmentCard";
import { message } from "antd";

const Div = styled.div`
  background-color: #f8f8f8;
  font-family: Open Sans Regular;
  color: #303030;
  padding: 1% 2%;
  margin-bottom: 3%;
  font-size: 16px;
  .dahboard-title {
    font-family: Open Sans Semibold;
    font-size: 1.125em;
  }

  .dashboard-sub-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
  }
  .dashboad-map-overall-performance-wrapper {
    display: flex;
    flex-direction: row;
  }
  .dashboard-KPI-card-container {
    width: 100%;
    color: #303030;
    box-shadow: 1px 4px 12px #00000027;
    border-radius: 8px;
    height: inherit;
    padding: 1.6%;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    margin: 16px 0;
  }
  .dashboard-kpi-cards {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 4%;
  }

  .dashboard-card {
    width: 100%;
    color: #303030;
    box-shadow: 1px 4px 12px #00000027;
    border-radius: 8px;
    height: 335px;
    padding: 3%;
    background: #ffffff;
    display: flex;
    flex-direction: column;
  }
  .dashboard-card-title {
    font-family: Open Sans Semibold;
    font-size: 1.09em;
    margin-bottom: 10%;
  }
`;

class ManagerDashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillGap: [
        { name: "L1", value: 100 },
        { name: "L2", value: 0 },
      ],
      skillPerformanceData: [
        { id: "1", name: "L1", value: 100 },
        { id: "2", name: "L2", value: 0 },
      ],
      filterOption: [
        { label: "1 yr", months: 12 },
        { label: "6 mon", months: 6 },
        { label: "3 mon", months: 3 },
      ],
      selectedFilter: "6 mon",
      employeeTeamList: [],
      kpiCardData: [
        {
          title: "Number of Reportees",
          icon: Team,
          count: 0,
          cardColor: { color1: " #fcdf9b", color2: "#f69b94" },
        },
        {
          title: "Active Reportees",
          icon: BusinessGroup,
          count: 0,
          cardColor: { color1: " #fd99af", color2: "#EE68AA" },
        },
        {
          title: "Goals assigned",
          icon: Target,
          count: 0,
          cardColor: { color1: " rgb(181, 255, 230)", color2: "#74D4B0" },
        },
        {
          title: "Feedbacks",
          icon: CustomerMessage,
          count: 0,
          cardColor: { color1: " #5BDDE2", color2: "#64A7E9" },
        },
        {
          title: "Career path proposed",
          icon: Report,
          count: 0,
          cardColor: { color1: "#A862D1", color2: "#5E4DB9" },
        },
        {
          title: "Assessment taken",
          icon: Presentation,
          count: 0,
          cardColor: { color1: " #F18081", color2: "#F39192" },
        },
      ],
      assessments: [],
      remainingAssessments: 0,
      activityData: [{
        month: "",
        activity: 0
      }]
    };
  }
  componentDidMount = () => {
    this.loadTeamGoals();
    this.loadDashboardKPI();
    this.loadDashboardAssessments(6);
    this.loadDashboardCriticalGap(6);
    this.loadDashboardSkillImprovement(6);
    this.loadActivities(6)
  };

  loadTeamGoals = async () => {
    let orgId = decryptData(localStorage.orgId),
      token = decryptData(localStorage.token),
      employeeId = decryptData(localStorage.employeeId);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await getManagerDashboardGoals(
          orgId,
          employeeId,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          let employeeTeamList = this.state.employeeTeamList;
          let goalsData = data.employeeDetails;
          for (let i = 0; i < goalsData.length; i++) {
            if (i <= 4) {
              let obj = {};
              obj.profilePicture = goalsData[i].profilePicture;
              obj.firstName = goalsData[i].firstName;
              obj.middleName = goalsData[i].middleName;
              obj.lastName = goalsData[i].lastName;
              obj.designation = goalsData[i].designation;
              let percentage = 0;
              if (goalsData[i].goals) {
                let goals = goalsData[i].goals;
                for (let j = 0; j < goals.length; j++) {
                  percentage = percentage + goals[j].completionPercentage;
                }
                percentage = percentage / goals.length;
              }
              obj.status = Math.round(percentage);
              employeeTeamList.push(obj);
            }
          }
          this.setState({ employeeTeamList: employeeTeamList });
        }
        document.toggleLoading();
      } catch (error) {
        document.message.error("Something went wrong! Please try again later.");
        document.toggleLoading();
      }
    }
  };

  loadDashboardKPI = async () => { 
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId);
    let token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let response = await getDashboardKPI(orgId, "manager", employeeId, {
          Authorization: token,
        });
        if (response.status === 200) {
          let data = response.data;
          let kpiCardData = this.state.kpiCardData;
          kpiCardData[0].count = data.totalEmployees ? data.totalEmployees : 0;
          kpiCardData[1].count = data.activeReportees.length
            ? data.activeReportees.length
            : 0;
          kpiCardData[2].count = data.goalsAssigned ? data.goalsAssigned : 0;
          kpiCardData[3].count = data.feedbacksProvided
            ? data.feedbacksProvided
            : 0;
          kpiCardData[4].count = data.careerPathsProposed
            ? data.careerPathsProposed
            : 0;
          kpiCardData[5].count = data.assessmentsTaken
            ? data.assessmentsTaken
            : 0;
          this.setState({ kpiCardData: kpiCardData });
        }
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime ");
      }
      document.toggleLoading();
    }
  };

  loadDashboardAssessments = async (durationInMonths) => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId);
    let token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        let response = await getDashboardAssessments(
          orgId,
          "manager",
          employeeId,
          durationInMonths,
          {
            Authorization: token,
          }
        );
        if (response.status === 200) {
          let data = response.data;
          let assessments = data.consumed ? data.consumed : [];
          // assessments.push({ name: "remaining", count: data.remaining || 0 });
          this.setState({
            assessments: assessments,
            totalAssessments: data.total ? data.total : 0,
            remainingAssessments: data.remaining || 0
          });
        }
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
      }
    }
  };

  loadDashboardCriticalGap = async (durationInMonths) => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId);
    let token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        let response = await getDashboardCriticalGapMetrics(
          orgId,
          "manager",
          employeeId,
          durationInMonths,
          {
            Authorization: token,
          }
        );
        if (response.status === 200) {
          let data = response.data;
          let skillGap = [];
          let skillGapPercent = data.criticalGap || 0;
          let remainingSkillGapPercent = 100 - skillGapPercent;
          skillGap.push({ name: "L2", value: remainingSkillGapPercent })
          skillGap.push({ name: "L1", value: skillGapPercent })
          this.setState({ skillGap: skillGap });
        }
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
      }
    }
  };

  loadDashboardSkillImprovement = async (durationInMonths) => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId);
    let token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        let response = await getDashboardSkillImprovementMetrics(
          orgId,
          "manager",
          employeeId,
          durationInMonths,
          {
            Authorization: token,
          }
        );
        if (response.status === 200) {
          let data = response.data;
          let skillPerformanceData = this.state.skillPerformanceData;
          let skillImprovement = data.skillImprovement || 0;
          let remainingSkillImprovement = 100 - skillImprovement;
          skillPerformanceData[0].value = remainingSkillImprovement;
          skillPerformanceData[1].value = skillImprovement;
          this.setState({ skillPerformanceData: skillPerformanceData });
        }
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
      }
    }
  };

  loadActivities = async (durationInMonths) => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId);
    let token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        let response = await getActivities(
          orgId,
          "manager",
          employeeId,
          durationInMonths,
          {
            Authorization: token,
          }
        );
        if (response.status === 200) {
          let data = response.data;
          if(data.length > 0){
            this.setState({ activityData: data })
          }
        }
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
      }
    }
  };

  filterHandler = (label, months) => {
    this.loadDashboardSkillImprovement(months);
    this.setState({ selectedFilter: label });
  };
  assessmentFilterHandler = (months) => {
    this.loadDashboardAssessments(months);
  };
  criticalGapFilterHandler = (months) => {
    this.loadDashboardCriticalGap(months);
  };

  render() {
    return (
      <Div>
        <div className="dahboard-title">Dashboard</div>
        <div className="dashboard-KPI-card-container">
          <div className="dashboard-kpi-cards">
            {this.state.kpiCardData.map((eachCard, eachCardIndex) => (
              <div key={eachCardIndex}>
                <FeatureAdminManagerDashboardKPICard
                  cardContent={{
                    title: eachCard.title,
                    numContent: eachCard.count,
                    icon: eachCard.icon,
                    cardShadow: eachCard.cardColor.color2,
                    cardColor: `linear-gradient(to bottom right, ${eachCard.cardColor.color1} 30%,  ${eachCard.cardColor.color2} 80%)`,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="dashboad-map-overall-performance-wrapper">
            <GlobalMap />
            <OverallPerformance 
              activityData={this.state.activityData}
              handleActivities={(months)=>this.loadActivities(months)}
            />
          </div>
        </div>
        <div className="dashboard-sub-container">
          <div style={{ width: "100%", height: 335 }}>
            <CriticalGapAnalysisChart
              skillGap={this.state.skillGap}
              filterHandler={this.criticalGapFilterHandler}
            />
          </div>
          <div style={{ width: "100%", height: 335 }}>
            <AdminManagerDashboardSkillPerformance
              selectedFilter={this.state.selectedFilter}
              filterOption={this.state.filterOption}
              skillPerformanceData={this.state.skillPerformanceData}
              label1="Covered their skill gap"
              label2="Yet to cover their skill gap"
              filterOptionHandler={this.filterHandler}
            />
          </div>
          <div className="dashboard-card">
            <div>
              <AdminManagerAssessmentCard
                totalAssessments={this.state.totalAssessments}
                assessments={this.state.assessments}
                remainingAssessments={this.state.remainingAssessments}
                filterHandler={this.assessmentFilterHandler}
              />
            </div>
          </div>
          <div
            style={{
              margin: "0 auto",
              width: "100%",
              fontSize: "14px",
              height: "335px",
            }}
          >
            <AdminManagerDashboardTeamGoalsList
              employeeTeamList={this.state.employeeTeamList}
              onClickViewAll={null}
              title="My Team Goals"
            />
          </div>
        </div>
      </Div>
    );
  }
}

export default ManagerDashboardPage;
