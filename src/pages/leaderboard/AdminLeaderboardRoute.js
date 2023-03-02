import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import ComponentNavigation from "../../components/ComponentNavigationBarV2";
import AdminLeaderboardRegion from "./components/adminManager/components/LeaderboardRegion";
import AdminLeaderboardGlobal from "./components/adminManager/components/LeaderboardGlobal";
import LeaderboardVewAll from "./components/viewAll/admin/AdminViewAll";
class AdminLeaderboardRoute extends Component {
  render() {
    const { path } = this.props.match;
    return (
      <div
        style={{
          background: "#F8F8F8",
          padding: "10px 30px",
          position: "relative",
        }}
      >
        <Switch>
          <Redirect exact from={path} to={`${path}/region`} />
          <Route exact path={`${path}/:scopeType`}>
            <div style={{ marginTop: 20 }}>
              <ComponentNavigation
                title="Leaderboard"
                navLink={["Region", "Global"]}
                routePath={path}
                {...this.props}
              />
            </div>
            <Route exact path="/admin/leaderboard/region">
              <AdminLeaderboardRegion role="admin" />
            </Route>
            <Route exact path="/admin/leaderboard/global">
              <AdminLeaderboardGlobal role="admin" />
            </Route>
          </Route>
          <Route
            path="/admin/leaderboard/view-all/:referenceId/:scopeType"
            render={(props) => (
              <LeaderboardVewAll {...props} userRole="admin" />
            )}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(AdminLeaderboardRoute);
