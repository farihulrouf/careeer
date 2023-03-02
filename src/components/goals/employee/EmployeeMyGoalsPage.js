import React, { Component } from "react";
import EmployeeGoalList from "./EmployeeGoalList";
import { Drawer } from "antd";
import "antd/dist/antd.css";
import {
  getEmployeeGoalsFeedback,
  getEmployeeGoalsFeedbackStatus,
  requestGoalFeedback,
} from "../../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../../utils/encryptDecrypt";
import { message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import EmployeeGoalDrawer from "./EmployeeGoalDrawer";
class EmployeeMyGoalsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusUpdate: { value: "", isValid: false },
      employeeGoalList: [],
      feedbackPending: false,
      isGoalCompleted: false,
      drawerVisible: false,
      title: "",
    };
  }
  componentDidMount = () => {
    this.loadEmployeeGoals();
  };
  loadEmployeeGoals = async () => {
    try {
      let orgId = decryptData(localStorage.orgId),
        employeeId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      if (orgId && employeeId) {
        document.toggleLoading(true);
        let { data, status } = await getEmployeeGoalsFeedback(
          orgId,
          employeeId,
          "employees",
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          this.setState({
            employeeGoalList: data,
          });
        }
        document.toggleLoading();
      }
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };
  sendRequestFeedback = async (goalId, statusUpdate) => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let { status } = await requestGoalFeedback(
          orgId,
          employeeId,
          {
            goalId,
            statusUpdate: statusUpdate.trim(),
          },
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          message.success("Feedback sent successfully.");
          this.setState(
            {
              statusUpdate: { value: "", isValid: false },
              drawerVisible: false,
            },
            () => this.onCloseDrawer()
          );
        } else if (status >= 400 && status < 500) {
          message.error("Something went wrong");
        } else {
          message.error("Something went wrong! Please try after some time.");
        }
        document.toggleLoading();
      } catch (error) {
        document.message.error("Something went wrong! Please try again later.");
        document.toggleLoading();
      }
    }
  };
  loadGoalsFeedbackStatus = async (goalId) => {
    try {
      let orgId = decryptData(localStorage.orgId),
        employeeId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      if (orgId && employeeId) {
        document.toggleLoading(true);
        let { data, status } = await getEmployeeGoalsFeedbackStatus(
          orgId,
          employeeId,
          goalId,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          this.setState({
            feedbackPending: data.feedbackPending,
            isGoalCompleted: data.isCompleted,
          });
        }
        document.toggleLoading();
      }
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  onClickGoal = (goalId, employeeId, index) => {
    this.loadGoalsFeedbackStatus(goalId);
    let employeeGoalList = this.state.employeeGoalList;
    this.setState({
      drawerVisible: true,
      goalId: goalId,
      title: employeeGoalList[index].title,
      description: employeeGoalList[index].description,
      managerFirstName: employeeGoalList[index].managerFirstName,
      managerLastName: employeeGoalList[index].managerLastName,
      managerMiddleName: employeeGoalList[index].managerMiddleName,
      managerDesignation: employeeGoalList[index].managerDesignation,
      profilePicture: employeeGoalList[index].profilePicture,
    });
  };
  requestfeedbackHandler = () => {
    let statusUpdate = this.state.statusUpdate;
    if (
      statusUpdate.value &&
      statusUpdate.value.trim() !== "" &&
      statusUpdate.value.length <= 250 &&
      !this.state.feedbackPending
    ) {
      statusUpdate.isValid = false;
      this.setState({ statusUpdate });
      this.sendRequestFeedback(this.state.goalId, statusUpdate.value);
    } else {
      statusUpdate.isValid = true;
      this.setState({ statusUpdate });
    }
  };
  onChange = (value) => {
    this.setState({
      statusUpdate: { value, isValid: false },
    });
  };

  onCloseDrawer = () => {
    if (this.state.isGoalCompleted) {
      this.loadEmployeeGoals();
    }
    this.setState({
      drawerVisible: false,
      statusUpdate: { value: "", isValid: false },
    });
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
            My Learning Goals
          </div>
          <div style={{ color: "#FF808B", fontSize: "0.875em" }}>
            <u>
              <span
                onClick={this.props.onClickViewFeedBacks}
                style={{ cursor: "pointer" }}
              >
                View feedback
              </span>
            </u>
          </div>
        </div>
        <div style={{ height: 580 }}>
          {this.state.employeeGoalList.length !== 0 ? (
            <EmployeeGoalList {...this.state} onClickGoal={this.onClickGoal} />
          ) : (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <InboxOutlined style={{ fontSize: "5em" }} />
                <div style={{ fontSize: "1.4em" }}>No Learning Goals available</div>
              </div>
            )}
        </div>
        <Drawer
          placement="right"
          closable={false}
          visible={this.state.drawerVisible}
          onClose={this.onCloseDrawer}
          width={500}
        >
          <EmployeeGoalDrawer {...this.state} {...this} />
        </Drawer>
      </div>
    );
  }
}

export default EmployeeMyGoalsPage;
