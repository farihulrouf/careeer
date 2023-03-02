import React, { Component } from "react";
import Button from "../../Button";
import ManagerViewEmployeeGoalsFeedback from "./ManagerViewEmployeeGoalsFeedback";
class ViewFeedbacksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}

  render() {
    return (
      <div
        style={{
          padding: "10px 30px 30px 30px",
          background: "#F8F8F8",
          fontFamily: "Open Sans Regular",
          fontSize: "16px",
          minHeight: "80vh",
        }}
      >
        <div style={{ color: "#767676", fontSize: "0.75em" }}>
          {`Goals > View Feedback`}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
            Goals Feedback
          </div>
          <div
            onClick={() => this.props.history.goBack()}
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
            background: "#ffffff",
            margin: "10px 0",
            fontSize: "1em",
            borderRadius: "8px",
          }}
        ></div>
        <div style={{ minHeight: 122 }}>
          <div style={{ height: "100%" }}>
            <ManagerViewEmployeeGoalsFeedback />
          </div>
        </div>
      </div>
    );
  }
}

export default ViewFeedbacksPage;
