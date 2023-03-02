import React from "react";
import RewardTableRow from "./approvalRewardTableContents";
import Pagination from "../../pagination";
import RewardTableHeader from "./rewardTableHeader";
import NoRewardDataPage from "./noRewardDataPage.js";

export default class ApprovalrewardTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: {
        fontFamily: "Open Sans Regular",
        fontSize: "1em",
        color: "#303030",
        subColor: "#767676",
      },
      rewardTableHeadings: [
        { title: "Name", flex: 0.76 },
        { title: "Department", flex: 0.45 },
        { title: "Total Badges", flex: 0.45 },
        { title: "Earned Points", flex: 0.35 },
        { title: "Reward Details", flex: 0.6 },
      ],
      rewardTable: this.props.rewardTable || [],
      NoOfRows: [15, 30, 60],
      rowsFrom: 0,
      page: 1,
      defaultCurrent: 1,
      pageSize: null,
      rowsPerPage: 15,
      rowsUpTo: 15,
      lastPage: false,
      firstPage: true,
    };
  }

  static getDerivedStateFromProps = (props, state) => {
    return {
      tableData: props.rewardTable,
    };
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
    let noOfRecords = this.state.rewardTable.length;
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
        rowsUpTo: this.state.rewardTable.length,
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
      let noOfRecords = this.state.rewardTable.length;
      let rowsPerPage = this.state.rowsPerPage;
      let lastPage = Math.ceil(noOfRecords / rowsPerPage);
      this.setState({
        defaultCurrent: lastPage,
        rowsFrom: (lastPage - 1) * this.state.rowsPerPage,
        rowsUpTo: this.state.rewardTable.length,
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
        {this.props.rewardTable.length === 0 ? (
          <NoRewardDataPage />
        ) : (
          <>
            <RewardTableHeader {...this.state} {...this.props} />

            <div style={{ height: "100%", overflowY: "auto" }}>
              {this.props.rewardTable
                .slice(this.state.rowsFrom, this.state.rowsUpTo)
                .map((eachRewardDetails, index) => (
                  <div key={index} style={{ marginBottom: 6 }}>
                    <RewardTableRow
                      {...eachRewardDetails}
                      {...this.state}
                      status={eachRewardDetails.status}
                      onClickCheckbox={() =>
                        this.props.selectedEmployee(eachRewardDetails, index)
                      }
                    />
                  </div>
                ))}
            </div>

            <div>
              <Pagination
                {...this.state}
                tableData={this.props.rewardTable}
                PaginationHandler={this.paginationHandler}
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
