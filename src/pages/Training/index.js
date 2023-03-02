import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import TrainingMain from "./TrainingMain";
import TrainingNavigation from "./TrainingNavigation";
import { decryptData } from "../../utils/encryptDecrypt";
const hideFunctional = true;
const orgId = decryptData(localStorage.orgId); 
class TrainingRoute extends Component {
  render() {
    const { path } = this.props.match;
    return (
      <div
        style={{
          display: "grid",
          backgroundColor: " #F8F8F8",
          gridRowGap: "20px",
          padding: "1.5% 2%",
        }}
      >
        <TrainingNavigation
          title="Training"
          routeLinks={
            orgId == "5"
              ? [
                  { skillType: "technical", id: 1 },
                  // { skillType: "functional", id: 2 },
                  { skillType: "interpersonal", id: 3 },
                  { skillType: "stakeholder", id: 4 },
                ]
              : [
                  { skillType: "technical", id: 1 },
                  { skillType: "functional", id: 2 },
                  { skillType: "interpersonal", id: 3 },
                  { skillType: "stakeholder", id: 4 },
                ]
          }
          selector="skillType"
          path={path}
        />
        <Switch>
          <Redirect exact from={path} to={`${path}/1/technical`} />
          <Route
            exact
            path={`${path}/:id/:skillType`}
            render={(routePath) => (
              <TrainingMain {...routePath} key={routePath.match.params.id} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default TrainingRoute;
