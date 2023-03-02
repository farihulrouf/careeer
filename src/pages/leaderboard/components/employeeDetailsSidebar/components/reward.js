import React, { Component } from "react";
import Star from "../../../../../assets/images/medal-big.svg";
class LeaderboardReward extends Component {
  render() {
    return (
      <div
        style={{
          width: "99%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: 6,
            width: 6,
            background: "#ACAED8",
            borderRadius: "100%",
            marginRight: "1%",
          }}
        ></div>
        <div>
          <img
            src={this.props.imageUrl}
            alt="reward"
            style={{ height: 40, width: 40 }}
          />
        </div>
        <div
          style={{
            flex: 1,
            fontFamily: "Open Sans Regular",
            paddingLeft: "1%",
          }}
        >
          <div style={{ fontSize: "0.875em", color: "#FF808B" }}>
            {this.props.rewardName}
          </div>
          <div
            style={{ fontSize: "0.75em", display: "flex", color: "#767676" }}
          >
            <div>{this.props.receivedDate}</div>
            <div
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 4,
                }}
              >
                <img src={Star} alt="star" style={{ height: 13, width: 13 }} />
                <div style={{ flex: 1, margin: "2px 0 0 4px" }}>
                  {this.props.leaderPointsForReward}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LeaderboardReward;
