import React, { Component } from "react";
import LeaderboardPointsBadges from "./components/pointsBadges";
import LeaderboardMilestoneLoadingBar from "./components/milestoneLoadingBar";
import LeaderboardEarnPointsTaskList from "./components/earnPointsTaskList";
import LeaderboardRewardList from "./components/rewardList";
import { message } from "antd";
import orange from "../../../../assets/images/badge_orange.svg";
import blue from "../../../../assets/images/badge_blue.svg";
import pink from "../../../../assets/images/badge_pink.svg";
import purpel from "../../../../assets/images/badge_purpel.svg";
import { getLeaderboardEmployeeDetails } from "../../../../core/apiClient/leaderboard/leaderboardClient";
import { decryptData } from "../../../../utils/encryptDecrypt";

class EmployeeLeaderboardSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pointsBadges: "",
      badgeImage: null,
      linkStatus: "",
      referenceId: "",
      isManager: false,
    };
  }

  componentDidMount() {
    this.loadBadgesAndPoints();
  }

  loadBadgesAndPoints = async () => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId);
    let token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let response = await getLeaderboardEmployeeDetails(orgId, employeeId, {
          Authorization: token,
        });
        if (response.status === 200) {
          let badgeImage = "";
          if (response.data.badges === 0) {
            badgeImage = blue;
          } else if (response.data.badges % 4 === 1) {
            badgeImage = orange;
          } else if (response.data.badges % 4 === 2) {
            badgeImage = blue;
          } else if (response.data.badges % 4 === 3) {
            badgeImage = pink;
          } else if (response.data.badges % 4 === 0) {
            badgeImage = purpel;
          }
          this.setState({
            pointsBadges: response.data,
            badgeImage,
            isManager: response.data.managerBadges >= 0 ? true : false,
          });
        }
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
      }
      document.toggleLoading();
    }
    return;
  };

  render() {
    return (
      <div
        style={{
          width: 270,
          background: "#FFFFFF",
          fontSize: "16px",
          borderRadius: 5,
          maxHeight: 750,
        }}
      >
        <LeaderboardPointsBadges {...this.props} {...this.state} />
        <div style={{ padding: 20 }}>
          <div>
            <LeaderboardMilestoneLoadingBar
              points={this.state.pointsBadges.points}
            />
          </div>
          <div style={{ marginTop: 26 }}>
            <LeaderboardEarnPointsTaskList {...this.props} />
          </div>
          <div>
            <LeaderboardRewardList
              rewardsReceived={this.props.leaderboardDetails.rewardsReceived}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeLeaderboardSidebar;
