import React, { Component } from "react";
import styled from "styled-components";
import {
  updateRequestCourseApproval,
  getRequestCourseApproval,
  getFilterOption,
  getManagerRequestCourseApproval,
} from "../../../core/apiClient/organization/organizationClient";
import Hold from "../../../assets/images/hold.svg";
import Deny from "../../../assets/images/deny.svg";
import Approve from "../../../assets/images/approve.svg";
import ApprovalCourseTable from "./approvalCourseTable";
import SearchTextBox from "../../SearchTextBox";
import FilterDropdown from "../../FilterDroprdown";
import { decryptData } from "../../../utils/encryptDecrypt";

const Div = styled.div`
  .approval-search-with-button-container {
    display: grid;
    grid-template-columns: 1fr 5fr;
    align-items: center;
    padding: 1% 0% 1% 1.23%;
  }
  .approval-button-container {
    flex: 0.3;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    line-height: 1.876em;
    grid-column-gap: 1em;
    text-align: center;
    transition: 0.3s opacity, visibility;
  }
  .button-icon {
    height: 31px;
    width: 31px;
    cursor: pointer;
    &:hover {
      box-shadow: 0px 2px 10px #ccc;
      border-radius: 50%;
      transition: 0.1s;
    }
  }
  .approval-search-container {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .approval-search {
    width: 28%;
    margin-left: 10px;
  }
`;

class AdminApprovalCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      courseTable: [],
      multipleEmployeeSelected: [],
      selectedStatus: "",
      styles: {
        fontFamily: "Open Sans Regular",
        fontSize: "1em",
        color: "#303030",
        subColor: "#767676",
      },
      allSelected: false,
      courseDetails: {
        pendingCount: "",
        onholdCount: "",
        approvedCount: "",
        approvalRequests: [],
      },
      rowsPerPage: 15,
      page: 1,
      count: 0,
      selectedSubNavLink: {
        title: this.props.match.params.subTab,
        count: "",
      },
      filterValue: "",
      filterOption: [],
    };
  }

  componentDidMount() {
    if (decryptData(localStorage.role) === "manager") {
      this.loadCourseDetails(
        this.state.rowsPerPage,
        this.state.page,
        this.state.selectedSubNavLink
      );
    } else {
      this.loadManagerCourseDetails(
        this.state.rowsPerPage,
        this.state.page,
        this.state.selectedSubNavLink
      );
      this.loadFilterOptions();
    }
  }
  loadFilterOptions = async () => {
    try {
      let orgId = decryptData(localStorage.orgId),
        token = decryptData(localStorage.token),
        employeeId = decryptData(localStorage.employeeId);
      if (orgId && employeeId) {
        document.toggleLoading(true);
        let { data, status } = await getFilterOption(orgId, "course_approval", {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          if (data.length) {
            this.setState({
              filterOption: data,
            });
          }
        }
      }
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };
  loadCourseDetails = async (start, end, selectedSubNavLink) => {
    try {
      let orgId = decryptData(localStorage.orgId),
        token = decryptData(localStorage.token),
        employeeId = decryptData(localStorage.employeeId),
        role = decryptData(localStorage.role);
      if (orgId && employeeId) {
        document.toggleLoading(true);
        let count;
        let subNavLink;
        let startCount = end - 1;
        let courseDetails = this.state.courseDetails;
        subNavLink = [
          {
            title: "Pending",
            count: "",
            subPath: "course/pending",
          },
          {
            title: "On hold",
            count: "",
            subPath: "course/hold",
          },
          {
            title: "Approved",
            count: "",
            subPath: "course/approved",
          },
        ];
        let { data, status } = await getRequestCourseApproval(
          orgId,
          role,
          employeeId,
          start * startCount,
          start,
          selectedSubNavLink.title,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          subNavLink[0].count = data.pendingCount;
          subNavLink[1].count = data.onholdCount;
          subNavLink[2].count = data.approvedCount;
          courseDetails = data;

          if (selectedSubNavLink.title === "pending") {
            count = data.pendingCount;
          } else if (selectedSubNavLink.title === "hold") {
            count = data.onholdCount;
          } else {
            count = data.approvedCount;
          }
          this.props.handleSubNavCount(subNavLink);
          this.setState({
            subNavLink,
            courseDetails,
            courseTable: data.approvalRequests,
            selectedSubNavLink,
            count,
            rowsPerPage: start,
            page: end,
          });
        } else {
          this.props.handleSubNavCount(subNavLink);
        }
        document.toggleLoading();
      }
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };
  loadManagerCourseDetails = async (start, end, selectedSubNavLink) => {
    try {
      let orgId = decryptData(localStorage.orgId),
        token = decryptData(localStorage.token),
        employeeId = decryptData(localStorage.employeeId),
        role = decryptData(localStorage.role);
      let filter = this.state.filterValue;
      if (orgId && employeeId) {
        document.toggleLoading(true);
        let count;
        let subNavLink;
        let startCount = end - 1;
        let courseDetails = this.state.courseDetails;
        subNavLink = [
          {
            title: "Pending",
            count: "",
            subPath: "course/pending",
          },
          {
            title: "On hold",
            count: "",
            subPath: "course/hold",
          },
          {
            title: "Approved",
            count: "",
            subPath: "course/approved",
          },
        ];
        let { data, status } = await getManagerRequestCourseApproval(
          orgId,
          role,
          employeeId,
          selectedSubNavLink.title,
          (filter.length && filter[1]) || "",
          this.state.searchValue,
          start * startCount,
          start,

          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          subNavLink[0].count = data.pendingCount;
          subNavLink[1].count = data.onholdCount;
          subNavLink[2].count = data.approvedCount;
          courseDetails = data;
          let courseTable=[];
          if (selectedSubNavLink.title === "pending") {
            count = data.pendingCount;
          } else if (selectedSubNavLink.title === "hold") {
            count = data.onholdCount;
          } else {
            count = data.approvedCount;
          }
          this.props.handleSubNavCount(subNavLink);
          courseTable=data.approvalRequests||[]
          this.setState({
            subNavLink,
            courseDetails,
            courseTable: courseTable,
            selectedSubNavLink,
            count,
            rowsPerPage: start,
            page: end,
          });
        } else {
          this.props.handleSubNavCount(subNavLink);
        }
        document.toggleLoading();
      }
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };
  paginationHandler = (rowsPerPage, page) => {
    if (decryptData(localStorage.role) === "manager") {
      this.setState(
        {
          rowsPerPage: rowsPerPage,
          page: page,
        },
        () =>
          this.loadCourseDetails(
            rowsPerPage,
            page,
            this.state.selectedSubNavLink
          )
      );
    } else
      this.setState(
        {
          rowsPerPage: rowsPerPage,
          page: page,
        },
        () =>
          this.loadManagerCourseDetails(
            rowsPerPage,
            page,
            this.state.selectedSubNavLink
          )
      );
  };

  onStatusClicked = async (title, value) => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId),
        employeeId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token),
        role = decryptData(localStorage.role);
      if (this.state.multipleEmployeeSelected.length > 0) {
        if (orgId && employeeId) {
          let employeeSelected = JSON.parse(
            JSON.stringify(this.state.multipleEmployeeSelected)
          );
          employeeSelected = employeeSelected.map((eachEmployee) => {
            eachEmployee.status = value;
            return {
              id: eachEmployee.id,
              approvalId: eachEmployee.approvalId,
              status: eachEmployee.status,
              name: eachEmployee.name,
              courseId: eachEmployee.courseId,
            };
          });
          let { status } = await updateRequestCourseApproval(
            orgId,
            role,
            employeeId,
            employeeSelected,
            {
              Authorization: token,
            }
          );
          if (status >= 200 && status < 300) {
            this.setState({
              selectedStatus: value,
              multipleEmployeeSelected: [],
            });
            document.message.success(
              `Request ${title.toLowerCase()} successfully.`
            );
            if (decryptData(localStorage.role) === "manager") {
              this.loadCourseDetails(
                this.state.rowsPerPage,
                this.state.page,
                this.state.selectedSubNavLink
              );
            } else {
              this.loadManagerCourseDetails(
                this.state.rowsPerPage,
                this.state.page,
                this.state.selectedSubNavLink
              );
            }
          } else {
            document.message.error("Something went wrong!");
          }
        }
      } else {
        document.message.error("Please select at least one course approval");
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  searchInputHandler = (search) => {
    if (decryptData(localStorage.role) === "manager") {
      this.setState({ searchValue: search.target.value, page: 1 });
    } else
      this.setState({ searchValue: search.target.value, page: 1 }, () =>
        this.loadManagerCourseDetails(
          this.state.rowsPerPage,
          this.state.page,
          this.state.selectedSubNavLink
        )
      );
  };

  selectedEmployee = (employeeDetails, index) => {
    let courseTable = this.state.courseTable;
    let multipleEmployeeSelected = this.state.multipleEmployeeSelected;
    if (courseTable.length > 0) {
      let courseIndex = courseTable.findIndex((employee) =>
        decryptData(localStorage.role) === "manager"
          ? employee.id === employeeDetails.id
          : employee.approvalId === employeeDetails.approvalId
      );
      courseTable[courseIndex].checkStatus = !courseTable[courseIndex]
        .checkStatus;
      if (courseTable[courseIndex].checkStatus) {
        multipleEmployeeSelected.push(courseTable[courseIndex]);
      } else {
        let multipleIndex = multipleEmployeeSelected.findIndex((employee) =>
          decryptData(localStorage.role) === "manager"
            ? employee.id === employeeDetails.id
            : employee.approvalId === employeeDetails.approvalId
        );
        if (multipleIndex >= 0) {
          multipleEmployeeSelected.splice(multipleIndex, 1);
        }
      }
    }
    this.setState({ courseTable, multipleEmployeeSelected });
  };
  allEmployeeSelected = () => {
    let multipleEmployeeSelected = this.state.multipleEmployeeSelected;
    let courseTable;
    if (this.state.allSelected) {
      courseTable = this.state.courseTable.map((eachEmployee) => {
        eachEmployee.checkStatus = false;
        return eachEmployee;
      });
      multipleEmployeeSelected = [];
    } else {
      courseTable = this.state.courseTable.map((eachEmployee) => {
        eachEmployee.checkStatus = true;
        return eachEmployee;
      });
      multipleEmployeeSelected = [...courseTable];
    }
    let allSelected = !this.state.allSelected;
    this.setState({ courseTable, allSelected, multipleEmployeeSelected });
  };

  filterSelected = (filterValue) => {
    this.setState({ filterValue, searchValue: "", page: 1 }, () =>
      this.loadManagerCourseDetails(
        this.state.rowsPerPage,
        this.state.page,
        this.state.selectedSubNavLink
      )
    );
  };

  render() {
    return (
      <Div>
        <div className="approval-search-with-button-container">
          <div
            className="approval-button-container"
            style={{
              visibility:
                this.state.selectedSubNavLink.title === "approved"
                  ? "hidden"
                  : "visible",
              opacity:
                this.state.selectedSubNavLink.title === "approved" ? 0 : 1,
            }}
          >
            <div
              style={{
                display:
                  this.state.selectedSubNavLink.title === "hold" ? "none" : "",
              }}
            >
              <img
                title="Hold"
                src={Hold}
                alt="hold"
                className="button-icon"
                onClick={() => {
                  this.onStatusClicked("on hold", 3);
                }}
              />
            </div>
            <div>
              <img
                title="Deny"
                src={Deny}
                alt="deny"
                className="button-icon"
                onClick={() => {
                  this.onStatusClicked("denied", 0);
                }}
              />
            </div>
            <div>
              <img
                title="Approve"
                src={Approve}
                alt="Approve"
                className="button-icon"
                onClick={() => {
                  this.onStatusClicked("approved", 1);
                }}
              />
            </div>
          </div>
          <div className="approval-search-container">
            {decryptData(localStorage.role) !== "manager" ? (
              <div>
                <FilterDropdown
                  style={{ width: "135px", height: "40px" }}
                  filterOnchange={this.filterSelected}
                  value={this.state.filterValue}
                  options={this.state.filterOption || []}
                />
              </div>
            ) : (
              ""
            )}
            <div className="approval-search">
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
                searchInputHandler={(e) => this.searchInputHandler(e)}
              />
            </div>
          </div>
        </div>
        <div>
          <ApprovalCourseTable
            {...this.state}
            {...this.props}
            selectedSubNavLink={this.state.selectedSubNavLink}
            selectedEmployee={this.selectedEmployee}
            onStatusClicked={this.onStatusClicked}
            allEmployeeSelected={this.allEmployeeSelected}
            courseTable={this.state.courseTable}
            paginationHandler={this.paginationHandler}
            page={this.state.page}
            rowsPerPage={this.state.rowsPerPage}
          />
        </div>
      </Div>
    );
  }
}

export default AdminApprovalCourse;
