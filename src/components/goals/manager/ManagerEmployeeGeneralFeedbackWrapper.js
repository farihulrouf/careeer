import React, { Component } from "react";
import styled from "styled-components";
import ManagerEmployeeGeneralFeedbackListGroup from "./ManagerEmployeeGeneralFeedbackListGroup";
import ManagerEmployeeGeneralFeedbackTeamList from "./ManagerEmployeeGeneralFeedbackTeamList";
import {
  getManagerTeamGeneralFeedback,
  getManagerEmployeeGeneralFeedbackDetails,
  updateGeneralFeedback,
} from "../../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../../utils/encryptDecrypt";
import timeDifferenceToCurrentTime from "../../../core/lib/GetTimeStampDifferenceToCurrentTime";
import { message } from "antd";

const Div = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  grid-column-gap: 1.4em;
  margin-bottom: 8em;
  min-height: 600px;

  #button-container {
    width: 100%;
    position: fixed;
    z-index: 1;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    background: #ffffff;
    padding: 1.2% 3%;
    box-shadow: 0 0 8px #ccc;
    left: 0;
  }
  .button {
    width: 8.5em;
    font-size: 0.875em;
    margin: 0 0.5%;
  }
`;

class ManagerEmployeeGeneralFeedbackWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employee: "",
      isValid: false,
      currentGeneralId: "",
      generalFeedbackNote: "",
      teamList: [],
      selectedEmployee: "",
      title: "Employee Feedback",
      generalFeedbackGroup: {},
      feedbackList: [],
      searchValue: "",
      multipleskillRating: [],
    };
  }

  componentDidMount() {
    this.loadGeneralFeedbackTeam();
  }

  loadGeneralFeedbackTeam = async () => {
    try {
      let orgId = decryptData(localStorage.orgId),
        managerId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      if (orgId && managerId) {
        document.toggleLoading(true);
        let { data, status } = await getManagerTeamGeneralFeedback(
          orgId,
          managerId,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          const teamList = data.map((teamMember) => {
            if (
              timeDifferenceToCurrentTime(teamMember.pendingfeedbackDate) > 0
            ) {
              teamMember.pendingFeedbackStatus = 1;
            } else if (
              timeDifferenceToCurrentTime(teamMember.pendingfeedbackDate) < 0
            ) {
              teamMember.pendingFeedbackStatus = -1;
            } else {
              teamMember.pendingFeedbackStatus = 0;
            }
            return teamMember;
          });

          this.setState({ teamList, feedbackList: teamList });
        } else {
          document.message.error(JSON.stringify(data));
        }
        document.toggleLoading();
      }
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  getEmployeeDetails = (employeeId) => {
    let teamMember = this.state.teamList.find(
      (teamMember) => teamMember.employeeId === employeeId
    );
    return {
      timeStamp: teamMember.pendingfeedbackDate,
      status: teamMember.pendingFeedbackStatus,
    };
  };

  loadEmployeeGeneralFeedbackDetails = async (id, employee) => {
    let orgId = decryptData(localStorage.orgId),
      managerId = decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);
    if (orgId && managerId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await getManagerEmployeeGeneralFeedbackDetails(
          orgId,
          managerId,
          id,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          let employeeDetails = data;
          this.setState({
            generalFeedbackGroup: employeeDetails,
            generalFeedbackNote: "",
            employee,
            multipleskillRating: employeeDetails.feedback,
          });
        } else {
          document.message.error(JSON.stringify(data));
        }
        document.toggleLoading();
      } catch (error) {
        document.message.error("Something went wrong! Please try again later.");
        document.toggleLoading();
      }
    }
  };

  submitGeneralFeedback = async (timeStamp) => {
    let orgId = decryptData(localStorage.orgId),
      managerId = decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);
    if (orgId && managerId) {
      try {
        let obj = {
          feedbackDate: timeStamp,
          note: this.state.generalFeedbackNote,
          feedback: this.state.multipleskillRating,
        };
        if (
          obj.feedbackDate &&
          obj.note.trim() !== "" &&
          obj.note.length <= 250
        ) {
          this.setState({ isValid: false });
          document.toggleLoading(true);
          let currentEmpId = this.state.selectedEmployeeId;
          let { data, status } = await updateGeneralFeedback(
            obj,
            orgId,
            managerId,
            currentEmpId,
            {
              Authorization: token,
            }
          );
          if (status >= 200 && status < 300) {
            message.success("Feedback Submitted Successfully.");
            this.setState(
              { multipleskillRating: [], generalFeedbackNote: "" },
              () => {
                this.loadEmployeeGeneralFeedbackDetails(
                  this.state.selectedEmployeeId,
                  this.state.employee
                );
                this.loadGeneralFeedbackTeam();
              }
            );
          } else {
            message.error(data);
          }
          document.toggleLoading();
        } else if (
          this.state.selectedEmployeeId &&
          this.state.employee.pendingFeedbackStatus !== -1
        ) {
          this.setState({ isValid: true });
          window.scrollTo({
            left: 0,
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
          if (!obj.note) {
            message.error("Please write a note");
          }
        }
        document.toggleLoading();
      } catch (error) {
        document.message.error("Something went wrong! Please try again later.");
        document.toggleLoading();
      }
    }
  };

  employeeSelectHandler = async (employee, index) => {
    this.setState({
      selectedEmployee: index,
      selectedEmployeeId: employee.employeeId,
    });
    await this.loadEmployeeGeneralFeedbackDetails(
      employee.employeeId,
      employee
    );
  };

  slideChangeHandler = (sliderValue, mainIndex, index) => {
    let multipleskillRating = this.state.generalFeedbackGroup.feedback;
    multipleskillRating[mainIndex].skills[index].rating =
      sliderValue.target.value;
    this.setState({
      multipleskillRating,
    });
  };

  managerGeneralFeedbackNote = (inputNote) => {
    this.setState({
      generalFeedbackNote: inputNote,
      isValid: false,
    });
  };

  updateGeneralFeedBackDetails = (generalFeedback) => {
    this.setState({ generalFeedbackGroup: generalFeedback });
  };

  searchInputHandler = (e) => {
    this.setState({ searchValue: e.target.value });
    let feedbackList = [];
    if (e.target.value !== "") {
      feedbackList = this.state.teamList.filter((element) => {
        for (let i = 0; i < e.target.value.length; i++) {
          let fullName = element.firstName + " " + element.lastName;
          let charpos =
            element.firstName.toLocaleLowerCase().charAt(i) ===
              e.target.value.toLocaleLowerCase().charAt(i) ||
            element.lastName.toLocaleLowerCase().charAt(i) ===
              e.target.value.toLocaleLowerCase().charAt(i);
          if (charpos) {
            return fullName
              .toLocaleLowerCase()
              .includes(e.target.value.toLocaleLowerCase());
          } else return false;
        }
        return undefined;
      });
      this.setState({ feedbackList });
    } else {
      this.setState({ feedbackList: this.state.teamList });
    }
  };

  render() {
    return (
      <Div>
        <div>
          <ManagerEmployeeGeneralFeedbackTeamList
            teamList={this.state.feedbackList}
            title="Team Lists"
            employeeSelectHandler={this.employeeSelectHandler}
            selectedEmployee={this.state.selectedEmployee}
            searchEmployee={(e) => this.searchInputHandler(e)}
            searchValue={this.state.searchValue}
          />
        </div>
        <div>
          <div style={{ height: "100%" }}>
            <ManagerEmployeeGeneralFeedbackListGroup
              {...this.state}
              updateGeneralFeedBackDetails={this.updateGeneralFeedBackDetails}
              managerGeneralFeedbackNote={this.managerGeneralFeedbackNote}
              slideChangeHandler={this.slideChangeHandler}
              submitGeneralFeedback={this.submitGeneralFeedback}
              requiredEmployeeDetails={
                this.state.selectedEmployeeId &&
                this.getEmployeeDetails(this.state.selectedEmployeeId)
              }
            />
          </div>
        </div>
      </Div>
    );
  }
}

export default ManagerEmployeeGeneralFeedbackWrapper;
