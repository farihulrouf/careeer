import React, { Component } from "react";
import styled from "styled-components";
import { getEmployeeDetails } from "../core/apiClient/organization/organizationClient";
import { decryptData } from "../utils/encryptDecrypt";
import Button from "../components/Button";

const Div = styled.div`
  display: block;
  position: fixed;
  z-index: 25;
  padding-top: 7.5%;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  font-family: Open Sans Regular;
  .modal-content {
    position: relative;
    background: #ffffff;
    boxshadow: 0px 3px 6px #00000029;
    margin: auto;
    padding: 24px;
    border: 1px solid #888;
    width: ${(props) => (props.width === undefined ? "25%" : props.width)};
    border-radius: 13px;
    box-shadow: 1px 4px 12px #00000027;
  }
  .title {
    font-family: Open Sans Semibold;
    font-size: 20px;
  }
  .textAlign {
    text-align: center;
  }
`;

class HelpPopUpDisplay extends Component {
  state = {
    employee: {
      firstName: "",
      lastName: "",
      designation: "",
    },
  };
  componentDidMount = () => {
    this.loadEmployeeDetails();
  };
  loadEmployeeDetails = async () => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = this.props.selectedUser
        ? this.props.selectedUser
        : decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await getEmployeeDetails(orgId, employeeId, {
          Authorization: token,
        });
        if (status >= 200 && status < 300) {
          console.log(data);
          this.setState({
            employee: data.professionalDetails,
          });
          console.log(this.state.employee.firstName,"employee")
        }

        document.toggleLoading();
      } catch (error) {
        document.message.error(
          "Unable to fetch details, please try after sometime"
        );
        document.toggleLoading();
      }
    }
  };
  render() {
    return (
      <Div className="popUpModelView" width={this.props.width}>
        <div className="modal-content">
          <div>
            <div className="textAlign">
              <span className="title">
                <span>Hi {this.state.employee?.firstName}</span>
                <br />
    <span>Welcome To Your Career Portal </span>
              </span>
              <br />
              <br />
            </div>
            <div className="textAlign">
              <span
                style={{
                  fontSize: 14,
                  color: "#767676",
                }}
              >
                Track your career and improve your performance today.
              </span>
              <br />
              <br />
            </div>
            <div className="textAlign">
              <span
                style={{
                  fontSize: 20,
                  fontFamily: "Open Sans Semibold",
                }}
              >
                ALL THE BEST
              </span>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 14,
                }}
              >
                <div
                  style={{ width: "80px" }}
                  onClick={() => this.props.popUpHandler()}
                >
                  <Button
                    label="OK"
                    styles={{
                      color: "#FFFFFF",
                      backgroundColor: "#FF808B",
                      border: "#FF808B",
                      height: "34px",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Div>
    );
  }
}

export default HelpPopUpDisplay;
