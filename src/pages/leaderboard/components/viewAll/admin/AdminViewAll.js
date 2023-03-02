import React, { Component } from "react";
import { message } from "antd";
import { Switch, Route, withRouter } from "react-router-dom";
import ComponentNavViewAll from "../components/ComponentNavViewAll";
import Button from "../../../../../components/Button";
import ViewAll from "../index";
import { getLeaderboardRegions } from "../../../../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../../../../utils/encryptDecrypt";

class ManagerViewAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      referenceIds: [0, 0],
      scopeType: "",
    };
  }
  componentDidMount = () => {
    let scopeType = this.props.match.params.scopeType;
    let referenceIds = this.state.referenceIds;
    if (scopeType === "region") {
      referenceIds[0] = parseInt(this.props.match.params.referenceId);
      this.setState({
        referenceIds: referenceIds,
        scopeType: "region",
      });
    } else {
      this.loadTiersList();
    }
    referenceIds[1] = parseInt(decryptData(localStorage.rootTier));
    this.setState({
      referenceIds: referenceIds,
    });
  };
  loadTiersList = async () => {
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
          let tiersList = [];
          if (responsedata.length) {
            for (let i = 0; i < responsedata.length; i++) {
              tiersList.push(responsedata[i]);
            }
            let referenceIds = this.state.referenceIds;
            referenceIds[0] = tiersList[0].regionId || 0;
            this.setState({
              referenceIds: referenceIds,
            });
          }
        } else {
          let referenceIds = this.state.referenceIds;
          referenceIds[0] = 0;
          this.setState({
            referenceIds: referenceIds,
          });
        }
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
      }
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
                `/admin/leaderboard/${
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
              navLink={["Region", "Global"]}
              routePath={`/admin/leaderboard/view-all`}
              {...this.props}
              referenceIds={this.state.referenceIds}
            />
            <Route
              exact
              path={`/admin/leaderboard/view-all/:referenceId/region`}
            >
              <ViewAll scopeType={"region"} userRole={this.props.userRole} />
            </Route>
            <Route
              exact
              path={`/admin/leaderboard/view-all/:referenceId/global`}
            >
              <ViewAll scopeType={"global"} userRole={this.props.userRole} />
            </Route>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(ManagerViewAll);
