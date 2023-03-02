import React, { Component } from "react";
import RowsSelector from "./RowsSelector";
import ActiveLeftArrow from "../assets/svg/activeLeftDoubleArrow.svg";
import ActiveRightArrow from "../assets/svg/activeRightDoubleArrow.svg";
import DisabledLeftArrow from "../assets/svg/disabledLeftDoubleArrow.svg";
import DisabledRightArrow from "../assets/svg/disabledRightDoubleArrow.svg";

import "antd/dist/antd.css";
import { Pagination } from "antd";
const styles = {
  rowsSelector: {
    width: "60px",
    borderRadius: "4px",
    color: "#303030",
    marginLeft: "14px",
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
class TablePagination extends Component {
  render() {
    return (
      <div style={styles.paginationContainer}>
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div>Rows per page</div>
          <div style={styles.rowsSelector}>
            <RowsSelector
              NoOfRows={this.props.NoOfRows}
              selected={this.props.rowsPerPage}
              onClick={this.props.optionHandler}
              getKeyPress={this.props.optionHandler}
              style={{
                color: {
                  hover: "#8359C1",
                  selectedBg: "#8359C1",
                  optionHover: "#C4B0E2",
                  selectedFont: "#ffffff",
                },
              }}
            />
          </div>
          {this.props.userMgmt ? (
            <div
              style={{
                marginLeft: "14px",
              }}
            >
              {this.props.rowsPerPage * (this.props.page - 1) + 1}-
              {this.props.rowsPerPage * this.props.page >
              this.props.totalEmployeeCount
                ? this.props.totalEmployeeCount
                : this.props.rowsPerPage * this.props.page}{" "}
              of {this.props.totalEmployeeCount}
            </div>
          ) : (
            <div
              style={{
                marginLeft: "14px",
              }}
            >
              {this.props.rowsFrom + 1}-
              {this.props.rowsUpTo > this.props.totalEmployeeCount
                ? this.props.totalEmployeeCount
                : this.props.rowsUpTo}{" "}
              of {this.props.totalEmployeeCount}
            </div>
          )}
        </div>
        <div style={styles.pagination}>
          <div>
            {this.props.firstPage && (
              <img
                src={DisabledLeftArrow}
                style={{ marginBottom: "2px", cursor: "not-allowed" }}
                alt="arrowIcon"
              />
            )}
            {!this.props.firstPage && (
              <img
                onClick={() => this.props.jumpPageHandler("firstPage")}
                src={ActiveLeftArrow}
                style={{ marginBottom: "2px", cursor: "pointer" }}
                alt="icon"
              />
            )}
          </div>
          <div>
            <Pagination
              current={this.props.defaultCurrent}
              total={this.props.totalEmployeeCount}
              pageSize={this.props.rowsPerPage}
              onChange={this.props.PaginationHandler}
              showSizeChanger={false}
            />
          </div>
          <div>
            {this.props.lastPage && (
              <img
                src={DisabledRightArrow}
                style={{ marginBottom: "2px", cursor: "not-allowed" }}
                alt="icon"
              />
            )}
            {!this.props.lastPage && (
              <img
                onClick={() => this.props.jumpPageHandler("lastPage")}
                src={ActiveRightArrow}
                style={{ marginBottom: "2px", cursor: "pointer" }}
                alt="icon"
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TablePagination;
