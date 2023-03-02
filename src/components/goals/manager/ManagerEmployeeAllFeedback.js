import React, { Component } from "react";
import Button from "../../Button";
import ManagerViewAllGeneralFeedbackTrack from "./ManagerViewAllGeneralFeedbackTrack";
class ManagerAllFeedBack extends Component {
  state = {};
  componentDidMount() {
    window.scrollTo(0, 0);
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
        <div style={{ color: "#767676", fontSize: "0.875em" }}>
          <span>Feedback</span>
          &nbsp;{">"}&nbsp;View All Feedback
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
            Feedback
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
          <ManagerViewAllGeneralFeedbackTrack {...this.props} />
        </div>
      </div>
    );
  }
}

export default ManagerAllFeedBack;
