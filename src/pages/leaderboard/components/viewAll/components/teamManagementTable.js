import React, { Component } from "react";
import EmployeeTeamManagement from "./teamManagement";
import TableHeader from "./tableHeader";
import Pagination from "../../../../../components/pagination";
import { sendLeaderboardFavourite } from "../../../../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../../../../utils/encryptDecrypt";
import { message } from "antd";
class EmployeeTeamManagementTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHeadings: this.props.tableHeadings || [],
      styles: this.props.styles || {},
      employeeTeam: this.props.tableData || [],
      NoOfRows: [15, 30, 60],
      rowsFrom: 0,
      page: this.props.page,
      defaultCurrent: this.props.page,
      pageSize: null,
      rowsPerPage: 15,
      rowsUpTo: null,
      lastPage: false,
      firstPage: true,
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    return {
      employeeTeam: props.tableData,
      defaultCurrent: props.page,
      page: props.page,
      rowsFrom: props.page === 1 ? 0 : state.rowsFrom,
      rowsUpTo: props.page === 1 ? state.rowsPerPage : state.rowsUpTo,
      lastPage: props.totalEmployeeCount > state.rowsUpTo ? false : true,
      firstPage: props.page === 1 ? true : false,
    };
  };
  componentDidMount = () => {
    this.setState({
      rowsUpTo: this.state.rowsPerPage,
      pageSize: this.state.rowsPerPage,
    });
    this.props.paginationHandler(this.state.rowsPerPage, this.state.page);
  };
  onClickFavorite = (empId, isFavourite, index) => {
    this.sendFavorite(empId, isFavourite, index);
  };
  sendFavorite = async (empId, isFavourite, index) => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId);
    let token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      document.toggleLoading(true);
      let obj = {
        employeeId: empId,
        isFavourite: JSON.stringify(isFavourite),
      };
      try {
        let response = await sendLeaderboardFavourite(obj, orgId, employeeId, {
          Authorization: token,
        });
        if (response.status >= 200 && response.status < 300) {
          message.success(response.data);
          let employeeTeam = this.state.employeeTeam;
          employeeTeam[index].isFavourite = !employeeTeam[index].isFavourite;
          this.setState({
            employeeTeam,
          });
        } else if (response.status >= 400 && response.status < 500) {
          message.error(response.data);
        } else {
          message.error("Something went wrong! Please try after some time.");
        }
      } catch (error) {
        message.error(
          "Unable to save details at this time, please try after sometime"
        );
      }
      document.toggleLoading();
    }
  };
  optionHandler = (e, index) => {
    e.preventDefault();
    let rowsUpTo, option;
    if (this.props.totalEmployeeCount > this.state.NoOfRows[index]) {
      rowsUpTo = this.state.NoOfRows[index];
    } else {
      rowsUpTo = this.props.totalEmployeeCount;
    }
    option = this.state.NoOfRows[index];
    let noOfRecords = this.props.totalEmployeeCount;
    let lastPage = Math.ceil(noOfRecords / option);
    if (this.state.page === lastPage) {
      this.setState(
        {
          rowsPerPage: option,
          rowsFrom: 0,
          rowsUpTo,
          defaultCurrent: 1,
          firstPage: true,
          lastPage: true,
        },
        () => this.props.paginationHandler(this.state.rowsPerPage, 1)
      );
    } else {
      this.setState(
        {
          rowsPerPage: option,
          rowsFrom: 0,
          rowsUpTo,
          defaultCurrent: 1,
          firstPage: true,
          lastPage: false,
        },
        () => this.props.paginationHandler(this.state.rowsPerPage, 1)
      );
    }
  };
  paginationHandler = (page, pageSize) => {
    let noOfRecords = this.props.totalEmployeeCount;
    let rowsPerPage = this.state.rowsPerPage;
    let lastPage = Math.ceil(noOfRecords / rowsPerPage);
    if (page === 1) {
      this.setState({
        rowsFrom: 0,
        defaultCurrent: page,
        rowsUpTo: this.state.rowsPerPage,
        page: page,
        pageSize: pageSize,
        firstPage: true,
        lastPage: false,
      });
    } else if (lastPage === page) {
      this.setState({
        lastPage: true,
        firstPage: false,
        defaultCurrent: lastPage,
        rowsFrom: (lastPage - 1) * this.state.rowsPerPage,
        rowsUpTo: this.props.totalEmployeeCount,
      });
    } else if (lastPage !== page) {
      this.setState({
        rowsFrom: pageSize * (page - 1),
        rowsUpTo: page * this.state.rowsPerPage,
        page: page,
        defaultCurrent: page,
        pageSize: pageSize,
        firstPage: false,
        lastPage: false,
      });
    }
    this.props.paginationHandler(pageSize, page);
  };
  jumpPageHandler = (value) => {
    if (value === "lastPage") {
      let noOfRecords = this.props.totalEmployeeCount;
      let rowsPerPage = this.state.rowsPerPage;
      let lastPage = Math.ceil(noOfRecords / rowsPerPage);
      this.setState(
        {
          defaultCurrent: lastPage,
          rowsFrom: (lastPage - 1) * this.state.rowsPerPage,
          rowsUpTo: this.props.totalEmployeeCount,
          firstPage: false,
          lastPage: true,
        },
        () => this.props.paginationHandler(this.state.rowsPerPage, lastPage)
      );
    } else {
      this.setState(
        {
          defaultCurrent: 1,
          rowsFrom: 0,
          rowsUpTo: this.state.rowsPerPage,
          firstPage: true,
          lastPage: false,
        },
        () => this.props.paginationHandler(this.state.rowsPerPage, 1)
      );
    }
  };
  render() {
    return (
      <div style={{ background: "#F8F8F8" }}>
        <TableHeader {...this.state} userRole={this.props.userRole} />
        <div style={{ height: 540, overflowY: "auto" }}>
          {this.state.employeeTeam.map((ele, index) => (
            <div key={index} style={{ marginBottom: 6 }}>
              <EmployeeTeamManagement
                {...ele}
                userRole={this.props.userRole}
                onClickFavorite={(empId, isFavourite) =>
                  this.onClickFavorite(empId, isFavourite, index)
                }
              />
            </div>
          ))}
        </div>
        <div>
          <Pagination
            {...this.state}
            {...this.props}
            tableData={this.state.employeeTeam}
            PaginationHandler={this.paginationHandler}
            jumpPageHandler={this.jumpPageHandler}
            optionHandler={this.optionHandler}
          />
        </div>
      </div>
    );
  }
}

export default EmployeeTeamManagementTable;
