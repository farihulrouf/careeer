import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "antd/dist/antd.css";
import { Modal } from "antd";
import Button from "./Button";
import Close from "../assets/images/closeImage.svg";
import {getEmployeeDetails,} from "../core/apiClient/organization/organizationClient"; 
import { decryptData } from "../utils/encryptDecrypt";
const Div = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 25px;
  box-shadow: 0px 4px 10px 2px #b0d6e048;
  font-family: Open Sans Regular;
  color: #303030;
  display: flex;
  flex-direction: column;
  .inner-container {
    flex: 1;
    padding: 4.5% 1.5%;
    overflow-y: hidden;
  }
  .title {
    text-align: center;
    font-family: Open Sans Semibold, Regular;
    font-size: 0.875em;
  }
  .designation-container {
    margin-top: 2%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 95%;
    &::-webkit-scrollbar {
      width: 3px;
      background-color: #ffffff;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #bbb9b9;
      border-radius: 20px;
    }
    &::-webkit-scrollbar-corner {
      background-color: transparent;
    }
  }
  .designation-individual {
    margin: 3% auto;
    display: flex;
    justify-content: center;
  }
  .designation-lists {
    width: 90%;
    min-height: 36px;
    display: flex;
    align-items: center;
    background-color: #d5defd;
    border-radius: 30px;
    box-shadow: 0px 3px 5px #afafaf29;
  }
  .designation-title {
    flex: 1;
    padding-left: 15%;
    color: #303030;
    font-size: 0.775em;
  }
  .check-Icon {
    margin-right: 12px;
    font-size: 1em;
    @media (max-width: 768px) {
      font-size: 0.875em;
    }
  }
  .toolTip {
    width: 200px;
    height: 67px;
    right: -17px;
    top: 80%;
    opacity: 1;
    border-radius: 3px;
    display: flex;
    background-color: tan;
  }
  .Info-icon {
    height: 16px;
    width: 3.34%;
    margin: auto 0px;
    margin-left: 2%;
    cursor: pointer;
  }
  .designation-tool-tip {
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s ease-out;
  }
`;

class CareerpathDesignationList extends Component {
  state = { visible: false, role: "", professionalDetails:[] };
  showModal = (role, points) => {
    if (points === 0) {
      this.setState({
        visible: true,
        role,
      });
    }
  };
  componentDidMount = () => {
    this.loadEmployeeDetails();
  };
  loadEmployeeDetails = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId),
        employeeId = decryptData(localStorage.userId),
        token = decryptData(localStorage.token)

      let { data, status } = await getEmployeeDetails(orgId, employeeId, {
        Authorization: token,
      });
      if (status >= 200 && status < 300) {
        this.setState({
          professionalDetails: data.professionalDetails,
        });
        console.log(this.state.professionalDetails.department,"professionalDetails")
      }
      document.toggleLoading();
    } catch (error) {
      console.log(error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    setTimeout(this.setState.bind(this, { role: "" }), 100);
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
    setTimeout(this.setState.bind(this, { role: "" }), 100);
  };

  render() {
    return (
      <Div>
        <div className="inner-container">
          <div className="title">
            {this.props.title !== undefined ? this.props.title : ""}
          </div>
          <div className="designation-container">
            {this.props.cardDetails !== undefined
              ? this.props.cardDetails.length > 0 &&
                this.props.cardDetails
                  .filter(
                    (eachCard) => eachCard.careerpath === this.props.careerTitle
                  )
                  .map((ele, index) => (
                    <div className="designation-individual" key={index}>
                      <div className="designation-lists">
                        <div className="designation-title">
                        {ele.department ? ele.department :"" } - {ele.forwardDesignation || ""}
                        </div>
                        <div
                          className="check-Icon"
                          style={{
                            color: ele.careerPathProposed ? "green" : "#ffffff",
                          }}
                        >
                          <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                      </div>
                      <div
                        style={{ position: "relative" }}
                        className="designation-tool-tip"
                      ></div>
                    </div>
                  ))
              : ""}
          </div>
        </div>
        <Modal
          title={null}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          {this.props.requestModel !== undefined ? (
            <div style={{ fontFamily: "Open Sans Regular" }}>
              <div
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "15px",
                  zIndex: 11,
                  backgroundColor: "#ffffff",
                }}
              >
                <img
                  src={Close}
                  alt="close"
                  style={{ width: 32, height: 32, cursor: "pointer" }}
                  onClick={this.handleCancel}
                />
              </div>

              <div
                style={{
                  fontFamily: "Open Sans Semibold",
                  color: "#303030",
                  fontSize: "1.4em",
                  textAlign: "center",
                  padding: "20px 0",
                }}
              >
                {this.props.requestModel.title}
              </div>
              <div
                style={{
                  color: "#767676",
                  fontSize: "1em",
                  padding: "0 15px",
                }}
              >
                {this.props.requestModel.subTitle}&#160;
                <span style={{ fontFamily: "Open Sans Semibold" }}>
                  {this.props.requestModel.managerName || ""}
                </span>
                &nbsp;for {this.state.role}
                &nbsp;role
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: "18px",
                  fontFamily: "Open Sans Semibold",
                  fontSize: "1em",
                }}
              >
                <div style={{ width: "116px" }} onClick={this.handleCancel}>
                  <Button
                    label="Cancel"
                    status="disable"
                    styles={{
                      color: "#F17E8A",
                      backgroundColor: "#ffffff",
                      border: "#F17E8A",
                      height: "40px",
                    }}
                  />
                </div>
                <div style={{ width: "164px", paddingLeft: "2%" }}>
                  <Button
                    label="Send Request"
                    status="disable"
                    styles={{
                      color: "#ffffff",
                      backgroundColor: "#F17E8A",
                      border: "#F17E8A",
                      height: "40px",
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </Modal>
      </Div>
    );
  }
}

export default CareerpathDesignationList;
