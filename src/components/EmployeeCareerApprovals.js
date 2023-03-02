import React, { Component } from "react";
import TimeStampTodate from "../core/lib/TimeStampToDate";
import {
  getCareerpathRequestList,
  updateCareerpathRequest,
  getEmployeeCareerpathRequest,
} from "../core/apiClient/organization/organizationClient";
import { decryptData } from "../utils/encryptDecrypt";
import EmployeeCareerApprovalSidebar from "./EmployeeCareerApprovalSidebar";
import EmployeeCareerDiscussion from "./EmployeeCareerDiscussion";

const styles = {
  ApprovalCard: {
    height: "100%",
    width: "100%",
    fontFamily: "Open Sans Regular",
    fontSize: "1em",
  },
  ApprovalMainCard: {
    height: "100%",
  },
  ApprovalHeading: {
    fontFamily: "Open Sans semibold",
    fontSize: "1.126em",
    color: "#303030",
    opacity: "1",
    marginBottom: 12,
  },
  ApprovalDetails: {
    display: "flex",
  },
  careerPath: {
    flex: 0.4,
    marginRight: 12,
    background: "#fff",
  },
  careerDiscussion: {
    flex: 1,
    paddingTop: 18,
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "1px 4px 12px #00000027",
  },
};
export default class EmployeeCareerApproval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseselectedStatus: 2,
      searchValue: "",
      approvalArray: [],
      careerDiscussion: {},
      showDataOfCareerDiscussion: false,
      selectedIndex: null,
    };
  }
  componentDidMount() {
    this.loadCareerPathRequestList();
  }
  loadCareerPathRequestList = async () => {
    try {
      let orgId = decryptData(localStorage.orgId),
        token = decryptData(localStorage.token),
        employeeId = decryptData(localStorage.employeeId);
      if (orgId && employeeId) {
        document.toggleLoading(true);
        let { data, status } = await getCareerpathRequestList(
          orgId,
          employeeId,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          let approvalArray = this.state.approvalArray;
          if (data.length) {
            for (let i = 0; i < data.length; i++) {
              let obj = {};
              obj.careerPathApprovalId = data[i].careerPathApprovalId;
              obj.employeeId = data[i].employeeId;
              obj.firstName = data[i].firstName;
              obj.middleName = data[i].middleName;
              obj.lastName = data[i].lastName;
              obj.designation = data[i].designation;
              let date = TimeStampTodate(data[i].proposedDate);
              obj.createdAt = date;
              obj.profilePicture = data[i].profilePicture;
              approvalArray.push(obj);
            }
            this.setState({ approvalArray });
          }
        }
        document.toggleLoading();
      }
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  sendApprovals = async (careerPathApprovalId, proposedStatus, note, empId) => {
    try {
      let orgId = decryptData(localStorage.orgId),
        token = decryptData(localStorage.token),
        employeeId = decryptData(localStorage.employeeId);
      if (orgId && employeeId) {
        document.toggleLoading(true);
        let dataObj = {
          employeeId: empId,
          careerPathApprovalId,
          proposedStatus,
          note,
        };
        let { status } = await updateCareerpathRequest(
          orgId,
          employeeId,
          dataObj,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          document.message.success("Data updated successfully.");
          let approvalArray = this.state.approvalArray;
          approvalArray.splice(this.state.selectedIndex, 1);
          if (approvalArray.length !== 0) {
            if (this.state.selectedIndex > approvalArray.length - 1) {
              this.setState(
                {
                  selectedIndex: 0,
                },
                () =>
                  this.loadCareerDiscussion(
                    approvalArray[this.state.selectedIndex]
                      .careerPathApprovalId,
                    this.state.selectedIndex
                  )
              );
            } else {
              this.loadCareerDiscussion(
                approvalArray[this.state.selectedIndex].careerPathApprovalId,
                this.state.selectedIndex
              );
            }
          } else {
            this.setState({
              showDataOfCareerDiscussion: false,
            });
          }
          this.setState({
            approvalArray,
          });
        } else if (status >= 400 && status < 500) {
          document.message.error("Something went wrong");
        } else {
          document.message.error(
            "Something went wrong! Please try after some time."
          );
        }
        document.toggleLoading();
      }
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  loadCareerDiscussion = async (careerPathApprovalId, selectedIndex) => {
    try {
      let orgId = decryptData(localStorage.orgId),
        token = decryptData(localStorage.token),
        employeeId = decryptData(localStorage.employeeId);
      if (orgId && employeeId) {
        document.toggleLoading(true);
        let { data, status } = await getEmployeeCareerpathRequest(
          orgId,
          employeeId,
          careerPathApprovalId,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          let careerDiscussion = this.state.careerDiscussion;
          let career = {};
          career.careerPathApprovalId = data.careerPathApprovalId;
          career.employeeId = data.employeeId;
          career.firstName = data.firstName;
          career.middleName = data.middleName;
          career.lastName = data.lastName;
          career.designation = data.designation;
          career.profilePicture = data.profilePicture;
          career.selectedCareerPath = data.careerPath;
          career.desiredRole = data.desiredRole;
          career.proposedDate = TimeStampTodate(data.proposedDate);
          if (data.skillScore === undefined) {
            career.skillScore = 0;
          } else career.skillScore = data.skillScore;
          careerDiscussion = career;
          this.setState({
            careerDiscussion,
            showDataOfCareerDiscussion: true,
            selectedIndex: selectedIndex,
          });
        }
        document.toggleLoading();
      }
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  approvalHandler = (
    proposedStatus,
    employeeId,
    note,
    careerPathApprovalId
  ) => {
    this.sendApprovals(careerPathApprovalId, proposedStatus, note, employeeId);
  };

  onClickList = (employeeId, careerPathApprovalId, selectedIndex) => {
    this.loadCareerDiscussion(careerPathApprovalId, selectedIndex);
  };

  render() {
    return (
      <div style={styles.ApprovalCard}>
        <div style={styles.ApprovalMainCard}>
          <div style={styles.ApprovalDetails}>
            <div style={styles.careerPath}>
              <EmployeeCareerApprovalSidebar
                pathRequestArray={this.state.approvalArray}
                onClickList={this.onClickList}
                {...this.props}
              />
            </div>
            <div style={styles.careerDiscussion}>
              <EmployeeCareerDiscussion
                firstName={this.state.careerDiscussion.firstName}
                middleName={this.state.careerDiscussion.middleName}
                lastName={this.state.careerDiscussion.lastName}
                profilePicture={this.state.careerDiscussion.profilePicture}
                designation={this.state.careerDiscussion.designation}
                skillScore={this.state.careerDiscussion.skillScore}
                selectedCareerPath={
                  this.state.careerDiscussion.selectedCareerPath
                }
                desiredRole={this.state.careerDiscussion.desiredRole}
                employeeId={this.state.careerDiscussion.employeeId}
                approvalHandler={this.approvalHandler}
                showDataOfCareerDiscussion={
                  this.state.showDataOfCareerDiscussion
                }
                careerPathApprovalId={
                  this.state.careerDiscussion.careerPathApprovalId
                }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
