import React, { Component } from "react";
import styled from "styled-components";
import ManagerEmployeeGeneralFeedbackTeamItem from "./ManagerEmployeeGeneralFeedbackTeamItem.js";
import SearchTextBox from "../../SearchTextBox";
import UserGroup from "../../../assets/images/userGroup.svg";
import "../../../assets/css/ScrollBarDesign.css";
const Div = styled.div`
  box-shadow: 1px 4px 12px #00000027;
  background: #ffffff;
  height: 700px;
  font-family: "Open Sans Regular";
  border-radius: 8px;
  padding: 1.3em 0;
  flex-direction: column;
  display: flex;
  #team-list-title {
    color: #303030;
    font-family: "Open Sans Semibold";
    padding-left: 1.6em;
  }
  #team-list-employee-container {
    overflow-y: auto;
    margin-bottom: 1.5em;
    min-height: 300px;
    max-height: 600px;
    margin-right: 0.675em;
  }
  .team-list-employee {
    width: 100%;
    font-size: 1em;
    height: 5em;
    display: flex;
    cursor: pointer;
  }
`;

class ManagerEmployeeGeneralFeedbackTeamItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const teamList = this.props.teamList;
    return (
      <Div>
        <div id="team-list-title">{this.props.title || ""}</div>
        <div
          style={{
            width: "92%",
            fontFamily: "Open Sans Regular",
            fontSize: "0.875em",
            padding: "1.5em 1.9em",
          }}
        >
          <SearchTextBox
            options={this.state.searchOptions || []}
            placeHolder="Search employee"
            value={this.props.searchValue}
            style={{
              color: {
                hover: "#F4A6AE",
              },
            }}
            keybordKeyHandler={null}
            searchInputHandler={(e) => this.props.searchEmployee(e)}
          />
        </div>
        {teamList.length > 0 ? (
          <>
            <div id="team-list-employee-container" className="scroll-container">
              {teamList.map((eachEmployee, index) => (
                <div
                  className="team-list-employee"
                  style={{
                    background:
                      this.props.selectedEmployee === index
                        ? "rgb(247, 247, 251)"
                        : "#fff",
                  }}
                  onClick={() =>
                    this.props.employeeSelectHandler(eachEmployee, index)
                  }
                  key={index}
                >
                  <div
                    className="team-list-side-bar"
                    style={{
                      border:
                        this.props.selectedEmployee === index
                          ? "2.5px solid #4d4cac"
                          : "2.5px solid #fff",
                    }}
                  ></div>
                  <div
                    style={{
                      flex: 1,
                      height: "inherit",
                      paddingLeft: "1em",
                      paddingRight: "1.5em",
                    }}
                  >
                    <ManagerEmployeeGeneralFeedbackTeamItem
                      employeeDetails={eachEmployee}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
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
                textAlign: "center",
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
                No Team List
              </div>
            </div>
          </div>
        )}
      </Div>
    );
  }
}

export default ManagerEmployeeGeneralFeedbackTeamItemList;
