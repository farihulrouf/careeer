import React, { Component } from "react";
import LeaderboardEarnPointsTask from "./earnPointsTask";
class LeaderboardEarnPointsTaskList extends Component {
  render() {
    return (
      <div
        style={{
          fontFamily: "Open Sans Regular",
          fontSize: "16px",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#303030",
            margin: "0 0 6px 4px",
            fontSize: "0.875em",
          }}
        >
          To Earn more Point
        </div>
        <div style={{ height: 130, overflowY: "auto" }}>
          {this.props.tasks.map((ele, id) => (
            <div key={id} style={{ marginBottom: 10 }}>
              <LeaderboardEarnPointsTask ele={ele} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default LeaderboardEarnPointsTaskList;
