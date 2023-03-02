import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import ComponentNavigation from "../components/ComponentNavigationBarV2";
import ManagerAssessment from "../../src/components/managerAssessmentlist.js"
import Manageractivatydetails from "./manageractivitydetails"
import Admintoatlassessment from "./admintotalassestemtentList"
import Admintoatalactivitylist from "./adminactivitylist"
import AdminAllUser from "./AddAllUserList"
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
                navLink={["Assessment", "Activity" , "Users"]}
                routePath={path}
                {...this.props}
              />
            </div>
            <Route exact path="/admin/reports/assessment">
              <Admintoatlassessment role="admin" />
            </Route>
            <Route exact path="/admin/reports/activity">
              <Admintoatalactivitylist role="admin" />
            </Route>
            <Route exact path="/admin/reports/users">
              <AdminAllUser role="admin" />
            </Route>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(AdminLeaderboardRoute);
