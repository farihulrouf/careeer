import React, { Component } from "react";
import Button from "./Button";
import { Link, withRouter } from "react-router-dom";
import {
  getDepartments,
  getOrganizationManagers,
  saveDepartmentHead,
} from "../core/apiClient/organization/organizationClient";
import { decryptData } from "../utils/encryptDecrypt";
import DepartmentCard from "./DepartmentCard";
import AddDepartmentDrower from "./AddDepartmentDrower";
import { message } from "antd";
import UserGroup from "../assets/images/userGroup.svg";
import styled from "styled-components";

const Div = styled.div`
  .UserListContainer {
    flex: 1;
    background: #ffffff;
    width: 100%;
    height: 100%;
    box-shadow: 1px 4px 12px #00000027;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 96px 0;
  }
  .userSubLabel {
    font-size: 16px;
    color: #767676;
  }
  .AddButton {
    padding-top: 10px;
    color: #ff808b;
    cursor: pointer;
  }
  .userGroupIcon {
    height: 135px;
    width: 135px;
  }
  .title {
    font-family: Open Sans Semibold;
    font-size: 18px;
    color: #303030;
    padding: 8px 0;
  }
`;

class HierarchyDepartmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentList: [],
      departments: [],
      selectedDepartment: "",
      selectedManager: "",
      searchManagerList: [],
      showAddDepartmentModal: false,
      validDept: false,
      validManager: false,
    };
  }
  componentDidMount() {
    this.loadDepartmentOptions();
    this.loadDepartments();
  }

  loadDepartments = async () => {
    let orgId = decryptData(localStorage.orgId),
      token = decryptData(localStorage.token);
    if (orgId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await getDepartments(
          orgId,
          "department_with_head",
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          this.setState({ departments: data });
        }
        document.toggleLoading();
      } catch (error) {
        message.error(
          "Unable to populate fields at this time, please try after sometime"
        );
        document.toggleLoading();
      }
    }
  };

  loadDepartmentOptions = async () => {
    let orgId = decryptData(localStorage.orgId),
      token = decryptData(localStorage.token);
    if (orgId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await getDepartments(
          orgId,
          "department_without_head",
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          this.setState({ departmentList: data });
        }
        document.toggleLoading();
      } catch (error) {
        message.error(
          "Unable to populate fields at this time, please try after sometime"
        );
        document.toggleLoading();
      }
    }
  };
  loadManagerList = async (searchKey) => {
    let orgId = decryptData(localStorage.orgId),
      token = decryptData(localStorage.token);
    if (orgId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await getOrganizationManagers(
          orgId,
          searchKey,
          this.state.selectedDepartment.name,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          let searchManagerList = data.map((eachManager) => {
            eachManager.name = eachManager.userName;
            return eachManager;
          });
          this.setState({ searchManagerList });
        }
        document.toggleLoading();
      } catch (error) {
        message.error(
          "Unable to populate fields at this time, please try after sometime"
        );
        document.toaggleLoading();
      }
    }
  };
  onSelectDepartment = (selectedDepartment) => {
    this.setState({ selectedDepartment, validDept: false });
  };

  onSelectManager = (selectedManager) => {
    this.setState({ selectedManager });
  };
  onSearchManager = (search) => {
    this.setState({ selectedManager: search.target.value });
    if (search.target.value) {
      this.loadManagerList(search.target.value);
    }
  };

  validate = () => {
    let errorField = [];
    if (this.state.selectedDepartment) {
      this.setState({ validDept: false });
    } else {
      this.setState({ validDept: true });
      errorField.push(this.state.selectedDepartment);
    }
    if (
      this.state.selectedManager &&
      this.state.selectedManager.hasOwnProperty("employeeId")
    ) {
      this.setState({ validManager: false });
    } else {
      this.setState({ validManager: true });
      errorField.push(this.state.selectedDepartment);
    }
    if (errorField.length) {
      return false;
    } else {
      return true;
    }
  };

  saveDepartment = async () => {
    let valid = this.validate();
    if (valid) {
      let orgId = decryptData(localStorage.orgId),
        token = decryptData(localStorage.token),
        departmentId = this.state.selectedDepartment.id,
        employeeId = this.state.selectedManager.employeeId;
      if (departmentId && employeeId) {
        try {
          document.toggleLoading(true);
          let { data, status } = await saveDepartmentHead(
            orgId,
            departmentId,
            { employeeId },
            {
              Authorization: token,
            }
          );
          if (status >= 200 && status < 300) {
            this.closeHandler();
            message.success(data);
            this.loadDepartments();
          } else {
            message.error("Something went wrong! please try after some time!");
          }
          document.toggleLoading();
        } catch (error) {
          message.error(
            "Unable to save details at this time, please try after sometime"
          );
          document.toggleLoading();
        }
      }
    }
  };

  closeHandler = () => {
    this.setState({
      showAddDepartmentModal: false,
      validDept: false,
      validManager: false,
      selectedDepartment: "",
      selectedManager: "",
    });
  };

  addDepartmentHandler = () => {
    this.setState({
      showAddDepartmentModal: true,
    });
  };
  render() {
    return (
      <Div
        style={{
          height: "620px",
          background: "#F8F8F8",
          position: "relative",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            width: this.state.showAddDepartmentModal ? "100%" : "0%",
            position: "fixed",
            zIndex: 21,
            right: 0,
            top: 0,
            transition: "width 0.01s linear",
            height: "100%",
            overflow: "auto",
            backgroundColor: "rgba(0, 0, 0, 0.09)",
          }}
        >
          <div
            style={{
              height: "100%",
              width: this.state.showAddDepartmentModal ? "450px" : "0",
              position: "fixed",
              top: 0,
              right: 0,
              backgroundColor: "#fff",
              overflowX: "hidden",
              transition: "0.4s",
              paddingTop: "0px",
              boxShadow: "0px 3px 6px #00000029",
            }}
          >
            <div style={{ width: 450, height: "100%" }}>
              <AddDepartmentDrower
                {...this.props}
                {...this}
                {...this.state}
                onSelectDepartment={this.onSelectDepartment}
                selectedDepartment={this.state.selectedDepartment}
                departmentNameList={this.state.departmentList}
                onSelectManager={this.onSelectManager}
                onSearchManager={this.onSearchManager}
                selectedManager={this.state.selectedManager}
                searchManagerList={this.state.searchManagerList}
                saveDepartment={this.saveDepartment}
              />
            </div>
          </div>
        </div>

        <div style={{ padding: "20px 20px 0 20px" }}>
          <div
            style={{
              fontSize: "18px",
              color: "#303030",
              fontFamily: "Open Sans SemiBold",
            }}
          >
            Hierarchy
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "18px",
              alignItems: "center",
              marginBottom: "6px",
            }}
          >
            <div
              style={{
                flex: 1,
                fontSize: "16px",
                color: "#303030",
                fontFamily: "Open Sans SemiBold",
              }}
            >
              Departments
            </div>
            <div
              style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
            >
              <div
                onClick={this.addDepartmentHandler}
                style={{
                  width: "184px",
                  fontSize: 14,
                  fontFamily: "Open Sans Semibold",
                }}
              >
                <Button
                  label={"Add Department"}
                  styles={{
                    color: "#ffffff",
                    backgroundColor: "#FF808B",
                    border: "#FF808B",
                    height: "40px",
                  }}
                />
              </div>
            </div>
          </div>
          {this.state.departments.length ? (
            <div style={{ width: "86%" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5,1fr)",
                  gap: "18px 14px",
                  paddingBottom: "16px",
                }}
              >
                {this.state.departments.map((eachDept, index) => (
                  <div
                    key={index}
                    style={{
                      width: "206px",
                      height: "200px",
                      cursor: "pointer",
                      background: "#F8F8F8",
                      borderRadius: "8px",
                    }}
                  >
                    <Link
                      to={`/admin/hierarchy/${
                        eachDept.employeeId
                      }/${eachDept.name
                        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word) {
                          return word.toUpperCase();
                        })
                        .replace(/\s+/g, "")}`}
                    >
                      <DepartmentCard
                        departmentName={eachDept.name}
                        imageUrl={eachDept.profilePicture || ""}
                        nomuberOfPepole={eachDept.employeeCount}
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="UserListContainer">
              <div>
                <img src={UserGroup} alt="icon" className="userGroupIcon" />
              </div>
              <div className="title">
                None of the departments have been assigned a head yet
              </div>
              <div className="userSubLabel">
                Please &nbsp;
                <label
                  className="AddButton"
                  onClick={this.addDepartmentHandler}
                >
                  Add Department
                </label>
                &nbsp;to get started
              </div>
            </div>
          )}
        </div>
      </Div>
    );
  }
}
export default withRouter(HierarchyDepartmentList);
