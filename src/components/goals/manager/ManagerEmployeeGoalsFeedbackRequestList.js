import React, { Component } from "react";
import ManagerEmployeeGoalsFeedbackRequestItem from "./ManagerEmployeeGoalsFeedbackRequestItem";
import UserGroup from "../../../assets/images/userGroup.svg";
import SearchTextBox from "../../SearchTextBox";
const styles = {
  RequestCard: {
    height: "100%",
    width: "100%",
  },
  RequestMainCard: {
    height: "100%",
    background: "#FFFFFF",
    borderRadius: "8px",
    opacity: "1",
  },
  RequestHeading: {
    fontFamily: "Open Sans Semibold",
    fontSize: "1em",
    color: "#303030",
    opacity: "1",
    padding: "20px 25px 20px 25px",
  },
  RequestSearch: {
    padding: "0px 60px 25px 25px",
  },
  RequestDetails: {
    height: 500,
    overflowY: "auto",
  },
};

export default class EmployeeCareerApprovalSidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: this.props.selectedIndex,
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      selectedIndex: nextProps.selectedIndex,
    };
  }

  onClickList = (index, employeeId) => {
    this.setState(
      {
        selectedIndex: index,
      },
      () => this.props.onClickList(index, employeeId)
    );
  };

  render() {
    return (
      <div style={styles.RequestCard}>
        <div style={styles.RequestMainCard}>
          <div style={styles.RequestHeading}>Feedback Requests</div>
          <div style={styles.RequestSearch}>
            <SearchTextBox
              options={this.state.searchOptions || []}
              placeHolder="Search employee"
              value={this.props.feedbackSeachKey}
              style={{
                color: {
                  hover: "#F4A6AE",
                },
              }}
              keybordKeyHandler={null}
              searchInputHandler={(e) =>
                this.props.searchRequestFeedBackEmployee(e)
              }
            />
          </div>
          {this.props.feedbackRequestSearchResults.length !== 0 ? (
            <div className="scroll-container" style={styles.RequestDetails}>
              {this.props.feedbackRequestSearchResults.map((ele, index) => (
                <div
                  key={index}
                  onClick={() => this.onClickList(index, ele.employeeId)}
                >
                  <div>
                    <div>
                      <ManagerEmployeeGoalsFeedbackRequestItem
                        firstName={ele.firstName}
                        middleName={ele.middleName}
                        lastName={ele.lastName}
                        profilePicture={ele.profilePicture}
                        designation={ele.designation}
                        createdDate={ele.createdDate}
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
                      fontSize: "1.126em",
                    }}
                  >
                    No Pending Feedback Requests
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
