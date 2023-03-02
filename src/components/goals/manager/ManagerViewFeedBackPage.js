import React, { Component } from "react";
import Button from "../../Button";
import ManagerViewEmployeeFeedbackTrack from "./ManagerViewEmployeeFeedbackTrack";
class ManagerViewFeedBackPage extends Component {
  render() {
    const { employeeId, tab } = this.props.match.params;
    return (
      <div style={{ fontSize: "1em", color: "#303030", padding: "1.5% 2%" }}>
        <div style={{ color: "#767676", fontSize: "0.875em" }}>
          <span>Learning Goals</span>
          &nbsp;{">"}&nbsp;
          <span style={{ textTransform: "capitalize" }}>
            {tab.replace("-", " ")}
          </span>
          &nbsp;{">"} View All Feedback
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0 10px 0",
          }}
        >
          <div
            style={{
              fontSize: "1.126em",
              fontFamily: "Open Sans Semibold",
              margin: "",
            }}
          >
            Learning Goals
          </div>
          <div
            onClick={this.props.history.goBack}
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

        <div>
          <ManagerViewEmployeeFeedbackTrack
            employeeId={employeeId}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

export default ManagerViewFeedBackPage;
