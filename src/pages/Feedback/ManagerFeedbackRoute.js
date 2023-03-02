import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import ManagerFeedback from "./ManagerFeedback";
import ManagerViewAllFeedback from "../../components/goals/manager/ManagerEmployeeAllFeedback";
class ManagerFeedbackRoute extends Component {
  render() {
    return (
      <div>
        <Route exact path="/manager/feedback">
          <ManagerFeedback />
        </Route>
        <Route
          path="/manager/feedback/all-feedback/:currentGeneralId"
          component={ManagerViewAllFeedback}
        ></Route>
      </div>
    );
  }
}

export default withRouter(ManagerFeedbackRoute);
