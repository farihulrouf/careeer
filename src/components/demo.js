import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import ComponentNavigation from "../components/ComponentNavigationBarV2";
import ManagerAssessment from "../../src/components/managerAssessmentlist.js"
import Manageractivatydetails from "./manageractivitydetails"
import ManagerAllUser from "./ManagerAllUser"
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
          <Redirect exact from={path} to={`${path}/assessment`} />
          <Route exact path={`${path}/:scopeType`}>
            <div style={{ marginTop: 20 }}>
              <ComponentNavigation
                title="Reports"
                navLink={["Assessment", "Activity", "User"]}
                routePath={path}
                {...this.props}
              />
            </div>
            <Route exact path="/manager/reports/assessment">
              <ManagerAssessment role="manager" />
            </Route>
            <Route exact path="/manager/reports/activity">
              <Manageractivatydetails role="manager" />
            </Route>
            <Route exact path="/manager/reports/user">
              <ManagerAllUser role="manager" />
            </Route>
          </Route>
          {/* <Route
            path="/manager/leaderboard/view-all/:referenceId/:scopeType"
            render={(props) => (
              <LeaderboardVewAll {...props} userRole="manager" />
            )}
          ></Route> */}
        </Switch>
        
      </div>
    );
  }
}

export default withRouter(AdminLeaderboardRoute);
