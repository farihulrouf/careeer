import React, { Component } from "react";
import DisplayPicture from "../../../components/DisplayPicture";
import UserGroup from "../../../assets/images/userGroup.svg";
import ManagerEmployeeGoalsFeedbackList from "./ManagerEmployeeGoalsFeedbackList";
class ManagerEmployeeGoalsFeedbackListGroup extends Component {
  render() {
    const history = this.props.history;
    const employee = this.props.employeeFeedbacks;
    return (
      <div
        style={{
          background: "#FFFFFF",
          height: 600,
          fontFamily: "Open Sans Regular",
          color: "#303030",
          display: "flex",
          flexDirection: "column",
          padding: "20px 25px",
          borderRadius: 8,
        }}
      >
        {this.props.isEmployeeFeedbackSelected ? (
          <div
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <div style={{ display: "flex", alignItems: "cenetr" }}>
              <div
                style={{
                  flex: 1,
                  fontSize: "1em",
                  fontFamily: "Open Sans Semibold",
                }}
              >
                Employee Feedback
              </div>
              <div style={{ cursor: "pointer" }}>
                <span
                  onClick={() =>
                    history.push(
                      `${history.location.pathname}/${
                        this.props.goalEmployeeId
                      }/${(
                        (employee.firstName || "") +
                        " " +
                        (employee.middleName || "") +
                        " " +
                        (employee.lastName || "")
                      )
                        .replace(/\s{1,}/g, "_")
                        .toLowerCase()}/all-feedback`
                    )
                  }
                  style={{
                    color: "#F46773",
                    fontSize: "0.875em",
                  }}
                >
                  <u>View all feedback</u>
                </span>
              </div>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", marginTop: 20 }}
            >
              <div style={{ height: 50, width: 50, marginRight: 20 }}>
                <DisplayPicture profile={employee.profilePicture} />
              </div>
              <div style={{ fontSize: "0.875em" }}>
                <div>
                  {(employee.firstName || "") +
                    " " +
                    (employee.middleName || "") +
                    " " +
                    (employee.lastName || "")}
                </div>
                <div style={{ color: "#767676" }}>{employee.designation}</div>
              </div>
            </div>
            <div
              className="scroll-container"
              style={{ flex: 1, overflowY: "auto", paddingRight: 20 }}
            >
              <ManagerEmployeeGoalsFeedbackList
                goals={employee.goals}
                rateHandler={this.props.rateHandler}
                {...this.props}
              />
            </div>
          </div>
        ) : (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "cenetr" }}>
              <div
                style={{
                  flex: 1,
                  fontSize: "1em",
                  fontFamily: "Open Sans Semibold",
                }}
              >
                Employee Feedback
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <img
                src={UserGroup}
                alt="data"
                style={{ height: 135, width: 135 }}
              />
              <div
                style={{
                  marginTop: 12,
                  fontFamily: "Open Sans Semibold",
                  fontSize: "1.126em",
                }}
              >
                No Employee Feedback Selected
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ManagerEmployeeGoalsFeedbackListGroup;
