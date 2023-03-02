import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";
import "../assets/css/OpenSans.css";
import HeaderNavigation from "./Header_Navigation";
import UserManagement from "../pages/Usermanagement";
import Hierarchy from "./HierarchyPage";
import Leaderboard from "../pages/leaderboard/AdminLeaderboardRoute";
import Approval from "../pages/Approval/Admin";
import Dashboard from "./dashboard/admin/AdminDashboardPage";
import addminassessmentlist from "./UserManagementUserProfilePage"
import adminviewassessmentlist from "./admintotalassestemtentList"
import AddUsers from "./AdminAddUsers"
import Overalreports from "./ovraladminreports"
import OrgStructure from "./mainOrgStructure"
import testing from "./Testing"
class AdminRoute extends React.Component {
  getRedirectRoute = () => {
    let pathname = this.props.location.pathname;
    if (pathname === "/admin" || pathname === "/admin/")
      return "/admin/dashboard";
    else {
      return pathname;
    }
  };
  render() {
    return (
      <Router>
        <div>
          <Route path="/">
            <HeaderNavigation view="admin" {...this.props} />
            <Redirect to={this.getRedirectRoute()} />
            <Route exact path="/admin/dashboard">
              <Dashboard />
            </Route>
            <Route path="/admin/leaderboard">
              <Leaderboard userRole={"Admin"} />
            </Route>
            <Route path="/admin/user-management" component={UserManagement} />
            <Route path="/admin/hierarchy" component={Hierarchy} />
            <Route path="/admin/approval" component={Approval} />
            <Route path="/admin/reports" component={Overalreports} />
            <Route path="/admin/org-management" component={OrgStructure} />
            <Route path="/admin/testing" component={testing}/>
          </Route>
          <Route path="/admin/add-user">
              <AddUsers userRole={"Admin"} />
            </Route>
        </div>
      </Router>
    );
  }
}

export default withRouter(AdminRoute);
