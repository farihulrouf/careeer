import React, { Component } from "react";
import ManagerViewEmployeeGoalsFeedbackList from "./ManagerViewEmployeeGoalsFeedbackList";
import {
  getAllEmployeeGoalsFeedback,
  getGoalsFeedbackComments,
} from "../../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../../utils/encryptDecrypt";
import FormSelector from "../../form_selector";
import { Modal, Empty } from "antd";
import "antd/dist/antd.css";
import Close from "../../../assets/images/closeImage.svg";
import ManagerViewEmployeeFeedbackComments from "./ManagerViewEmployeeFeedbackComments";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = new Date();
let monthIndex = date.getMonth();

class ManagerViewEmployeeGoalsFeedback extends Component {
  state = {
    selectedMonth: months[monthIndex],
    monthOptions: months,
    selectedMonthToMonthIndex: monthIndex + 1,
    cursor: true,
    visible: false,
    commentsList: [],
  };

  componentDidMount() {
    this.fetchAllGoalFeedbacks();
  }

  setCurrentMonthForFilter = (selectedMonth) => {
    this.setState(
      {
        selectedMonth: selectedMonth,
        selectedMonthToMonthIndex:
          this.state.monthOptions.indexOf(selectedMonth) + 1,
      },
      () => {
        this.fetchAllGoalFeedbacks();
      }
    );
  };

  async fetchAllGoalFeedbacks() {
    try {
      let orgId = decryptData(localStorage.orgId),
        employeeId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      if (orgId && employeeId) {
        document.toggleLoading(true);
        let { data, status } = await getAllEmployeeGoalsFeedback(
          orgId,
          employeeId,
          this.state.selectedMonthToMonthIndex,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          this.setState({ goalsFeedback: [...data.feedback] });
        }
        document.toggleLoading();
      }
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  }

  async loadAllComments(goalId) {
    try {
      let orgId = decryptData(localStorage.orgId),
        employeeId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      if (orgId && employeeId) {
        document.toggleLoading(true);
        let { data, status } = await getGoalsFeedbackComments(
          orgId,
          employeeId,
          goalId,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          this.setState({ commentsList: [...data] });
        }
        document.toggleLoading();
      }
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  }

  viewComments = (goalId) => {
    this.setState({ visible: true });
    this.loadAllComments(goalId);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <div style={{ height: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: "120px",
              fontSize: "0.775em",
            }}
          >
            <FormSelector
              type="selector"
              value={this.state.selectedMonth}
              onClick={this.setCurrentMonthForFilter}
              option={this.state.monthOptions}
              placeHolder="Select Month"
              style={{
                color: {
                  hover: "#ff808b",
                  selectedBg: "#ff808b",
                  optionHover: "rgb(253, 185, 191)",
                  selectedFont: "#ffffff",
                },
                height: "36px",
              }}
            />
          </div>
        </div>
        <ManagerViewEmployeeGoalsFeedbackList {...this.state} {...this} />
        <Modal
          title={null}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
          height={300}
          width={"46%"}
        >
          <div style={{ fontFamily: "Open Sans Regular" }}>
            <div
              style={{
                position: "absolute",
                right: "15px",
                top: " 13px",
                zIndex: 11,
                backgroundColor: "#ffffff",
              }}
            >
              <img
                src={Close}
                alt="close"
                style={{ width: 32, height: 32, cursor: "pointer" }}
                onClick={this.handleCancel}
              />
            </div>
            {this.state.commentsList.length > 0 ? (
              <ManagerViewEmployeeFeedbackComments
                commentsList={this.state.commentsList}
              />
            ) : (
              <div
                style={{
                  height: "300px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Empty description={false} />
                <div> No Comments</div>
              </div>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

export default ManagerViewEmployeeGoalsFeedback;
