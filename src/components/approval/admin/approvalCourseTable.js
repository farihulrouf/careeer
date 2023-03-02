import React, { Component } from "react";
import CourseTableRow from "./approvalCourseTableContents";
import Pagination from "../../pagination";
import "antd/dist/antd.css";
import "../../../assets/css/Pagination.css";
import CourseTableHeader from "./courseTableHeader";
import NoCourseDataPage from "./noCourseDataPage.js";

class ApprovalCourseTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: {
        fontFamily: "Open Sans Regular",
        fontSize: "1em",
        color: "#303030",
        subColor: "#767676",
      },
      courseTableHeadings: [
        { title: "Department", flex: 0.6 },
        { title: "Skill Score", flex: 0.55 },
        { title: "Course Name", flex: 1 },
        { title: "Amount", flex: 0.6 },
      ],
      NoOfRows: [15, 30, 60],
      rowsFrom: 0,
      page: this.props.page,
      defaultCurrent: this.props.page,
      pageSize: null,
      rowsPerPage: 15,
      rowsUpTo: null,
      lastPage: false,
      firstPage: true,
      count: this.props.count,
      courseTable: this.props.courseTable || [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      courseTable: props.courseTable,
      defaultCurrent: props.page,
      page: props.page,
      rowsFrom: props.page === 1 ? 0 : state.rowsFrom,
      rowsUpTo: props.page === 1 ? state.rowsPerPage : state.rowsUpTo,
      lastPage: props.count > state.rowsUpTo ? false : true,
      firstPage: props.page === 1 ? true : false,
    };
  }

  optionHandler = (e, index) => {
    e.preventDefault();
    let rowsUpTo, option;
    if (this.props.count > this.state.NoOfRows[index]) {
      rowsUpTo = this.state.NoOfRows[index];
    } else {
      rowsUpTo = this.props.count;
    }
    option = this.state.NoOfRows[index];
    let noOfRecords = this.props.count;
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
  PaginationHandler = (page, pageSize) => {
    let noOfRecords = this.props.count;
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
        defaultCurrent: lastPage,
        rowsFrom: (lastPage - 1) * this.state.rowsPerPage,
        rowsUpTo: this.props.count,
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
      let noOfRecords = this.props.count;
      let rowsPerPage = this.state.rowsPerPage;
      let lastPage = Math.ceil(noOfRecords / rowsPerPage);
      this.setState({
        defaultCurrent: lastPage,
        rowsFrom: (lastPage - 1) * this.state.rowsPerPage,
        rowsUpTo: this.props.count,
        firstPage: false,
        lastPage: true,
      });
      this.props.paginationHandler(this.state.rowsPerPage, lastPage);
    } else {
      this.setState({
        defaultCurrent: 1,
        rowsFrom: 0,
        rowsUpTo: this.state.rowsPerPage,
        firstPage: true,
        lastPage: false,
      });
      this.props.paginationHandler(this.state.rowsPerPage, 1);
    }
  };

  render() {
    return (
      <div style={{ background: "#F8F8F8" }}>
        {this.state.courseTable.length === 0 ? (
          <NoCourseDataPage {...this.props} />
        ) : (
          <>
            <CourseTableHeader {...this.state} {...this.props} />

            <div
              style={{
                height: "480px",
                overflowY: "auto",
                paddingRight: "5px",
              }}
            >
              {this.state.courseTable.map((eachCourseDetails, index) => (
                <div
                  key={eachCourseDetails.approvalId||eachCourseDetails.id}
                  style={{ marginBottom: 6 }}
                >
                  <CourseTableRow
                    {...eachCourseDetails}
                    {...this.state}
                    {...this.props}
                    status={eachCourseDetails.status}
                    onClickCheckbox={() =>
                      this.props.selectedEmployee(eachCourseDetails, index)
                    }
                  />
                </div>
              ))}
            </div>
            <div>
              <Pagination
                {...this.state}
                totalEmployeeCount={this.props.count}
                tableData={this.state.courseTable}
                PaginationHandler={this.PaginationHandler}
                jumpPageHandler={this.jumpPageHandler}
                optionHandler={this.optionHandler}
              />
            </div>
          </>
        )}
      </div>
    );
  }
}
export default ApprovalCourseTable;
