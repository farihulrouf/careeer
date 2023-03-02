import React, { Component } from "react";
import { getEmployeeGoalsFeedback } from "../../../core/apiClient/organization/organizationClient";
import timestampToDate from "../../../core/lib/TimeStampToDate";
import { decryptData } from "../../../utils/encryptDecrypt";
import ManagerEmployeeGoalList from "./ManagerEmployeeAssignedGoalList";

class ManagerEmployeeAssignedGoalsWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignedEmployeeList: [],
      searchResults: [],
    };
  }

  componentDidMount() {
    this.loadEmployeeAssignedGoalsDetails();
  }

  loadEmployeeAssignedGoalsDetails = async () => {
    try {
      let orgId = decryptData(localStorage.orgId),
        managerId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      if (orgId && managerId) {
        document.toggleLoading(true);
        let { data, status } = await getEmployeeGoalsFeedback(
          orgId,
          managerId,
          "manager",
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          let assignedEmployeeList = data;
          for (
            let i = 0;
            i < assignedEmployeeList.employeeDetails.length;
            i++
          ) {
            let goals = assignedEmployeeList.employeeDetails[i].goals;
            if (goals && goals.length >= 1) {
              for (let j = 0; j < goals.length; j++) {
                let goalObject = {
                  id: "",
                  title: "",
                  description: "",
                  goalTypeId: "",
                  startDate: "",
                  endDate: "",
                  employeeId: "",
                  managerId: "",
                  status: "",
                  completionPercentage: "",
                  goalType: "",
                };
                goalObject.startDate = timestampToDate(goals[j].startDate);
                goalObject.endDate = goals[j].endDate;
                goalObject.title = goals[j].title;
                goalObject.description = goals[j].description;
                goalObject.goalTypeId = goals[j].goalTypeId;
                goalObject.employeeId = goals[j].employeeId;
                goalObject.managerId = goals[j].managerId;
                goalObject.status = goals[j].status;
                goalObject.completionPercentage = goals[j].completionPercentage;
                goalObject.goalType = goals[j].goalType;
                goals[j] = goalObject;
              }
              assignedEmployeeList.employeeDetails[i].goals = goals;
            }
          }
          this.setState({
            assignedEmployeeList,
            searchResults: assignedEmployeeList,
          });
        }
        document.toggleLoading();
      }
    } catch (error) {
      console.log(error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  searchForEmployee = (e) => {
    this.setState({ searchKey: e.target.value });
    let searchResults = {};

    if (e.target.value !== "") {
      searchResults.employeeDetails = this.state.assignedEmployeeList.employeeDetails.filter(
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
            }
            return null;
          }
          return undefined;
        }
      );

      searchResults.count = searchResults.employeeDetails.length;
      this.setState({ searchResults });
    } else {
      this.setState({ searchResults: this.state.assignedEmployeeList });
    }
  };

  render() {
    const { history } = this.props;
    return (
      <ManagerEmployeeGoalList
        {...this.state}
        {...this}
        assignedEmployeeList={this.state.assignedEmployeeList}
        onClickGoalCard={(employeeName, employeeId) =>
          history.push(
            `${history.location.pathname}/${employeeId}/${employeeName
              .replace(/\s{1,}/g, "_")
              .toLowerCase()}`
          )
        }
        managerEmpGoalDetails={this.state.searchResults || []}
        onSearchEmployee={(e) => {
          this.searchForEmployee(e);
        }}
      />
    );
  }
}

export default ManagerEmployeeAssignedGoalsWrapper;
