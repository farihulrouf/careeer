import React, { Component } from "react";
import Styled from "styled-components";
import "antd/dist/antd.css";
import AppHeaderV2 from "./AppHeaderV2";
import NavigationBar from "./NavigationBar";
import AdminUserManagementTable from "./Admin-User-Management-Table";
import SingleSearchInput from "./SingleSearchInput";
import FilterIcon from "../assets/images/filter.svg";
import Button from "./Button";
import UserGroup from "../assets/images/userGroup.svg";
import AdminOrgData from "./AdminUploadOrgData";
import File1 from "../assets/Files/coverImage.svg";
import File2 from "../assets/Files/coverImage.svg";
import File3 from "../assets/Files/coverImage.svg";

const Div = Styled.div`
min-height:100vh;
background:#F8F8F8;
padding:1.5% 2%;
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
.userFilterContainer{
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
const FilterButton = Styled.button`
height:40px;
width:120px;
background:#ffffff;
border:1px solid #E2E2E2;
border-radius:4px;
outline:none;
cursor:pointer;
color: #767676;

`;

const Nav = Styled.div`
height: 100%;
width: 0px;
position: fixed;
z-index: 1;
top: 0;
right: 0;
background-color: #fff;
overflow-x: hidden;
transition: 0.3s;
padding-top: 0px;

`;

class AdminUserPage extends Component {
  state = {
    selectedNavBar: "",
    userIndex: "",
    adminIndex: "",
    userData: this.props.AdminUserManagementTableData,
    userFileUpload: false,
    adminFileUpload: false,
    userLink: "User",
    AdminUserManagementTableData: "",
    NavigationData: this.props.AppNavigationBarData,
    searchOptions: this.props.AdminUserManagementTableData.map((element) => ({
      img: element.profile,
      name: element.name,
      designation: element.designation,
    })),
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.AppNavigationBarData.selectedNavBarName !==
      prevState.selectedNavBar
    ) {
      return {
        selectedNavBar: nextProps.AppNavigationBarData.selectedNavBarName,
        AdminUserManagementTableData: nextProps.AdminUserManagementTableData,
      };
    } else return null;
  }

  openDrawer = () => {
    document.getElementById("mySidenav").style.width = "450px";
  };
  onChangeHandler = (event, title) => {
    if (this.state.userLink === "User") {
      this.setState({ userFileUpload: true });
    } else if (this.state.userLink === "Admin") {
      this.setState({ adminFileUpload: true });
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
    document.getElementById("mySidenav").style.width = "0px";
  };

  onUserManagementClick = (e) => {
    this.setState({ userLink: e });
  };

  singleSearchHandler = (e) => {
    let array = this.props.AdminUserManagementTableData;
    let filtered = array.filter((element) => element.name.startsWith(e.name));
    this.setState({ userData: filtered });
  };

  inputChangeHandler = (e) => {
    let incomming = e.target.value.toLowerCase();
    let array = this.props.AdminUserManagementTableData;
    let filtered = array.filter((element) =>
      element.name.toLowerCase().startsWith(incomming)
    );
    this.setState({
      userData: filtered,
    });
  };

  render() {
    return (
      <div>
        <Nav id="mySidenav">
          {this.state.userLink === "User" ? (
            <AdminOrgData
              onChange={this.onChangeHandler}
              closeHandler={this.closeHandler}
              formSelectorHandler={this.formSelectorHandler}
              value={this.state.userIndex}
              data={{
                userType: {
                  title: "User Type",
                  option: [
                    "User on boarding",
                    "New joinee list",
                    "Promoted list",
                    "Relieved list",
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
            <AdminOrgData
              onChange={this.onChangeHandler}
              closeHandler={this.closeHandler}
              formSelectorHandler={this.formSelectorHandler}
              value={this.state.adminIndex}
              data={{
                userType: {
                  title: "User Type",
                  option: [
                    "User on boarding",
                    "New joinee list",
                    "Promoted list",
                    "Relieved list",
                  ],
                  fileData: File3,
                },
                skillMatrix: {
                  title: "Add Role- Compitency- Skill Matrix",
                  fileData: File2,
                },
                careerPath: {
                  title: "Add Role- Career Path",
                  fileData: File3,
                },
              }}
            />
          )}
        </Nav>

        <AppHeaderV2
          images={this.props.AppHeaderData.images}
          FlagOptions={this.props.AppHeaderData.FlagOptions}
          notification={this.props.AppHeaderData.notification}
          profileData={this.props.AppHeaderData.profileData}
          linkHandler={(e) => console.log(e)}
          notifyCloseHandler={this.props.AppHeaderData.notifyCloseHandler}
          notifyOption={(e) => console.log(e)}
          flagClickHandler={this.props.AppHeaderData.flagClickHandler}
        />
        <NavigationBar
          navigationData={this.props.AppNavigationBarData.navigationData}
          viewHandler={this.props.AppNavigationBarData.viewHandler}
          viewOptions={this.props.AppNavigationBarData.viewOptions}
          selectedNavBar={this.props.AppNavigationBarData.selectedNavBar}
          navBarLinkHandler={this.props.AppNavigationBarData.navBarLinkHandler}
        />
        <Div NavigationData={this.props.AppNavigationBarData}>
          <div
            className="userManagementContainer"
            style={{
              display:
                this.state.selectedNavBar === "User Management"
                  ? "flex"
                  : "none",
            }}
          >
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
                {this.state.userLink === "User" ? "User Lists" : "Admin Lists"}(
                {this.state.userLink === "User"
                  ? this.props.AdminUserManagementTableData.length
                  : this.state.userLink === "Admin"
                  ? this.props.AdminUserManagementTableData.length
                  : 0}
                )
              </div>
              <div className="userFilterContainer">
                <FilterButton>
                  Filter By
                  <img
                    src={FilterIcon}
                    alt="icon"
                    style={{ paddingLeft: "20px" }}
                  />
                </FilterButton>
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
                  <SingleSearchInput
                    options={
                      this.state.userFileUpload &&
                      this.state.userLink === "User"
                        ? this.state.searchOptions
                        : this.state.adminFileUpload &&
                          this.state.userLink === "Admin"
                        ? this.state.searchOptions
                        : []
                    }
                    placeHolder="Search & Select Employee"
                    style={{
                      color: {
                        hover: "#F4A6AE",
                        selectedBg: "#F4A6AE",
                        optionHover: "#fadfe1",
                      },
                    }}
                    onChange={this.singleSearchHandler}
                    onChangeInput={this.inputChangeHandler}
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
            {this.state.userFileUpload && this.state.userLink === "User" ? (
              <AdminUserManagementTable userData={this.state.userData} />
            ) : this.state.adminFileUpload &&
              this.state.userLink === "Admin" ? (
              <AdminUserManagementTable userData={this.state.userData} />
            ) : (
              <div className="UserListContainer">
                <div>
                  <img src={UserGroup} alt="icon" className="userGroupIcon" />
                </div>
                <div className="title">You don't have any data yet</div>
                <div className="userSubLabel">
                  Please &nbsp;
                  <label className="AddButton" onClick={this.openDrawer}>
                    Add Data
                  </label>
                  &nbsp; to fill the data table
                </div>
              </div>
            )}
          </div>
        </Div>
      </div>
    );
  }
}

export default AdminUserPage;
