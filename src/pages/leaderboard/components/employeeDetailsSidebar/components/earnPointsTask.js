import React, { Component } from "react";

class LeaderboardEarnPointsTask extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          fontFamily: "Open Sans Regular",
          fontSize: "0.875em",
          color: "#828282",
          // alignItems: "center",
        }}
      >
        <div
          style={{
            height: 6,
            width: 6,
            background: "#ACAED8",
            borderRadius: "100%",
            flex: 0.03,
            marginTop: 8
          }}
        ></div>
        <div style={{ paddingLeft: 12, flex: 1 }}>{this.props.ele}</div>
      </div>
    );
  }
}

export default LeaderboardEarnPointsTask;
