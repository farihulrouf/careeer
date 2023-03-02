import React, { Component } from "react";
import { getAllLeaderboardEmployees } from "../../../../../core/apiClient/leaderboard/leaderboardClient";
import { decryptData } from "../../../../../utils/encryptDecrypt";
import { message } from "antd";
import AdminLeaderboard from "../index";
import { withRouter } from "react-router-dom";
class LeaderboardTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboardEmployeeLists: {
        ranksList: [],
      },
      linkStatus: "Team",
      selectorOptions: [],
      tiersList: [],
      selectedOption: "",
      employeeDataLength: 0,
    };
  }
  componentDidMount = () => {
    this.loadEmployeeCardDetails("team", decryptData(localStorage.employeeId));
  };
  loadEmployeeCardDetails = async (scopeType, referenceId) => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId);
    let token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let response = await getAllLeaderboardEmployees(
          orgId,
          employeeId,
          scopeType.toLowerCase(),
          referenceId || 0,
          0,
          25,
          "",
          {
            Authorization: token,
          }
        );
        if (response.status === 200) {
          let leaderboardEmployeeLists = response.data;
          leaderboardEmployeeLists.ranksList.sort(
            (previousRankHolder, nextRankHolder) => {
              return previousRankHolder.rank - nextRankHolder.rank;
            }
          );
          this.setState({
            leaderboardEmployeeLists,
            scopeType,
            referenceId,
            employeeDataLength: response.data.ranksList.length,
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
      <div>
        <AdminLeaderboard {...this.state} role={this.props.role} />
      </div>
    );
  }
}

export default withRouter(LeaderboardTeam);
