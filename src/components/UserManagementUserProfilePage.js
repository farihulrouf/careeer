import React, { Component } from "react";
import "../assets/css/OpenSans.css";
import Button from "./Button";
import UserProfileCard from "./UserProfileCard";
import UserProfilePointsAndBadgesCard from "./UserProfilePointsAndBadgesCard";
import SkillScoreCard from "./SkillScoreCard";
import AdminViewActivityVsSkillPerformance from "./AdminViewActivityVsSkillPerformance";
import AdminViewUserProfileAssessment from "./AdminViewUserProfileAssessment";
import UserProfileAccordionGroup from "./UserProfileAccordionGroup";
import "../assets/css/ScrollBarDesign.css";
import CareerPathDesignationTree from "./AdminViewCareerPathDesignationTree";
import AdminViewSkillComparisionChart from "./AdminViewSkillComparisionChart";
class UserManagementUserProfilePage extends Component {
  render() {
    return (
      <div
        className="scrollContainer"
        style={{
          display: "flex",
          flexDirection: "column",
          background: "#F8F8F8",
          overflowX: "hidden",
          fontFamily: "Open Sans Regular",
        }}
      >
        <div
          style={{
            fontSize: 12,
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
            onClick={this.props.onClickBack}
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
            <UserProfileCard {...this.props} />
          </div>
          <div style={{ flex: 0.7, marginRight: "16px" }}>
            <UserProfilePointsAndBadgesCard {...this.props} />
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
            <SkillScoreCard {...this.props} />
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
            <AdminViewSkillComparisionChart {...this.props} />
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
            <AdminViewActivityVsSkillPerformance {...this.props} />
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
            <CareerPathDesignationTree {...this.props} />
          </div>
          <div style={{ flex: 1 }}>
            <AdminViewUserProfileAssessment {...this.props} />
          </div>
        </div>
        <div style={{}}>
          <UserProfileAccordionGroup {...this.props} />
        </div>
      </div>
    );
  }
}

export default UserManagementUserProfilePage;
