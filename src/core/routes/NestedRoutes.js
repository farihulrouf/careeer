import React from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
class NestedRotes extends React.Component {
  render() {
    return (
      <Switch>
        {this.props.subPaths &&
          this.props.subPaths.map((elem, routeIndex) => {
            return (
              <Route
                key={routeIndex}
                exact
                path={
                  this.props.path === "/"
                    ? elem.path
                    : this.props.path + elem.path
                }
              >
                {<elem.page {...this.props} />}
              </Route>
            );
          })}
        <Redirect to={this.props.path + "/dashboard"}></Redirect>
      </Switch>
    );
  }
}
export default withRouter(NestedRotes);
