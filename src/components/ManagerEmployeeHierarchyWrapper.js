import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import {
  getManagerTeam,
  getDesignations,
  getManagerSubordinates,
  updateManagerTeam,
  removeManagerTeamEmployee,
  getManagerDetails,
} from "../core/apiClient/organization/organizationClient";
import { decryptData } from "../utils/encryptDecrypt";
import HierarchyAddEmployeeDrawer from "./HierarchyAddEmployeeDrawer";
import ManagerEmployeeHierarchy from "./ManagerEmployeeHierarchy";
import Button from "./Button";
import PopUpDisplay from "./PopUpDisplay";
import "antd/dist/antd.css";
import { Drawer, Empty } from "antd";

const Div = styled.div`
  font-family: "Open Sans Regular";
  font-size: 16px;
  background: #f8f8f8;
  padding: 0.5% 1%;
  color: #303030;
  display: grid;
  grid-row-gap: 12px;
  .titleContainer {
    display: flex;
    margin-bottom: 1.7em;
    margin-top: 1.7em;
  }
  .breadCrumb {
    color: #767676;
    font-size: 0.875em;
    letter-spacing: 0.01em;
  }
  #arrowIcon {
    padding: 0 5px;
  }
  #searchContainer {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
  #buttonContainer {
    width: 92px;
    height: 40px;
    margin-left: 20px;
    font-size: 0.875em;
  }
  #title {
    font-size: 1.125em;
    font-family: Open Sans Semibold;
  }
  #searchInput {
    width: 327px;
    font-family: "Open Sans Regular";
    font-size: 14px;
    color: #303030;
  }
  .deptTitle {
    font-size: 1em;
    font-family: "Open Sans Semibold";
    text-align: initial;
    width: 100%;
    color: #252525;
  }
  .hierarchy-list {
    box-shadow: 1px 4px 12px #00000027;
    padding: 1%;
    border-radius: 10px;
    background: #ffffff;
    min-height: 80vh;
  }
  .manager-hierarchylist {
    margin-bottom: 4em;
  }
`;

class ManagerEmployeeHierarchWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      managerHierarchyList: [],
      reporteeIndex: "",
      isClicked: false,
      designation: [],
      designationList: [],
      employeeList: [],
      designationValue: "",
      searchValue: "",
      selectedEmployee: "",
      drawerStatus: false,
      selectedEmployeeName: "",
      valid: "",
      designationSelector: "",
      validDepartment: false,
      drawerType: "",
      level: "",
      selectedMember: "",
      isLoading: false,
      removeEmployee: { isClicked: false, name: "" },
      errorMessage: "Employee already exist",
      managerList: [],
    };
  }
  componentDidMount() {
    window.scrollTo({ top: 0 });
    this.loadDesignationList();
    this.loadDetails(this.props.match.params.id);
  }

  loadDetails = async (managerId) => {
    let orgId = decryptData(localStorage.orgId),
      token = decryptData(localStorage.token);
    if (orgId) {
      document.toggleLoading(true);
      try {
        let { data, status } = await getManagerTeam(orgId, managerId, {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          this.setState({
            managerHierarchyList: [data],
          });
        }
        document.toggleLoading();
      } catch (error) {
        document.message.error(
          "Unable to populate fields at this time, please try after sometime"
        );
        document.toggleLoading();
      }
      return;
    }
  };

  loadHierarchyDetails = async (selectedEmployee, level) => {
    let orgId = decryptData(localStorage.orgId),
      token = decryptData(localStorage.token);
    let managerHierarchyList = this.state.managerHierarchyList;
    if (selectedEmployee.employeeId && orgId) {
      if (level < managerHierarchyList.length) {
        try {
          document.toggleLoading(true);
          let { data, status } = await getManagerTeam(
            orgId,
            selectedEmployee.employeeId,
            {
              Authorization: token,
            }
          );
          if (status >= 200 && status < 300) {
            document.toggleLoading();
            managerHierarchyList.splice(level + 1, managerHierarchyList.length);
            if (level + 1 < managerHierarchyList.length) {
              this.setState(
                {
                  managerHierarchyList: [
                    ...managerHierarchyList.slice(0, level + 1),
                    data,
                  ],
                },
                () =>
                  document.scrollToElement(
                    "#hierarchy-list" +
                      (this.state.managerHierarchyList.length - 1)
                  )
              );
              return;
            }
            if (level + 1 > managerHierarchyList.length) {
              throw new Error("index out of bounds");
            }
            this.setState(
              {
                managerHierarchyList: [...managerHierarchyList, data],
              },
              () =>
                document.scrollToElement(
                  "#hierarchy-list" +
                    (this.state.managerHierarchyList.length - 1)
                )
            );
          } else {
            document.message.error(data);
          }
        } catch (error) {
          document.message.error(
            "Unable to populate fields at this time, please try after sometime"
          );
          document.toggleLoading();
        }
      }
      document.toggleLoading();
    }
    return;
  };

  loadDesignationList = async () => {
    let orgId = decryptData(localStorage.orgId),
      token = decryptData(localStorage.token);
    if (orgId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await getDesignations(orgId, "", {
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

  loadEmployeeSearchList = async (designation, search) => {
    let orgId = decryptData(localStorage.orgId),
      token = decryptData(localStorage.token),
      employeeId = this.props.match.params.id;
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await getManagerSubordinates(
          "",
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
        document.toggleLoading();
      } catch (error) {
        document.message.error(
          "Unable to populate fields at this time, please try after sometime"
        );
        document.toggleLoading();
      }
    }
  };

  addNewReportees = async (level) => {
    let orgId = decryptData(localStorage.orgId),
      token = decryptData(localStorage.token);
    let selectedEmployee = this.state.selectedEmployee;
    if (orgId) {
      document.toggleLoading(true);
      let managerId = this.state.managerHierarchyList[level].manager.employeeId;
      try {
        let { data, status } = await updateManagerTeam(
          {
            employeeId: selectedEmployee.id,
          },
          orgId,
          managerId,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          document.message.success(data);
          if (
            this.state.managerHierarchyList &&
            this.state.managerHierarchyList.length > level
          ) {
            selectedEmployee.designationTitle = selectedEmployee.designation;
            selectedEmployee.employeeId = selectedEmployee.id;
            delete selectedEmployee["id"];
            delete selectedEmployee["designation"];
            let updatedManagerHierarchyList = this.state.managerHierarchyList;
            updatedManagerHierarchyList[level].reportees.push(selectedEmployee);
            this.setState({
              managerHierarchyList: updatedManagerHierarchyList,
            });
            document.toggleLoading();
            if (level !== 0) {
              document.scrollToElement("#hierarchy-list" + level);
            }
          }
        } else {
          document.message.error(data);
          document.toggleLoading();
        }
      } catch (error) {
        document.message.error(
          "Unable to save details at this time, please try after sometime"
        );
        document.toggleLoading();
      }
    }
  };

  removeExistingReportee = async (bool, level, selected, index) => {
    if (bool) {
      let orgId = decryptData(localStorage.orgId),
        token = decryptData(localStorage.token);
      if (orgId) {
        document.toggleLoading(true);
        let managerId = this.state.managerHierarchyList[level].manager
          .employeeId;
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
            let managerHierarchyList = this.state.managerHierarchyList;
            if (
              managerHierarchyList[level + 1] &&
              managerHierarchyList[level + 1].manager.employeeId ===
                selected.employeeId
            ) {
              let managerDataList = managerHierarchyList.slice(0, level + 1);
              this.setState({
                managerHierarchyList: managerDataList,
              });
            } else {
              managerHierarchyList[level].reportees.splice(index, 1);
              this.setState({ managerHierarchyList });
            }
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
        document.message.error("Something went wrong! Please try again later.");
        document.toggleLoading();
      }

      return;
    }
  };

  searchInputHandler = (search) => {
    return this.setState({ searchValue: search.target.value });
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
  empOptionOnChange = (e) => {
    if (e.target.value === "") {
      return this.setState({
        selectedEmployee: "",
        selectedEmployeeName: e.target.value,
        managerList: [],
      });
    } else {
      this.loadEmployeeSearchList(this.state.designationValue, e.target.value);
      return this.setState({
        selectedEmployeeName: e.target.value,
        valid: false,
      });
    }
  };

  formSelectorHandler = (selected, state) => {
    return this.setState({ [state]: selected });
  };

  openDrawer = (selectedMember, drawerType, level) => {
    return this.setState({
      selectedMember,
      drawerStatus: true,
      drawerType,
      level,
    });
  };

  closeDrawer = (ele) => {
    return this.setState({
      drawerStatus: false,
      validDepartment: false,
      selectedEmployeeName: "",
      designationValue: "",
      level: "",
      drawerType: "",
      selectedEmployee: "",
      valid: false,
      managerList: [],
    });
  };

  reporteesEdit = (title, selected, level, index) => {
    let name =
      (selected.firstName &&
        (selected.firstName || "") +
          " " +
          `${selected.middleName || ""}` +
          " " +
          (selected.lastName || "")) ||
      selected;
    if (title === "Remove") {
      this.setState({
        removeEmployee: { isClicked: true, name },
        level,
        selectedEmployee: selected,
        reporteeIndex: index,
      });
    } else if (title === "Edit") {
      this.openDrawer(selected, title, level);
      return;
    } else {
      const { id, department } = this.props.match.params;
      this.props.history.push(
        `/admin/hierarchy/${id}/${department}/profile/${selected.employeeId}`
      );
    }
  };
  saveDetails = (drawerType) => {
    if (drawerType === "Add Employee") {
      let managerHierarchyList = this.state.managerHierarchyList[
        this.state.level
      ].reportees;
      if (this.state.selectedEmployee) {
        let index = managerHierarchyList.findIndex(
          (eachReportee) =>
            eachReportee.employeeId === this.state.selectedEmployee.id
        );
        if (index >= 0) {
          return this.setState({
            valid: true,
            errorMessage: "Employee already exist",
          });
        } else {
          this.addNewReportees(this.state.level);

          this.closeDrawer();
        }
      } else {
        this.setState({
          errorMessage: "Please select employee",
          valid: true,
        });
      }
    }
    return;
  };

  render() {
    const departmentName = this.props.match.params.department
      .replace(/([A-Z])/g, " $1")
      .trim();
    return (
      <Div drawerStatus={this.props.drawerStatus} id="main-page">
        {this.state.removeEmployee.isClicked === true && (
          <PopUpDisplay
            popUpHandler={(bool) =>
              this.removeExistingReportee(
                bool,
                this.state.level,
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
          onClose={this.closeDrawer}
          visible={this.state.drawerStatus}
          key="right"
          width="450px"
        >
          <div style={{ width: "100%", height: "100%" }}>
            {this.state.drawerType === "Add Employee" && (
              <HierarchyAddEmployeeDrawer
                searchInputData={{
                  options: this.state.employeeList || [],
                  placeHolder: "Search & Select Employee",
                }}
                {...this.state}
                empOptionOnChange={this.empOptionOnChange}
                formSelectorSelected={this.state.designationValue}
                formSelectorData={this.state.designationList}
                optionSelected={this.addOptionSelected}
                formSelectorHandler={(selected) =>
                  this.formSelectorHandler(selected, "designationValue")
                }
                closeHandler={() => this.closeDrawer("Add Employee")}
                addButtonHandler={() => this.saveDetails("Add Employee")}
                isClicked={this.state.isClicked}
                formSelectorValue={this.state.value}
                errorMessage={this.state.errorMessage}
                showInform={this.state.managerList.length > 0}
                valid={this.state.valid}
              />
            )}
          </div>
        </Drawer>
        <div className="breadCrumb">
          <span>Hierarchy</span>
          &nbsp;{">"}&nbsp;
          <span>{departmentName || ""}</span>
        </div>
        <div className="titleContainer">
          <div id="title">Hierarchy</div>
          <div id="searchContainer">
            <div
              id="buttonContainer"
              onClick={() => this.props.history.goBack()}
            >
              <Button
                label="<  Back"
                styles={{
                  color: "#FF808B",
                  backgroundColor: "#F8F8F8",
                  border: "#FF808B",
                  height: "40px",
                }}
              />
            </div>
          </div>
        </div>
        <div className="hierarchy-list">
          {this.state.managerHierarchyList.length ? (
            <>
              <div className="deptTitle">{departmentName || ""}</div>
              {this.state.managerHierarchyList.map((eachHierachy, level) => (
                <div
                  key={level}
                  className="manager-hierarchylist"
                  id={"hierarchy-list" + level}
                >
                  <ManagerEmployeeHierarchy
                    hierarchyList={eachHierachy}
                    loadHierarchyDetails={(selectedEmployee) =>
                      this.loadHierarchyDetails(selectedEmployee, level)
                    }
                    openDrawer={(employeeList, type) =>
                      this.openDrawer(employeeList, type, level)
                    }
                    reporteesEdit={(type, selectedReportee, index) =>
                      this.reporteesEdit(type, selectedReportee, level, index)
                    }
                  />
                </div>
              ))}
            </>
          ) : (
            <Empty style={{ marginTop: "8%" }} />
          )}
        </div>
      </Div>
    );
  }
}

export default withRouter(ManagerEmployeeHierarchWrapper);
