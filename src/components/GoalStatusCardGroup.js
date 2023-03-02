import React, { Component } from "react";
import { getEmployeeGoalsFeedback } from "../core/apiClient/organization/organizationClient";
import { decryptData } from "../utils/encryptDecrypt";
import GoalStatusCard from "./GoalStatusCard";

class GoalStatusCardGroup extends Component {
  state = {
    goals: [],
  };
  componentDidMount = () => {
    this.loadEmployeeGoals();
  };
  loadEmployeeGoals = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId),
        token = decryptData(localStorage.token),
        employeeId =
          this.props.selectedUser === undefined ||
          this.props.selectedUser === null
            ? decryptData(localStorage.employeeId)
            : this.props.selectedUser;
      if (orgId && employeeId) {
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
  render() {
    return (
      <div
        style={{
          padding: "24px 38px",
          background: "#FFFFFF",
          borderRadius: "inherit",
        }}
      >
        {this.state.goals.length !== 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(8,1fr)",
              gridGap: "12px",
              maxWidth: 115,
            }}
          >
            {this.state.goals.map((ele, index) => (
              <GoalStatusCard
                key={index}
                title={ele.goalType}
                completed={ele.completionPercentage}
                deadline={ele.endDate}
              />
            ))}
          </div>
        ) : (
          <div style={{ fontFamily: "Open Sans SemiBold", fontSize: "1em" }}>
            No Learning Goals Available
          </div>
        )}
      </div>
    );
  }
}

export default GoalStatusCardGroup;
