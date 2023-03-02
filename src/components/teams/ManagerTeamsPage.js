import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ManagerTeamWrapper from "./ManagerTeamWrapper";
import UserProfileView from "../UserProfileView";

class ManagerTeamPage extends Component {
  render() {
    const { path } = this.props.match;
    return (
      <div>
        <Switch>
          <Route exact path={path} component={ManagerTeamWrapper} />
          <Route
            path={`${path}/profile/:employeeId`}
            render={(routerProps) => (
              <UserProfileView {...routerProps} viewProfileFrom={"Team"} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default ManagerTeamPage;
