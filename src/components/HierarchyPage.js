import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import HierarchyDepartmentList from "./HierarchyDepartmentList";
import ManagerEmployeeHierarchyWrapper from "./ManagerEmployeeHierarchyWrapper";
import "../assets/css/OpenSans.css";
import UserProfileView from "./UserProfileView";

export default class HierarchyPage extends Component {
  render() {
    const { path } = this.props.match;
    return (
      <div>
        <Switch>
          <Route exact path={path} component={HierarchyDepartmentList} />
          <Route
            exact
            path={`${path}/:id/:department`}
            component={ManagerEmployeeHierarchyWrapper}
          />
          <Route
            path={`${path}/:id/:department/profile/:employeeId`}
            render={(routerProps) => (
              <UserProfileView {...routerProps} viewProfileFrom={"Hierarchy"} />
            )}
          />
        </Switch>
      </div>
    );
  }
}
