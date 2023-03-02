import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import ComponentNavigation from "../../components/ComponentNavigationBarV2";
import EmployeeLeaderboardTeam from "./components/EmployeeLeaderboardTeam";
import EmployeeLeaderboardRegion from "./components/EmployeeLeaderboardRegion";
import EmployeeLeaderboardGlobal from "./components/EmployeeLeaderboardGlobal";
import LeaderboardVewAll from "./components/viewAll/employee/EmployeeViewAll";
class EmployeeLeaderboardRoute extends Component {
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
            <Route exact path="/employee/leaderboard/team">
              <EmployeeLeaderboardTeam />
            </Route>
            <Route exact path="/employee/leaderboard/region">
              <EmployeeLeaderboardRegion />
            </Route>
            <Route exact path="/employee/leaderboard/global">
              <EmployeeLeaderboardGlobal />
            </Route>
          </Route>
          <Route
            path="/employee/leaderboard/view-all/:referenceId/:scopeType"
            render={(props) => (
              <LeaderboardVewAll {...props} userRole="employee" />
            )}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(EmployeeLeaderboardRoute);
