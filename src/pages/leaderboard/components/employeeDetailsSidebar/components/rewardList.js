import React, { Component } from "react";
import LeaderboardReward from "./reward";
class LeaderboardRewardList extends Component {
  render() {
    return (
      <div style={{ width: "100%" }}>
        <div
          style={{
            fontSize: "0.875em",
            fontFamily: "Open Sans Semibold",
            marginBottom: 12,
          }}
        >
          Rewards
        </div>
        <div
          style={{
            height: 160,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {this.props.rewardsReceived.length > 0 ? (
            <>
              {this.props.rewardsReceived.map((ele, id) => (
                <div key={id} style={{ marginBottom: 6 }}>
                  <LeaderboardReward
                    imageUrl={ele.imageUrl}
                    rewardName={ele.rewardName}
                    receivedDate={ele.receivedDate}
                    leaderPointsForReward={ele.leaderPointsForReward}
                  />
                </div>
              ))}
            </>
          ) : (
            <div>Coming Soon..</div>
          )}
        </div>
      </div>
    );
  }
}

export default LeaderboardRewardList;
