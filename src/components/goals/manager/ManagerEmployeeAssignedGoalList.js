import React, { Component } from "react";
import ManagerEmployeeAssignedGoalItem from "./ManagerEmployeeAssignedGoalItem";
import SearchTextBox from "../../SearchTextBox.js";
import { Drawer } from "antd";
import FilterIcon from "../../../assets/images/filter.svg";
import "antd/dist/antd.css";
import "../../../assets/css/AntdExternal.css";
import UserGroup from "../../../assets/images/userGroup.svg";
import ManagerAssignGoal from "./ManagerAddEmployeeGoalDrawer";

const styles = {
  RequestDetails: {
    height: 500,
    overflowY: "auto",
  },
};

class ManagerEmployeeAssignedGoalList extends Component {
  constructor(props) {
    super(props);
    this.state = { searchValue: "", showDrawer: false, employeeId: "" };
  }

  drawerHandler = () => {
    this.setState({ showDrawer: false, employeeId: "" });
  };
  setGoalHandler = (employeeId) => {
    this.setState({ showDrawer: true, employeeId });
  };
  searchInputHandler = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  render() {
    return (
      <div
        style={{
          background: "#FFFFFF ",
          boxShadow: "1px 4px 12px #00000027",
          borderRadius: "8px",
          padding: "1em 1.2em",
          fontFamily: "Open Sans Regular",
          color: "#303030",
        }}
      >
        <div style={{ display: "flex", paddingBottom: "1em" }}>
          <div
            style={{
              color: "#767676",
              paddingTop: "0.875em",
              fontSize: "0.875em",
            }}
          >
            {(this.props.managerEmpGoalDetails.count || "") + " Employees"}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              flex: 1,
              fontSize: "0.875em",
            }}
          >
            <div
              style={{
                background: " #F7F7F751",
                border: "1px solid #E2E2E2",
                borderRadius: "4px",
                height: "40px",
                width: "12%",
                color: "#767676",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "1em",
              }}
            >
              Filter By
              <img
                src={FilterIcon}
                alt="icon"
                style={{
                  height: "10px",
                  width: "13px",
                  marginLeft: "10px",
                }}
              />
            </div>
            <div style={{ width: "25%" }}>
              <SearchTextBox
                placeHolder="Search employee"
                value={this.props.searchKey || ""}
                style={{
                  color: {
                    hover: "#F4A6AE",
                  },
                }}
                keybordKeyHandler={null}
                searchInputHandler={(e) => this.props.searchForEmployee(e)}
              />
            </div>
          </div>
        </div>
        {this.props.managerEmpGoalDetails.employeeDetails &&
          this.props.managerEmpGoalDetails.employeeDetails.length !== 0 ? (
            <div>
              {this.props.managerEmpGoalDetails.employeeDetails &&
                this.props.managerEmpGoalDetails.employeeDetails.map(
                  (eachEmployee, id) => (
                    <div key={id}>
                      <ManagerEmployeeAssignedGoalItem
                        employeeId={eachEmployee.employeeId}
                        firstName={eachEmployee.firstName}
                        middleName={eachEmployee.middleName}
                        lastName={eachEmployee.lastName}
                        profilePicture={eachEmployee.profilePicture}
                        designation={eachEmployee.designation}
                        goals={eachEmployee.goals}
                        onClickGoalCard={() =>
                          this.props.onClickGoalCard(
                            (eachEmployee.firstName || "") +
                            " " +
                            `${eachEmployee.middleName || ""}` +
                            " " +
                            (eachEmployee.lastName || ""),
                            eachEmployee.employeeId
                          )
                        }
                        setGoalHandler={() =>
                          this.setGoalHandler(eachEmployee.employeeId)
                        }
                      />
                    </div>
                  )
                )}
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
                    No direct reports are present.
                </div>
                </div>
              </div>
            </div>
          )}
        <Drawer
          title={null}
          placement="right"
          closable={false}
          onClose={this.drawerHandler}
          visible={this.state.showDrawer}
          key="right"
          width="526px"
          className="custom-drawer"
        >
          <div
            style={{
              fontSize: "16px",
              width: "100%",
            }}
          >
            {this.state.showDrawer && (
              <ManagerAssignGoal
                employeeId={this.state.employeeId}
                drawerHandler={this.drawerHandler}
                loadDetails={this.props.loadEmployeeAssignedGoalsDetails}
              />
            )}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default ManagerEmployeeAssignedGoalList;
