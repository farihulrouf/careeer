import React, { Component } from "react";
import ManagerAddEmployeeGoal from "./ManagerAddEmployeeGoal";
import Business from "../../../assets/images/business.svg";
import Learning from "../../../assets/images/learning.svg";
import Implementation from "../../../assets/images/implementation.svg";
import SoftSkill from "../../../assets/images/softSkill.svg";
import Stakeholder from "../../../assets/images/stakeholder.svg";
import {
  getGoalTypes,
  saveManagerGoalDetails,
  getEmployeeDetails,
} from "../../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../../utils/encryptDecrypt";
import dateTimeToTimestamp from "../../../core/lib/DateTimeToTimeStamp";

export default class ManagerAddEmployeeGoalDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeDetails: {},
      goalTypes: [],
      selectedGoalType: { value: "", isValid: false },
      description: { value: "", isValid: false },
      goalTitle: { value: "", isValid: false },
      startDate: { value: "", stringValue: "", isValid: false },
      endDate: { value: "", stringValue: "", isValid: false },
    };
  }
  componentDidMount() {
    this.loadEmployeeAssignedGoalTypes();
    this.loadEmployeeDetails();
  }

  loadEmployeeDetails = async () => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = this.props.employeeId,
      token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await getEmployeeDetails(orgId, employeeId, {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          this.setState({
            employeeDetails: data.professionalDetails,
          });
        }
        document.toggleLoading();
      } catch (error) {
        document.message.error(
          "Unable to fetch details, please try after sometime"
        );
        document.toggleLoading();
      }
    }
  };

  loadEmployeeAssignedGoalTypes = async () => {
    try {
      let orgId = decryptData(localStorage.orgId),
        managerId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      if (orgId && managerId) {
        let goalTypes = [];
        document.toggleLoading(true);
        let { data, status } = await getGoalTypes(orgId, managerId, {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          for (let i = 0; i < data.length; i++) {
            let object = { id: "", title: "", status: "", image: "" };
            if (data[i].title === "Learning") {
              object.image = Learning;
            } else if (data[i].title === "Implementation") {
              object.image = Implementation;
            } else if (data[i].title === "Business") {
              object.image = Business;
            } else if (data[i].title === "Soft Skill") {
              object.image = SoftSkill;
            } else {
              object.image = Stakeholder;
            }
            object.title = data[i].title;
            object.id = data[i].id;
            object.status = data[i].status;
            goalTypes.push(object);
          }
          this.setState({ goalTypes });
          
        }
        document.toggleLoading();
      }
      localStorage.setItem()
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  getStartTime = (date) => {
    let strDate = date.split("-");
    let today = new Date();

    if (
      parseInt(strDate[0], 10) === today.getDate() &&
      parseInt(strDate[1], 10) === today.getMonth() + 1 &&
      parseInt(strDate[2], 10) === today.getFullYear()
    ) {
      return (
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
      );
    } else {
      return "00:00:00";
    }
  };

  saveGoalDetails = async (goalDetails) => {
    try {
      let orgId = decryptData(localStorage.orgId),
        managerId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      if (orgId && managerId) {
        let object = {
          employeeId: "",
          title: "",
          goalType: "",
          description: "",
          startDate: "",
          endDate: "",
        };
        document.toggleLoading(true);
        if (goalDetails.startDate) {
          object.startDate = dateTimeToTimestamp({
            date: goalDetails.startDate,
            time: this.getStartTime(goalDetails.startDate),
          });
        }
        if (goalDetails.endDate) {
          object.endDate = dateTimeToTimestamp({
            date: goalDetails.endDate,
            time: "23:59:59",
          });
        }
        object.employeeId = goalDetails.employeeId;
        object.title = goalDetails.title;
        object.goalType = goalDetails.goalType;
        object.description = goalDetails.description;
        let { data, status } = await saveManagerGoalDetails(
          orgId,
          managerId,
          { ...object },
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          document.message.success(data);
          this.props.loadDetails();
        } else {
          document.message.error("Something went wrong");
        }

        document.toggleLoading();
      }
      document.toggleLoading();
      return;
    } catch (error) {
      console.log(error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  dateInputHandler = (value, stringValue, field) => {
    if (field === "startDate" && !value) {
      this.setState({
        endDate: { value: "", stringValue: "", isValid: false },
      });
    }
    this.setState({ [field]: { value, stringValue, isValid: false } });
  };

  disabledEndDate = (current, value) => {
    return current && value && current < value.endOf("day");
  };

  validate = (inputValue, pattern) => {
    let inputData = this.state[inputValue];
    if (
      inputData.value &&
      ((pattern &&
        inputData.value.trim() !== "" &&
        inputData.value.length <= pattern) ||
        !pattern)
    ) {
      inputData.isValid = false;
      this.setState({ [inputValue]: inputData });
      return true;
    } else {
      inputData.isValid = true;
      this.setState({ [inputValue]: inputData });
      return false;
    }
  };

  goalInputHandler = (field, value) => {
    this.setState({ [field]: { value, isValid: false } });
  };

  onSetGoalDrawer = () => {
    let titleValidation = this.validate("goalTitle", 30);
    let descripValidate = this.validate("description", 250);
    let goalTypeValidation = this.validate("selectedGoalType");
    let startDateValidation = this.validate("startDate");
    let endDateValidtion = this.validate("endDate");
    if (
      titleValidation &&
      descripValidate &&
      goalTypeValidation &&
      startDateValidation &&
      endDateValidtion
    ) {
      let setGoal = {
        title: "",
        body: "",
        goalType: "",
        startDate: "",
        endDate: "",
        employeeId: "",
      };
      setGoal.title = this.state.goalTitle.value.trim();
      setGoal.description = this.state.description.value.trim();
      setGoal.goalType = this.state.selectedGoalType.value;
      setGoal.employeeId = this.props.employeeId;
      setGoal.endDate = this.state.endDate.stringValue;
      setGoal.startDate = this.state.startDate.stringValue;
      this.saveGoalDetails(setGoal);
      this.props.drawerHandler();
    }
  };

  render() {
    return (
      <ManagerAddEmployeeGoal
        title="Add New Goal"
        goalTypes={this.state.goalTypes}
        employee={this.state.employeeDetails}
        drawerHandler={this.props.drawerHandler}
        onSetGoalDrawer={this.onSetGoalDrawer}
        goalInputHandler={this.goalInputHandler}
        disabledEndDate={this.disabledEndDate}
        dateInputHandler={this.dateInputHandler}
        {...this.state}
      />
    );
  }
}
