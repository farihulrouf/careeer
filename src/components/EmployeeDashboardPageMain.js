import React, { Component } from "react";
import EmployeeDashboardPage from "./EmployeeDashboardPage";
import { decryptData } from "../utils/encryptDecrypt";
class EmployeeDashboardPageMain extends Component {
  state = {
    selectedUser: null,
  };
  componentDidMount = () => {
    this.loadEmployeeDetails();
  };
  loadEmployeeDetails = async () => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId);
    if (orgId && employeeId) {
      this.setState({
        selectedUser: employeeId,
        isLoading: false,
      });
    }
  };
  viewProfileHandler = () => {
    window.open("/employee/dashboard/profile", "_self");
  };
  render() {
    let { selectedUser } = this.state;
    return (
      <div
        style={{
          background: "#F8F8F8",
          fontFamily: "Open Sans Regular",
          color: "#303030",
          padding: "20px",
          fontSize: 16,
        }}
      >
        <EmployeeDashboardPage
          viewProfileHandler={this.viewProfileHandler}
          selectedUser={selectedUser}
          {...this.props}
        />
      </div>
    );
  }
}

export default EmployeeDashboardPageMain;
