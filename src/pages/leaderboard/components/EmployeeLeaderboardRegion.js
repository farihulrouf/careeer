import React, { Component } from "react";
import EmployeeLeaderboard from "../EmployeeLeaderboard";
import { getLeaderboardCircleData } from "../../../core/apiClient/leaderboard/leaderboardClient";
import { getLeaderboardRegions } from "../../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../../utils/encryptDecrypt";
import { message } from "antd";
class EmployeeLeaderboardRegion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkStatus: "Region",
      selectorOptions: [],
      tiersList: [],
      selectedOption: "",
      teamSelectedOption: "Team A",
      managerList: [],
      managerName: "",
      referenceId: "",
      employeeRadialData: [],
      employee: "",
    };
  }

  componentDidMount = () => {
    this.loadTiersList("region");
  };
  loadTiersList = async (scopeType) => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId),
        employeeId = decryptData(localStorage.employeeId);
      let token = decryptData(localStorage.token);
      if (orgId && employeeId) {
        this.setState({ isLoading: true, selectorOptions: [], tiersList: [] });
        let response = await getLeaderboardRegions(orgId, {
          Authorization: token,
        });
        if (response.status === 200) {
          let responsedata = response.data;
          let selectorOptions = this.state.selectorOptions;
          let tiersList = this.state.tiersList;
          if (responsedata.length) {
            for (let i = 0; i < responsedata.length; i++) {
              tiersList.push(responsedata[i]);
              selectorOptions.push(responsedata[i].regionName);
            }

            this.setState(
              {
                selectorOptions,
                tiersList,
                selectedOption: selectorOptions[0] || "",
                scopeType,
                referenceId: response.data[0].regionId || 0,
              },
              () =>
                this.loadRadialFavourites("region", response.data[0].regionId)
            );
          }
        }
        this.setState({ isLoading: false });
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };
  loadRadialFavourites = async (scopeType, referenceId) => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId);
    let token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        let response = await getLeaderboardCircleData(
          orgId,
          employeeId,
          scopeType,
          referenceId,
          {
            Authorization: token,
          }
        );
        if (response.status === 200) {
          let data = response.data;
          let employeeRadialData = [];
          let nearerEmployees = data.nearerEmployees.filter(
            (each, index) => index < 2
          );
          let favouriteEmployees = data.favouriteEmployees.filter(
            (each, index) => index < 5
          );
          let teamEmployees = data.teamEmployees.filter(
            (each, index) => index < 10
          );
          employeeRadialData.push(
            { badges: nearerEmployees },
            { badges: favouriteEmployees },
            { badges: teamEmployees }
          );
          this.setState({ employeeRadialData, employee: data.employee });
        }
        document.toggleLoading();
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
        document.toggleLoading();
      }
    }
  };
  onClickSelector = (e) => {
    let tier = this.state.tiersList.find((each) => each.regionName === e);
    if (this.state.linkStatus !== "Team") {
      this.setState(
        {
          selectedOption: e,
          referenceId: tier.regionId,
        },
        () => this.loadRadialFavourites("region", tier.regionId)
      );
    } else {
      this.setState({
        teamSelectedOption: e,
      });
    }
  };
  onManagerChange = (manager) => {
    let managerName = this.state.managerList.find(
      (eachManager) => eachManager.name === manager
    );
    this.setState({ managerName, referenceId: managerName.employeeId });
    this.loadRadialFavourites("team", managerName.employeeId);
  };
  render() {
    return (
      <div>
        <EmployeeLeaderboard
          loadRadialFavourites={this.loadRadialFavourites}
          onManagerChange={this.onManagerChange}
          onClickSelector={this.onClickSelector}
          {...this.state}
        />
      </div>
    );
  }
}

export default EmployeeLeaderboardRegion;
