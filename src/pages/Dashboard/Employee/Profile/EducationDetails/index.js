import React, { Component } from "react";
import educationicon from "../../../../../assets/images/Group 22960.svg";
import rewrite from "../../../../../assets/images/Groupedit.svg";
import { Modal, Empty } from "antd";
import "antd/dist/antd.css";
import EducationModal from "./EducationModal";
import "../../../../../assets/css/ScrollBarDesign.css";
import { getEmployeeEducationDetails } from "../../../../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../../../../utils/encryptDecrypt";
const styles = {
  wholeComponent: {
    width: "100%",
    background: "#FFFFFF",
    borderRadius: "8px",
    height: "100%",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  },
  Component: {
    height: "100%",
    border: "1px solid #ffffff",
    borderRadius: "5px",
    padding: "2% 2% 6% 2%",
    display: "flex",
    flexDirection: "column",
  },
  educationHeading: {
    flex: 0.3,
    display: "flex",
    alignItems: "center",
  },

  educationMainDiv: {
    flex: 1,
    display: "block",
    padding: "0 6% 5% 10%",
  },
  educationDiv: {
    display: "flex",
  },
  icon: {
    flex: 0.1,
    display: "flex",
    justifyContent: "center",
  },
  heading: {
    textAlign: "center",
    fontFamily: "Open Sans SemiBold",
    color: "#303030",
    fontSize: "16px",
    opacity: 1,
    fontWeight: "600",
    marginLeft: "14px",
  },
  horline: {
    flex: 1,
    color: "#F9F9FA",
    width: "100%",
    marginLeft: "10px",
  },
  editButton: {
    flex: 0.1,
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
  },
  Dot_line: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  dot: {
    background: "#ACAED8 0% 0% no-repeat padding-box",
    border: "2px solid #FFFFFF",
    opacity: 1,
    height: "16px",
    width: "16px",
    borderRadius: "50%",
  },
  verticalline: {
    borderLeft: "2px solid #ACAED8",
    opacity: "0.3",
    height: "100%",
  },
  Education: {
    display: "block",
    padding: "0 0 0 18px",
    width: "100%",
    marginBottom: "20px",
  },
  Degree_Year: {
    display: "flex",
    fontSize: 14,
    fontFamily: "Open Sans SemiBold, Regular",
    color: "#303030",
    opacity: 1,
  },
  Group_University: {
    margin: "3px",
    fontSize: 14,
    font: "Open Sans Regular",
    color: "#8E8E8E",
    opacity: 1,
  },
};

export default class EducationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, educationDetails: [] };
  }

  componentDidMount() {
    this.loadEducationData();
  }
  loadEducationData = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let employeeId = decryptData(localStorage.employeeId);
      let token = decryptData(localStorage.token);
      let { data, status } = await getEmployeeEducationDetails(
        orgId,
        employeeId,
        { Authorization: token }
      );
      if (status >= 200 && status < 300) {
        if (data.length) this.setState({ educationDetails: data });
      } else {
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
    } catch (error) {
      console.log("error", error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  showDetails = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
    this.loadEducationData();
  };

  render() {
    return (
      <div style={styles.wholeComponent}>
        <div style={styles.Component}>
          <div style={styles.educationHeading}>
            <div style={styles.icon}>
              <img src={educationicon} alt="icon"></img>
            </div>
            <div style={styles.heading}>Education</div>
            <div style={styles.horline}>
              <hr style={{ border: "1px solid #818E94", opacity: "0.1 " }}></hr>
            </div>
            <div style={styles.editButton} onClick={this.showDetails}>
              <img src={rewrite} alt="edit"></img>
            </div>
          </div>
          <div
            style={{ flex: 1, overflowY: "auto" }}
            className="scroll-container"
          >
            <div style={styles.educationMainDiv}>
              {this.state.educationDetails.length ? (
                this.state.educationDetails.map((educateele, educateid) => (
                  <div style={styles.educationDiv} key={educateid}>
                    <div style={styles.Dot_line}>
                      <div
                        style={{
                          background: "#ACAED8 0% 0% no-repeat padding-box",
                          border: "2px solid #FFFFFF",
                          opacity: 1,
                          height: educateid === 0 ? "19px" : "16px",
                          width: "16px",
                          borderRadius: "50%",
                        }}
                      ></div>
                      {this.state.educationDetails.length - 1 !== educateid && (
                        <div style={styles.verticalline}></div>
                      )}
                    </div>
                    <div style={styles.Education}>
                      <div style={styles.Degree_Year}>
                        <div>{educateele.degree}</div>
                        <div>
                          &nbsp;
                          {educateele.course ? "in " + educateele.course : ""}
                        </div>
                        &nbsp;
                        <div>
                          {" "}
                          {educateele.completionYear
                            ? "(" + educateele.completionYear + ")"
                            : ""}
                        </div>
                      </div>
                      <div style={styles.Group_University}>
                        {educateele.specialization
                          ? educateele.specialization + ", "
                          : ""}
                        {educateele.institute || ""}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
              )}
            </div>
          </div>
        </div>
        {this.state.visible && (
          <Modal
            visible={this.state.visible}
            width="50%"
            footer={null}
            onCancel={this.handleCancel}
            height="400px"
            className="dashboard-modal"
          >
            <div className="user-profile-edit scroll-container">
              <EducationModal
                changeOnboardingStep={this.handleCancel}
                cancel={this.handleCancel}
                dropDownScroll={this.props.dropDownScroll}
              />
            </div>
          </Modal>
        )}
      </div>
    );
  }
}
