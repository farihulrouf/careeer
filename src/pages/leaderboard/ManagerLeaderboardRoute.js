import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import ComponentNavigation from "../../components/ComponentNavigationBarV2";
import ManagerLeaderboardTeam from "./components/adminManager/components/LeaderboardTeam";
import ManagerLeaderboardRegion from "./components/adminManager/components/LeaderboardRegion";
import ManagerLeaderboardGlobal from "./components/adminManager/components/LeaderboardGlobal";
import LeaderboardVewAll from "./components/viewAll/Manager/ManagerViewAll";
class AdminLeaderboardRoute extends Component {
  render() {
    const { path } = this.props.match;
    return (
      <div
        style={{
          background: "#F8F8F8",
          padding: "10px 30px",
        }}
      >
        <Switch>
          <Redirect exact from={path} to={`${path}/team`} />
          <Route exact path={`${path}/:scopeType`}>
            <div style={{ marginTop: 20 }}>
              <ComponentNavigation
                title="Leaderboard"
                navLink={["Team", "Region", "Global"]}
                routePath={path}
                {...this.props}
              />
            </div>
            <Route exact path="/manager/leaderboard/team">
              <ManagerLeaderboardTeam role="manager" />
            </Route>
            <Route exact path="/manager/leaderboard/region">
              <ManagerLeaderboardRegion role="manager" />
            </Route>
            <Route exact path="/manager/leaderboard/global">
              <ManagerLeaderboardGlobal role="manager" />
            </Route>
          </Route>
          <Route
            path="/manager/leaderboard/view-all/:referenceId/:scopeType"
            render={(props) => (
              <LeaderboardVewAll {...props} userRole="manager" />
            )}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(AdminLeaderboardRoute);
