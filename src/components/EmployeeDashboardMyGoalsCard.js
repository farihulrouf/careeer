import React, { Component } from "react";
import GoalStatusCard from "./GoalStatusCard";
import { InboxOutlined } from "@ant-design/icons";
class EmployeeDashboardMyGoalsCard extends Component {
  render() {
    return (
      <div
        style={{
          height: "100%",
          borderRadius: 8,
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          padding: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              flex: 1,
              fontFamily: "Open Sans Semibold,Regular",
              fontSize: "1.126em",
            }}
          >
            My Learning Goals
          </div>
          <div
            onClick={() => this.props.getViewDetailsRoute("Goals")}
            style={{ fontSize: "0.875em", color: "#F46773", cursor: "pointer" }}
          >
            <u>View details</u>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingTop: 20,
          }}
        >
          {this.props.goals.length !== 0 ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              {this.props.goals.map((ele, id) => (
                <div ke={id} style={{ margin: "0 12px 12px 0" }}>
                  <GoalStatusCard
                    title={ele.goalType}
                    completed={ele.completionPercentage}
                    deadline={ele.endDate}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <InboxOutlined style={{ fontSize: "5em" }} />
              <div style={{ fontSize: "1.4em" }}>No Learning Goals available</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default EmployeeDashboardMyGoalsCard;
