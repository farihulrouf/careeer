import React, { Component } from "react";
import ManagerEmployeeFeedback from "../../components/goals/manager/ManagerEmployeeGeneralFeedbackWrapper";
class ManagerFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          background: "#F8F8F8",
          padding: 20,
          color: "#303030",
          fontSize: 16,
          fontFamily: "Open Sans Regular",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "1.126em",
              fontFamily: "Open Sans Semibold",
              marginBottom: 10,
            }}
          >
            Feedback
          </div>
          <ManagerEmployeeFeedback />
        </div>
      </div>
    );
  }
}

export default ManagerFeedback;
