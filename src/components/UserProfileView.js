import React, { Component } from "react";
import "../assets/css/OpenSans.css";
import Button from "./Button";
import UserProfileCard from "./UserProfileCard";
import UserProfilePointsAndBadgesCard from "./UserProfilePointsAndBadgesCard";
import SkillScoreCard from "./SkillScoreCard";
import { withRouter } from "react-router-dom";
import AdminViewActivityVsSkillPerformance from "./AdminViewActivityVsSkillPerformance";
import AdminViewUserProfileAssessment from "./AdminViewUserProfileAssessment";
import UserProfileAccordionGroup from "./UserProfileAccordionGroup";
import "../assets/css/ScrollBarDesign.css";
import CareerPathDesignationTree from "./AdminViewCareerPathDesignationTree";
import AdminViewSkillComparisionChart from "./AdminViewSkillComparisionChart";
import goalIcon from "../assets/images/goalsIcon.svg";
import activityLogIcon from "../assets/images/activityLogIcon.svg";
import empProfile from "../assets/images/empProfile.svg";
import AdminManagerActivities from "./AdminManagerActivities";
import GoalStatusCardGroup from "./GoalStatusCardGroup";
import AdminViewEmployeeProfileDetails from "./AdminViewEmployeeProfileDetails";

class UserProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Goals: false,
      EmployeeProfileDetails: false,
      ActivityLog: false,
      employeeId: this.props.match.params.employeeId,
    };
  }

  toggleHandler = (title) => {
    let name = title.replace(/\s/g, "");
    if (name === "Goals") {
      this.setState({
        [name]: !this.state.Goals,
        ActivityLog: false,
        EmployeeProfileDetails: false,
      });
    } else if (name === "ActivityLog") {
      this.setState({
        [name]: !this.state.ActivityLog,
        Goals: false,
        EmployeeProfileDetails: false,
      });
    } else {
      this.setState({
        [name]: !this.state.EmployeeProfileDetails,
        Goals: false,
        ActivityLog: false,
      });
    }
  };

  render() {
    return (
      <div
        className="scrollContainer"
        style={{
          display: "flex",
          flexDirection: "column",
          background: "#F8F8F8",
          padding: "1.5% 2%",
          overflowX: "hidden",
          fontFamily: "Open Sans Regular",
        }}
      >
        <div
          style={{
            fontSize: "0.875em",
            fontFamily: "Open Sans Regular",
            color: "#767676",
          }}
        >
          {this.props.viewProfileFrom
            ? this.props.viewProfileFrom + " > User Profile"
            : "User Profile"}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              flex: 1,
              fontSize: 18,
              fontFamily: "Open Sans SemiBold",
              color: "#303030",
            }}
          >
            {this.props.viewProfileFrom === "User Management"
              ? "User Management"
              : ""}
          </div>
          <div
            onClick={() => this.props.history.goBack()}
            style={{
              width: "104px",
              fontSize: 14,
              fontFamily: "Open Sans Regular",
            }}
          >
            <Button
              label={"< Back"}
              styles={{
                color: "#FF808B",
                backgroundColor: "transparent",
                border: "#FF808B",
                height: "40px",
              }}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: "8px",
            display: "flex",
            height: "167px",
            marginBottom: "16px",
          }}
        >
          <div style={{ flex: 1, marginRight: "16px" }}>
            <UserProfileCard selectedUser={this.state.employeeId} />
          </div>
          <div style={{ flex: 0.7, marginRight: "16px" }}>
            <UserProfilePointsAndBadgesCard
              selectedUser={this.state.employeeId}
            />
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
            <SkillScoreCard selectedUser={this.state.employeeId} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: 396,
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              flex: 1,
              marginRight: "16px",
              background: "#FFFFFF",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              height: "100%",
              borderRadius: "8px",
            }}
          >
            <AdminViewSkillComparisionChart
              selectedUser={this.state.employeeId}
            />
          </div>
          <div
            style={{
              flex: 1,
              background: "#FFFFFF",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
              height: "100%",
              borderRadius: "8px",
            }}
          >
            <AdminViewActivityVsSkillPerformance
              selectedUser={this.state.employeeId}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: 307,
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              flex: 1,
              marginRight: "16px",
              background: "#FFFFFF",
              position: "relative",
              borderRadius: 8,
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            }}
          >
            <CareerPathDesignationTree selectedUser={this.state.employeeId} />
          </div>
          <div style={{ flex: 1 }}>
            <AdminViewUserProfileAssessment
              selectedUser={this.state.employeeId}
            />
          </div>
        </div>
        <div style={{}}>
          <UserProfileAccordionGroup
            accordionOptions={[
              {
                displayToggle: this.state.Goals,
                icon: goalIcon,
                title: "Goals",
                component: (
                  <GoalStatusCardGroup selectedUser={this.state.employeeId} />
                ),
                onClick: this.toggleHandler,
              },
              {
                displayToggle: this.state.ActivityLog,
                icon: activityLogIcon,
                title: "Activity Log",
                component: (
                  <AdminManagerActivities employeeId={this.state.employeeId} />
                ),
                onClick: this.toggleHandler,
              },
              {
                displayToggle: this.state.EmployeeProfileDetails,
                icon: empProfile,
                title: "Employee Profile Details",
                component: (
                  <AdminViewEmployeeProfileDetails
                    selectedUser={this.state.employeeId}
                  />
                ),
                onClick: this.toggleHandler,
              },
            ]}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(UserProfileView);
