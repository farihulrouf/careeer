import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { message } from "antd";
import { decryptData } from "../../../../../utils/encryptDecrypt";
import { getManagerDetails } from "../../../../../core/apiClient/organization/organizationClient";
import { getLeaderboardRegions } from "../../../../../core/apiClient/organization/organizationClient";
import ComponentNavViewAll from "../components/ComponentNavViewAll";
import Button from "../../../../../components/Button";
import ViewAll from "../index";
class EmployeeViewAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      referenceIds: [0, 0, 0],
      scopeType: "",
    };
  }
  componentDidMount = () => {
    let scopeType = this.props.match.params.scopeType;
    let referenceIds = this.state.referenceIds;
    if (scopeType === "team") {
      referenceIds[0] = parseInt(this.props.match.params.referenceId);
      this.setState({
        referenceIds: referenceIds,
        scopeType: "team",
      });
    } else {
      this.loadTeamReferenceId();
    }
    if (scopeType === "region") {
      referenceIds[1] = parseInt(this.props.match.params.referenceId);
      this.setState({
        referenceIds: referenceIds,
        scopeType: "region",
      });
    } else {
      this.loadRegionReferenceId();
    }
    referenceIds[2] = parseInt(decryptData(localStorage.rootTier));
    this.setState({
      referenceIds: referenceIds,
    });
  };
  loadTeamReferenceId = async () => {
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
          let referenceIds = this.state.referenceIds;
          referenceIds[0] = managerName.employeeId;
          this.setState({
            referenceIds: referenceIds,
          });
        } else {
          let referenceIds = this.state.referenceIds;
          referenceIds[0] = 0;
          this.setState({
            referenceIds: referenceIds,
          });
        }
        document.toggleLoading();
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
        document.toggleLoading();
      }
    }
  };
  loadRegionReferenceId = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId),
        employeeId = decryptData(localStorage.employeeId);
      let token = decryptData(localStorage.token);
      if (orgId && employeeId) {
        let response = await getLeaderboardRegions(orgId, {
          Authorization: token,
        });
        if (response.status === 200) {
          let referenceIds = this.state.referenceIds;
          referenceIds[1] = response.data[0].regionId || 0;
          this.setState({
            referenceIds: referenceIds,
          });
        } else {
          let referenceIds = this.state.referenceIds;
          referenceIds[1] = 0;
          this.setState({
            referenceIds: referenceIds,
          });
        }
        this.setState({ isLoading: false });
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };
  render() {
    const { path } = this.props.match;
    return (
      <div style={{ fontFamily: "Open Sans Regular" }}>
        <div
          style={{
            height: "40px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: "0.858em" }}>Leaderboard {">"} View all</div>
          <div
            onClick={() =>
              this.props.history.push(
                `/employee/leaderboard/${
                this.state.scopeType === "" ? "global" : this.state.scopeType
                }`
              )
            }
            style={{
              width: "104px",
              fontSize: 14,
              fontFamily: "Open Sans Regular",
              marginTop: 30,
            }}
          >
            <Button
              label={"<  Back"}
              styles={{
                color: "#FF808B",
                backgroundColor: "transparent",
                border: "#FF808B",
                height: "40px",
              }}
            />
          </div>
        </div>
        <Switch>
          <Route exact path={`${path}`}>
            <ComponentNavViewAll
              title="Leaderboard"
              navLink={["Team", "Region", "Global"]}
              routePath={`/employee/leaderboard/view-all`}
              {...this.props}
              referenceIds={this.state.referenceIds}
            />
            <Route
              exact
              path={`/employee/leaderboard/view-all/:referenceId/team`}
            >
              <ViewAll scopeType={"team"} userRole={this.props.userRole} />
            </Route>
            <Route
              exact
              path={`/employee/leaderboard/view-all/:referenceId/region`}
            >
              <ViewAll scopeType={"region"} userRole={this.props.userRole} />
            </Route>
            <Route
              exact
              path={`/employee/leaderboard/view-all/:referenceId/global`}
            >
              <ViewAll scopeType={"global"} userRole={this.props.userRole} />
            </Route>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(EmployeeViewAll);
