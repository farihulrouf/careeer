import React, { Component } from "react";
import Styled from "styled-components";
import "../assets/css/AntdExternal.css";
import "antd/dist/antd.css";
import {
  getFilterOption,
  getUserManagementSearch,
  getUserManagementEmployeeDetails,
} from "../core/apiClient/organization/organizationClient";
import { decryptData } from "../utils/encryptDecrypt";
import AdminUserManagementTable from "./Admin-User-Management-Table";
import SearchTextBox from "./SearchTextBox";
import Button from "./Button";
import UserGroup from "../assets/images/userGroup.svg";
import AdminOrgData from "./AdminUploadOrgData";
import File1 from "../assets/images/coverImage.svg";
import File2 from "../assets/images/coverImage.svg";
import File3 from "../assets/images/coverImage.svg";
import request from "../core/apiClient/request";
import FilterDropdown from "./FilterDroprdown";
import AssignAdminRoleToEmployee from "./AssignAdminRoleToEmployee";
import {
  message,
  Modal,
  Drawer,
  Typography,
} from "antd";

const { Text } = Typography;
const Div = Styled.div`
min-height:100vh;
background:#F8F8F8;
display: flex;
flex-direction:column;

.userManagementContainer{
  flex:1;
  display:flex;
flex-direction:column;
}
.title{
    font-family:Open Sans Semibold;
    font-size:18px;
    color:#303030;
    padding:8px 0;

}
.linkContainer{
    font-size:16px;
    color:#767676;
    width:100%;
    background:#FFFFFF;
    border-radius: 8px;
    height:58px;
    padding:1.6% 2% 0 2%; 
    display:flex;
    margin:15px 0;
}
.userLabelContainer{
    margin-right:5%;
  &:hover{
    border-bottom: 3px solid #FF808B;
  
  }
}
.userLabel{
  cursor:pointer;
}
.subTitle{
    flex:1;
    font-size:16px;
    color:#3D3D3D;
    letter-spacing:0.03em;
    font-family:Open Sans Semibold;
}
.userListTitleContainer{
  display:flex;
  align-items:center;
  margin:10px 0 20px 0;
}
#userFilterContainer{
  display:flex;
  flex:1;
  justify-content: flex-end;
}
.UserListContainer{
  flex:1;
  background:#ffffff;
  width:100%;
  height:100%;
  box-shadow: 1px 4px 12px #00000027;
  display:flex;
  justify-content:center;
  flex-direction:column;
  align-items:center;
  padding:96px 0;
}
.userSubLabel{
  font-size:16px;
  color:#767676

}
.AddButton{
  padding-top:10px;
  color:#FF808B;
  cursor:pointer;
}
.userGroupIcon{
  height:135px;
  width:135px;
}

`;

class UserManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOption: [],
      rowsPerPage: 15,
      totalEmployeeCount: 0,
      filterValue: [],
      searchValue: "",
      keyCode: "",
      page: 1,
      selectedNavBar: "",
      adminSelectedAccessType: "",
      adminSelectorSelected: "",
      adminSelectedEmployee: "",
      userIndex: "",
      adminIndex: "",
      userData: [],
      adminData: [],
      userFileUpload: false,
      adminFileUpload: false,
      userLink: "User",
      searchOptionsUser: this.props.userData.map((element) => ({
        img: element.profile,
        name: element.name,
        designation: element.designation,
      })),
      searchOptionsAdmin: this.props.adminData.map((element) => ({
        img: element.profile,
        name: element.name,
        designation: element.designation,
      })),
      isLoading: false,
      onboardedEmployees: [],
      newJoineeEmployees: [],
      onboardingModalVisible: false,
      CompetencyModalVisible: false,
      roleCareerPathModalVisible: false,
      newJoineeModalVisible: false,
      promotionModalVisible: false,
      relievedModalVisible: false,
      Competencyskills: [],
      uploadedROleCareerPath: [],
      promotedEmployeesData: [],
      releivedEmployeesData: [],
      role: "Employee",
      showDrawer: false,
      drawerData: {
        placeholder: "...",
        accessTypeOption: ["Admin", "Manager", "Employee"],
        formSelectorOption: ["Web developer", "UX/UI", "Back End"],
        employeeList: [
          {
            profilePicture: null,
            firstName: "Abhinav",
            middleName: "Rao",
            lastName: "Sharma",
            designation: "Project manager",
          },
          {
            profilePicture: null,
            firstName: "Rahul",
            middleName: null,
            lastName: "Sharma",
            designation: "Developer",
          },
          {
            profilePicture: null,
            firstName: "David",
            middleName: null,
            lastName: "Sharma",
            designation: "UI Designer",
          },
          {
            profilePicture: null,
            firstName: "Abhinav",
            middleName: null,
            lastName: "Sharma",
            designation: "UI Designer",
          },
          {
            profilePicture: null,
            firstName: "Abhinav",
            middleName: null,
            lastName: "Sharma",
            designation: "Developer",
          },
          {
            profilePicture: null,
            firstName: "Abhinav",
            middleName: null,
            lastName: "Sharma",
            designation: "Project manager",
          },
        ],
      },
    };
  }

  componentDidMount() {
    this.loadEmployeeDetails(this.state.rowsPerPage, this.state.page);
    this.loadFilterOption();
  }
  paginationHandler = (rowsPerPage, page) => {
    this.setState({
      rowsPerPage: rowsPerPage,
      page: page,
    });

    this.loadEmployeeDetails(rowsPerPage, page);
  };
  loadEmployeeDetails = async (start, end) => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        let startCount = end - 1;
        let employeeResponse = await getUserManagementEmployeeDetails(
          orgId,
          start * startCount,
          start,
          this.state.role,
          {
            Authorization: token,
          }
        );
        if (employeeResponse.status === 200) {
          document.toggleLoading(true);
          let employeeDetails = employeeResponse.data.employeesList;
          let userData = [];
          for (let i = 0; i < employeeDetails.length; i++) {
            let object = {};
            object.id = employeeDetails[i].employeeId;
            object.profile = employeeDetails[i].profilePicture;
            object.name = employeeDetails[i].name;
            object.designation = employeeDetails[i].Designation;
            object.department = employeeDetails[i].Department;
            object.icScore = 23;
            object.employeeType = employeeDetails[i].employeeTypes;
            object.employeeTypeId = employeeDetails[i].employeeTypeId;
            if (employeeDetails[i].roles) {
              let roles = employeeDetails[i].roles;
              let role = [];
              role.push(roles[0]);
              object.roles = role;
            }
            object.status =
              employeeDetails[i].status === 0
                ? "Inactive"
                : employeeDetails[i].status === 1
                  ? "Active"
                  : "On Notice";
            userData.push(object);
          }
          this.setState({
            userData,
            totalEmployeeCount: employeeResponse.data.count,
          });
        }
      } catch (error) {
        message.error(
          "Unable to populate fields at this time, please try after sometime"
        );
      }
      document.toggleLoading();
    }
  };

  loadFilterOption = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let token = decryptData(localStorage.token);
      let { data, status } = await getFilterOption(orgId, " user_management", {
        Authorization: token,
      });
      if (status >= 200 && status < 300) {
        if (data.length) this.setState({ filterOption: data });
      } else {
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
    } catch (error) {
      console.log("error", error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  loadSearchUserDetails = async (search) => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let token = decryptData(localStorage.token);
      let filter = this.state.filterValue;
      let start = this.state.rowsPerPage;
      let startCount = this.state.page - 1;
      let { data, status } = await getUserManagementSearch(
        orgId,
        start * startCount,
        start,
        this.state.role,
        search,
        (filter.length &&
          (filter[0].charAt(0).toLowerCase() + filter[0].slice(1)).replace(
            /\s/g,
            ""
          ) +
          "=" +
          filter[1]) ||
        "",
        {
          Authorization: token,
        }
      );
      if (status >= 200 && status < 300) {
        let employeeDetails = data.employeesList;
        let userData = [];
        for (let i = 0; i < employeeDetails.length; i++) {
          let object = {};
          object.id = employeeDetails[i].employeeId;
          object.profile = employeeDetails[i].profilePicture;
          object.name = employeeDetails[i].name;
          object.designation = employeeDetails[i].Designation;
          object.department = employeeDetails[i].Department;
          object.icScore = 23;
          object.employeeType = employeeDetails[i].employeeTypes;
          object.employeeTypeId = employeeDetails[i].employeeTypeId;
          if (employeeDetails[i].roles) {
            let roles = employeeDetails[i].roles;
            let role = [];
            role.push(roles[0]);
            object.roles = role;
          }
          object.status =
            employeeDetails[i].status === 0
              ? "Inactive"
              : employeeDetails[i].status === 1
                ? "Active"
                : "On Notice";
          userData.push(object);
        }
        this.setState({
          userData,
          totalEmployeeCount: data.count,
        });
      } else {
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
    } catch (error) {
      console.log("error", error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  openDrawer = () => {
    this.setState({ showDrawer: true });
  };
  openDrawer = () => {
    this.setState({ showDrawer: true });
  };
  onChangeHandler = async (event, title) => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let token = decryptData(localStorage.token);
      const data = new FormData();
      const filedata = event[0];
      if (title === "Existing employee list") {
        let fileType = "employee_list";
        data.append(fileType, filedata);
        let employeeId = decryptData(localStorage.employeeId);
        if (orgId && employeeId) {
          this.setState({ isLoading: true });
          message.loading("Uploading Excel", 2);
          let response = await request.post(
            `/bulkupload?fileType=${fileType}`,
            data,
            {
              headers: {
                authorization: token,
              },
            }
          );
          if (response.status === 200) {
            if (this.state.userLink === "User") {
              this.setState({ userFileUpload: true, isLoading: false });
            } else if (this.state.userLink === "Admin") {
              this.setState({ adminFileUpload: true, isLoading: false });
            }
            message.success("Uploading finished", 2);
            this.setState({ onboardingModalVisible: true });
            let data = [
              {
                key: 1,
                fileLink: response.data.fileLink,
              },
            ];
            this.setState({ onboardedEmployees: data });
            this.loadEmployeeDetails(
              this.state.rowsPerPage - 1,
              this.state.page
            );
          } else {
            this.setState({ onboardingModalVisible: true });
            let data = [];
            if (
              Array.isArray(response.data) &&
              response.data[0].hasOwnProperty("error") &&
              !Array.isArray(response.data[0]["error"])
            ) {
              message.error(JSON.stringify(response.data[0]["error"]));
              data = [
                {
                  key: 1,
                  fileLink: response.data[0]["error"],
                },
              ];
            } else {
              data = [
                {
                  key: 1,
                  fileLink: response.data.fileLink,
                },
              ];
            }
            this.setState({ onboardedEmployees: data });
            this.setState({ isLoading: false });
          }
        }
      }
      if (title === "New employee list") {
        let fileType = "new_employee_list";
        data.append(fileType, filedata);
        this.setState({ isLoading: true });
        message.loading("Uploading Excel", 2.5);
        let response = await request.post(
          `/bulkupload?fileType=${fileType}`,
          data,
          {
            headers: {
              authorization: token,
            },
          }
        );
        if (response.status === 200) {
          message.success("Uploading finished");
          this.setState({ newJoineeModalVisible: true });
          this.setState({ isLoading: false });
          let data = [
            {
              key: 1,
              fileLink: response.data.fileLink,
            },
          ];
          this.setState({ newJoineeEmployees: data });
          this.loadEmployeeDetails(this.state.rowsPerPage - 1, this.state.page);
          if (this.state.userLink === "User") {
            this.setState({ userFileUpload: true, isLoading: false });
          } else if (this.state.userLink === "Admin") {
            this.setState({ adminFileUpload: true, isLoading: false });
          }
        } else {
          this.setState({ newJoineeModalVisible: true });
          let data = [];
          if (
            Array.isArray(response.data) &&
            response.data[0].hasOwnProperty("error") &&
            !Array.isArray(response.data[0]["error"])
          ) {
            message.error(JSON.stringify(response.data[0]["error"]));
            data = [
              {
                key: 1,
                fileLink: response.data[0]["error"],
              },
            ];
          } else {
            data = [
              {
                key: 1,
                fileLink: response.data.fileLink,
              },
            ];
          }
          this.setState({ newJoineeEmployees: data });
          this.setState({ isLoading: false });
        }
      }

      if (title === "Add Role- Competency- Skill Matrix") {
        let fileType = "role_competency_skill";
        data.append(fileType, filedata);
        this.setState({ isLoading: true });
        message.loading("Uploading Excel", 2.5);
        let response = await request.post(
          `/bulkupload?fileType=${fileType}`,
          data,
          {
            headers: {
              authorization: token,
            },
          }
        );
        if (response.status === 200) {
          message.success("Uploading finished");
          this.setState({ CompetencyModalVisible: true });
          this.setState({ isLoading: false });
          let data = [
            {
              key: 1,
              fileLink: response.data.fileLink,
            },
          ];
          this.setState({ Competencyskills: data });
          if (this.state.userLink === "User") {
            this.setState({ userFileUpload: true, isLoading: false });
          } else if (this.state.userLink === "Admin") {
            this.setState({ adminFileUpload: true, isLoading: false });
          }
        } else {
          this.setState({ CompetencyModalVisible: true });
          let data = [];
          if (
            Array.isArray(response.data) &&
            response.data[0].hasOwnProperty("error") &&
            !Array.isArray(response.data[0]["error"])
          ) {
            message.error(JSON.stringify(response.data[0]["error"]));
            data = [
              {
                key: 1,
                fileLink: response.data[0]["error"],
              },
            ];
          } else {
            data = [
              {
                key: 1,
                fileLink: response.data.fileLink,
              },
            ];
          }
          this.setState({ Competencyskills: data });
          this.setState({ isLoading: false });
        }
      }

      if (title === "Add Role- Career Path") {
        let fileType = "role_careerpath";
        data.append(fileType, filedata);
        this.setState({ isLoading: true });
        message.loading("Uploading Excel", 2.5);
        let response = await request.post(
          `/bulkupload?fileType=${fileType}`,
          data,
          {
            headers: {
              authorization: token,
            },
          }
        );
        if (response.status === 200) {
          message.success("Uploading finished", 2.5);
          this.setState({ roleCareerPathModalVisible: true });
          this.setState({ isLoading: false });
          let data = [
            {
              key: 1,
              fileLink: response.data.fileLink,
            },
          ];
          this.setState({ uploadedROleCareerPath: data });
          if (this.state.userLink === "User") {
            this.setState({ userFileUpload: true, isLoading: false });
          } else if (this.state.userLink === "Admin") {
            this.setState({ adminFileUpload: true, isLoading: false });
          }
        } else {
          this.setState({ roleCareerPathModalVisible: true });
          let data = [];
          if (
            Array.isArray(response.data) &&
            response.data[0].hasOwnProperty("error") &&
            !Array.isArray(response.data[0]["error"])
          ) {
            message.error(JSON.stringify(response.data[0]["error"]));
            data = [
              {
                key: 1,
                fileLink: response.data[0]["error"],
              },
            ];
          } else {
            data = [
              {
                key: 1,
                fileLink: response.data.fileLink,
              },
            ];
          }
          this.setState({ uploadedROleCareerPath: data });
          this.setState({ isLoading: false });
        }
      }
      if (title === "Promoted employee list") {
        let fileType = "promoted_list";
        data.append(fileType, filedata);
        this.setState({ isLoading: true });
        message.loading("Uploading Excel", 2.5);
        let response = await request.post(
          `/bulkupload?fileType=${fileType}`,
          data,
          {
            headers: {
              authorization: token,
            },
          }
        );
        if (response.status === 200) {
          message.success("Uploading finished", 2.5);
          this.setState({ promotionModalVisible: true });
          this.setState({ isLoading: false });
          let data = [
            {
              key: 1,
              fileLink: response.data.fileLink,
            },
          ];
          this.setState({ promotedEmployeesData: data });
          if (this.state.userLink === "User") {
            this.setState({ userFileUpload: true, isLoading: false });
          } else if (this.state.userLink === "Admin") {
            this.setState({ adminFileUpload: true, isLoading: false });
          }
        } else {
          this.setState({ promotionModalVisible: true });
          let data = [];
          if (
            Array.isArray(response.data) &&
            response.data[0].hasOwnProperty("error") &&
            !Array.isArray(response.data[0]["error"])
          ) {
            message.error(JSON.stringify(response.data[0]["error"]));
            data = [
              {
                key: 1,
                fileLink: response.data[0]["error"],
              },
            ];
          } else {
            data = [
              {
                key: 1,
                fileLink: response.data.fileLink,
              },
            ];
          }
          this.setState({ promotedEmployeesData: data });
          this.setState({ isLoading: false });
        }
      }
      if (title === "Relieved employee list") {
        let fileType = "relieved_list";
        data.append(fileType, filedata);
        this.setState({ isLoading: true });
        message.loading("Uploading Excel", 2.5);
        let response = await request.post(
          `/bulkupload?fileType=${fileType}`,
          data,
          {
            headers: {
              authorization: token,
            },
          }
        );
        if (response.status === 200) {
          message.success("Uploading finished", 2.5);
          this.setState({ relievedModalVisible: true });
          this.setState({ isLoading: false });

          let data = [
            {
              key: 1,
              fileLink: response.data.fileLink,
            },
          ];
          this.setState({ releivedEmployeesData: data });
          if (this.state.userLink === "User") {
            this.setState({ userFileUpload: true, isLoading: false });
          } else if (this.state.userLink === "Admin") {
            this.setState({ adminFileUpload: true, isLoading: false });
          }
        } else {
          this.setState({ relievedModalVisible: true });
          let data = [];
          if (
            Array.isArray(response.data) &&
            response.data[0].hasOwnProperty("error") &&
            !Array.isArray(response.data[0]["error"])
          ) {
            message.error(JSON.stringify(response.data[0]["error"]));
            data = [
              {
                key: 1,
                fileLink: response.data[0]["error"],
              },
            ];
          } else {
            data = [
              {
                key: 1,
                fileLink: response.data.fileLink,
              },
            ];
          }
          this.setState({ releivedEmployeesData: data });
          this.setState({ isLoading: false });
        }
      }
      document.toggleLoading();
      return;
    } catch (error) {
      message.error(
        "Unable process your request at this time. Please try after sometime."
      );
      document.toggleLoading();
    }
  };

  formSelectorHandler = (e) => {
    if (this.state.userLink === "User") {
      this.setState({ userIndex: e });
    } else if (this.state.userLink === "Admin") {
      this.setState({ adminIndex: e });
    }
  };

  closeHandler = () => {
    this.setState({ showDrawer: false, userIndex: "", adminIndex: "" });
    if (this.state.userLink === "Admin") {
      this.setState({
        adminSelectedAccessType: "",
        adminSelectorSelected: "",
        adminSelectedEmployee: "",
      });
    }
  };

  onUserManagementClick = (e) => {
    let role = "";
    if (e === "User") {
      role = "Employee";
    } else {
      role = e;
    }
    this.setState({ userLink: e, role, rowsPerPage: 15, page: 1 }, () =>
      this.loadEmployeeDetails(this.state.rowsPerPage, this.state.page)
    );
  };

  statusHandler = async (element, status, statusCode) => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId),
        token = decryptData(localStorage.token);
      let data = { employeeStatus: statusCode };
      let response = await request.put(
        `/organizations/${orgId}/employees/${element.id}/employeeStatus`,
        data,
        { headers: { token } }
      );
      if (response.status === 200) {
        if (this.state.userLink === "User") {
          let userArray = this.state.userData;
          let findIndex = userArray.findIndex((ele) => ele === element);
          userArray[findIndex].status = status;
          this.setState({
            userData: userArray,
          });
        } else if (this.state.userLink === "Admin") {
          let adminArray = this.state.userData;
          let findIndex = this.state.userData.findIndex(
            (ele) => ele === element
          );
          adminArray[findIndex].status = status;
          this.setState({
            userData: adminArray,
          });
        }
        message.success("Status updated");
      } else {
        message.error(JSON.stringify(response.data));
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  selectedEmployee = (adminSelectedEmployee) => {
    this.setState({ adminSelectedEmployee });
  };
  selectedAccessType = (accessType) => {
    let drawerData = this.state.drawerData;
    drawerData.placeholder = accessType.toLowerCase();
    this.setState({ drawerData, adminSelectedAccessType: accessType });
  };
  addNewAdminHandler = (employeeSelected, accessType, selectedOption) => { };

  filterSelected = (filterValue) => {
    this.setState({ filterValue });
  };
  searchInputHandler = (search) => {
    if (search.target.value === "") {
      this.setState({ searchValue: search.target.value });
      this.loadEmployeeDetails(this.state.rowsPerPage, this.state.page);
      return;
    } else {
      this.setState({ searchValue: search.target.value });
      this.loadSearchUserDetails(search.target.value);
      return;
    }
  };
  render() {
    return (
      <Div>
        <Drawer
          title={null}
          placement="right"
          closable={false}
          onClose={this.closeHandler}
          visible={this.state.showDrawer}
          width="450px"
          key="right"
          className="custom-drawer"
        >
          <div style={{ width: "450px", height: "100%" }}>
            {this.state.userLink === "User" ? (
              <AdminOrgData
                onChange={this.onChangeHandler}
                closeHandler={this.closeHandler}
                formSelectorHandler={this.formSelectorHandler}
                isLoading={this.state.isLoading}
                value={
                  this.state.userLink === "User"
                    ? this.state.userIndex
                    : this.state.adminIndex
                }
                data={{
                  userType: {
                    title: "User Type",
                    option: [
                      "Existing employee list",
                      "New employee list",
                      "Promoted employee list",
                      "Relieved employee list",
                    ],
                    fileData: File1,
                  },
                  skillMatrix: {
                    title: "Add Role- Competency- Skill Matrix",
                    fileData: File2,
                  },
                  careerPath: {
                    title: "Add Role- Career Path",
                    fileData: File3,
                  },
                }}
              />
            ) : (
                <AssignAdminRoleToEmployee
                  {...this.state}
                  {...this}
                  closeAdminDrawer={this.closeHandler}
                />
              )}
          </div>
        </Drawer>
        <div className="userManagementContainer">
          <div className="title">User Management</div>
          <div className="linkContainer">
            <div
              style={{
                borderBottom:
                  this.state.userLink === "User" ? "3px solid #FF808B" : "",
              }}
              className="userLabelContainer"
            >
              <label
                className="userLabel"
                onClick={() => this.onUserManagementClick("User")}
                onClickCapture={this.closeHandler}
              >
                User
              </label>
            </div>
            <div
              className="userLabelContainer"
              style={{
                borderBottom:
                  this.state.userLink === "Admin" ? "3px solid #FF808B" : "",
              }}
            >
              <label
                className="userLabel"
                onClick={() => this.onUserManagementClick("Admin")}
                onClickCapture={this.closeHandler}
              >
                Admin
              </label>
            </div>
          </div>
          <div className="userListTitleContainer">
            <div className="subTitle">
              {this.state.userLink === "User"
                ? `User Lists (${this.state.totalEmployeeCount})`
                : `Admin Lists (${this.state.totalEmployeeCount})`}
            </div>
            <div id="userFilterContainer">
              <FilterDropdown
                style={{ width: "135px", height: "40px" }}
                filterOnchange={this.filterSelected}
                value={this.state.filterValue}
                options={this.state.filterOption || []}
              />
              <div
                style={{
                  width: 327,
                  fontFamily: "Open Sans Regular",
                  fontSize: 14,
                  backgroundColor: "#ffffff",
                  margin: "0 2%",
                  color: "#303030",
                }}
              >
                <SearchTextBox
                  options={this.state.searchOptions || []}
                  placeHolder="Search employee"
                  value={this.state.searchValue}
                  style={{
                    color: {
                      hover: "#F4A6AE",
                    },
                  }}
                  keybordKeyHandler={null}
                  searchInputHandler={this.searchInputHandler}
                />
              </div>
              <div style={{ width: 134 }} onClick={this.openDrawer}>
                <Button
                  label={
                    this.state.userLink === "User" ? "Add Data" : "Add Admin"
                  }
                  status="enable"
                  styles={{
                    color: "#ffffff",
                    backgroundColor: "#F17E8A",
                    border: "#F39CA6",
                    height: "40px",
                  }}
                />
              </div>
            </div>
          </div>
          <Modal
            title="Upload Status for Onboarding Employees "
            visible={this.state.onboardingModalVisible}
            footer={null}
            content={this.state.onboardedEmployees}
            scroll={{ x: 24 }}
            width={1000}
            onCancel={() => this.setState({ onboardingModalVisible: false })}
          >
            {this.state.onboardedEmployees.map((elem, index) => {
              return (
                <div
                  key={index}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Text strong>Download link to check Status of upload</Text>
                  <div>
                    <a href={elem.fileLink}>Click here to download the excel</a>
                  </div>
                </div>
              );
            })}
          </Modal>
          <Modal
            title="Upload Status for Onboarding New Joinee Employees "
            visible={this.state.newJoineeModalVisible}
            footer={null}
            content={this.state.newJoineeEmployees}
            scroll={{ x: 24 }}
            width={800}
            onCancel={() => this.setState({ newJoineeModalVisible: false })}
          >
            {this.state.newJoineeEmployees.map((elem, index) => {
              return (
                <div
                  key={index}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Text strong>Download link to check Status of upload</Text>
                  <a href={elem.fileLink}>Click here to download the excel</a>
                </div>
              );
            })}
          </Modal>

          <Modal
            title="Upload Status for Onboarding Role Competency Skill"
            visible={this.state.CompetencyModalVisible}
            footer={null}
            content={this.state.Competencyskills}
            width={1000}
            scroll={{ x: 24 }}
            onCancel={() => this.setState({ CompetencyModalVisible: false })}
          >
            {this.state.Competencyskills.map((elem, index) => {
              return (
                <div
                  key={index}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Text strong>Download link to check Status of upload</Text>
                  <a href={elem.fileLink}>Click here to download the excel</a>
                </div>
              );
            })}
          </Modal>
          <Modal
            title="Upload Status for Role Career path"
            visible={this.state.roleCareerPathModalVisible}
            footer={null}
            content={this.state.uploadedROleCareerPath}
            width={900}
            scroll={{ x: 24 }}
            onCancel={() =>
              this.setState({ roleCareerPathModalVisible: false })
            }
          >
            {this.state.uploadedROleCareerPath.map((elem, index) => {
              return (
                <div
                  key={index}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Text strong>Download link to check Status of upload</Text>
                  <a href={elem.fileLink}>Click here to download the excel</a>
                </div>
              );
            })}
          </Modal>
          <Modal
            title="Upload Status for Promoted Employees"
            visible={this.state.promotionModalVisible}
            footer={null}
            content={this.state.promotedEmployeesData}
            width={900}
            scroll={{ x: 24 }}
            onCancel={() => this.setState({ promotionModalVisible: false })}
          >
            {this.state.promotedEmployeesData.map((elem, index) => {
              return (
                <div
                  key={index}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Text strong>Download link to check Status of upload</Text>
                  <a href={elem.fileLink}>Click here to download the excel</a>
                </div>
              );
            })}
          </Modal>
          <Modal
            title="Upload Status for Relieved Employees"
            visible={this.state.relievedModalVisible}
            footer={null}
            content={this.state.releivedEmployeesData}
            width={900}
            scroll={{ x: 24 }}
            onCancel={() => this.setState({ relievedModalVisible: false })}
          >
            {this.state.releivedEmployeesData.map((elem, index) => {
              return (
                <div
                  key={index}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Text strong>Download link to check Status of upload</Text>
                  <a href={elem.fileLink}>Click here to download the excel</a>
                </div>
              );
            })}
          </Modal>
          {this.state.userLink === "User" && (
            <>
              {this.state.userData.length !== 0 ? (
                <AdminUserManagementTable
                  userData={this.state.userData}
                  totalEmployeeCount={this.state.totalEmployeeCount}
                  statusHandler={this.statusHandler}
                  onClickOfList={this.props.onClickOfList}
                  paginationHandler={this.paginationHandler}
                />
              ) : (
                  <div className="UserListContainer">
                    <div>
                      <img src={UserGroup} alt="icon" className="userGroupIcon" />
                    </div>
                    {this.state.searchValue ? (
                      <div className="title">
                        Your search did not yield any result
                    </div>
                    ) : (
                        <>
                          <div className="title">You don't have any data yet</div>
                          <div className="userSubLabel">
                            Please &nbsp;
                        <label className="AddButton" onClick={this.openDrawer}>
                              Add Data
                        </label>
                            &nbsp; to fill the data table
                      </div>
                        </>
                      )}
                  </div>
                )}
            </>
          )}
          {this.state.userLink === "Admin" && (
            <>
              {this.state.userData.length !== 0 ? (
                <AdminUserManagementTable
                  userData={this.state.userData}
                  totalEmployeeCount={this.state.totalEmployeeCount}
                  statusHandler={this.statusHandler}
                  onClickOfList={this.props.onClickOfList}
                  paginationHandler={this.paginationHandler}
                />
              ) : (
                  <div className="UserListContainer">
                    <div>
                      <img src={UserGroup} alt="icon" className="userGroupIcon" />
                    </div>
                    {this.state.searchValue ? (
                      <div className="title">
                        Your search did not yield any result
                    </div>
                    ) : (
                        <>
                          <div className="title">You don't have any data yet</div>
                          <div className="userSubLabel">
                            Please &nbsp;
                        <label className="AddButton" onClick={this.openDrawer}>
                              Add Data
                        </label>
                            &nbsp; to fill the data table
                      </div>
                        </>
                      )}
                  </div>
                )}
            </>
          )}
        </div>
      </Div>
    );
  }
}

export default UserManagement;
