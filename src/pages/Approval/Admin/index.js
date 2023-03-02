import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ComponentNavigation from "../../../components/ComponentNavigationBarV2";
import CourseApproval from "../../../components/approval/admin/AdminApprovalCourse";
import RewardApproval from "../../../components/approval/admin/AdminApprovalReward";
class AdminApproval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subNavLink: [
        {
          title: "Pending",
          count: "",
          subPath: "pending",
        },
        {
          title: "On hold",
          count: "",
          subPath: "hold",
        },
        {
          title: "Approved",
          count: "",
          subPath: "approved",
        },
      ],
    };
  }
  handleSubNavCount = (subNavLink) => {
    this.setState({ subNavLink });
  };
  render() {
    const { path } = this.props.match;
    return (
      <div
        style={{
          padding: "1.5% 2%",
          fontSize: "16px",
          color: "#303030",
          fontFamily: " Open Sans Regular",
          backgroundColor: "#f8f8f8",
        }}
      >
        <ComponentNavigation
          title="Approval"
          navLink={[
            { title: "Course", path: `course/pending` },
            // { title: "Rewards", path: "rewards/pending" },
          ]}
          subNavLink={this.state.subNavLink}
          routePath={path}
        />
        <Switch>
          <Redirect exact from={path} to={`${path}/course/pending`} />

          <Route
            exact
            path={`${path}/course/:subTab`}
            render={(routePath) => (
              <CourseApproval
                {...routePath}
                key={routePath.match.params.subTab}
                handleSubNavCount={this.handleSubNavCount}
              />
            )}
          />
          {/* <Route
            exact
            path={`${path}/rewards/:subTab`}
            render={(routePath) => (
              <RewardApproval
                {...routePath}
                key={routePath.match.params.subTab}
                handleSubNavCount={this.handleSubNavCount}
              />
            )}
          /> */}
        </Switch>
      </div>
    );
  }
}

export default AdminApproval;
