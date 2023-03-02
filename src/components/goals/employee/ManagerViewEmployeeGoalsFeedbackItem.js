import React, { Component } from "react";
import EmployeeGoalItem from "./EmployeeGoalItem";
import timeStampToDateTime from "../../../core/lib/TimeStampToDateTime";

class ManagerViewEmployeeGoalsFeedbackItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        style={{
          background: "#FFFFFF",
          fontFamily: "Open Sans Regular",
          color: "#303030",
          padding: 10,
          boxShadow: "2px 5px 10px #80808057",
          borderRadius: 8,
          marginRight: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "0.875em",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              height: 12,
              width: 12,
              background: "#D0D0D0",
              borderRadius: "100%",
              marginRight: 8,
            }}
          ></div>
          <div style={{ marginRight: 10 }}>Feedback on</div>
          <div>{timeStampToDateTime(this.props.feedbackDate).date}</div>
          <div
            style={{
              flex: 1,
              textAlign: "end",
              textDecoration: "underline",
              color: "#FF808B",
              marginRight: "15px",
            }}
          >
            <span
              style={{ cursor: "pointer" }}
              onClick={() => this.props.viewComments(this.props.goalId || "")}
            >
              View Comments
            </span>
          </div>
        </div>
        <div style={{ padding: "0 12px 8px 24px" }}>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 0.2, fontSize: "0.875em" }}>Assigned Goals</div>
            <div style={{ flex: 1 }}>
              <EmployeeGoalItem {...this.props} cursor={false} />
            </div>
          </div>
          <div
            style={{
              height: 1,
              background: "#00000027",
              margin: "30px 0 20px 0",
              opacity: 0.7,
            }}
          ></div>
          <div
            style={{
              display: "flex",
              fontSize: "0.875em",
              marginTop: 10,
            }}
          >
            <div style={{ flex: 0.2 }}>Comment</div>
            <div style={{ flex: 1, color: "#767676" }}>
              {this.props.comment || this.props.feedbackComment}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ManagerViewEmployeeGoalsFeedbackItem;
