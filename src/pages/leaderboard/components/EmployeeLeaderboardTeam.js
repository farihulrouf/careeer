import React, { Component } from "react";
import EmployeeLeaderboard from "../EmployeeLeaderboard";
import { getLeaderboardCircleData } from "../../../core/apiClient/leaderboard/leaderboardClient";
import { getManagerDetails } from "../../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../../utils/encryptDecrypt";
import { message } from "antd";
class EmpTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkStatus: "Team",
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
    this.loadManagers("team");
  };
  loadManagers = async (scopeType) => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId);
    let token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let response = await getManagerDetails(orgId, employeeId, {
          Authorization: token,
        });
        let managerList = [],
          managerName = "";
        if (response.status === 200) {
          let manager = response.data;
          for (let i = 0; i < manager.length; i++) {
            let obj = { name: "", employeeId: "" };
            obj.name =
              (manager[i].firstName || "") +
              " " +
              ((manager[i].firstName.length > 5 &&
              manager[i].lastName.length > 3
                ? manager[i].lastName.substring(0, 1)
                : manager[i].lastName) || "");
            obj.employeeId = manager[i].employeeId;
            managerList.push(obj);
            managerName = managerList[0];
          }
          this.setState(
            {
              managerList,
              managerName,
              referenceId: managerName.employeeId,
              scopeType,
            },
            () => this.loadRadialFavourites("team", managerName.employeeId)
          );
        } else {
          this.setState({
            referenceId: "",
            scopeType: "",
          });
        }
        document.toggleLoading();
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
        document.toggleLoading();
      }
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

export default EmpTeam;
