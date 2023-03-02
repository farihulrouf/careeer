import React, { Component } from "react";
import styled from "styled-components";
import DefaultPic from "../../../assets/images/defaultProfile.svg";
import ManagerEmployeeGeneralFeedbackList from "./ManagerEmployeeGeneralFeedbackList";
import UserGroup from "../../../assets/images/userGroup.svg";
import getCurrentMonthYearOfTimeStamp from "../../../core/lib/GetCurrentMonthYearOfTimeStamp";
import Button from "../../Button";
import { COLORS } from "../../../theme";
import InputField from "../../InputField";
import { Link } from "react-router-dom";
const Div = styled.div`
  box-shadow: 1px 4px 12px #00000027;
  background: #ffffff;
  border-radius: 8px;
  padding: 1.3em 1.6em 8em 1.6em;
  height: 100%;
  font-family: "Open Sans Regular";
  color: #303030;
  .manager-general-feedback-title-container {
    display: flex;
    justify-content: space-between;
  }
  .manager-general-feedback-title {
    color: #303030;
    font-size: 1em;
    font-family: "Open Sans Semibold";
    display: flex;
    align-items: center;
  }
  #feedback-view-label {
    color: #f46773;
    text-decoration: underline;
    cursor: pointer;
    font-size: 0.875em;
    letter-spacing: 0.03em;
  }
  #employee-image {
    height: 3.429em;
    width: 3.429em;
    border-radius: 50%;
    margin-right: 1em;
    background: ${COLORS.GREY_T_96};
  }
  #employee-image-container {
    display: flex;
    font-size: 0.875em;
    align-items: center;
    margin-top: 2em;
    margin-bottom: 3em;
  }
  #manager-note-container {
    display: grid;
    grid-template-columns: 0.4fr 1fr;
    margin-top: 4em;
    font-size: 0.875em;
  }
  #employee-designation {
    color: #767676;
  }
`;

class ManagerEmployeeGeneralFeedbackListGroup extends Component {
  state = {};
  render() {
    const managerGeneralFeedback = this.props.generalFeedbackGroup;
    return (
      <Div>
        {JSON.stringify(managerGeneralFeedback) !== "{}" &&
        this.props.requiredEmployeeDetails &&
        this.props.requiredEmployeeDetails.status !== -1 ? (
          <>
            <div className="manager-general-feedback-title-container">
              <div className="manager-general-feedback-title">
                {this.props.title || ""}
                &emsp; &ensp;
                <span
                  style={{
                    fontSize: "0.875em",
                    fontFamily: "Open Sans Regular",
                  }}
                >
                  {getCurrentMonthYearOfTimeStamp(
                    this.props.requiredEmployeeDetails.timeStamp
                  ) || ""}
                </span>
              </div>
              <Link
                to={`/manager/feedback/all-feedback/${this.props.selectedEmployeeId}`}
              >
                <div id="feedback-view-label">View all feedback</div>
              </Link>
            </div>
            <div id="employee-image-container">
              <img
                src={managerGeneralFeedback.profilePicture || DefaultPic}
                id="employee-image"
                alt="pic"
              />

              <div>
                <div id="employee-name">
                  {(managerGeneralFeedback.firstName || "") +
                    " " +
                    `${managerGeneralFeedback.middleName || ""}` +
                    " " +
                    (managerGeneralFeedback.lastName || "")}
                </div>
                <div id="employee-designation">
                  {managerGeneralFeedback.designation}
                </div>
              </div>
            </div>
            <div style={{ width: "93%" }}>
              <ManagerEmployeeGeneralFeedbackList
                multipleskillRating={managerGeneralFeedback.feedback}
                slideChangeHandler={this.props.slideChangeHandler}
              />
            </div>
            <div id="manager-note-container">
              <div>
                <label>
                  Add Note
                  <sup
                    style={{
                      color: "red",
                      opacity: this.props.generalFeedbackNote ? 0 : 1,
                      transition: "0.5s",
                      fontSize: "1.2em",
                    }}
                  >
                    *
                  </sup>
                </label>
              </div>
              <div>
                <InputField
                  type="textArea"
                  placeHolder="Type here"
                  error={this.props.isValid}
                  required={true}
                  onChange={this.props.managerGeneralFeedbackNote}
                  value={this.props.generalFeedbackNote}
                  rows="2.5"
                />
              </div>
            </div>
          </>
        ) : (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "cenetr" }}>
              <div
                style={{
                  flex: 1,
                  fontSize: "1em",
                  fontFamily: "Open Sans Semibold",
                }}
              >
                Employee Feedback
              </div>
              {this.props.requiredEmployeeDetails &&
              this.props.requiredEmployeeDetails.status === -1 ? (
                <Link
                  to={`/manager/feedback/all-feedback/${this.props.selectedEmployeeId}`}
                >
                  <span
                    style={{
                      color: "#F46773",
                      fontSize: "0.875em",
                      cursor: "pointer",
                    }}
                  >
                    <u>View all feedback</u>
                  </span>
                </Link>
              ) : (
                ""
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
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
                {this.props.requiredEmployeeDetails &&
                this.props.requiredEmployeeDetails.status === -1
                  ? "No Feedback Pending"
                  : "No Employee Feedback Selected"}
              </div>
            </div>
          </div>
        )}
        <div
          id="button-container"
          style={{
            display:
              this.props.requiredEmployeeDetails &&
              this.props.requiredEmployeeDetails.status !== -1
                ? ""
                : "none",
          }}
        >
          <div
            className="button"
            onClick={() =>
              this.props.submitGeneralFeedback(
                this.props.requiredEmployeeDetails &&
                  this.props.requiredEmployeeDetails.timeStamp
              )
            }
          >
            <Button
              label="Submit"
              styles={{
                color: "#ffffff",
                backgroundColor: "#FF808B",
                border: "#FF808B",
                height: "40px",
              }}
            />
          </div>
        </div>
      </Div>
    );
  }
}

export default ManagerEmployeeGeneralFeedbackListGroup;
