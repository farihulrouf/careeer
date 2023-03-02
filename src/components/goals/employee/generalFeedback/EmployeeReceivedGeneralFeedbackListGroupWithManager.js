import React, { Component } from "react";
import EmployeeReceivedGeneralFeedbackListGroup from "./EmployeeReceivedGeneralFeedbackListGroup";

class EmployeeReceivedGeneralFeedbackListGroupWithManager extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const receivedRatingDetails = this.props.receivedRatingDetails;
    return (
      <div>
        {receivedRatingDetails.map((eachFeedback, index) => (
          <div style={{ marginBottom: "1.5em" }} key={index}>
            <EmployeeReceivedGeneralFeedbackListGroup
              receivedRatingListGroup={eachFeedback}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default EmployeeReceivedGeneralFeedbackListGroupWithManager;
