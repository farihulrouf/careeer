import React, { Component } from "react";
import EmployeeCareerApprovalsItem from "./EmployeeCareerApprovalsItem";
import UserGroup from "../assets/images/userGroup.svg";
import SearchTextBox from "./SearchTextBox";
const styles = {
  RequestCard: {
    height: "100%",
    width: "100%",
  },
  RequestMainCard: {
    height: "100%",
    background: "#FFFFFF",
    boxShadow: "1px 4px 12px #00000027",
    borderRadius: "8px",
    opacity: "1",
  },
  RequestHeading: {
    fontFamily: "Open Sans Semibold",
    fontSize: "1em",
    color: "#303030",
    opacity: "1",
    padding: "18px 18px 10px 18px",
  },
  RequestSearch: {
    padding: "10px 28px 10px 18px",
    fontSize: "0.85em",
  },
  RequestDetails: {
    height: "450px",
    overflowY: "auto",
  },
};

export default class EmployeeCareerApprovalSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: this.props.selectedIndex,
      searchInput: "",
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      selectedIndex: nextProps.selectedIndex,
    };
  }
  requestHandler = (index, employeeId, careerPathApprovalId) => {
    this.setState(
      {
        selectedIndex: index,
      },
      () => this.props.onClickList(employeeId, careerPathApprovalId, index)
    );
  };
  //TO-DO: Search and select need to do
  singleSearchHandler = (event) => {
    this.setState({ searchInput: event.target.value });
  };
  //TO-DO: Search and select need to do
  inputChangeHandler = (e) => { };
  render() {
    return (
      <div style={styles.RequestCard}>
        <div style={styles.RequestMainCard}>
          <div style={styles.RequestHeading}>Career Path Requests</div>
          <div style={styles.RequestSearch}>
            <SearchTextBox
              options={this.state.searchOptions || []}
              placeHolder="Search employee"
              value={this.state.searchInput}
              style={{
                color: {
                  hover: "#F4A6AE",
                },
              }}
              keybordKeyHandler={null}
              searchInputHandler={this.singleSearchHandler}
            />
          </div>
          {this.props.pathRequestArray.length !== 0 ? (
            <div style={styles.RequestDetails}>
              {this.props.pathRequestArray.map((reqele, index) => (
                <div
                  key={index}
                  onClick={() =>
                    this.requestHandler(
                      index,
                      reqele.employeeId,
                      reqele.careerPathApprovalId
                    )
                  }
                >
                  <div>
                    <div>
                      <EmployeeCareerApprovalsItem
                        firstName={reqele.firstName}
                        middleName={reqele.middleName}
                        lastName={reqele.lastName}
                        profilePicture={reqele.profilePicture}
                        designation={reqele.designation}
                        createdAt={reqele.createdAt}
                        index={index}
                        selectedIndex={this.state.selectedIndex}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
              <div style={styles.RequestDetails}>
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={UserGroup}
                      alt="data"
                      style={{ height: 135, width: 135 }}
                    />
                    <div
                      style={{
                        marginTop: 12,
                        fontFamily: "Open Sans Semibold",
                        fontSize: "1em",
                        textAlign: "center",
                      }}
                    >
                      No Pending Career Path Requested
                  </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}
