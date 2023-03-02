import React from "react";
import { Modal, Empty } from "antd";
import "../../../../../assets/css/ScrollBarDesign.css";
import "antd/dist/antd.css";
import ExperienceModal from "../../../../EmployeeOnboardingFlow/ExperienceDetails";
import { getEmployeeExperiencesDetails } from "../../../../../core/apiClient/organization/organizationClient";
import { decryptData } from "../../../../../utils/encryptDecrypt";
const styles = {
  experienceMainDiv: {
    display: "flex",
    height: "100%",
    background: "#FFFFFF",
    borderRadius: "8px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  },
  editButton: {
    cursor: "pointer",
  },
  experienceCard: {
    flex: 1,
    border: "1px solid #ffffff",
    borderRadius: "5px",
    padding: "2% 2% 4% 2.5%",
    width: "100%",
  },
  experienceHeading: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginBottom: "1.5%",
  },
  title: {
    paddingLeft: "18px",
    color: "#303030",
    fontSize: "16px",
    fontFamily: "Open Sans Semibold",
    fontweigh:"600"
  },
  horizontalLine: {
    width: "55%",
    border: "0.5px solid #F9F9FA",
    marginLeft: "15px",
    paddingLeft: "20%",
  },
  cardContents: {
    display: "block",
    maxHeight: "68%",
    minHeight: "68%",
    overflowY: "auto",
  },
  experiences: {
    paddingLeft: "11%",
    display: "flex",
  },
  Dot_line: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
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
  experienceDetails: {
    display: "block",
    flex: 1,
    lineHeight: "1.6",
    padding: " 0 8% 0 20px",
    marginBottom: "20px",
  },
  designation: {
    color: "#303030",
    fontFamily: "Open Sans SemiBold, Regular",
    fontSize: "14px",
  },
  experienceDuration: {
    color: "#8E8E8E",
    fontSize: "14px",
    fontFamily: "Open Sans Regular",
  },
};
export default class ExperienceDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, experienceDetails: [] };
  }
  componentDidMount() {
    this.loadExperience();
  }

  loadExperience = async () => {
    try {
      document.toggleLoading(true);
      let orgId = decryptData(localStorage.orgId);
      let employeeId = decryptData(localStorage.employeeId);
      let token = decryptData(localStorage.token);
      let { data, status } = await getEmployeeExperiencesDetails(
        orgId,
        employeeId,
        { Authorization: token }
      );
      if (status >= 200 && status < 300) {
        if (data.length) this.setState({ experienceDetails: data });
      } else {
        document.message.error(JSON.stringify(data));
      }
      document.toggleLoading();
    } catch (error) {
      console.log(error);
      document.message.error("Something went wrong! Please try again later.");
      document.toggleLoading();
    }
  };

  showDetails = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.setState({
      visible: false,
    });
    this.loadExperience();
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
    this.loadExperience();
  };
  render() {
    return (
      <div style={styles.experienceMainDiv}>
        <div style={styles.experienceCard}>
          <div style={styles.experienceHeading}>
            <img
              src={require("../../../../../assets/images/experience.svg")}
              alt="icon"
            />
            <div style={styles.title} className="overal">Overall Experience </div>
            <div style={styles.horizontalLine}></div>
            <div style={styles.editButton} onClick={this.showDetails}>
              <img
                src={require("../../../../../assets/images/Groupedit.svg")}
                alt="edit"
              />
            </div>
          </div>
          <div style={styles.cardContents} className="scroll-container">
            {this.state.experienceDetails.length ? (
              this.state.experienceDetails.map((experience, id) => (
                <div style={styles.experiences} key={id}>
                  <div style={styles.Dot_line}>
                    <div style={styles.dot}></div>
                    {this.state.experienceDetails.length - 1 !== id && (
                      <div style={styles.verticalline}></div>
                    )}
                  </div>
                  <div style={styles.experienceDetails}>
                    <div style={styles.designation}>
                      {experience.designation}
                      {experience.organization
                        ? " @" + experience.organization
                        : ""}
                    </div>
                    <div style={styles.experienceDuration}>
                      {experience.startDate && experience.endDate
                        ? "(" +
                          experience.startDate +
                          " - " +
                          experience.endDate +
                          ")"
                        : experience.startDate
                        ? experience.startDate
                        : experience.endDate
                        ? experience.endDate
                        : ""}
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
              <ExperienceModal
                changeOnboardingStep={(e) => this.handleOk(e)}
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
