import React, { Component } from "react";
import EmployeeTeamManagement from "./EmployeeTeamManagement";
import TableHeader from "./TableHeader";
import Pagination from "./Pagination";
class EmployeeTeamManagementTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHeadings: this.props.tableHeadings || [],
      styles: this.props.styles || {},
      employeeTeam: this.props.employeeTeam || [],
      NoOfRows: [1, 2, 5, 8, 10, 12, 15, 20, 30, 60],
      rowsFrom: 0,
      page: 1,
      defaultCurrent: 1,
      pageSize: null,
      rowsPerPage: 2,
      rowsUpTo: 2,
      lastPage: false,
      firstPage: true,
    };
  }
  //TO-DO:Need to check if assiging props within render is better than getDerivedStateFromProps
  static getDerivedStateFromProps = (props, state) => {
    return {
      employeeTeam: props.employeeTeam,
    };
  };

  onClickFavorite = (empId, index) => {
    let employeeTeam = this.state.employeeTeam;
    employeeTeam[index].favorite = !employeeTeam[index].favorite;
    this.setState({
      employeeTeam,
    });
  };
  optionHandler = (e, index) => {
    e.preventDefault();
    let option = this.state.NoOfRows[index];
    this.setState({
      rowsPerPage: option,
      rowsFrom: 0,
      rowsUpTo: option,
      defaultCurrent: 1,
      firstPage: true,
      lastPage: false,
    });
  };
  paginationHandler = (page, pageSize) => {
    let noOfRecords = this.state.employeeTeam.length;
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
        rowsUpTo: this.state.employeeTeam.length,
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
  };
  jumpPageHandler = (value) => {
    if (value === "lastPage") {
      let noOfRecords = this.state.employeeTeam.length;
      let rowsPerPage = this.state.rowsPerPage;
      let lastPage = Math.ceil(noOfRecords / rowsPerPage);
      this.setState({
        defaultCurrent: lastPage,
        rowsFrom: (lastPage - 1) * this.state.rowsPerPage,
        rowsUpTo: this.state.employeeTeam.length,
        firstPage: false,
        lastPage: true,
      });
    } else {
      this.setState({
        defaultCurrent: 1,
        rowsFrom: 0,
        rowsUpTo: this.state.rowsPerPage,
        firstPage: true,
        lastPage: false,
      });
    }
  };
  render() {
    return (
      <div style={{ background: "#F8F8F8" }}>
        <TableHeader {...this.state} />
        <div style={{ height: 540, overflowY: "auto" }}>
          {this.state.employeeTeam
            .slice(this.state.rowsFrom, this.state.rowsUpTo)
            .map((ele, index) => (
              <div key={index} style={{ marginBottom: 6 }}>
                <EmployeeTeamManagement
                  {...ele}
                  onClickFavorite={(empId) =>
                    this.onClickFavorite(empId, index)
                  }
                />
              </div>
            ))}
        </div>
        <div>
          <Pagination
            {...this.state}
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
