import React, { Component } from "react";
import {
  getManagerEmployeesGoalsFeedback,
  getEmployeeRequestGoalsFeedback,
  updateManagerEmployeeGoalsFeedback,
} from "../../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../../utils/encryptDecrypt";
import ManagerEmployeeGoalsFeedbackRequestList from "./ManagerEmployeeGoalsFeedbackRequestList";
import ManagerEmployeeGoalsFeedbackListGroup from "./ManagerEmployeeGoalsFeedbackListGroup";

class ManagerEmployeeGoalsFeedbackPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackRequestList: [],
      feedbackRequestSearchResults: [],
      feedbackSeachKey: "",
      employeeFeedbacks: {},
      goalEmployeeId: "",
      selectedIndex: null,
      isEmployeeFeedbackSelected: false,
    };
  }
  componentDidMount() {
    this.loadEmployeeGoalsFeedbackRequest();
  }
  loadEmployeeGoalsFeedbackRequest = async () => {
    let orgId = decryptData(localStorage.orgId),
      managerId = decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);
    if (orgId && managerId) {
      document.toggleLoading(true);
      try {
        let { data, status } = await getManagerEmployeesGoalsFeedback(
          orgId,
          managerId,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          this.setState({
            feedbackRequestList: data,
            feedbackRequestSearchResults: data,
          });
        }
        document.toggleLoading();
      } catch (error) {
        document.message.error(
          "Unable to populate fields at this time, please try after sometime"
        );
      }
      document.toggleLoading();
    }
  };

  loadSelectedFeedbackRequest = async (empId, selectedIndex) => {
    let orgId = decryptData(localStorage.orgId),
      managerId = decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);
    if (orgId && managerId) {
      document.toggleLoading(true);
      try {
        let { data, status } = await getEmployeeRequestGoalsFeedback(
          orgId,
          managerId,
          empId,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          let employeeFeedbacks = this.state.employeeFeedbacks;
          employeeFeedbacks = data;
          employeeFeedbacks.goals.map((eachGoal) => {
            eachGoal.comment = "";
            eachGoal.validComment = false;
            return eachGoal;
          });
          this.setState({
            goalEmployeeId: empId,
            employeeFeedbacks: employeeFeedbacks,
            selectedIndex: selectedIndex,
            isEmployeeFeedbackSelected: true,
          });
        }
        document.toggleLoading();
      } catch (error) {
        document.message.error(
          "Unable to populate fields at this time, please try after sometime"
        );
      }
      document.toggleLoading();
    }
  };

  onClickFeedbackRequestList = (index, employeeId) => {
    this.loadSelectedFeedbackRequest(employeeId, index);
  };

  ratePerformanceHandler = (value, index) => {
    let employeeFeedbacks = this.state.employeeFeedbacks;
    employeeFeedbacks.goals[index].completionPercentage = value;
    this.setState({
      employeeFeedbacks,
    });
  };

  addNoteHandler = (value, index) => {
    let employeeFeedbacks = this.state.employeeFeedbacks;
    employeeFeedbacks.goals[index].comment = value;
    employeeFeedbacks.goals[index].validComment = false;
    this.setState({
      employeeFeedbacks,
    });
  };

  //Need to check with client
  cancelGoalFeedback = () => {};

  submitGoalFeedback = async (goalId, completionPercentage, comment, index) => {
    let valid = this.validate(comment, index);
    if (valid) {
      let orgId = decryptData(localStorage.orgId),
        token = decryptData(localStorage.token),
        managerId = decryptData(localStorage.employeeId);
      if (completionPercentage !== 0) {
        if (orgId && managerId) {
          document.toggleLoading(true);
          try {
            let { data, status } = await updateManagerEmployeeGoalsFeedback(
              orgId,
              managerId,
              {
                goalId,
                completionPercentage,
                comment: comment.trim(),
              },
              {
                Authorization: token,
              }
            );
            if (status >= 200 && status < 300) {
              document.message.success("Feedback Submitted Successfully.");
              let employeeFeedbacks = this.state.employeeFeedbacks;
              if (employeeFeedbacks.goals.length !== 0) {
                employeeFeedbacks.goals.splice(index, 1);
                this.setState({
                  employeeFeedbacks: employeeFeedbacks,
                });
              }
              if (employeeFeedbacks.goals.length === 0) {
                let feedbackRequestList = this.state.feedbackRequestList;
                feedbackRequestList.splice(this.state.selectedIndex, 1);
                if (feedbackRequestList.length !== 0) {
                  if (
                    this.state.selectedIndex >
                    feedbackRequestList.length - 1
                  ) {
                    this.setState(
                      {
                        selectedIndex: 0,
                      },
                      () =>
                        this.loadSelectedFeedbackRequest(
                          feedbackRequestList[this.state.selectedIndex]
                            .employeeId,
                          this.state.selectedIndex
                        )
                    );
                  } else {
                    this.loadSelectedFeedbackRequest(
                      feedbackRequestList[this.state.selectedIndex].employeeId,
                      this.state.selectedIndex
                    );
                  }
                } else {
                  this.setState({ isEmployeeFeedbackSelected: false });
                }
                this.setState({ feedbackRequestList });
              }
            } else if (status >= 400 && status < 500) {
              document.message.error(data);
            }
            document.toggleLoading();
          } catch (error) {
            document.message.error(
              "Unable to save details at this time, please try after sometime"
            );
          }
          document.toggleLoading();
        }
      } else {
        document.message.error("Please rate the performance");
      }
    }
  };

  validate = (comment, index) => {
    let employeeFeedbacks = this.state.employeeFeedbacks;
    if (comment.trim() !== "" && comment.length <= 250) {
      employeeFeedbacks.goals[index].validComment = false;
      this.setState({ employeeFeedbacks });
      return true;
    } else {
      employeeFeedbacks.goals[index].validComment = true;
      this.setState({ employeeFeedbacks });
      return false;
    }
  };

  searchRequestFeedBackEmployee = (e) => {
    this.setState({ feedbackSeachKey: e.target.value });
    let feedbackRequestSearchResults = [];
    if (e.target.value !== "") {
      feedbackRequestSearchResults = this.state.feedbackRequestList.filter(
        (element) => {
          let fullName = element.firstName + " " + element.lastName;
          for (let i = 0; i < e.target.value.length; i++) {
            let charpos =
              element.firstName.toLocaleLowerCase().charAt(i) ===
                e.target.value.toLocaleLowerCase().charAt(i) ||
              element.lastName.toLocaleLowerCase().charAt(i) ===
                e.target.value.toLocaleLowerCase().charAt(i);
            if (charpos) {
              return fullName
                .toLocaleLowerCase()
                .includes(e.target.value.toLocaleLowerCase());
            } else return null;
          }
          return undefined;
        }
      );
      this.setState({ feedbackRequestSearchResults });
    } else {
      this.setState({
        feedbackRequestSearchResults: this.state.feedbackRequestList,
      });
    }
  };

  render() {
    return (
      <div style={{ display: "flex", fontSize: "16px" }}>
        <div
          style={{
            flex: 0.5,
            marginRight: 22,
            boxShadow: "1px 4px 12px #00000027",
            borderRadius: 8,
            background: "#FFFFFF",
          }}
        >
          <ManagerEmployeeGoalsFeedbackRequestList
            {...this.state}
            onClickList={this.onClickFeedbackRequestList}
            searchRequestFeedBackEmployee={this.searchRequestFeedBackEmployee}
          />
        </div>
        <div
          style={{
            flex: 1,
            boxShadow: "1px 4px 12px #00000027",
            borderRadius: 8,
            background: "#FFFFFF",
          }}
        >
          <ManagerEmployeeGoalsFeedbackListGroup
            {...this.state}
            history={this.props.history}
            path={this.props.path}
            addNoteHandler={this.addNoteHandler}
            rateHandler={this.ratePerformanceHandler}
            submitGoalFeedback={this.submitGoalFeedback}
          />
        </div>
      </div>
    );
  }
}

export default ManagerEmployeeGoalsFeedbackPage;
