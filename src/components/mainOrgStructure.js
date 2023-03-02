import React, { Component } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import ComponentNavigation from "../components/ComponentNavigationBarV2";
import ManagerAssessment from "../../src/components/managerAssessmentlist.js"
import Manageractivatydetails from "./manageractivitydetails"
import Admintoatlassessment from "./admintotalassestemtentList"
import Admintoatalactivitylist from "./adminactivitylist"
import AdminAdddepartmentdetails from "./AdminAddDepartmentdetails"
import AdminAdddesigntiondetails from "./AddAdminDesigntion"
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
          <Redirect exact from={path} to={`${path}/department`} />
          <Route path={`${path}/:scopeType`}>
            <div style={{ marginTop: 20 }}>
              <ComponentNavigation
                title="Org Management"
                navLink={["Department",]}
                routePath={path}
                {...this.props}
              />
            </div>
            <Route exact path="/admin/org-management/department/">
              <AdminAdddepartmentdetails role="admin" />
            </Route>
            <Route path={`/admin/org-management/designtion/:id`}>
             <AdminAdddesigntiondetails role="admin" /> 
            </Route>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default withRouter(AdminLeaderboardRoute);
