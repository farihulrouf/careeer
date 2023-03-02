import React, { Component } from "react";
import EmployeeReceivedFeedback from "../../components/goals/employee/generalFeedback/EmployeeReceivedGeneralFeedbackWrapper";
class EmployeeFeedback extends Component {
  render() {
    return (
      <div
        style={{
          background: "#F8F8F8",
          padding: 20,
          fontSize: 16,
          fontFamily: "Open Sans Regular",
        }}
      >
        <div style={{ fontFamily: "Open Sans Semibold", fontSize: "1.126em" }}>
          Feedback
        </div>
        <EmployeeReceivedFeedback />
      </div>
    );
  }
}

export default EmployeeFeedback;
