import React, { Component } from "react";
import styled from "styled-components";
import "../assets/css/AntdExternal.css"; 
import {
  getManagerDetails,
  requestCareerpath,
  getEmployeeDetails,
} from "../core/apiClient/organization/organizationClient";
import { decryptData } from "../utils/encryptDecrypt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Info from "../assets/images/info.svg";
import ToolTip from "./ToolTipComponent";
import "antd/dist/antd.css";
import { Modal, message } from "antd";
import Button from "./Button";
import InputField from "../components/InputField";
import "../assets/css/ScrollBarDesign.css";
import FormSelector from "./form_selector";
import Api from "../components/goals/employee/api"
const Div = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 25px;
  box-shadow: 0px 3px 30px #61cfed48;
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
    font-family: Open Sans Semibold;
    font-size: 1em;
  }
  #designation-container {
    margin-top: 2%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 85%;
  }
  .designation-individual {
    margin: 3% auto;
    display: flex;
    justify-content: center;
  }
  .designation-lists {
    width: 80%;
    padding: 2.918% 0;
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
    font-size: 0.875em;
  }
  .check-Icon {
    margin-right: 5%;
    font-size: 1.485em;
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

`;

class CareerpathDesignationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      role: "",
      showToolTip: "",
      careerpath: "",
      designationId: "",
      department:"",
      isLoading: false,
      managerName: "",
      managerList: [],
      professionalDetails: []
    };
  }

  componentDidMount() {
    this.loadManagers();
    this.loadEmployeeDetails();
  }

  loadManagers = async () => {
    let orgId = decryptData(localStorage.orgId),
      employeeId = decryptData(localStorage.employeeId),
      token = decryptData(localStorage.token);
      console.log(orgId,employeeId)
    if (orgId && employeeId) {
      try {
        document.toggleLoading(true);
        let { data, status } = await getManagerDetails(orgId, employeeId, {
          Authorization: token,
        });
        let managerList = [],
          managerName = "";
        if (status >= 200 && status < 300) {
          let manager = data;
          for (let i = 0; i < manager.length; i++) {
            let obj = { name: "", employeeId: "" };
            obj.name =
              (manager[i].firstName || "") + " " + (manager[i].lastName || "");
            obj.employeeId = manager[i].employeeId;
            managerList.push(obj);

            managerName = managerList[0];
          }
          this.setState({ managerList, managerName });
        }
        document.toggleLoading();
      } catch (error) {
        message.error("Unable to fetch details, please try after sometime");
        document.toggleLoading();
      }
    }
  };
  loadEmployeeDetails = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId),
        employeeId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token)

      let { data, status } = await getEmployeeDetails(orgId, employeeId, {
        Authorization: token,
      });
      if (status >= 200 && status < 300) {
        this.setState({
          professionalDetails: data.professionalDetails,
        });
        console.log(this.state.professionalDetails.department, "professionalDetails")
      }
      document.toggleLoading();
    } catch (error) {
      console.log(error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };
  sendRequest = async (careerPath, forwardDesignationId, managerName) => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId),
        employeeId = decryptData(localStorage.employeeId),
        token = decryptData(localStorage.token);
      if (orgId && employeeId && managerName) {
        document.toggleLoading(true);
        let obj = {
          forwardDesignationId,
          careerPath,
          managerId: managerName.employeeId,
        };
        let { data, status } = await requestCareerpath(
          orgId,
          employeeId,
          forwardDesignationId,
          obj,
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          message.success(data);
        } else {
          message.error(data);
        }
        this.setState({ visible: false });
        document.toggleLoading();
      }
      document.toggleLoading();
    } catch (error) {
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  showModal = (role, careerpath, designationId,department,careerPathProposed,noteMessage) => {
    console.log(noteMessage,department)
    if (this.state.managerList.length > 0) {
      this.setState({
        visible: true,
        role,
        careerpath,
        designationId,
        department,
        careerPathProposed,
        noteMessage
      });
    } else {
      message.error("No manager assigned for current employee");
    }
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
    setTimeout(this.setState.bind(this, { role: "" }), 100);
  };

  infoMouse = (index) => {
    this.setState({ showToolTip: index });
  };
  infoMouseLeave = () => {
    this.setState({ showToolTip: "" });
  };
  handleCancel = (e) => {
    this.setState({
      visible: false,
    }); 
    setTimeout(this.setState.bind(this, { role: "" }), 100);
  };
  selectedManager = (managerName) => {
    this.setState({ managerName });
  };

  render() {
    return (
      <Div>
        <div className="inner-container">
          <div className="title">
            {this.props.title !== undefined ? this.props.title : ""}
          </div>
          <div id="designation-container" className="scroll-container">
            {this.props.cardDetails !== undefined &&
              this.props.cardDetails.length > 0
              ? this.props.cardDetails.map((ele, index) => {
                if (ele.careerpath === this.props.careerTitle) {
                  return (
                    <div
                      className="designation-individual"
                      key={ele.id || index}
                    >
                      <div
                        className="designation-lists"
                        onClick={() =>
                          this.showModal(
                            ele.forwardDesignation,
                            ele.careerpath,
                            ele.forwardDesignationId,
                            ele.department,
                            ele.careerPathProposed,
                            ele.noteMessage
                          )
                        }
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <div className="designation-title">
                          {ele.department} - {ele.forwardDesignation}
                        </div>
                        <div
                          className="check-Icon"
                          style={{
                            color: ele.careerPathProposed
                              ? "green"
                              : "#ffffff",
                          }}
                        >
                          <FontAwesomeIcon icon={faCheckCircle} />
                        </div>
                      </div>
                      <img
                        src={Info}
                        className="Info-icon"
                        alt="info-Icon"
                        onMouseOver={() => this.infoMouse(index)}
                        onMouseLeave={() => this.infoMouseLeave()}
                      />
                      <div
                        style={{
                          position: "relative",
                          opacity: this.state.showToolTip === index ? 1 : 0,
                          visibility:
                            this.state.showToolTip === index
                              ? "visible"
                              : "hidden",
                          transition: "opacity 0.4s ease-out",
                        }}
                      >
                        <ToolTip
                          className="toolTip"
                          style={{
                            minWidth: 300,
                            maxWidth: 400,
                            minHeight: 30,
                            maxHeight: 100,
                            right: -10,
                            top: "84%",
                            opacity: 1,
                            borderRadius: 1,
                            display: "flex",
                            backgroundColor: "#F4F4FE",
                          }}
                          toolTip={{ placement: "bottomRight", width: "7px" }}
                        >
                          <div
                            style={{
                              width: "inherit",
                              height: "inherit",
                              outline: "none",
                            }}
                          >
                            <div
                              style={{
                                padding: 10,
                                fontSize: "0.955em",
                                color: "#4D4CAC",
                              }}
                            >
                              {ele.careerPathProposed
                                ? "Your manager has agreed to your proposal work for this career path " +
                                ele.forwardDesignation
                                : `Do you want to proceed with  ${ele.forwardDesignation}? Click and send request to discuss this with your manager
                     `}
                            </div>
                          </div>
                        </ToolTip>
                      </div>
                    </div>
                  );
                } else return false;
              })
              : ""}
          </div>
        </div>
        <Modal
          title={null}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          height={300}
        >
          {this.props.requestModel !== undefined ? (
            <div style={{ fontFamily: "Open Sans Regular" }}>
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
                  padding: "0 18px",
                  minHeight: "50px",
                }}
              >
                {this.props.requestModel.subTitle}&#160;
                <span style={{ fontFamily: "Open Sans Semibold" }}>
                  {this.state.managerName && this.state.managerName.name}
                </span>
                &nbsp;has proposed the Career path
                <span style={{ fontFamily: "Open Sans Semibold" }}>
                  &nbsp; "{this.state.role || ""} - {this.state.department || ''}"
                </span>
                &nbsp;
                {this.state.careerPathProposed ? 
               ( <div id="manager-note-feedback">
              <div>
                <label style={{fontSize:"14px",fontFamily: "Open Sans Semibold"}}>
                  Comment:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <sup
                    style={{
                      color: "red",
                      opacity: this.props.generalFeedbackNote ? 0 : 1,
                      transition: "0.5s",
                      fontSize: "1.2em",
                    }}
                  >
                    
                  </sup>
                </label>
              </div>
              <div>
                <InputField
                  type="textArea"
                  placeHolder= {this.state.noteMessage}
                  error={this.props.isValid}
                  required={true}
                  disabled={true}
                  onChange={this.props.managerGeneralFeedbackNote}
                  value={this.state.noteMessage}
                  rows="2.5"
                />
              </div>
                  </div> ):
                  (<div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "Open Sans Semibold",
                      margin: "1em 0",
                    }}
                  >
                    Comment:
                    <div
                      style={{
                        width: "190px",
                        fontSize: 14,
                        letterSpacing: "0.03em",
                        marginLeft: "1em",
                      }}
                    >
                      <FormSelector
                        value={this.state.managerName}
                        option={this.state.managerList || []}
                        selector="name"
                        placeHolder="Select manager"
                        onClick={this.selectedManager}
                        style={{
                          color: {
                            hover: "#FF808B",
                            selectedBg: "#FF808B",
                            optionHover: "#fbe7e9",
                            selectedFont: "#ffffff",
                          },
                        }}
                      />
                    </div>
                  </div> )
                  }
              </div>

              {this.state.careerPathProposed ? "" : <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: "18px",
                  fontFamily: "Open Sans Semibold",
                  fontSize: "1em",
                  paddingRight: "26px",
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
                <div
                  style={{ width: "164px", paddingLeft: "2%" }}
                  onClick={() =>
                    this.sendRequest(
                      this.state.careerpath,
                      this.state.designationId,
                      this.state.managerName
                    )
                  }
                >
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
              </div> }
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
