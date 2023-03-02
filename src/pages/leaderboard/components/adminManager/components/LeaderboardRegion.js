import React, { Component } from "react";
import { getLeaderboardRegions } from "../../../../../core/apiClient/organization/organizationClient";
import { getAllLeaderboardEmployees } from "../../../../../core/apiClient/leaderboard/leaderboardClient";
import { decryptData } from "../../../../../utils/encryptDecrypt";
import { message } from "antd";
import AdminLeaderboard from "../index";
import { withRouter } from "react-router-dom";
class LeaderboardRegion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboardEmployeeLists: {
        ranksList: [],
      },
      linkStatus: "Region",
      selectorOptions: [],
      tiersList: [],
      selectedOption: "",
      employeeDataLength: 0,
    };
  }
  componentDidMount = () => {
    this.loadTiersList("region");
  };
  loadTiersList = async (scopeType) => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId);
    let token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let response = await getLeaderboardRegions(orgId, {
          Authorization: token,
        });
        if (response.status === 200) {
          let responsedata = response.data;
          let selectorOptions = [];
          let tiersList = [];
          if (responsedata.length) {
            for (let i = 0; i < responsedata.length; i++) {
              tiersList.push(responsedata[i]);
              selectorOptions.push(responsedata[i].regionName);
            }
            this.setState({
              selectorOptions,
              tiersList,
              selectedOption: selectorOptions[0] || "",
              scopeType,
              referenceId: tiersList[0].regionId,
            });

            this.loadEmployeeCardDetails("region", tiersList[0].regionId);
          }
        }
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
      }
      document.toggleLoading();
    }
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
  onClickSelector = (e) => {
    let tier = this.state.tiersList.find((each) => each.regionName === e);
    if (this.state.linkStatus === "Region") {
      this.setState({
        selectedOption: e,
        referenceId: tier.regionId,
      });
      this.loadEmployeeCardDetails("region", tier.regionId);
    }
  };
  render() {
    return (
      <div>
        <AdminLeaderboard
          {...this.state}
          onClickSelector={this.onClickSelector}
          role={this.props.role}
        />
      </div>
    );
  }
}

export default withRouter(LeaderboardRegion);
