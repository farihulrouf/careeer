import React, { Component } from "react";
import EmployeeTeamManagementTable from "./components/teamManagementTable";
import { decryptData } from "../../../../utils/encryptDecrypt";
import { getAllLeaderboardEmployees } from "../../../../core/apiClient/leaderboard/leaderboardClient";
import { Empty } from "antd";
import SearchTextBox from "../../../../components/SearchTextBox";
import { withRouter } from "react-router-dom";
class LeaderBoardEmployeeLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: this.props.employeeTeam || [],
      employeeRegion: [],
      employeeGlobal: [],
      styles: this.props.styles,
      tableHeadings: [
        { title: "Name", flex: 0.9 },
        { title: "Department", flex: 0.6 },
        { title: "Points", flex: 0.58 },
        { title: "Badges", flex: 0.5 },
        { title: "Rewards", flex: 0.65 },
        { title: "Favorites", flex: 0.25 },
      ],
      searchValue: "",
      rowsPerPage: 15,
      page: 1,
      totalEmployeeCount: 0,
    };
  }
  componentDidMount = () => {
    if (this.props.scopeType === "global") {
      this.setState(
        {
          scopeType: "root",
          referenceId: this.props.match.params.referenceId,
        },
        () => this.loadEmployeeList()
      );
    } else {
      this.setState(
        {
          scopeType: this.props.scopeType,
          referenceId: this.props.match.params.referenceId,
        },
        () => this.loadEmployeeList()
      );
    }
  };
  loadEmployeeList = async () => {
    try {
      let orgId = decryptData(localStorage.orgId),
        employeeId = decryptData(localStorage.employeeId);
      let token = decryptData(localStorage.token);
      if (orgId && employeeId) {
        document.toggleLoading(true);
        let startCount = this.state.page - 1;
        let responseData = await getAllLeaderboardEmployees(
          orgId,
          employeeId,
          this.state.scopeType.toLowerCase(),
          this.state.referenceId || 0,
          this.state.rowsPerPage * startCount,
          this.state.rowsPerPage,
          this.state.searchValue,
          {
            Authorization: token,
          }
        );
        if (responseData.status === 200) {
          let tableData = this.state.tableData;
          let totalEmployeeCount = this.state.totalEmployeeCount;
          if (responseData.data) {
            tableData = responseData.data.ranksList;
            totalEmployeeCount = responseData.data.count;
            this.setState({
              tableData,
              totalEmployeeCount,
            });
          }
        }
        document.toggleLoading();
      }
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  searchInputHandler = (search) => {
    this.setState({ searchValue: search.target.value, page: 1 }, () =>
      this.loadEmployeeList()
    );
  };

  inputChangeHandler = (e) => {};
  paginationHandler = (rowsPerPage, page) => {
    this.setState(
      {
        rowsPerPage: rowsPerPage,
        page: page,
      },
      () => this.loadEmployeeList()
    );
  };
  render() {
    return (
      <div
        style={{
          width: "100%",
          background: "#F8F8F8",
          fontFamily: "Open Sans Regular",
          color: "#303030",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 327,
                fontFamily: "Open Sans Regular",
                fontSize: 14,
                backgroundColor: "#ffffff",
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
                searchInputHandler={(e) => this.searchInputHandler(e)}
              />
            </div>
          </div>
          {this.state.tableData.length > 0 ? (
            <EmployeeTeamManagementTable
              tableData={this.state.tableData}
              styles={this.state.styles}
              tableHeadings={this.state.tableHeadings}
              userRole={this.props.userRole}
              paginationHandler={this.paginationHandler}
              totalEmployeeCount={this.state.totalEmployeeCount}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
            />
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginTop: "10%",
              }}
            >
              <Empty description={<span>No Data available</span>} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(LeaderBoardEmployeeLists);
