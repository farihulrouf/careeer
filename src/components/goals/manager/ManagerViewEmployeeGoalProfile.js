import React, { Component } from "react";
import UserProfileCard from "../../../components/UserProfileCard";
import UserProfilePointsAndBadgesCard from "../../../components/UserProfilePointsAndBadgesCard";
import SkillScoreCard from "../../../components/SkillScoreCard";
import ManagerViewEmployeeAssignedGoals from "./ManagerViewEmployeeAssignedGoals";
import "../../../assets/css/AntdExternal.css";
import Button from "../../Button";

class EmployeeGoalsPage extends Component {
  render() {
    const { employeeId, name } = this.props.match.params;
    const history = this.props.history;
    return (
      <div
        style={{
          background: "#F8F8F8",
          fontFamily: "Open Sans Regular",
          fontSize: "16px",
          padding: "1.5% 2%",
        }}
      >
        <div>
          <div style={{ color: "#767676", fontSize: "0.875em" }}>
            <span>Goals</span>
            &nbsp; {">"} &nbsp;
            <span>Assigned Goals</span>
            &nbsp; {">"} &nbsp;
            <span style={{ textTransform: "capitalize" }}>
              {name.replace(/_/g, " ")}
            </span>
          </div>
          <div
            style={{
              fontSize: "1.126em",
              fontFamily: "Open Sans Semibold",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>Goals</div>
            <div
              onClick={history.goBack}
              style={{
                width: 104,
                fontFamily: "Open Sans Regular",
                fontSize: "0.875em",
              }}
            >
              <Button
                label="< Back"
                styles={{
                  color: "#FF808B",
                  backgroundColor: "inherit",
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
              <UserProfileCard
                selectedUser={employeeId}
                isViewProfile={true}
                viewProfileHandler={() =>
                  history.push(`${history.location.pathname}/profile`)
                }
              />
            </div>
            <div style={{ flex: 0.7, marginRight: "16px" }}>
              <UserProfilePointsAndBadgesCard
                {...this.state}
                selectedUser={employeeId}
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
              <SkillScoreCard {...this.state} selectedUser={employeeId} />
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <ManagerViewEmployeeAssignedGoals
              cursor={true}
              {...this.props}
              selectedemployeeId={employeeId}
              viewAllFeedback={() =>
                history.push(`${history.location.pathname}/all-feedback`)
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeGoalsPage;
