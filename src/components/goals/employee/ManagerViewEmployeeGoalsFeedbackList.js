import React, { Component } from "react";
import { InboxOutlined } from "@ant-design/icons";
import ManagerViewEmployeeGoalsFeedbackItem from "./ManagerViewEmployeeGoalsFeedbackItem";
class ManagerViewEmployeeGoalsFeedbackList extends Component {
  render() {
    return (
      <div
        className="scroll-container"
        style={{ height: "100%", overflowY: "auto", background: "#F8F8F8" }}
      >
        {this.props.goalsFeedback && this.props.goalsFeedback.length ? (
          this.props.goalsFeedback.map((ele, index) => (
            <div key={index} style={{ marginBottom: 20 }}>
              <ManagerViewEmployeeGoalsFeedbackItem {...ele} {...this.props} />
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", marginTop: "4em" }}>
            <InboxOutlined style={{ fontSize: "5em" }} />
            <div style={{ fontSize: "1.4em" }}>No feedback available</div>
          </div>
        )}
      </div>
    );
  }
}

export default ManagerViewEmployeeGoalsFeedbackList;
