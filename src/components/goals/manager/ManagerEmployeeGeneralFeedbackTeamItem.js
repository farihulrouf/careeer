import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import DefaultPic from "../../../assets/images/defaultProfile.svg";
import { COLORS } from "../../../theme";

const Div = styled.div`
  display: flex;
  align-items: center;
  height: inherit;
  font-family: inherit;
  position: relative;
  justify-content: space-between;
  #employee-team-container {
    display: flex;
    font-size: 0.875em;
    align-items: center;
    letter-spacing: 0.02em;
    line-height: 1.5em;
  }
  #employee-image {
    height: 3.429em;
    width: 3.429em;
    border-radius: 50%;
    margin-right: 1em;
    background: ${COLORS.GREY_T_96};
  }

  #employee-designation {
    color: #767676;
  }
  #check-icon {
    color: ${(props) =>
      props.employeeDetails.pendingFeedbackStatus === 1
        ? "#fc5e58"
        : "#00ad68"};
    font-size: 1.291em;
    margin-bottom: 1%;
  }
  #inform-icon {
    height: 1em;
    width: 1em;
  }
`;

class ManagerEmployeeGeneralFeedbackTeamItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolStatus: false,
    };
  }

  showToolTip = () => {
    this.setState({ toolStatus: true });
  };
  hideToolTip = () => {
    this.setState({ toolStatus: false });
  };
  render() {
    const employeeDetails = this.props.employeeDetails;
    return (
      <Div
        employeeDetails={employeeDetails || ""}
        style={this.props.style || null}
      >
        <div id="employee-team-container">
          <img
            src={employeeDetails.profilePicture || DefaultPic}
            id="employee-image"
            alt="pic"
          />

          <div>
            <div id="employee-name">
              {(employeeDetails.firstName || "") +
                " " +
                `${employeeDetails.middleName || ""}` +
                " " +
                (employeeDetails.lastName || "")}
            </div>
            <div id="employee-designation">{employeeDetails.designation}</div>
          </div>
        </div>

        {employeeDetails.pendingFeedbackStatus !== undefined && (
          <div
            id="check-icon"
            style={{
              visibility:
                employeeDetails.pendingFeedbackStatus === 0
                  ? "hidden"
                  : "visible",
            }}
          >
            <FontAwesomeIcon
              icon={
                employeeDetails.pendingFeedbackStatus === 1
                  ? faExclamationCircle
                  : faCheckCircle
              }
            />
          </div>
        )}
      </Div>
    );
  }
}

export default ManagerEmployeeGeneralFeedbackTeamItem;
