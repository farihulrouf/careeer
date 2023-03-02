import React, { Component } from "react";
import styled from "styled-components";
import ManagerDetailsWrapper from "./ManagerDetailsWrapper";
import TeamMemberCard from "../HierarchyTeamMember";
import HiddenEmployeesDisplay from "../HiddenEmployeesDisplay";
import ManagerAddTeamEmployeeDrawer from "./ManagerAddTeamEmployeeDrawer";
import PopUpDisplay from "../PopUpDisplay";
import "antd/dist/antd.css";
import {
  getManagerTeam,
  getManagerDetails,
  updateManagerTeam,
  getDepartments,
  getDesignations,
  getManagerSubordinates,
  removeManagerTeamEmployee,
} from "../../core/apiClient/organization/organizationClient";
import { Drawer } from "antd";
import { decryptData } from "../../utils/encryptDecrypt";

const Div = styled.div`
  font-size: 16px;
  font-family: Open Sans Regular;
  color: #303030;
  background-color: #f8f8f8;
  padding: 1.2% 1%;

  .teams-title {
    font-family: Open Sans Semibold;
    font-size: 1.13em;
    margin-bottom: 10px;
  }
  .team-container {
    display: flex;
    background: #ffffff;
    min-height: 80vh;
    box-shadow: 1px 4px 12px #00000027;
    padding: 1%;
    border-radius: 10px;
  }

  .manager-team-head {
    min-width: 178px;
    max-width: 15.8%;
    font-size: 0.875em;
    padding: 0 1%;
  }
  .manager-enployee-Container {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    grid-auto-rows: max-content;
    font-size: 0.875em;
    margin: 0 1%;
  }
  .sideBorder {
    border-left: 1px solid #dddddd;
    height: 258px;
    margin-top: 5px;
  }
  .manager-hidden {
    height: 155px;
    width: 131px;
  }
  @media (max-width: 1110px) {
    .manager-enployee-Container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

class ManagerTeamWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeList: [],
      departmentList: [],
      designationList: [],
      showDrawer: false,
      selectedDesignation: "",
      selectedDepartment: "",
      selectedProject: "",
      selectedEmployeeName: "",
      valid: false,
      removeEmployee: { isClicked: false, name: "" },
      viewStatus: false,
      reportees: [],
      imageData: [],
      reporteeIndex: "",
      manager: "",
      managerList: [],
      errorMessage: "Employee already exist",
    };
  }
  componentDidMount() {
    this.loadDetails();
    this.loadDepartmentList();
    this.loadDesignationList("");
  }

  loadDetails = async () => {
    let orgId = decryptData(localStorage.orgId),
      managerId = decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);
    if (orgId && managerId) {
      document.toggleLoading(true);
      try {
        let { data, status } = await getManagerTeam(orgId, managerId, {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          this.setState({
            manager: data.manager,
            reportees: data.reportees,
          });
          document.toggleLoading();
          this.hiddenImages();
        }
      } catch (error) {
        document.message.error(
          "Unable to populate fields at this time, please try after sometime"
        );
        document.toggleLoading();
      }

      return;
    }
  };

  removeExistingReportee = async (bool, selected, index) => {
    if (bool) {
      let orgId = decryptData(localStorage.orgId),
        managerId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      if (orgId && managerId) {
        document.toggleLoading(true);
        try {
          let { data, status } = await removeManagerTeamEmployee(
            selected.employeeId,
            orgId,
            managerId,
            {
              Authorization: token,
            }
          );
          if (status >= 200 && status < 300) {
            document.message.success(data);
            let reportees = this.state.reportees;
            reportees.splice(index, 1);
            this.hiddenImages();
            this.setState({ reportees });
          } else {
            document.message.error(data);
          }
        } catch (error) {
          document.message.error(
            "Unable to process details at this time, please try after sometime"
          );
        }
        document.toggleLoading();
      }
      this.setState({ removeEmployee: { isClicked: false, name: "" } });
    } else {
      return this.setState({ removeEmployee: { isClicked: false, name: "" } });
    }
  };

  addNewReportees = async () => {
    let orgId = decryptData(localStorage.orgId),
      managerId = decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);
    if (orgId && managerId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await updateManagerTeam(
          {
            employeeId: this.state.selectedEmployee.id,
          },
          orgId,
          managerId,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          document.message.success(data);
          this.hiddenImages();
          this.loadDetails(managerId);
        } else {
          document.message.error(data);
        }
        document.toggleLoading();
      } catch (error) {
        document.message.error(
          "Unable to save details at this time, please try after sometime"
        );
        document.toggleLoading();
      }
    }
  };

  loadManagers = async (employeeId) => {
    let orgId = decryptData(localStorage.orgId),
      token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      document.toggleLoading(true);
      try {
        let { data, status } = await getManagerDetails(orgId, employeeId, {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          this.setState({ managerList: data });
          document.toggleLoading();
        }
      } catch (error) {
        console.log(error);
        document.toggleLoading();
      }
      return;
    }
  };

  loadEmployeeSearchList = async (department, designation, search) => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      document.toggleLoading(true);
      try {
        let { data, status } = await getManagerSubordinates(
          department,
          designation,
          search,
          orgId,
          employeeId,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          this.setState({ employeeList: [...data] });
        }
      } catch (error) {
        document.message.error(
          "Unable to populate fields at this time, please try after sometime"
        );
      }
      document.toggleLoading();
    }
  };

  loadDepartmentList = async () => {
    let orgId = decryptData(localStorage.orgId),
      token = decryptData(localStorage.token);
    if (orgId) {
      document.toggleLoading(true);
      try {
        let { data, status } = await getDepartments(orgId, "", {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          this.setState({ departmentList: [...data] });
        }
      } catch (error) {
        document.message.error(
          "Unable to populate fields at this time, please try after sometime"
        );
      }
      document.toggleLoading();
    }
  };

  loadDesignationList = async (department) => {
    let orgId = decryptData(localStorage.orgId),
      token = decryptData(localStorage.token);
    if (orgId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await getDesignations(orgId, department, {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          this.setState({ designationList: [...data] });
        }
        document.toggleLoading();
      } catch (error) {
        document.message.error(
          "Unable to populate fields at this time, please try after sometime"
        );
        document.toggleLoading();
      }
    }
  };

  hiddenImages = () => {
    let imageData, filterImage;
    imageData = this.state.reportees.filter((ele, index) => {
      if (index > 7 && index < 12) {
        return ele;
      } else return null;
    });
    if (imageData !== "") {
      filterImage = imageData.map((ele) => ele.profilePicture);
    }
    return this.setState({ imageData: filterImage });
  };

  addEmployeeDrawer = () => {
    this.setState({ showDrawer: true });
  };
  closeAddEmployeeDrawer = () => {
    this.setState({
      showDrawer: false,
      selectedDesignation: "",
      selectedDepartment: "",
      selectedProject: "",
      selectedEmployeeName: "",
      selectedEmployee: "",
      valid: false,
      managerList: [],
    });
  };
  teamMemberHandler = (title, employee, reporteeIndex) => {
    let name =
      (employee.firstName &&
        (employee.firstName || "") +
          " " +
          `${employee.middleName || ""}` +
          " " +
          (employee.lastName || "")) ||
      employee;
    if (title === "Remove") {
      this.setState({
        removeEmployee: { isClicked: true, name },
        selectedEmployee: employee,
        reporteeIndex,
      });
    } else {
      this.props.history.push(`/manager/teams/profile/${employee.employeeId}`);
    }
  };

  formSelectorHandler = (selected, subtype) => {
    this.setState({
      [subtype]: selected,
      selectedEmployee: "",
      selectedEmployeeName: "",
      managerList: [],
    });
    if (subtype === "selectedDepartment") {
      this.loadDesignationList(selected);
    }
    return;
  };

  empOptionOnChange = (e) => {
    if (e.target.value === "") {
      return this.setState({
        selectedEmployee: "",
        selectedEmployeeName: e.target.value,
        managerList: [],
      });
    } else {
      this.loadEmployeeSearchList(
        this.state.selectedDepartment,
        this.state.selectedDesignation,
        e.target.value
      );
      return this.setState({
        selectedEmployeeName: e.target.value,
        valid: false,
      });
    }
  };

  addOptionSelected = (selected) => {
    let name =
      (selected.firstName &&
        (selected.firstName || "") +
          " " +
          `${selected.middleName || ""}` +
          " " +
          (selected.lastName || "")) ||
      selected;
    this.setState({
      selectedEmployee: selected,
      valid: false,
      selectedEmployeeName: name,
    });
    this.loadManagers(selected.id);
    return;
  };

  saveHandler = () => {
    let reportees = this.state.reportees;
    if (this.state.selectedEmployee) {
      let index = reportees.findIndex(
        (eachReportee) =>
          eachReportee.employeeId === this.state.selectedEmployee.id
      );
      if (index >= 0) {
        return this.setState({
          valid: true,
          errorMessage: "Employee already exist",
        });
      } else {
        this.addNewReportees();
        this.closeAddEmployeeDrawer();
      }
    } else {
      this.setState({ errorMessage: "Please select employee", valid: true });
    }
    return;
  };
  viewHandler = () => {
    this.setState({ viewStatus: !this.state.viewStatus });
  };

  render() {
    return (
      <Div>
        <div className="teams-title">Teams</div>
        <div className="team-container">
          {this.state.removeEmployee.isClicked === true && (
            <PopUpDisplay
              popUpHandler={(bool) =>
                this.removeExistingReportee(
                  bool, 
                  this.state.selectedEmployee,
                  this.state.reporteeIndex
                )
              }
              subTitle={`Are you sure want to remove ${this.state.removeEmployee.name} ?`}
            />
          )}
          <Drawer
            title={null}
            placement="right"
            closable={false}
            onClose={this.closeAddEmployeeDrawer}
            visible={this.state.showDrawer}
            key="right"
            width="450px"
          >
            <div style={{ width: "100%", height: "100%" }}>
              <ManagerAddTeamEmployeeDrawer
                searchInputData={{
                  options: this.state.employeeList,
                  placeHolder: "Search & Select Employee",
                }}
                {...this.state}
                empOptionOnChange={this.empOptionOnChange}
                departmentList={this.state.departmentList}
                selectedDesignation={this.state.selectedDesignation}
                designationList={this.state.designationList}
                optionSelected={this.addOptionSelected}
                formSelectorHandler={this.formSelectorHandler}
                closeHandler={this.closeAddEmployeeDrawer}
                addButtonHandler={() => this.saveHandler("Add Employee")}
                showInform={this.state.managerList.length > 0}
              />
            </div>
          </Drawer>

          <div className="manager-team-head">
            {this.state.manager && (
              <ManagerDetailsWrapper
                headData={this.state.manager}
                teamMembersCount={this.state.reportees.length}
                openDrawer={this.addEmployeeDrawer}
              />
            )}
          </div>
          <div className="sideBorder"></div>
          <div className="manager-enployee-Container">
            {this.state.reportees &&
              this.state.reportees
                .slice(
                  0,
                  this.state.viewStatus ? this.state.reportees.length : 8
                )
                .map((eachMember, index) => {
                  return (
                    <div style={{ width: "100%", height: "100%" }} key={index}>
                      <TeamMemberCard
                        memberData={eachMember}
                        onClick={(e) =>
                          this.teamMemberHandler(e, eachMember, index)
                        }
                        dropDownOptions={["View Profile", "Remove"]}
                      />
                    </div>
                  );
                })}
          </div>
          <div
            className="manager-hidden"
            style={{
              display:
                this.state.reportees.length > 7
                  ? this.state.viewStatus
                    ? "none"
                    : ""
                  : "none",
            }}
          >
            <HiddenEmployeesDisplay
              images={this.state.imageData || []}
              title={
                this.state.reportees.length > 7
                  ? this.state.reportees.length - 8
                  : 0
              }
              subtitle={"People"}
              linkTitle={this.state.viewStatus ? "View less" : "View all"}
              viewHandler={this.viewHandler}
            />
          </div>
        </div>
      </Div>
    );
  }
}

export default ManagerTeamWrapper;
