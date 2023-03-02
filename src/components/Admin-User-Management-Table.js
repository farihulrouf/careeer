import React, { Component } from "react";
import AdminUserManagement from "./Admin-User-Management";
import "antd/dist/antd.css";
import "../assets/css/Pagination.css";
import Pagination from "./pagination";
const styles = {
  mainContainer: {
    width: "100%",
    height: "50px",
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
    color: "#303030",
    fontFamily: "Open Sans Regular",
  },
  squareIcon: {
    flex: 0.1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  nameAndProfile: { flex: 0.8, display: "flex", alignItems: "center" },
  designation: { flex: 0.7, paddingRight: 30 },
  department: { flex: 0.6 },
  score: { flex: 0.4 },
  role: { flex: 0.5 },
  date: { flex: 0.5 },
  status: { flex: 0.32 },
  dotsIcon: { flex: 0.15 },
  rowsSelector: {
    width: "60px",
    borderRadius: "4px",
    color: "#303030",
    marginLeft: "14px",
  },
  checkBox: {
    fontSize: "20px",
    color: "#B2B2B2",
    background: "#F7F7F7",
  },
  paginationContainer: {
    height: "50px",
    display: "flex",
    alignItems: "center",
  },
  pagination: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
};
class AdminUserManagementTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData || [],
      NoOfRows: [15, 30, 60],
      rowsFrom: 0,
      page: this.props.page,
      defaultCurrent: this.props.page,
      pageSize: null,
      rowsPerPage: this.props.rowsPerPage,
      rowsUpTo: null,
      lastPage: false,
      firstPage: true,
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    return {
      userData: props.userData,
      defaultCurrent: props.page,
      page: props.page,
      rowsPerPage: props.rowsPerPage,
      // rowsFrom: props.page === 1 ? 0 : state.rowsFrom,
      // rowsUpTo: props.page === 1 ? state.rowsPerPage : state.rowsUpTo,
      lastPage: props.totalEmployeeCount > state.rowsUpTo ? false : true,
      firstPage: props.page === 1 ? true : false,
    };
  };
  componentDidMount = () => {
    this.setState({
      rowsUpTo: this.state.rowsPerPage,
      pageSize: this.state.rowsPerPage,
    });
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
        () => this.props.paginationHandler(option, 1)
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
        () => this.props.paginationHandler(option, 1)
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
        <div style={styles.mainContainer}>
          <div style={styles.squareIcon}></div>
          <div style={styles.nameAndProfile}>
            <div>Name</div>
          </div>
          <div style={styles.designation}>Designation</div>
          <div style={styles.department}>Department</div>
          <div style={styles.score}>Skill Score</div>
          <div style={styles.date}>Employee Type</div>
          <div style={styles.status}>
            <div style={{ paddingLeft: "14px" }}>Status</div>
          </div>
          <div style={styles.dotsIcon}></div>
        </div>
        <div style={{ height: "480px", overflowY: "auto" }}>
          {this.state.userData.map((ele, index) => (
            <div
              key={index}
              style={{
                marginBottom: "8px",
                background: this.state.bgColor,
              }}
            >
              <AdminUserManagement
                onClickOfList={this.props.onClickOfList}
                {...ele}
                index={index}
                statusHandler={(e, id) => this.props.statusHandler(ele, e, id)}
              />
            </div>
          ))}
        </div>
        <div>
          <Pagination
            rowsPerPage={this.state.rowsPerPage}
            rowsFrom={this.props.page === 1 ? 0 : this.state.rowsFrom}
            rowsUpTo={
              this.props.page === 1
                ? this.state.rowsPerPage
                : this.state.rowsUpTo
            }
            {...this.state}
            {...this.props}
            tableData={this.state.userData}
            PaginationHandler={this.paginationHandler}
            jumpPageHandler={this.jumpPageHandler}
            optionHandler={this.optionHandler}
            userMgmt={true}
          />
        </div>
      </div>
    );
  }
}

export default AdminUserManagementTable;
