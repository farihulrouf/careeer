import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ComponentNavigation from "../../../components/ComponentNavigationBarV2";
import CourseApproval from "../../../components/approval/admin/AdminApprovalCourse";
import CareerApproval from "../../../components/EmployeeCareerApprovals";
class ManagerApproval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subNavLink: [
        {
          title: "Pending",
          count: "",
          subPath: "course/pending",
        },
        {
          title: "On hold",
          count: "",
          subPath: "course/hold",
        },
        {
          title: "Approved",
          count: "",
          subPath: "course/approved",
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
            { title: "Career Path", path: "Career Path" },
          ]}
          subNavLink={this.state.subNavLink}
          routePath={path}
        />
        <Switch>
          <Redirect exact from={path} to={`${path}/course/pending`} />
          <Route
            exact
            path={`${path}/career-path`}
            component={CareerApproval}
          />
          <Route
            exact
            path={`${path}/course/:subTab`}
            render={(routePath) => (
              <CourseApproval
                {...routePath}
                key={routePath.match.params.subTab}
                handleSubNavCount={this.handleSubNavCount}
                userRole="manager"
              />
            )}
          />
          <Route exact path={`${path}/career-path`} />
        </Switch>
      </div>
    );
  }
}

export default ManagerApproval;
