import React, { Component } from "react";
import { decryptData } from "../../../utils/encryptDecrypt";
import { getEmployeeGoalsFeedback } from "../../../core/apiClient/organization/organizationClient";
import UserProfileCard from "../../../components/UserProfileCard";
import UserProfilePointsAndBadgesCard from "../../../components/EmployeeUserProfilePoints";
import SkillScoreCard from "../../../components/SkillScoreCard";
import EmployeeDashboardMySkillsCard from "../../../components/EmployeeDashboardMySkillsCard";
import AdminViewCareerPathDesignationTree from "../../../components/AdminViewCareerPathDesignationTree";
import EmployeeDashboardMyGoalsCard from "../../../components/EmployeeDashboardMyGoalsCard";
import EmployeeDashboardLeaderBoardView from "../../../components/EmployeeDashboardLeaderBoardView";
import RoleBasedCurriculum from "../Employee/RoleBasedCurriculum/index";
import EmployeeLoginPopUp from "../../../components/EmployeeLoginPopUp";
class EmployeeDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      selectedUser: null,
      leaderboardDetails: {
        earnedPoints: 320,
        earnedBadges: 3,
      },
      mySkillScore: {
        earnedScore: 48,
        totalScore: 100,
      },
      goals: [],
      mySkills: [
        {
          skillType: "Technical",
          progressPercentage: 8,
          color: "#FFB97D",
          trailColor: "#FFF5EC",
        },
        {
          skillType: "Functional",
          progressPercentage: 30,
          color: "#9898F7",
          trailColor: "#F0F0FE",
        },
        {
          skillType: "Interpersonal",
          progressPercentage: 65,
          color: "#FF8C96",
          trailColor: "#FDEEEF",
        },
        {
          skillType: "Stakeholder",
          progressPercentage: 100,
          color: "#9698C7",
          trailColor: "#F3F3F9",
        },
      ],
    };
  }

  componentDidMount = () => {
    this.loadEmployeeDetails();
    this.loadEmployeeGoals();
  };

  loadEmployeeDetails = async () => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId);
    if (orgId && employeeId) {
      this.setState({
        selectedUser: employeeId,
      });
    }
  };

  loadEmployeeGoals = async () => {
    try {
      let orgId = decryptData(localStorage.orgId),
        employeeId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      if (orgId && employeeId) {
        document.toggleLoading(true);
        let { data, status } = await getEmployeeGoalsFeedback(
          orgId,
          employeeId,
          "employees",
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          this.setState({
            goals: data,
          });
        }
        document.toggleLoading();
      }
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  viewProfileHandler = () => {
    window.open("/employee/dashboard/profile", "_self");
  };

  updateLikeStatus = () => {};
  popUpHandler = () => {
    localStorage.setItem("welComePopUpMsg", "false");
    this.setState({ show: false });
  };
  render() {
    return (
      <div
        style={{
          background: "#F8F8F8",
          fontFamily: "Open Sans Regular",
          color: "#303030",
          padding: "20px",
          fontSize: 16,
        }}
      >
        {localStorage.welComePopUpMsg === "true" && this.state.show && (
          <EmployeeLoginPopUp
            width="38%"
            selectedUser={this.state.selectedUser}
            popUpHandler={this.popUpHandler}
          />
        )}
        <div
          style={{
            fontFamily: "Open Sans Semibold,Regular",
            fontSize: "1.126em",
          }}
        >
          Dashboard
        </div>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            height: "167px",
            marginBottom: "16px",
          }}
        >
          <div style={{ flex: 1, marginRight: "16px" }}>
            <UserProfileCard
              isViewProfile={true}
              {...this.state}
              viewProfileHandler={this.viewProfileHandler}
            />
          </div>
          <div style={{ flex: 0.7, marginRight: "16px" }}>
            <UserProfilePointsAndBadgesCard {...this.state} />
          </div>
          <div
            style={{
              flex: 0.6,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#FFFFFF",
              borderRadius: "8px",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            }}
          >
            <SkillScoreCard {...this.state} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: "325px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "#FFFFFF",
              marginRight: "16px",
              borderRadius: "8px",
            }}
          >
            <EmployeeDashboardMySkillsCard {...this.state} {...this.props} />
          </div>
          <div
            style={{
              flex: 1.05,
              background: "#FFFFFF",
              height: "100%",
              borderRadius: "8px",
            }}
          >
            <EmployeeDashboardLeaderBoardView {...this.state} {...this.props} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: "320px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              flex: 0.956,
              background: "#FFFFFF",
              marginRight: "17px",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              borderRadius: "8px",
              position: "relative",
              height: "100%",
            }}
          >
            <div
              onClick={this.props.careerViewDetails}
              style={{
                position: "absolute",
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
                top: 16,
                right: 26,
              }}
            >
              <div
                onClick={() => this.props.getViewDetailsRoute("careerPath")}
                style={{
                  color: "#F46773",
                  cursor: "pointer",
                  fontSize: "0.875em",
                }}
              >
                <u>View details</u>
              </div>
            </div>
            <AdminViewCareerPathDesignationTree
              selectedUser={this.state.selectedUser}
            />
          </div>
          <div
            style={{
              flex: 1,
              background: "#FFFFFF",
              height: "100%",
            }}
          >
            <EmployeeDashboardMyGoalsCard {...this.state} {...this.props} />
          </div>
        </div>
        <div>
          <RoleBasedCurriculum />
        </div>
      </div>
    );
  }
}

export default EmployeeDashboard;
