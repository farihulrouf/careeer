import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ComponentNavigation from "../../components/ComponentNavigationBarV2";
import Usermanagement from "../../components/UserManagementDetails";
import UserProfileView from "../../components/UserProfileView";
class UserManagementRoute extends Component {
  render() {
    const { path } = this.props.match;
    return (
      <div
        style={{
          fontSize: "16px",
          backgroundColor: " #F8F8F8",
          color: "#303030",
        }}
      >
        <Switch>
          <Redirect exact from={path} to={`${path}/user`} />
          <Route exact path={`${path}/:tab`}>
            <div
              style={{
                padding: "1.5% 2%",
              }}
            >
              <ComponentNavigation
                title="User Management"
                navLink={["Users", "Admin","AddUser"]}
                routePath={path}
              />
              <Route
                exact
                path={`${path}/:tab`}
                render={(routePath) => (
                  <Usermanagement
                    {...routePath}
                    key={routePath.match.params.tab}
                  />
                )}
              />
            </div>
          </Route>
          <Route
            path={`${path}/:tab/:employeeId/profile`}
            render={(routerProps) => (
              <UserProfileView
                {...routerProps}
                viewProfileFrom={"User Management"}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default UserManagementRoute;
