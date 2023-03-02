import React, { Component } from "react";
import { requestCourseApproval } from "../core/apiClient/organization/organizationClient";
import { decryptData } from "../utils/encryptDecrypt";
import optionsicon from "../assets/images/ic_more_vert.svg";
import requestsenticon from "../assets/images/Group 22917.svg";
import ProgressBar from "../components/progress";
import user from "../assets/images/man-user.svg";
import { ClockCircleFilled } from "@ant-design/icons";
import deiniedIcon from "../assets/images/ic_cancel_24px.svg";
import approveIcon from "../assets/images/Group 22831.svg";
import defaultCourseImage from "../assets/images/online_-courses_programs.png";
import Close from "../assets/images/closeImage.svg";
import { message, Modal } from "antd";
import Button from "./Button";
import FormSelector from "./form_selector";
const styles = {
  PCCard: {
    width: "100%",
    cursor: "pointer",
  },
  PCMainCard: {
    background: "#F7F9FF 0% 0% no-repeat padding-box",
    display: "flex",
    padding: "5px",
    borderRadius: "5px",
  },
  image: {
    margin: "5px",
    flex: "0.2",
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
  },

  courseDetails: {
    margin: "5px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  title_option: {
    flex: 1,
    fontFamily: "Open Sans Semibold",
    fontSize: 14,
    letterSpacing: "0px",
    color: "#303030",
    opacity: 1,
    display: "flex",
    alignItems: "center",
  },
  title: {
    flex: 1,
  },
  option: {
    display: "flex",
    paddingRight: "2%",
    cursor: "pointer",
  },
  Author_clock: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  author: {
    flex: 1.2,
    fontFamily: "Open Sans Regular",
    fontSize: 14,
    color: "#767676",
    opacity: 1,
    display: "flex",
    alignItems: "center",
  },
  clock: {
    flex: 0.6,
    fontFamily: "Open Sans Regular ",
    color: "#767676",
    opacity: 1,
  },
  approved: {
    flex: 1,
    fontFamily: "Open Sans Regular",
    fontSize: 14,
    letterSpacing: "0px",
    opacity: 1,
  },
  Percentage_Price: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  progress: {
    width: "60%",
  },
  price: {
    flex: 1,
    textAlign: "right",
    paddingRight: "10%",
    fontFamily: "Open Sans Semibold",
    fontSize: 16,
    letterSpacing: "0px",
    color: " #4D4CAC",
    textTransform: "uppercase",
    opacity: 1,
  },

  optionDiv: {
    position: "relative",
    right: 4,
    bottom: 20,
  },
  picture: {
    width: 170,
    borderRadius: 10,
  },
  optionsubDiv: {
    width: "140px",
    position: "absolute",
    right: "0%",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 3px 8px #0000001F",
    borderRadius: "8px",
    opacity: 1,
    margin: "5px",
    padding: "10px 5px",
    fontFamily: "Open Sans Regular",
    fontSize: 16,
  },

  icon_Message: {
    display: "flex",
  },
};
export default class Paidcourses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayPopup: false,
      approvalStatus: this.props.approvalStatus || "",
      statusIcon: null,
      selected: false,
      statusColor: "#FF9300",
      link: "",
      visible: false,
      managerName: this.props.managerName,
      courseName: "",
    };
  }

  componentDidMount() {
    let approvalStatus = this.props.approvalStatus;
    this.updateApprovalStatusFlag(approvalStatus);
  }

  popup = () => {
    this.setState({
      displayPopup: !this.state.displayPopup,
    });
  };
  popupclose = () => {
    this.setState({
      displayPopup: this.state.displayPopup,
    });
  };

  updateApprovalStatusFlag = (approvalStatus) => {
    let statusIcon = null;
    let statusColor = "";
    if (approvalStatus !== undefined) {
      if (approvalStatus === "Request Sent") {
        statusIcon = requestsenticon;
        statusColor = "#FF9300";
      } else if (approvalStatus === "Denied") {
        statusIcon = deiniedIcon;
        statusColor = "red";
      } else if (approvalStatus === "Approved") {
        statusIcon = approveIcon;
        statusColor = "green";
      }
    }
    this.setState({ statusIcon, statusColor });
    return;
  };
  static getDerivedStateFromProps(nextProps) {
    return {
      trainingNav: nextProps.trainingNav,
      skillTypeId: nextProps.skillTypeId,
    };
  }

  requestApproval = async (id, managerName, courseName) => {
    let employeeId = decryptData(localStorage.employeeId),
      orgId = decryptData(localStorage.orgId),
      token = decryptData(localStorage.token);
    let index = this.props.managerList.findIndex(
      (eachManager) => eachManager.name === managerName
    );
    if (employeeId && orgId && index >= 0) {
      try {
        document.toggleLoading(true);
        let managerId = this.props.managerList[index].employeeId;
        let { data, status } = await requestCourseApproval(
          orgId,
          employeeId,
          id,
          { managerId },
          {
            Authorization: token,
          }
        );
        if (status >= 200 && status < 300) {
          this.setState({
            approvalStatus: data.approvalStatus,
            visiblePopUp: true,
            courseName: courseName,
          });
          this.updateApprovalStatusFlag(data.approvalStatus);
        } else if (status === 400) {
          message.error(data.message);
          this.setState({ approvalStatus: data.approvalStatus });
          this.updateApprovalStatusFlag(data.approvalStatus);
        }
        document.toggleLoading();
      } catch (error) {
        message.error(
          "we are unable to serve your request, please try after sometime "
        );
        document.toggleLoading();
      }
      this.setState({ visible: false });
    }
  };
  onClickEvent = (event) => {
    if (event === "RequestApproval") {
      if (this.props.managersNameList.length > 0) {
        this.setState({ visible: true });
      } else {
        message.error("No manager assigned for current employee");
      }
    } else if (event === "NotInterested") {
      this.props.updateLikeStatus(this.props.id, false);
    } else if (event === "Save") {
      this.props.updateLikeStatus(this.props.id, true);
    }
    this.setState({
      displayPopup: false,
    });
  };
  close = () => {
    this.setState({
      displayPopup: false,
      link: "",
    });
  };
  onMouseOver = (e) => {
    this.setState({ link: e });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  selectedManager = (managerName) => {
    this.setState({ managerName });
  };
  render() {
    return (
      <div style={styles.PCCard}>
        <div style={styles.PCMainCard}>
          <div style={styles.image}>
            <img
              onClick={() => window.open(this.props.url, "_blank")}
              src={defaultCourseImage}
              style={styles.picture}
              alt="course"
            ></img>
          </div>
          <div
            style={styles.courseDetails}
            onClick={() => window.open(this.props.url, "_blank")}
          >
            <div style={styles.title_option}>
              <div style={styles.title}>
                <span
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {this.props.title}
                </span>
              </div>
            </div>
            <div style={styles.Author_clock}>
              <div style={styles.author}>
                <div style={{ display: "flex" }}>
                  <img
                    src={user}
                    style={{
                      width: 13,
                      height: 13,
                      marginRight: 5,
                    }}
                    alt="icon"
                  ></img>
                </div>
                <div>{this.props.author}</div>
              </div>
              <div style={styles.clock}>
                {/* {this.props.duration ? (
                  <ClockCircleFilled style={{ paddingRight: "15px" }} />
                ) : null}
                {this.props.duration ? this.props.duration : null} */}
              </div>
              <div style={styles.approved}>
                {this.state.approvalStatus && (
                  <div style={styles.icon_Message}>
                    <img
                      style={{ paddingRight: "5px" }}
                      src={this.state.statusIcon}
                      alt="icon"
                    ></img>
                    <div style={{ color: this.state.statusColor }}>
                      {this.state.approvalStatus}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div style={styles.Percentage_Price}>
              <div style={styles.progress}>
                {this.props.progress ? (
                  <ProgressBar progress={this.props.progress} />
                ) : null}
              </div>
              <div style={styles.price}>
                {/* {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: this.props.currency ? this.props.currency : "INR",
                  maximumSignificantDigits: 6,
                }).format(this.props.amount)} */}
                PAID
              </div>
            </div>
          </div>
          <div
            style={{
              flex: 0.001,
              display:
                this.props.approvalStatus === "Request Sent" &&
                this.props.liking === true
                  ? "none"
                  : "block",
              paddingRight: "0.5%",
              cursor: "pointer",
            }}
          >
            <img
              src={optionsicon}
              onClick={this.popup}
              onBlur={this.close}
              alt="icon"
              tabIndex="1"
              style={{ outline: "none", position: "relative", top: 4 }}
            ></img>
            {this.state.displayPopup ? (
              <div style={styles.optionDiv}>
                <div style={styles.optionsubDiv}>
                  <div>
                    {this.props.hasOwnProperty("approvalStatus") ? (
                      this.props.approvalStatus === "Request Sent" ||
                      this.props.approvalStatus === "Approved" ||
                      this.state.approvalStatus === "Request Sent" ? (
                        ""
                      ) : (
                        <div
                          style={{
                            opacity: "1",
                            padding: "5px 5px",
                            fontSize: "14px",
                            cursor:
                              this.state.approvalStatus === "Request Sent"
                                ? "not-allowed"
                                : "pointer",
                            color:
                              this.state.link === "RequestApproval"
                                ? "#4D4CAC"
                                : "#303030",
                            backgroundColor:
                              this.state.link === "RequestApproval"
                                ? "#E2E2E2"
                                : "#ffffff",
                          }}
                          onMouseDown={(event) =>
                            this.onClickEvent("RequestApproval")
                          }
                          onMouseOver={() =>
                            this.onMouseOver("RequestApproval")
                          }
                        >
                          Request Approval
                        </div>
                      )
                    ) : (
                      <div
                        style={{
                          opacity: "1",
                          padding: "5px 5px",
                          fontSize: "14px",
                          display:
                            this.state.approvalStatus === "Request Sent"
                              ? "none"
                              : " ",
                          color:
                            this.state.link === "RequestApproval"
                              ? "#4D4CAC"
                              : "#303030",
                          backgroundColor:
                            this.state.link === "RequestApproval"
                              ? "#E2E2E2"
                              : "#ffffff",
                        }}
                        onMouseDown={(event) =>
                          this.onClickEvent("RequestApproval")
                        }
                        onMouseOver={() => this.onMouseOver("RequestApproval")}
                      >
                        Request Approval
                      </div>
                    )}
                    {this.props.hasOwnProperty("approvalStatus") ? (
                      this.props.approvalStatus === "Request Sent" ||
                      this.props.approvalStatus === "Approved" ||
                      this.state.approvalStatus === "Request Sent" ? (
                        ""
                      ) : (
                        <div
                          style={{
                            opacity: "1",
                            padding: "5px 5px",
                            fontSize: "14px",

                            color:
                              this.state.link === "NotInterested"
                                ? "#4D4CAC"
                                : "#303030",
                            backgroundColor:
                              this.state.link === "NotInterested"
                                ? "#E2E2E2"
                                : "#ffffff",
                          }}
                          onMouseDown={(event) =>
                            this.onClickEvent("NotInterested")
                          }
                          onMouseOver={() => this.onMouseOver("NotInterested")}
                        >
                          Not Interested
                        </div>
                      )
                    ) : (
                      <div
                        style={{
                          opacity: "1",
                          padding: "5px 5px",
                          fontSize: "14px",
                          display:
                            this.state.approvalStatus === "Request Sent"
                              ? "none"
                              : " ",
                          color:
                            this.state.link === "NotInterested"
                              ? "#4D4CAC"
                              : "#303030",
                          backgroundColor:
                            this.state.link === "NotInterested"
                              ? "#E2E2E2"
                              : "#ffffff",
                        }}
                        onMouseDown={(event) =>
                          this.onClickEvent("NotInterested")
                        }
                        onMouseOver={() => this.onMouseOver("NotInterested")}
                      >
                        Not Interested
                      </div>
                    )}
                    {this.props.hasOwnProperty("liking") ? (
                      this.props.liking !== true ? (
                        <div
                          style={{
                            opacity: "1",
                            padding: "5px 5px",
                            fontSize: "14px",
                            color:
                              this.state.link === "Save"
                                ? "#4D4CAC"
                                : "#303030",
                            backgroundColor:
                              this.state.link === "Save"
                                ? "#E2E2E2"
                                : "#ffffff",
                          }}
                          onMouseDown={(event) => this.onClickEvent("Save")}
                          onMouseOver={() => this.onMouseOver("Save")}
                        >
                          Save
                        </div>
                      ) : (
                        ""
                      )
                    ) : (
                      <div
                        style={{
                          opacity: "1",
                          padding: "5px 5px",
                          fontSize: "14px",
                          color:
                            this.state.link === "Save" ? "#4D4CAC" : "#303030",
                          backgroundColor:
                            this.state.link === "Save" ? "#E2E2E2" : "#ffffff",
                        }}
                        onMouseDown={(event) => this.onClickEvent("Save")}
                        onMouseOver={() => this.onMouseOver("Save")}
                      >
                        Save
                      </div>
                    )}{" "}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <Modal
          title={null}
          visible={this.state.visiblePopUp}
          onOk={this.handleOk}
          onCancel={false}
          footer={null}
          closable={false}
        >
          <div
            style={{
              fontFamily: "Open Sans Regular",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                zIndex: 11,
                backgroundColor: "#ffffff",
              }}
            >
              <img
                src={Close}
                alt="close"
                style={{ width: 32, height: 32, cursor: "pointer" }}
                onClick={() => {
                  this.setState({ visiblePopUp: false });
                }}
              />
            </div>
            <div style={{ marginTop: 28, fontSize: 17 }}>
              {"Your request for approval for"} <b>{this.state.courseName}</b>{" "}
              {
                "has been successfully submitted. Please watch the notification section for actions on your request."
              }
            </div>
          </div>
        </Modal>
        <Modal
          title={null}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          height={300}
        >
          <div style={{ fontFamily: "Open Sans Regular" }}>
            <div
              style={{
                position: "absolute",
                right: "10px",
                top: " 10px",
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
                padding: "20px 18px",
              }}
            >
              Request Approval
            </div>
            <div
              style={{
                color: "#767676",
                fontSize: "1em",
                padding: "0 18px",
                minHeight: "50px",
              }}
            >
              Request for a course approval with your manager
              <span style={{ fontFamily: "Open Sans Semibold" }}>
                {" " + this.state.managerName || ""}
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontFamily: "Open Sans Semibold",
                  margin: "1em 0",
                }}
              >
                Select Manager:
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
                    onView={this.state.managerName}
                    option={this.props.managersNameList || []}
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
              </div>
            </div>
            <div
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
                  this.requestApproval(
                    this.props.id,
                    this.state.managerName,
                    this.props.title
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
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
