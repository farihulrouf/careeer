import React, { Component } from "react";
import { decryptData } from "../../../utils/encryptDecrypt";
import { getManagerEmployeeGoalsFeedback } from "../../../core/apiClient/organization/organizationClient";
import { getManagerEmployeeGoalsFeedbacknew } from "../../../core/apiClient/organization/organizationClient";
import EmployeeGoalList from "../employee/EmployeeGoalList";
import "antd/dist/antd.css";
import Button from "../../Button";
import { Drawer } from "antd";
import ManagerAssignGoal from "./ManagerAddEmployeeGoalDrawer";
class EmployeeMyGoalsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDrawer: false,
      statusUpdate: "",
      employeeGoalList: [],
      feedbackPending: false,
    };
  }
  componentDidMount = () => {
    this.loadEmployeeGoals();
  };
  loadEmployeeGoals = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId),
        token = decryptData(localStorage.token),
        employeeId = this.props.selectedemployeeId,
        managerId = decryptData(localStorage.employeeId);
      if (orgId && employeeId) {
        let { data, status } = await getManagerEmployeeGoalsFeedbacknew(
          orgId,
          managerId,
          employeeId,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          this.setState({ employeeGoalList: [...data] });
          console.log(this.state.employeeGoalList[0].goalTypeId,"data")
          localStorage.setItem('goalTypeId', this.state.employeeGoalList[0].goalTypeId);
        }
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  onSetGoalClick = () => {
    this.setState({ showDrawer: true });
  };

  drawerHandler = () => {
    this.setState({
      showDrawer: false,
    });
    return;
  };

  render() {
    return (
      <div
        style={{
          fontFamily: "Open Sans Regular",
          color: "#303030",
          fontSize: "16px",
          background: "#F8F8F8",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Open Sans Semibold",
              fontSize: "1em",
              color: "#303030",
            }}
          >
            Assigned Goals
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <u
              style={{
                color: "rgb(244, 103, 115)",
                fontSize: "0.875em",
                marginRight: "15px",
                cursor: "pointer",
              }}
              onClick={this.props.viewAllFeedback}
            >
              View all feedback
            </u>
            <div
              onClick={this.onSetGoalClick}
              style={{
                width: 104,
                fontFamily: "Open Sans Regular",
                fontSize: "0.875em",
              }}
            >
              <Button
                label="Set Goals"
                styles={{
                  color: "#FFFFFF",
                  backgroundColor: "#FF808B",
                  border: "#FF808B",
                  height: "40px",
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ height: 580 }}>
          <EmployeeGoalList {...this.state} onClickGoal={null} cursor={false} />
        </div>
        <Drawer
          title={null}
          placement="right"
          closable={false}
          onClose={this.drawerHandler}
          visible={this.state.showDrawer}
          key="right"
          width="544px"
          className="custom-drawer"
        >
          <div
            style={{
              fontSize: "16px",
              width: "100%",
            }}
          >
            {this.state.showDrawer && (
              <ManagerAssignGoal
                employeeId={this.props.selectedemployeeId}
                drawerHandler={this.drawerHandler}
                loadDetails={this.loadEmployeeGoals}
              />
            )}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default EmployeeMyGoalsPage;
