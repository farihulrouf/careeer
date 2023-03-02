import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ComponentNavigation from "../../../components/ComponentNavigationBarV2";
import ManagerEmployeeGoalsFeedbackPage from "../../../components/goals/manager/ManagerEmployeeGoalsFeedbackPage";
import ManagerViewFeedBack from "../../../components/goals/manager/ManagerViewFeedBackPage";
import ManagerAssignedGoals from "../../../components/goals/manager/ManagerEmployeeAssignedGoalsWrapper";
import ManagerViewEmployeeGoalProfile from "../../../components/goals/manager/ManagerViewEmployeeGoalProfile";
import UserProfileView from "../../../components/UserProfileView";
class ManagerGoalsRoute extends Component {
  render() {
    const { path } = this.props.match;
    return (
      <div
        style={{
          fontSize: "16px",
          backgroundColor: " #F8F8F8",
        }}
      >
        <Switch>
          <Redirect exact from={path} to={`${path}/assigned-goals`} />
          <Route exact path={`${path}/:tab`}>
            <div
              style={{
                display: "grid",
                gridRowGap: "20px",
                padding: "1.5% 2%",
              }}
            >
              <div style={{ marginTop: 20 }}>
                <ComponentNavigation
                  title="Learning Goals"
                  navLink={["Assigned Goals", "Goals Feedback"]}
                  routePath={path}
                  {...this.props}
                />
              </div>
              <Route
                exact
                path={`${path}/assigned-goals`}
                render={(routePath) => <ManagerAssignedGoals {...routePath} />}
              />
              <Route
                exact
                path={`${path}/goals-feedback`}
                render={(routePath) => (
                  <ManagerEmployeeGoalsFeedbackPage
                    {...routePath}
                    path={path}
                  />
                )}
              />
            </div>
          </Route>
          <Route
            exact
            path={`${path}/:tab/:employeeId/:name`}
            component={ManagerViewEmployeeGoalProfile}
          />
          <Route
            exact
            path={`${path}/:tab/:employeeId/:name/all-feedback`}
            component={ManagerViewFeedBack}
          />
          <Route
            path={`${path}/:tab/:employeeId/:name/profile`}
            render={(routerProps) => (
              <UserProfileView
                {...routerProps}
                viewProfileFrom={"Goals > Assigned Goals"}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default ManagerGoalsRoute;
